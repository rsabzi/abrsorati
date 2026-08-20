// Vite plugin that emulates our Netlify Functions locally by proxying `/api/*`
// requests to an in-memory implementation backed by a `.dev-db.json` file.
// This lets `npm run dev` work exactly like Netlify without needing `netlify dev`.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import {
  PRODUCTS_SEED,
  CATEGORIES_SEED,
  COUPONS_SEED,
  SETTINGS_SEED,
  ORDERS_SEED
} from './netlify/functions/_shared/seed.mjs';

const DB_FILE = path.resolve('.dev-db.json');
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

const DEFAULT_DB = {
  products:   PRODUCTS_SEED,
  categories: CATEGORIES_SEED,
  coupons:    COUPONS_SEED,
  orders:     ORDERS_SEED,
  settings:   SETTINGS_SEED,
  users:      [],
  sessions:   {}
};

const COLLECTIONS = {
  products:   { idField: 'id' },
  categories: { idField: 'id' },
  coupons:    { idField: 'code' },
  orders:     { idField: 'id' },
  users:      { idField: 'email' }
};

function loadDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2));
    return structuredClone(DEFAULT_DB);
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    // Ensure all keys exist
    for (const key of Object.keys(DEFAULT_DB)) {
      if (parsed[key] === undefined) parsed[key] = DEFAULT_DB[key];
    }
    return parsed;
  } catch {
    return structuredClone(DEFAULT_DB);
  }
}

function saveDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

async function ensureDefaultAdmin(db) {
  if (!db.users || db.users.length === 0) {
    const hash = await bcrypt.hash('Admin@2024', 10);
    db.users = [{
      email: 'admin@abrsorati.ir',
      passwordHash: hash,
      role: 'admin',
      name: 'مدیر فروشگاه',
      createdAt: new Date().toISOString()
    }];
    saveDb(db);
  }
}

function readSession(db, token) {
  if (!token) return null;
  const s = db.sessions?.[token];
  if (!s) return null;
  if (s.expiresAt < Date.now()) {
    delete db.sessions[token];
    saveDb(db);
    return null;
  }
  return s;
}

function requireAdmin(req, db) {
  const token = req.headers['x-admin-token'];
  return readSession(db, token);
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => (data += c));
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function json(res, status, body, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Admin-Token');
  for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

export default function devApiPlugin() {
  return {
    name: 'dev-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        try {
          // CORS pre-flight
          if (req.method === 'OPTIONS') return json(res, 204, {});

          const url = new URL(req.url, 'http://x');
          const parts = url.pathname.split('/').filter(Boolean);
          let segments = parts;
          const dbIdx = parts.indexOf('db');
          const apiIdx = parts.indexOf('api');
          if (dbIdx >= 0) {
            segments = parts.slice(dbIdx + 1);
          } else if (apiIdx >= 0) {
            segments = parts.slice(apiIdx + 1);
          }
          console.log('[db]', req.method, url.pathname);
          const [action, ...rest] = segments;

          const db = loadDb();

          // ---------- HEALTH ----------
          if (action === 'health') {
            return json(res, 200, { status: 'ok', service: 'db', time: new Date().toISOString() });
          }

          await ensureDefaultAdmin(db);

          // ---------- AUTH ----------
          if (action === 'auth') {
            const sub = rest[0];

            if (sub === 'login' && req.method === 'POST') {
              const { email, password } = await readBody(req);
              const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
              if (!user) return json(res, 401, { error: 'ایمیل یا رمز عبور اشتباه است' });
              const ok = await bcrypt.compare(password || '', user.passwordHash);
              if (!ok) return json(res, 401, { error: 'ایمیل یا رمز عبور اشتباه است' });
              const token = crypto.randomUUID() + '-' + crypto.randomUUID();
              db.sessions = db.sessions || {};
              db.sessions[token] = { email: user.email, expiresAt: Date.now() + SESSION_TTL_MS };
              saveDb(db);
              return json(res, 200, {
                token,
                user: { email: user.email, name: user.name, role: user.role }
              });
            }

            if (sub === 'me' && req.method === 'GET') {
              const s = requireAdmin(req, db);
              if (!s) return json(res, 401, { error: 'unauthorized' });
              const user = db.users.find(u => u.email === s.email);
              return json(res, 200, {
                user: user ? { email: user.email, name: user.name, role: user.role } : null
              });
            }

            if (sub === 'logout' && req.method === 'POST') {
              const token = req.headers['x-admin-token'];
              if (token && db.sessions?.[token]) {
                delete db.sessions[token];
                saveDb(db);
              }
              return json(res, 200, { ok: true });
            }

            if (sub === 'change-password' && req.method === 'POST') {
              const s = requireAdmin(req, db);
              if (!s) return json(res, 401, { error: 'unauthorized' });
              const { currentPassword, newPassword } = await readBody(req);
              if (!newPassword || newPassword.length < 6) return json(res, 400, { error: 'رمز جدید باید حداقل ۶ کاراکتر باشد' });
              const user = db.users.find(u => u.email === s.email);
              if (!user) return json(res, 404, { error: 'کاربر یافت نشد' });
              const ok = await bcrypt.compare(currentPassword || '', user.passwordHash);
              if (!ok) return json(res, 401, { error: 'رمز فعلی اشتباه است' });
              user.passwordHash = await bcrypt.hash(newPassword, 10);
              saveDb(db);
              return json(res, 200, { ok: true });
            }
          }

          // ---------- DATA ----------
          if (action === 'data') {
            const collection = rest[0];
            const id = rest[1];

            if (!COLLECTIONS[collection] && collection !== 'settings') {
              return json(res, 404, { error: 'unknown collection' });
            }

            const isPublicRead = req.method === 'GET' && ['products', 'categories', 'settings', 'coupons'].includes(collection);
            const isOrderCreation = collection === 'orders' && req.method === 'POST';

            if (!isPublicRead && !isOrderCreation) {
              const s = requireAdmin(req, db);
              if (!s) return json(res, 401, { error: 'دسترسی غیرمجاز — لطفاً به عنوان مدیر وارد شوید' });
            }

            // GET
            if (req.method === 'GET') {
              const data = db[collection];
              if (id && Array.isArray(data)) {
                const col = COLLECTIONS[collection];
                const one = data.find(x => String(x[col.idField]) === String(id));
                if (!one) return json(res, 404, { error: 'not found' });
                return json(res, 200, one);
              }
              return json(res, 200, data);
            }

            // Settings is a single object
            if (collection === 'settings') {
              if (req.method === 'PUT' || req.method === 'PATCH') {
                const body = await readBody(req);
                db.settings = { ...db.settings, ...body };
                saveDb(db);
                return json(res, 200, db.settings);
              }
              return json(res, 405, { error: 'method not allowed' });
            }

            const col = COLLECTIONS[collection];

            if (req.method === 'POST') {
              const body = await readBody(req);
              if (col.idField === 'id' && !body.id) {
                const prefix = collection === 'orders' ? 'AS-' : collection === 'products' ? 'p' : '';
                body.id = prefix + Math.floor(100000 + Math.random() * 900000);
              }
              if (col.idField && db[collection].some(x => String(x[col.idField]) === String(body[col.idField]))) {
                return json(res, 409, { error: 'duplicate id' });
              }
              db[collection] = [body, ...db[collection]];
              saveDb(db);
              return json(res, 201, body);
            }

            if (req.method === 'PUT' && id) {
              const body = await readBody(req);
              const idx = db[collection].findIndex(x => String(x[col.idField]) === String(id));
              if (idx === -1) return json(res, 404, { error: 'not found' });
              db[collection][idx] = { ...db[collection][idx], ...body, [col.idField]: id };
              saveDb(db);
              return json(res, 200, db[collection][idx]);
            }

            if (req.method === 'DELETE' && id) {
              const before = db[collection].length;
              db[collection] = db[collection].filter(x => String(x[col.idField]) !== String(id));
              if (db[collection].length === before) return json(res, 404, { error: 'not found' });
              saveDb(db);
              return json(res, 200, { ok: true });
            }

            if (req.method === 'PATCH') {
              const body = await readBody(req);
              if (!Array.isArray(body)) return json(res, 400, { error: 'array required' });
              db[collection] = body;
              saveDb(db);
              return json(res, 200, body);
            }

            return json(res, 405, { error: 'method not allowed' });
          }

          // ---------- EXPORT / IMPORT ----------
          if (action === 'export' && req.method === 'GET') {
            const s = requireAdmin(req, db);
            if (!s) return json(res, 401, { error: 'unauthorized' });
            const dump = {
              products: db.products,
              categories: db.categories,
              coupons: db.coupons,
              orders: db.orders,
              settings: db.settings,
              users: db.users
            };
            res.setHeader('Content-Disposition', 'attachment; filename="abrsorati-db.json"');
            return json(res, 200, dump);
          }

          if (action === 'import' && req.method === 'POST') {
            const s = requireAdmin(req, db);
            if (!s) return json(res, 401, { error: 'unauthorized' });
            const body = await readBody(req);
            for (const key of ['products', 'categories', 'coupons', 'orders', 'settings', 'users']) {
              if (body[key] !== undefined) db[key] = body[key];
            }
            saveDb(db);
            return json(res, 200, { ok: true });
          }

          return json(res, 404, { error: 'unknown action' });

        } catch (err) {
          console.error('[dev-api] error:', err);
          return json(res, 500, { error: err.message || 'internal error' });
        }
      });
    }
  };
}
