// ─── Product Data ─────────────────────────────────────────────
const PRODUCTS = [
  // Biji Kopi Single Origin
  {
    id: 1, cat: "biji-kopi", name: "Gayo Arabika Premium",
    desc: "Single origin Aceh Tengah. Profil rasa: cokelat hitam, karamel, dan sedikit buah beri.",
    price: 89000, unit: "per 200 g", emoji: "☕", badge: "single origin",
    tags: ["arabika", "aceh", "washed"]
  },
  {
    id: 2, cat: "biji-kopi", name: "Toraja Kalosi",
    desc: "Biji kopi Sulawesi Selatan dengan body tebal dan rasa earthy yang khas.",
    price: 95000, unit: "per 200 g", emoji: "🫘", badge: "best seller",
    tags: ["arabika", "sulawesi", "wet-hulled"]
  },
  {
    id: 3, cat: "biji-kopi", name: "Flores Bajawa Natural",
    desc: "Proses natural menghasilkan rasa buah-buahan tropis yang kuat. Sesuai espresso.",
    price: 99000, unit: "per 200 g", emoji: "🌺", badge: "natural",
    tags: ["arabika", "flores", "natural"]
  },
  {
    id: 4, cat: "biji-kopi", name: "Java Preanger",
    desc: "Kopi Jawa bersejarah. Rasa rempah dan cokelat susu, body sedang.",
    price: 79000, unit: "per 200 g", emoji: "🫙", badge: null,
    tags: ["arabika", "jawa", "washed"]
  },
  {
    id: 5, cat: "biji-kopi", name: "Bali Kintamani Honey",
    desc: "Proses honey dari Kintamani. Rasa jeruk manis, sedikit floral, dan bersih di akhir.",
    price: 105000, unit: "per 200 g", emoji: "🍯", badge: "new",
    tags: ["arabika", "bali", "honey"]
  },
  {
    id: 6, cat: "biji-kopi", name: "Robusta Lampung Grade 1",
    desc: "Robusta terbaik Lampung. Cocok untuk espresso kuat dan kopi susu.",
    price: 55000, unit: "per 200 g", emoji: "💪", badge: null,
    tags: ["robusta", "lampung"]
  },
  {
    id: 7, cat: "biji-kopi", name: "Timor Lolok Washed",
    desc: "Dari dataran tinggi Timor. Rasa bersih, asam cerah, dan sedikit kacang.",
    price: 88000, unit: "per 200 g", emoji: "🌿", badge: "limited",
    tags: ["arabika", "timor", "washed"]
  },
  {
    id: 8, cat: "biji-kopi", name: "Wamena Lembah Baliem",
    desc: "Kopi dataran tinggi Papua. Organik, tanpa pestisida. Rasa buah cerah dan manis.",
    price: 130000, unit: "per 200 g", emoji: "🏔️", badge: "organic",
    tags: ["arabika", "papua", "natural"]
  },

  // Paket Kopi
  {
    id: 9, cat: "paket-kopi", name: "Paket Kopi Premium",
    desc: "3 jenis biji pilihan (Gayo, Toraja, Flores). Total 600 g siap seduh.",
    price: 245000, unit: "per paket", emoji: "🎁", badge: "best value",
    tags: ["paket", "arabika", "promo"]
  },
  {
    id: 10, cat: "paket-kopi", name: "Paket Starter Nusantara",
    desc: "Untuk pemula: 3 × 100 g Gayo, Kintamani, Java + panduan seduh PDF.",
    price: 159000, unit: "per paket", emoji: "📦", badge: "starter",
    tags: ["paket", "pemula"]
  },
  {
    id: 11, cat: "paket-kopi", name: "Paket Kopi Susu Lovers",
    desc: "Blend khusus: Robusta Lampung + Arabika Toraja. Cocok dicampur susu.",
    price: 139000, unit: "per paket", emoji: "🥛", badge: null,
    tags: ["paket", "robusta", "blend"]
  },
  {
    id: 12, cat: "paket-kopi", name: "Langganan Bulanan Espresso",
    desc: "4 × 200 g biji ganti setiap bulan. Hemat 15% dibanding beli satuan.",
    price: 299000, unit: "per bulan", emoji: "📅", badge: "langganan",
    tags: ["paket", "langganan", "espresso"]
  },
  {
    id: 13, cat: "paket-kopi", name: "Paket Gift Box Eksklusif",
    desc: "2 biji single origin + 1 peralatan seduh pilihan. Kemasan eksklusif siap kado.",
    price: 385000, unit: "per kotak", emoji: "🎀", badge: "gift",
    tags: ["paket", "hadiah", "eksklusif"]
  },

  // Alat Seduh
  {
    id: 14, cat: "alat-seduh", name: "V60 Pour Over Set",
    desc: "Dripper Hario V60 + 40 lembar filter + timbangan mini. Starter pour-over lengkap.",
    price: 185000, unit: "per set", emoji: "☕", badge: null,
    tags: ["alat", "pour-over", "hario"]
  },
  {
    id: 15, cat: "alat-seduh", name: "French Press 350 ml",
    desc: "Borosilikat tebal, bingkai stainless. Mudah dibersihkan, tahan lama.",
    price: 125000, unit: "per unit", emoji: "🫖", badge: "populer",
    tags: ["alat", "french-press", "stainless"]
  },
  {
    id: 16, cat: "alat-seduh", name: "AeroPress Original",
    desc: "Alat serbaguna untuk espresso style, americano, hingga cold brew pekat.",
    price: 420000, unit: "per unit", emoji: "💉", badge: "pro",
    tags: ["alat", "aeropress", "espresso"]
  },
  {
    id: 17, cat: "alat-seduh", name: "Moka Pot 3 Cup",
    desc: "Aluminium food-grade. Hasilkan espresso kuat di atas kompor apa saja.",
    price: 145000, unit: "per unit", emoji: "🍳", badge: null,
    tags: ["alat", "moka-pot", "stovetop"]
  },
  {
    id: 18, cat: "alat-seduh", name: "Cold Brew Jar 1 Liter",
    desc: "Toples kaca dengan filter stainless bawaan. Seduh semalam, nikmati seminggu.",
    price: 195000, unit: "per unit", emoji: "🧊", badge: "new",
    tags: ["alat", "cold-brew", "kaca"]
  },
  {
    id: 19, cat: "alat-seduh", name: "Hand Grinder Ceramic",
    desc: "Burr keramik 38 mm. 15 pengaturan gilingan dari fines espresso hingga kasar cold brew.",
    price: 265000, unit: "per unit", emoji: "⚙️", badge: null,
    tags: ["alat", "grinder", "keramik"]
  },
  {
    id: 20, cat: "alat-seduh", name: "Gooseneck Kettle 600 ml",
    desc: "Leher angsa untuk kontrol tuang tepat. Stainless 304, kompatibel induksi.",
    price: 235000, unit: "per unit", emoji: "🫗", badge: null,
    tags: ["alat", "kettle", "pour-over"]
  }
];

// Harga normal disimpan sebagai `base`. Override dari Pengaturan Harga (panel admin)
// diterapkan di sini, sehingga katalog publik ikut berubah.
PRODUCTS.forEach(p => { p.base = p.price; });
(function applyPriceOverrides() {
  let ov = {};
  try { ov = JSON.parse(localStorage.getItem('nb_price_overrides') || '{}') || {}; } catch (e) {}
  PRODUCTS.forEach(p => { if (ov[p.id] != null) p.price = ov[p.id]; });
})();

// ─── Cart State ────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('nb_cart') || '[]');

function saveCart() {
  localStorage.setItem('nb_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const existing = cart.find(x => x.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 });
  }
  saveCart();
  renderCartBadge();
  renderCartDrawer();
  showToast(`${p.emoji} ${p.name} ditambahkan ke keranjang`, 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(x => x.id !== productId);
  saveCart();
  renderCartBadge();
  renderCartDrawer();
}

function changeQty(productId, delta) {
  const item = cart.find(x => x.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else { saveCart(); renderCartBadge(); renderCartDrawer(); }
}

// ─── Render helpers ────────────────────────────────────────────
function fmt(n) {
  return 'Rp' + n.toLocaleString('id-ID');
}

function renderCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const cnt = getCartCount();
  badge.textContent = cnt;
  badge.classList.toggle('show', cnt > 0);
}

function renderCartDrawer() {
  const body = document.getElementById('drawer-body');
  const total = document.getElementById('cart-total-val');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = '<div class="drawer-empty">🛒<br>Keranjang kamu kosong.</div>';
  } else {
    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${fmt(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Hapus">🗑</button>
          </div>
        </div>
        <div style="font-weight:700;font-size:.9rem;color:var(--brown-900);white-space:nowrap">${fmt(item.price * item.qty)}</div>
      </div>
    `).join('');
  }
  if (total) total.textContent = fmt(getCartTotal());
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('drawer-overlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('drawer-overlay')?.classList.remove('open');
}

// ─── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── Product rendering ─────────────────────────────────────────
function renderProducts(list, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (list.length === 0) {
    el.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px 0">Tidak ada produk ditemukan.</p>';
    return;
  }
  el.innerHTML = list.map(p => {
    const badgeHtml = p.badge
      ? `<span class="product-badge">${p.badge}</span>` : '';
    return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">
        <span style="font-size:3.5rem">${p.emoji}</span>
        ${badgeHtml}
      </div>
      <div class="product-body">
        <span class="product-cat">${catLabel(p.cat)}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
      </div>
      <div class="product-footer">
        <div class="product-price">
          <span>${fmt(p.price)}</span>
          <span style="font-size:.7rem;color:var(--text-muted);font-weight:400"> / ${p.unit}</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">+ Keranjang</button>
      </div>
    </div>`;
  }).join('');
}

function catLabel(cat) {
  return { 'biji-kopi': 'Biji Kopi', 'paket-kopi': 'Paket Kopi', 'alat-seduh': 'Alat Seduh' }[cat] || cat;
}

// ─── Init on DOM ready ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCartBadge();
  renderCartDrawer();
});
