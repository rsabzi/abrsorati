// Simple JSON-file style database backed by Netlify Blobs.
// One "store" per collection: products, categories, coupons, orders, settings, users.
// Provides GET (list/one), POST (create), PUT (update), DELETE (remove), and PATCH (bulk replace).

import { getStore } from '@netlify/blobs';
import bcrypt from 'bcryptjs';

// Default seed data — used the very first time the site is deployed.
import { PRODUCTS_SEED, CATEGORIES_SEED, COUPONS_SEED, SETTINGS_SEED, ORDERS_SEED } from './_seed.mjs';

const COLLECTIONS = {
  products:   { key: 'products.json',   seed: PRODUCTS_SEED,   idField: 'id' },
  categories: { key: 'categories.json', seed: CATEGORIES_SEED, idField: 'id' },
  coupons:    { key: 'coupons.json',    seed: COUPONS_SEED,    idField: 'code' },
  orders:     { key: 'orders.json',     seed: ORDERS_SEED,     idField: 'id' },
  settings:   { key: 'settings.json',   seed: SETTINGS_SEED,   idField: null },  // single object
  users:      { key: 'users.json',      seed: [],              idField: 'email' }
};

// Simple token store (in-memory to Netlify Blobs). Sessions expire after 12 hours.
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function getBlobStore() {
  return getStore({ name: 'abrsorati-db', consistency: 'strong' });
}

async function readCollection(name) {
  const col = COLLECTIONS[name];
  if (!col) throw new Error('Unknown collection: ' + name);
  const store = getBlobStore();
  const existing = await store.get(col.key, { type: 'json' });
  if (existing !== null && existing !== undefined) return existing;
  // First time: write the seed data so subsequent reads are instant.
  await store.setJSON(col.key, col.seed);
  return col.seed;
}

async function writeCollection(name, data) {
  const col = COLLECTIONS[name];
  if (!col) throw new Error('Unknown collection: ' + name);
  const store = getBlobStore();
  await store.setJSON(col.key, data);
  return data;
}

// -------------------- AUTH HELPERS --------------------
async function ensureDefaultAdmin() {
  const store = getBlobStore();
  const users = await store.get('users.json', { type: 'json' });
  if (users && users.length > 0) return;
  const hash = await bcrypt.hash('Admin@2024', 10);
  await store.setJSON('users.json', [{
    email: 'admin@abrsorati.ir',
    passwordHash: hash,
    role: 'admin',
    name: 'مدیر فروشگاه',
    createdAt: new Date().toISOString()
  }]);
}

async function createSession(email) {
  const token = crypto.randomUUID() + '-' + crypto.randomUUID();
  const store = getBlobStore();
  await store.setJSON(`session:${token}`, {
    email,
    expiresAt: Date.now() + SESSION_TTL_MS
  });
  return token;
}

async function readSession(token) {
  if (!token) return null;
  const store = getBlobStore();
  const session = await store.get(`session:${token}`, { type: 'json' });
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    await store.delete(`session:${token}`);
    return null;
  }
  return session;
}

async function requireAdmin(req) {
  const token = req.headers.get('x-admin-token');
  const session = await readSession(token);
  if (!session) return null;
  return session;
}

// -------------------- HTTP HANDLER --------------------
export default async (req, context) => {
  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);
  // Route shape: /.netlify/functions/db/{action}/{...}
  const idxDb = parts.indexOf('db');
  const segments = idxDb >= 0 ? parts.slice(idxDb + 1) : parts;
  const [action, ...rest] = segments;

  const cors = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Admin-Token'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  try {
    await ensureDefaultAdmin();

    // ---------- AUTH ROUTES ----------
    if (action === 'auth') {
      const sub = rest[0];

      if (sub === 'login' && req.method === 'POST') {
        const { email, password } = await req.json();
        const users = await readCollection('users');
        const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
        if (!user) {
          return new Response(JSON.stringify({ error: 'ایمیل یا رمز عبور اشتباه است' }), { status: 401, headers: cors });
        }
        const ok = await bcrypt.compare(password || '', user.passwordHash);
        if (!ok) {
          return new Response(JSON.stringify({ error: 'ایمیل یا رمز عبور اشتباه است' }), { status: 401, headers: cors });
        }
        const token = await createSession(user.email);
        return new Response(JSON.stringify({
          token,
          user: { email: user.email, name: user.name, role: user.role }
        }), { headers: cors });
      }

      if (sub === 'me' && req.method === 'GET') {
        const session = await requireAdmin(req);
        if (!session) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: cors });
        const users = await readCollection('users');
        const user = users.find(u => u.email === session.email);
        return new Response(JSON.stringify({
          user: user ? { email: user.email, name: user.name, role: user.role } : null
        }), { headers: cors });
      }

      if (sub === 'logout' && req.method === 'POST') {
        const token = req.headers.get('x-admin-token');
        if (token) {
          const store = getBlobStore();
          await store.delete(`session:${token}`);
        }
        return new Response(JSON.stringify({ ok: true }), { headers: cors });
      }

      if (sub === 'change-password' && req.method === 'POST') {
        const session = await requireAdmin(req);
        if (!session) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: cors });
        const { currentPassword, newPassword } = await req.json();
        if (!newPassword || newPassword.length < 6) {
          return new Response(JSON.stringify({ error: 'رمز جدید باید حداقل ۶ کاراکتر باشد' }), { status: 400, headers: cors });
        }
        const users = await readCollection('users');
        const user = users.find(u => u.email === session.email);
        if (!user) return new Response(JSON.stringify({ error: 'کاربر یافت نشد' }), { status: 404, headers: cors });
        const ok = await bcrypt.compare(currentPassword || '', user.passwordHash);
        if (!ok) return new Response(JSON.stringify({ error: 'رمز فعلی اشتباه است' }), { status: 401, headers: cors });
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        await writeCollection('users', users);
        return new Response(JSON.stringify({ ok: true }), { headers: cors });
      }
    }

    // ---------- DATA ROUTES ----------
    // Public GETs: products, categories, settings (read-only).
    // Everything else (POST/PUT/DELETE, orders read) requires admin token.
    if (action === 'data') {
      const collection = rest[0];
      const id = rest[1];

      if (!COLLECTIONS[collection]) {
        return new Response(JSON.stringify({ error: 'unknown collection' }), { status: 404, headers: cors });
      }

      const col = COLLECTIONS[collection];
      const isPublicRead = req.method === 'GET' && ['products', 'categories', 'settings', 'coupons'].includes(collection);

      if (!isPublicRead) {
        // "orders POST" (order placement) is public — anyone can place an order.
        const isOrderCreation = collection === 'orders' && req.method === 'POST';
        if (!isOrderCreation) {
          const session = await requireAdmin(req);
          if (!session) {
            return new Response(JSON.stringify({ error: 'دسترسی غیرمجاز — لطفاً به عنوان مدیر وارد شوید' }), { status: 401, headers: cors });
          }
        }
      }

      // GET all or one
      if (req.method === 'GET') {
        const data = await readCollection(collection);
        if (id && Array.isArray(data)) {
          const one = data.find(x => String(x[col.idField]) === String(id));
          if (!one) return new Response(JSON.stringify({ error: 'not found' }), { status: 404, headers: cors });
          return new Response(JSON.stringify(one), { headers: cors });
        }
        return new Response(JSON.stringify(data), { headers: cors });
      }

      // Settings is a single object → only PUT/PATCH works
      if (collection === 'settings') {
        if (req.method === 'PUT' || req.method === 'PATCH') {
          const body = await req.json();
          const current = await readCollection('settings');
          const merged = { ...current, ...body };
          await writeCollection('settings', merged);
          return new Response(JSON.stringify(merged), { headers: cors });
        }
        return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers: cors });
      }

      // Array collections: POST / PUT / DELETE
      const data = await readCollection(collection);

      if (req.method === 'POST') {
        const body = await req.json();
        // Auto-generate id if not provided
        if (col.idField === 'id' && !body.id) {
          const prefix = collection === 'orders' ? 'AS-' : collection === 'products' ? 'p' : '';
          body.id = prefix + Math.floor(100000 + Math.random() * 900000);
        }
        // Prevent duplicate id
        if (col.idField && data.some(x => String(x[col.idField]) === String(body[col.idField]))) {
          return new Response(JSON.stringify({ error: 'duplicate id' }), { status: 409, headers: cors });
        }
        const next = [body, ...data];
        await writeCollection(collection, next);
        return new Response(JSON.stringify(body), { status: 201, headers: cors });
      }

      if (req.method === 'PUT' && id) {
        const body = await req.json();
        const idx = data.findIndex(x => String(x[col.idField]) === String(id));
        if (idx === -1) return new Response(JSON.stringify({ error: 'not found' }), { status: 404, headers: cors });
        const updated = { ...data[idx], ...body, [col.idField]: id };
        data[idx] = updated;
        await writeCollection(collection, data);
        return new Response(JSON.stringify(updated), { headers: cors });
      }

      if (req.method === 'DELETE' && id) {
        const next = data.filter(x => String(x[col.idField]) !== String(id));
        if (next.length === data.length) return new Response(JSON.stringify({ error: 'not found' }), { status: 404, headers: cors });
        await writeCollection(collection, next);
        return new Response(JSON.stringify({ ok: true }), { headers: cors });
      }

      // PATCH = bulk replace whole collection (used for import/export)
      if (req.method === 'PATCH') {
        const body = await req.json();
        if (!Array.isArray(body)) return new Response(JSON.stringify({ error: 'array required' }), { status: 400, headers: cors });
        await writeCollection(collection, body);
        return new Response(JSON.stringify(body), { headers: cors });
      }

      return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers: cors });
    }

    // ---------- EXPORT / IMPORT ----------
    if (action === 'export' && req.method === 'GET') {
      const session = await requireAdmin(req);
      if (!session) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: cors });
      const dump = {};
      for (const key of Object.keys(COLLECTIONS)) {
        dump[key] = await readCollection(key);
      }
      return new Response(JSON.stringify(dump, null, 2), {
        headers: { ...cors, 'Content-Disposition': 'attachment; filename="abrsorati-db.json"' }
      });
    }

    if (action === 'import' && req.method === 'POST') {
      const session = await requireAdmin(req);
      if (!session) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: cors });
      const body = await req.json();
      for (const key of Object.keys(COLLECTIONS)) {
        if (body[key]) await writeCollection(key, body[key]);
      }
      return new Response(JSON.stringify({ ok: true }), { headers: cors });
    }

    return new Response(JSON.stringify({ error: 'unknown action' }), { status: 404, headers: cors });

  } catch (err) {
    console.error('DB function error:', err);
    return new Response(JSON.stringify({ error: err.message || 'internal error' }), { status: 500, headers: cors });
  }
};

export const config = {
  path: '/api/*'
};
