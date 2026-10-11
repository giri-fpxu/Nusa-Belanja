/* ─────────────────────────────────────────────────────────────
   admin.js — kerangka panel admin Nusa Belanja
   - Sesi: halaman admin dilindungi; tanpa sesi → login.html
   - Navigasi: modul hanya tampil sesuai hak akses akun
   - Log: tindakan penting dicatat ke nb_access_logs
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const MODULES = {
    'marketing-dashboard': { href: 'marketing.html',       label: 'Marketing',             icon: '📣' },
    'finance-admin':       { href: 'finance.html',         label: 'Keuangan & Verifikasi', icon: '🧾' },
    'price-settings':      { href: 'price-settings.html',  label: 'Pengaturan Harga',      icon: '🏷️' },
    'user-management':     { href: 'user-management.html', label: 'Manajemen Pengguna',    icon: '👥' },
    'access-log':          { href: 'access-log.html',      label: 'Log Akses',             icon: '📜' },
  };

  // Hak sensitif → departemen yang berwenang memegangnya.
  // Akun di luar departemen tersebut dianggap "tidak sesuai jabatan".
  const SENSITIVE = {
    'finance-admin':  ['Finance'],
    'price-settings': ['Finance', 'IT'],
  };

  const LEVEL_DOT = { info: 'blue', ok: 'green', warn: 'amber', danger: 'red' };

  // Catatan awal sesuai linimasa naskah (kemarin), terbaru di atas.
  const SEED_LOGS = [
    { time: '16.00', date: 'Kemarin', user: 'aswin.finance', name: 'Aswin Hartono', dept: 'Finance', action: 'Tanda tangan verifikasi akses', target: 'Daftar Verifikasi Akses Bulan Ini', type: 'finance', level: 'info' },
    { time: '13.00', date: 'Kemarin', user: 'giri.it', name: 'Giri Santoso', dept: 'IT', action: 'Arsipkan peringatan', target: 'Akses tidak sesuai jabatan: helsa.finance', type: 'security', level: 'warn' },
    { time: '09.00', date: 'Kemarin', user: 'callista.hr', name: 'Callista Putri', dept: 'HRD', action: 'Proses mutasi karyawan', target: 'Helsa Maharani: Finance → Marketing (perubahan akses tidak diminta)', type: 'hr', level: 'info' },
  ];

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (e) { return fallback; }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const hasMismatch = acc => (acc.access || []).some(k => SENSITIVE[k] && !SENSITIVE[k].includes(acc.dept));
  const sensitiveKeys = acc => (acc.access || []).filter(k => SENSITIVE[k] && !SENSITIVE[k].includes(acc.dept));
  const actor = u => ({ user: u.username, name: u.name, dept: u.dept });

  function addLog(entry) {
    const now = new Date();
    const logs = read('nb_access_logs', []);
    logs.unshift({
      time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString('id-ID'),
      type: 'system', level: 'info', ...entry,
    });
    write('nb_access_logs', logs.slice(0, 200));
  }

  const accounts = () => read('nb_accounts', []);
  const archived = () => read('nb_archived_alerts', []);

  // Data akun diambil dari daftar terbaru, agar pencabutan hak langsung berlaku
  function currentAccount() {
    const session = read('nb_current_user', null);
    if (!session) return null;
    return accounts().find(a => a.username === session.username) || session;
  }

  function openAlerts() {
    const arch = archived();
    return accounts().filter(a => hasMismatch(a) && !arch.includes(a.username));
  }

  function seed() {
    if (localStorage.getItem('nb_seeded')) return;
    write('nb_access_logs', [...read('nb_access_logs', []), ...SEED_LOGS].slice(0, 200));
    write('nb_archived_alerts', ['helsa.finance']); // peringatan sudah diarsipkan Giri
    localStorage.setItem('nb_seeded', '1');
  }

  function navItem(href, label, icon, current) {
    const active = href === current ? ' active' : '';
    return `<a class="nav-item${active}" href="${href}"><span class="nav-icon">${icon}</span>${esc(label)}</a>`;
  }

  function tickClock() {
    const el = document.getElementById('topbar-time');
    if (el) el.textContent = new Date().toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  }

  function refreshAlertPill() {
    const pill = document.getElementById('topbar-alert');
    if (!pill) return;
    const n = openAlerts().length;
    pill.style.display = n ? '' : 'none';
    document.getElementById('topbar-alert-text').textContent = `${n} peringatan terbuka`;
  }

  function renderShell(user) {
    const shell = document.getElementById('shell');
    if (!shell) return;
    const current = location.pathname.split('/').pop() || 'dashboard.html';
    const allowed = user.access || [];
    const modules = Object.entries(MODULES).filter(([k]) => allowed.includes(k));
    const initials = user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

    shell.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-logo">
          <div class="logo-icon">☕</div>
          <div><div class="brand">Nusa Belanja</div><span class="sub">Sistem Administrasi Internal</span></div>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-label">Umum</div>
          ${navItem('dashboard.html', 'Dasbor', '🏠', current)}
        </div>
        ${modules.length ? `<div class="sidebar-section">
          <div class="sidebar-section-label">Modul</div>
          ${modules.map(([, m]) => navItem(m.href, m.label, m.icon, current)).join('')}
        </div>` : ''}
        <div class="sidebar-footer">
          <div class="user-card">
            <div class="user-avatar">${esc(initials)}</div>
            <div><div class="user-name">${esc(user.name)}</div><div class="user-role">${esc(user.role)} · ${esc(user.dept)}</div></div>
          </div>
          <div class="logout-btn" id="logout-btn">⏻ Keluar</div>
        </div>
      </aside>
      <div class="main-area">
        <header class="topbar">
          <div class="topbar-left">
            <h2>${esc(document.body.dataset.title || 'Dasbor')}</h2>
            <p>${esc(document.body.dataset.sub || '')}</p>
          </div>
          <div class="topbar-right">
            <a class="topbar-alert" id="topbar-alert" href="dashboard.html" style="display:none"><span class="alert-dot"></span><span id="topbar-alert-text"></span></a>
            <span class="topbar-time" id="topbar-time"></span>
          </div>
        </header>
        <main class="page-content" id="page"></main>
      </div>
      <div id="toast-container"></div>`;

    document.getElementById('logout-btn').onclick = () => {
      addLog({ ...actor(user), action: 'Keluar', target: 'Sistem Admin', type: 'auth', level: 'info' });
      localStorage.removeItem('nb_current_user');
      location.href = 'login.html';
    };
    tickClock();
    setInterval(tickClock, 30000);
    refreshAlertPill();
  }

  function renderLogItem(l) {
    return `
      <div class="tl-item">
        <span class="tl-dot ${LEVEL_DOT[l.level] || 'gray'}"></span>
        <div class="tl-time">${esc(l.date)} · ${esc(l.time)} · ${esc(l.name || l.user)}${l.dept ? ' (' + esc(l.dept) + ')' : ''}</div>
        <div class="tl-title">${esc(l.action)}</div>
        <div class="tl-desc">${esc(l.target || '')}</div>
      </div>`;
  }

  function init() {
    seed();
    const user = currentAccount();
    if (!user) { location.replace('login.html'); return; }
    renderShell(user);

    const need = document.body.dataset.access;
    if (need && !(user.access || []).includes(need)) {
      addLog({ ...actor(user), action: 'Akses ditolak', target: document.body.dataset.title || location.pathname, type: 'auth', level: 'warn' });
      document.getElementById('page').innerHTML = `
        <div class="alert-box danger"><span class="alert-icon">⛔</span>
          <div><strong>Akses ditolak</strong>Akun ${esc(user.username)} tidak memiliki hak akses ke halaman ini. Percobaan ini dicatat di Log Akses.</div>
        </div>`;
      return;
    }
    if (typeof window.onAdminReady === 'function') window.onAdminReady(user);
  }

  window.Admin = {
    esc, read, write, actor, addLog, accounts, archived, openAlerts, currentAccount,
    hasMismatch, sensitiveKeys, renderLogItem, refreshAlertPill,
    overrides: () => read('nb_price_overrides', {}),
    setOverrides: o => write('nb_price_overrides', o),
    setAccounts: a => write('nb_accounts', a),
    setArchived: a => write('nb_archived_alerts', a),
    toast: (msg, type) => { if (typeof showToast === 'function') showToast(msg, type || ''); },
  };

  document.addEventListener('DOMContentLoaded', init);
})();
