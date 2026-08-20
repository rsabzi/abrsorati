// Small fetch wrapper for the /api backend (Netlify Functions in prod,
// Vite plugin in dev — same endpoints either way).

const TOKEN_KEY = 'abr_soorati_admin_token';

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
};
export const setToken = (t) => {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
};

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const t = getToken();
    if (t) headers['X-Admin-Token'] = t;
  }
  const res = await fetch('/api' + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : await res.text();
  if (!res.ok) {
    const err = new Error((data && data.error) || res.statusText);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

// --------- AUTH ---------
export const auth = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  me:    ()      => request('/auth/me', { auth: true }),
  logout: ()     => request('/auth/logout', { method: 'POST', auth: true }),
  changePassword: (currentPassword, newPassword) =>
    request('/auth/change-password', { method: 'POST', auth: true, body: { currentPassword, newPassword } })
};

// --------- DATA (generic CRUD) ---------
export const db = {
  list:   (col)          => request(`/data/${col}`),
  get:    (col, id)      => request(`/data/${col}/${id}`),
  create: (col, obj)     => request(`/data/${col}`, { method: 'POST', body: obj, auth: true }),
  createPublic: (col, obj) => request(`/data/${col}`, { method: 'POST', body: obj }), // for order placement
  update: (col, id, obj) => request(`/data/${col}/${id}`, { method: 'PUT', body: obj, auth: true }),
  remove: (col, id)      => request(`/data/${col}/${id}`, { method: 'DELETE', auth: true }),
  replaceAll: (col, arr) => request(`/data/${col}`, { method: 'PATCH', body: arr, auth: true }),

  // Settings is a single object
  getSettings: ()        => request('/data/settings'),
  updateSettings: (obj)  => request('/data/settings', { method: 'PUT', body: obj, auth: true })
};

// --------- IMPORT / EXPORT ---------
export const backup = {
  exportUrl: () => {
    const t = getToken();
    // Hint the browser to download by opening it — we still need the header,
    // so we do a fetch and create a blob URL.
    return fetch('/api/export', { headers: { 'X-Admin-Token': t || '' } })
      .then(async r => {
        if (!r.ok) throw new Error('export failed');
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `abrsorati-db-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      });
  },
  import: (data) => request('/import', { method: 'POST', body: data, auth: true })
};
