/**
 * Grasha Pharma (GrashaPhama) Mobile App Controller
 * Featuring:
 * - User Login & Registration (Customer vs Admin Pharmacist)
 * - Grasha Admin Portal for Real-time Sales Monitoring & Inventory Management
 * - Add / Remove Inventory with Image Upload (File Reader / CDN / Presets) & Stock Steppers
 * - Real MYDAWA Product Images, KSH Currency, Lipa Na M-Pesa, Card & COD, and WhatsApp Chatbot
 */

// --- Audio Feedback Synthesizer ---
class SoundEffects {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  playTap() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.frequency.setValueAtTime(523.25, now);
      osc2.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.25);
    } catch (e) {}
  }
}

const sounds = new SoundEffects();

// --- SVG Icons ---
const ICONS = {
  home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  rx: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  cart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  tracking: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  pill: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
  whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  admin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  stock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  sales: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  plus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
  trash: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
  camera: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  upload: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  cold: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  send: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`
};

class GrashaApp {
  constructor() {
    this.contentEl = document.getElementById('appContent');
    this.sheetOverlay = document.getElementById('bottomSheetOverlay');
    this.sheetBody = document.getElementById('sheetBody');
    this.uploadedImageBase64 = null;
    this.init();
  }

  init() {
    window.store.subscribe(state => this.render(state));

    setInterval(() => {
      const clock = document.getElementById('statusClock');
      if (clock) {
        const d = new Date();
        clock.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }, 1000);

    this.render(window.store.state);
  }

  render(state) {
    this.updateHeaderBadges(state);
    this.updateBottomNav(state.activeView, state);
    this.updateRoleIndicators(state);

    switch (state.activeView) {
      case 'home':
        this.renderHomeView(state);
        break;
      case 'cart':
        this.renderCartView(state);
        break;
      case 'rx':
        this.renderPrescriptionView(state);
        break;
      case 'tracking':
        this.renderTrackingView(state);
        break;
      case 'reminders':
        this.renderRemindersView(state);
        break;
      case 'whatsapp':
        this.renderWhatsAppView(state);
        break;
      case 'profile':
        this.renderProfileView(state);
        break;
      case 'admin':
        this.renderAdminView(state);
        break;
      case 'auth':
        this.renderAuthView(state);
        break;
      default:
        this.renderHomeView(state);
    }
  }

  updateRoleIndicators(state) {
    const user = state.currentUser;
    const desktopPill = document.getElementById('desktopUserPill');
    const headerAvatar = document.getElementById('headerUserAvatar');
    const adminShortcut = document.getElementById('headerAdminShortcut');

    if (user && user.role === 'admin') {
      if (desktopPill) {
        desktopPill.textContent = '🛡️ Admin: ' + user.name.split(' ')[1];
        desktopPill.style.background = 'rgba(245, 158, 11, 0.25)';
        desktopPill.style.color = '#f59e0b';
        desktopPill.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      }
      if (headerAvatar) headerAvatar.textContent = '🛡️';
      if (adminShortcut) adminShortcut.style.display = 'flex';
    } else {
      if (desktopPill) {
        desktopPill.textContent = user ? '👩 Patient: ' + user.name.split(' ')[0] : '🔑 Guest';
        desktopPill.style.background = 'rgba(16, 185, 129, 0.25)';
        desktopPill.style.color = '#34d399';
        desktopPill.style.borderColor = 'rgba(52, 211, 153, 0.3)';
      }
      if (headerAvatar) headerAvatar.textContent = user ? user.avatar || '👩' : '👤';
      if (adminShortcut) adminShortcut.style.display = 'none';
    }
  }

  updateHeaderBadges(state) {
    const totals = window.store.getCartTotals();
    const cartBadge = document.getElementById('headerCartBadge');
    if (cartBadge) {
      if (totals.totalItemsCount > 0) {
        cartBadge.style.display = 'flex';
        cartBadge.textContent = totals.totalItemsCount;
      } else {
        cartBadge.style.display = 'none';
      }
    }
  }

  updateBottomNav(activeView, state) {
    const bottomNav = document.querySelector('.bottom-nav');
    if (!bottomNav) return;

    const isAdmin = state.currentUser && state.currentUser.role === 'admin';

    if (isAdmin) {
      // Dynamic Admin Navigation
      bottomNav.innerHTML = `
        <button class="nav-item ${activeView === 'home' ? 'active' : ''}" data-view="home" onclick="app.navigateTo('home')">
          <div class="nav-icon">${ICONS.home}</div>
          <span class="nav-label">Store</span>
        </button>
        <button class="nav-item ${activeView === 'admin' && state.adminActiveTab === 'sales' ? 'active' : ''}" data-view="admin" onclick="app.openAdminTab('sales')">
          <div class="nav-icon">${ICONS.sales}</div>
          <span class="nav-label">Sales</span>
        </button>
        <button class="nav-item ${activeView === 'admin' && state.adminActiveTab === 'stock' ? 'active' : ''}" data-view="admin" onclick="app.openAdminTab('stock')">
          <div class="nav-icon">${ICONS.stock}</div>
          <span class="nav-label">Stock</span>
        </button>
        <button class="nav-item ${activeView === 'admin' && state.adminActiveTab === 'add' ? 'active' : ''}" data-view="admin" onclick="app.openAdminTab('add')">
          <div class="nav-icon">${ICONS.plus}</div>
          <span class="nav-label">+ Add Med</span>
        </button>
        <button class="nav-item ${activeView === 'profile' ? 'active' : ''}" data-view="profile" onclick="app.navigateTo('profile')">
          <div class="nav-icon">${ICONS.shield}</div>
          <span class="nav-label">Profile</span>
        </button>
      `;
    } else {
      // Standard Customer Navigation
      const totals = window.store.getCartTotals();
      bottomNav.innerHTML = `
        <button class="nav-item ${activeView === 'home' ? 'active' : ''}" data-view="home" onclick="app.navigateTo('home')">
          <div class="nav-icon">${ICONS.home}</div>
          <span class="nav-label">Store</span>
        </button>
        <button class="nav-item ${activeView === 'rx' ? 'active' : ''}" data-view="rx" onclick="app.navigateTo('rx')">
          <div class="nav-icon">${ICONS.rx}</div>
          <span class="nav-label">Prescriptions</span>
        </button>
        <button class="nav-item ${activeView === 'cart' ? 'active' : ''}" data-view="cart" onclick="app.navigateTo('cart')">
          <div class="nav-icon" style="position:relative;">
            ${ICONS.cart}
            <span class="nav-badge" id="navCartBadge" style="${totals.totalItemsCount > 0 ? 'display:flex;' : 'display:none;'}">${totals.totalItemsCount}</span>
          </div>
          <span class="nav-label">Cart</span>
        </button>
        <button class="nav-item ${activeView === 'tracking' ? 'active' : ''}" data-view="tracking" onclick="app.navigateTo('tracking')">
          <div class="nav-icon">${ICONS.tracking}</div>
          <span class="nav-label">Track</span>
        </button>
        <button class="nav-item ${activeView === 'whatsapp' ? 'active' : ''}" data-view="whatsapp" onclick="app.navigateTo('whatsapp')">
          <div class="nav-icon" style="color:#25d366;">${ICONS.whatsapp}</div>
          <span class="nav-label">WhatsApp</span>
        </button>
        <button class="nav-item ${activeView === 'profile' ? 'active' : ''}" data-view="profile" onclick="app.navigateTo('profile')">
          <div class="nav-icon">${ICONS.shield}</div>
          <span class="nav-label">About</span>
        </button>
      `;
    }
  }

  // ================================================================
  // VIEW: HOME SCREEN (DYNAMIC MEDICINES FROM STORE & ADMIN AWARE)
  // ================================================================
  renderHomeView(state) {
    const allMeds = window.store.getMedicines();
    const interactions = window.store.detectInteractions();
    const isAdmin = state.currentUser && state.currentUser.role === 'admin';

    const filteredMeds = allMeds.filter(m => {
      const matchCat = state.selectedCategory === 'all' || m.category === state.selectedCategory;
      const matchQuery = !state.searchQuery || 
        m.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        m.genericName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        (m.uses && m.uses.some(u => u.toLowerCase().includes(state.searchQuery.toLowerCase())));
      return matchCat && matchQuery;
    });

    let html = `
      <!-- Admin Mode Banner (if logged in as admin) -->
      ${isAdmin ? `
        <div style="background:linear-gradient(135deg, #1e293b, #0f172a); border:1px solid #f59e0b; border-radius:var(--radius-md); padding:10px 14px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; color:#fff;">
          <div>
            <div style="font-size:12px; font-weight:800; color:#fbbf24;">🛡️ Admin Pharmacist Session Active</div>
            <div style="font-size:10.5px; color:#94a3b8;">${allMeds.length} Products • Monitoring Nairobi & Countrywide Stock</div>
          </div>
          <button onclick="app.navigateTo('admin')" style="background:#f59e0b; color:#0f172a; border:none; padding:5px 12px; border-radius:14px; font-size:11px; font-weight:800; cursor:pointer;">
            Admin Portal →
          </button>
        </div>
      ` : ''}

      <!-- Glossy Blue Prescription Hero -->
      <div class="glossy-hero-card">
        <div class="hero-pill-badge">
          ${ICONS.shield} <span>PPB Kenya Regulated • Est. 2013</span>
        </div>
        <h2 class="hero-title">Order with Doctor's Prescription</h2>
        <p class="hero-sub">Upload Rx photo. Pharmacists review in 5 mins. Lipa Na M-Pesa, Card, or Cash on Delivery.</p>
        <div class="hero-actions">
          <button class="btn-hero-primary" onclick="app.openPrescriptionUploadModal()">
            ${ICONS.upload} Upload Rx
          </button>
          <button class="btn-hero-secondary" onclick="app.navigateTo('whatsapp')">
            <span>💬 WhatsApp Care</span>
          </button>
        </div>
      </div>

      <!-- Trust Bar (CAP 499 & Nairobi Fleet / G4S & Fargo Courier) -->
      <div class="company-trust-bar" onclick="app.navigateTo('profile')">
        <div class="trust-badge-col">
          <div class="trust-icon-box">🇰🇪</div>
          <div>
            <div class="trust-title">Grasha Pharma (CAP. 499, Sec 14(2))</div>
            <div class="trust-subtitle">Own Nairobi Fleet (2-4h) • G4S & Fargo 24h Countrywide</div>
          </div>
        </div>
        <span style="font-size: 11px; font-weight: 700; color: var(--primary);">About →</span>
      </div>

      <!-- Clinical Drug Interaction Alert -->
      ${interactions.length > 0 ? `
        <div style="background:#fef2f2; border:1.5px solid #ef4444; border-radius:var(--radius-md); padding:12px; margin-bottom:16px;">
          <div style="color:#991b1b; font-weight:800; font-size:12.5px; display:flex; align-items:center; gap:6px;">
            ⚠️ Clinical Warning: Drug Interaction in Cart (${interactions.length})
          </div>
          ${interactions.map(it => `
            <div style="font-size:11.5px; color:#7f1d1d; margin-top:4px;">
              <strong>${it.drugNames}</strong>: ${it.message}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Search Bar -->
      <div class="search-box-wrapper">
        ${ICONS.search}
        <input 
          type="text" 
          placeholder="Search Panadol, Augmentin, Insulin, Malaria, or symptom..." 
          value="${state.searchQuery}"
          oninput="app.handleSearchInput(this.value)"
        />
        ${state.searchQuery ? `
          <button onclick="app.clearSearch()" style="background:none; border:none; color:#94a3b8; cursor:pointer;">✕</button>
        ` : ''}
      </div>

      <!-- Categories Scroller -->
      <div class="categories-container">
        ${MEDICINE_CATEGORIES.map(cat => `
          <button 
            class="category-pill ${state.selectedCategory === cat.id ? 'active' : ''}" 
            onclick="app.handleCategorySelect('${cat.id}')"
          >
            <span>${cat.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Medicine Product Grid Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-size:15px; font-weight:800; color:var(--text-main);">
          ${state.selectedCategory === 'all' ? 'Available Medications' : MEDICINE_CATEGORIES.find(c => c.id === state.selectedCategory)?.name}
          <span style="font-size:12px; font-weight:normal; color:#64748b;">(${filteredMeds.length})</span>
        </span>
        ${isAdmin ? `
          <button onclick="app.openAdminTab('add')" style="font-size:11.5px; color:var(--primary); background:none; border:none; cursor:pointer; font-weight:800;">
            + Add New Med
          </button>
        ` : `
          <button onclick="app.navigateTo('whatsapp')" style="font-size:11.5px; color:#075e54; background:none; border:none; cursor:pointer; font-weight:800;">
            📲 WhatsApp Bot
          </button>
        `}
      </div>

      <!-- Medicine Grid -->
      <div class="medicine-grid">
        ${filteredMeds.map(med => this.renderMedicineCard(med, state)).join('')}
      </div>

      <!-- Floating WhatsApp Quick-Consult Button -->
      <div class="floating-whatsapp-btn" onclick="app.navigateTo('whatsapp')" title="Chat on WhatsApp">
        ${ICONS.whatsapp}
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  renderMedicineCard(med, state) {
    const inCart = state.cart.find(i => i.medicineId === med.id);
    const cartQty = inCart ? inCart.quantity : 0;
    const isOutOfStock = med.stockCount !== undefined && med.stockCount <= 0;

    return `
      <div class="med-card" onclick="app.openMedicineDetail('${med.id}')">
        <div>
          <div class="med-badge-row">
            <span class="rx-badge ${med.isRx ? 'rx-req' : 'otc-badge'}">
              ${med.isRx ? 'Rx Required' : 'OTC'}
            </span>
            ${med.temperatureControlled ? `<span class="cold-tag">${ICONS.cold} 2-8°C</span>` : ''}
          </div>

          <!-- Product Image -->
          <div class="med-image-box">
            ${med.discount ? `<span class="discount-pill">${med.discount}% OFF</span>` : ''}
            ${isOutOfStock ? `<span style="position:absolute; top:8px; left:8px; background:#ef4444; color:#fff; font-size:9.5px; font-weight:800; padding:2px 6px; border-radius:4px;">OUT OF STOCK</span>` : ''}
            <img 
              src="${med.image}" 
              alt="${med.name}" 
              class="med-img-photo"
              loading="lazy"
              onerror="this.onerror=null; this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';"
            />
          </div>

          <h3 class="med-name">${med.name}</h3>
          <p class="med-generic">${med.genericName}</p>
          <p class="med-pack">${med.packSize || med.dosageForm}</p>

          ${med.genericAlternative ? `
            <div class="generic-alert-pill" onclick="event.stopPropagation(); app.swapWithGeneric('${med.id}')">
              💡 ${med.genericAlternative.savings} Generic
            </div>
          ` : ''}
        </div>

        <div>
          <div class="med-price-row">
            <span class="med-price">KSh ${med.price.toLocaleString()}</span>
            ${med.originalPrice ? `<span class="med-orig-price">KSh ${med.originalPrice.toLocaleString()}</span>` : ''}
          </div>

          ${isOutOfStock ? `
            <button class="btn-add-cart" disabled style="background:#cbd5e1; color:#64748b; cursor:not-allowed;">
              Restocking Soon
            </button>
          ` : (cartQty === 0 ? `
            <button class="btn-add-cart" onclick="event.stopPropagation(); app.addToCart('${med.id}')">
              ${ICONS.plus} Add to Cart
            </button>
          ` : `
            <div style="display:flex; align-items:center; justify-content:space-between; background:var(--bg-app); border:1px solid var(--border-color); border-radius:var(--radius-full); padding:3px 8px;" onclick="event.stopPropagation();">
              <button onclick="app.updateCartQty('${med.id}', -1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.minus}</button>
              <span style="font-size:12px; font-weight:800;">${cartQty}</span>
              <button onclick="app.updateCartQty('${med.id}', 1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.plus}</button>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // ================================================================
  // VIEW: ADMIN PORTAL (SALES MONITORING & INVENTORY MANAGEMENT)
  // ================================================================
  renderAdminView(state) {
    const analytics = window.store.getSalesAnalytics();
    const activeTab = state.adminActiveTab || 'sales';
    const medicines = window.store.getMedicines();
    const orders = state.adminOrders || [];

    let html = `
      <!-- Admin Header Banner -->
      <div class="admin-portal-header">
        <div class="admin-header-row">
          <div>
            <div class="admin-badge-pill">🛡️ PPB LICENSED PHARMACIST PORTAL</div>
            <h2 style="font-size:18px; font-weight:900; margin-top:4px;">Grasha Pharma Operations</h2>
            <p style="font-size:11px; opacity:0.9;">Pharm. Angela Muthoni (#PPB-3912) • Nairobi Hub</p>
          </div>
          <button onclick="app.toggleRole()" style="background:rgba(255,255,255,0.2); border:1px solid rgba(255,255,255,0.4); color:#fff; padding:6px 10px; border-radius:14px; font-size:11px; font-weight:700; cursor:pointer;">
            Exit to Store
          </button>
        </div>
      </div>

      <!-- Admin Navigation Tabs -->
      <div class="admin-nav-tabs">
        <button class="admin-tab-btn ${activeTab === 'sales' ? 'active' : ''}" onclick="app.openAdminTab('sales')">
          <span>📊 Sales & Revenue</span>
        </button>
        <button class="admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}" onclick="app.openAdminTab('orders')">
          <span>📦 Orders (${orders.length})</span>
        </button>
        <button class="admin-tab-btn ${activeTab === 'stock' ? 'active' : ''}" onclick="app.openAdminTab('stock')">
          <span>💊 Stock (${medicines.length})</span>
        </button>
        <button class="admin-tab-btn ${activeTab === 'add' ? 'active' : ''}" onclick="app.openAdminTab('add')">
          <span>➕ Add Medicine</span>
        </button>
      </div>
    `;

    if (activeTab === 'sales') {
      html += this.renderAdminSalesTab(analytics, orders);
    } else if (activeTab === 'orders') {
      html += this.renderAdminOrdersTab(orders);
    } else if (activeTab === 'stock') {
      html += this.renderAdminStockTab(medicines, state);
    } else if (activeTab === 'add') {
      html += this.renderAdminAddMedicineTab();
    }

    this.contentEl.innerHTML = html;
  }

  // --- SUB-TAB: SALES MONITORING & KPIS ---
  renderAdminSalesTab(analytics, orders) {
    return `
      <!-- Sales KPI Metric Cards -->
      <div class="admin-kpi-grid">
        <div class="admin-kpi-card kpi-accent-gold">
          <div class="kpi-label">
            <span>TOTAL REVENUE</span>
            <span>💰</span>
          </div>
          <div class="kpi-val">KSh ${analytics.totalRevenue.toLocaleString()}</div>
          <div class="kpi-sub">${orders.length} Completed & Dispatched Orders</div>
        </div>

        <div class="admin-kpi-card kpi-accent-green">
          <div class="kpi-label">
            <span>LIPA NA M-PESA</span>
            <span>📱</span>
          </div>
          <div class="kpi-val">KSh ${analytics.mpesaTotal.toLocaleString()}</div>
          <div class="kpi-sub">Safaricom Daraja Paybill: 891200</div>
        </div>

        <div class="admin-kpi-card">
          <div class="kpi-label">
            <span>INVENTORY CAPITAL</span>
            <span>🏷️</span>
          </div>
          <div class="kpi-val">KSh ${analytics.totalInventoryValuation.toLocaleString()}</div>
          <div class="kpi-sub">${analytics.totalStockUnits} Total Medicine Units in Hub</div>
        </div>

        <div class="admin-kpi-card ${analytics.lowStockCount > 0 ? 'kpi-accent-danger' : ''}">
          <div class="kpi-label">
            <span>STOCK ALERTS</span>
            <span>⚠️</span>
          </div>
          <div class="kpi-val" style="color:${analytics.lowStockCount > 0 ? '#ef4444' : '#10b981'};">
            ${analytics.lowStockCount} Low / ${analytics.outOfStockCount} Out
          </div>
          <div class="kpi-sub">Reorder threshold: &lt; 15 units</div>
        </div>
      </div>

      <!-- Payment Method Distribution -->
      <div style="background:#ffffff; border-radius:var(--radius-md); padding:14px; border:1px solid var(--border-color); margin-bottom:14px; box-shadow:var(--shadow-sm);">
        <h4 style="font-size:12.5px; font-weight:800; color:var(--text-main); margin-bottom:10px;">Payment Channels Breakdown</h4>
        <div style="height:10px; background:#e2e8f0; border-radius:5px; overflow:hidden; display:flex; margin-bottom:8px;">
          <div style="width:78%; background:#00a859;" title="M-Pesa 78%"></div>
          <div style="width:14%; background:#1d4ed8;" title="Card 14%"></div>
          <div style="width:8%; background:#64748b;" title="COD 8%"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700;">
          <span style="color:#00a859;">● Lipa Na M-Pesa (78%)</span>
          <span style="color:#1d4ed8;">● Card (14%)</span>
          <span style="color:#64748b;">● Cash on Delivery (8%)</span>
        </div>
      </div>

      <!-- Recent Sales Transactions List -->
      <div style="background:#ffffff; border-radius:var(--radius-md); padding:14px; border:1px solid var(--border-color); box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h4 style="font-size:13px; font-weight:800; color:var(--text-main);">Recent Sales Dispatches</h4>
          <span style="font-size:11px; color:var(--primary); font-weight:700; cursor:pointer;" onclick="app.openAdminTab('orders')">View All →</span>
        </div>

        <div>
          ${orders.slice(0, 4).map(o => `
            <div style="border-bottom:1px solid #f1f5f9; padding:8px 0; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:12px; font-weight:800; color:#0f172a;">${o.id} • ${o.customerName}</div>
                <div style="font-size:10.5px; color:#64748b;">${o.date} • ${o.paymentMethod}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:12.5px; font-weight:900; color:var(--primary-dark);">KSh ${o.total.toLocaleString()}</div>
                <span style="font-size:9.5px; font-weight:800; color:#059669; background:#dcfce7; padding:2px 6px; border-radius:4px;">${o.status}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- SUB-TAB: ORDERS MANAGEMENT ---
  renderAdminOrdersTab(orders) {
    return `
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:13px; font-weight:800;">Customer Orders & Dispatch</span>
        <span style="font-size:11px; color:#64748b;">${orders.length} Total Orders</span>
      </div>

      <div>
        ${orders.map(order => `
          <div class="admin-order-card">
            <div class="admin-order-header">
              <div>
                <span style="font-size:10px; font-weight:800; color:var(--primary); background:#e0f2fe; padding:2px 7px; border-radius:4px;">
                  ORDER #${order.id}
                </span>
                <h4 style="font-size:13px; font-weight:800; margin-top:4px;">${order.customerName}</h4>
                <p style="font-size:11px; color:#64748b;">📞 ${order.customerPhone} • 📍 ${order.deliveryAddress}</p>
              </div>
              <div style="text-align:right;">
                <span style="font-size:14px; font-weight:900; color:var(--primary-dark);">KSh ${order.total.toLocaleString()}</span>
                <div style="font-size:10px; color:#64748b; margin-top:2px;">${order.date}</div>
              </div>
            </div>

            <!-- Items -->
            <div style="background:#f8fafc; border-radius:6px; padding:8px 10px; margin-bottom:10px; font-size:11.5px;">
              ${order.items.map(it => `
                <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                  <span>${it.quantity}x ${it.name}</span>
                  <span style="font-weight:700;">KSh ${(it.price * it.quantity).toLocaleString()}</span>
                </div>
              `).join('')}
            </div>

            <!-- Payment & Dispatch Details -->
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; margin-bottom:10px;">
              <span style="color:#00a859; font-weight:700;">
                ✓ ${order.paymentMethod} ${order.mpesaCode ? `(${order.mpesaCode})` : ''}
              </span>
              <span style="color:#64748b;">${order.deliveryType || 'Nairobi Express'}</span>
            </div>

            <!-- Status Changer -->
            <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px dashed #e2e8f0; padding-top:8px;">
              <span style="font-size:11.5px; font-weight:700; color:var(--text-muted);">Update Order Status:</span>
              <select class="admin-status-select" onchange="app.handleOrderStatusChange('${order.id}', this.value)">
                <option value="Prescription Verified" ${order.status === 'Prescription Verified' ? 'selected' : ''}>Prescription Verified</option>
                <option value="Dispensed & Verified" ${order.status === 'Dispensed & Verified' ? 'selected' : ''}>Dispensed & Verified</option>
                <option value="Out for Express Delivery" ${order.status === 'Out for Express Delivery' ? 'selected' : ''}>Out for Express Delivery</option>
                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered ✓</option>
                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- SUB-TAB: STOCK & INVENTORY MANAGEMENT ---
  renderAdminStockTab(medicines, state) {
    const filter = state.inventoryFilter || 'all';
    
    let filtered = medicines;
    if (filter === 'low_stock') {
      filtered = medicines.filter(m => (m.stockCount || 0) < 15 && (m.stockCount || 0) > 0);
    } else if (filter === 'out_of_stock') {
      filtered = medicines.filter(m => (m.stockCount || 0) <= 0);
    } else if (filter === 'cold_chain') {
      filtered = medicines.filter(m => m.temperatureControlled);
    } else if (filter === 'prescription') {
      filtered = medicines.filter(m => m.isRx);
    }

    return `
      <!-- Stock Filters -->
      <div style="display:flex; gap:6px; overflow-x:auto; margin-bottom:12px; padding-bottom:4px;">
        <button class="category-pill ${filter === 'all' ? 'active' : ''}" onclick="app.setInventoryFilter('all')">
          All (${medicines.length})
        </button>
        <button class="category-pill ${filter === 'low_stock' ? 'active' : ''}" onclick="app.setInventoryFilter('low_stock')">
          ⚠️ Low Stock (&lt;15)
        </button>
        <button class="category-pill ${filter === 'out_of_stock' ? 'active' : ''}" onclick="app.setInventoryFilter('out_of_stock')">
          🚫 Out of Stock
        </button>
        <button class="category-pill ${filter === 'cold_chain' ? 'active' : ''}" onclick="app.setInventoryFilter('cold_chain')">
          ❄️ Cold-Chain
        </button>
        <button class="category-pill ${filter === 'prescription' ? 'active' : ''}" onclick="app.setInventoryFilter('prescription')">
          📄 Rx Only
        </button>
      </div>

      <!-- Add New Medicine Callout Button -->
      <button class="btn-primary-action" style="margin-bottom:14px;" onclick="app.openAdminTab('add')">
        ${ICONS.plus} Add New Medicine / Dosage Form
      </button>

      <!-- Inventory List -->
      <div>
        ${filtered.map(med => {
          const stock = med.stockCount || 0;
          let stockClass = 'stock-good';
          let stockText = `${stock} in stock`;
          if (stock <= 0) {
            stockClass = 'stock-out';
            stockText = 'Out of Stock';
          } else if (stock < 15) {
            stockClass = 'stock-low';
            stockText = `Low: ${stock} left`;
          }

          return `
            <div class="inventory-item-card">
              <img 
                src="${med.image}" 
                alt="${med.name}" 
                class="inventory-item-thumb"
                onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';"
              />

              <div class="inventory-item-info">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <div>
                    <h4 style="font-size:12.5px; font-weight:800; color:var(--text-main);">${med.name}</h4>
                    <p style="font-size:10.5px; color:#64748b;">${med.dosageForm || med.genericName}</p>
                  </div>
                  <button class="btn-remove-item" onclick="app.confirmDeleteMedicine('${med.id}', '${med.name}')" title="Remove Medicine from Inventory">
                    ${ICONS.trash}
                  </button>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
                  <div>
                    <span style="font-size:13px; font-weight:900; color:var(--primary-dark);">KSh ${med.price.toLocaleString()}</span>
                    <span class="stock-count-badge ${stockClass}" style="margin-left:6px; cursor:pointer;" onclick="app.promptEditStock('${med.id}', ${stock})" title="Click to manually edit stock">
                      ${stockText} ✎
                    </span>
                  </div>

                  <!-- Quick Stock Steppers -->
                  <div class="inventory-stock-controls">
                    <button class="stock-stepper-btn" onclick="app.adjustStock('${med.id}', -1)" title="Deduct 1 unit">-1</button>
                    <button class="stock-stepper-btn" onclick="app.adjustStock('${med.id}', 1)" title="Add 1 unit">+1</button>
                    <button class="stock-stepper-btn" style="background:#e0f2fe; color:var(--primary-dark); font-size:10px; width:auto; padding:0 6px;" onclick="app.adjustStock('${med.id}', 10)" title="Restock +10">+10</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // --- SUB-TAB: ADD MEDICINE WITH IMAGE UPLOADER ---
  renderAdminAddMedicineTab() {
    return `
      <div class="admin-form">
        <h3 style="font-size:15px; font-weight:800; color:var(--text-main); margin-bottom:12px;">
          ➕ Add New Medicine to Grasha Pharma
        </h3>

        <!-- Medicine Name & Generic Formula -->
        <div class="admin-form-group">
          <label>Medicine Brand Name *</label>
          <input type="text" id="addMedName" placeholder="e.g. Amoxil 500mg Capsules" />
        </div>

        <div class="admin-form-group">
          <label>Generic Formula / Active Ingredients *</label>
          <input type="text" id="addMedGeneric" placeholder="e.g. Amoxicillin Trihydrate (500mg)" />
        </div>

        <div class="form-row-2">
          <div class="admin-form-group">
            <label>Category *</label>
            <select id="addMedCategory">
              <option value="prescription">Prescription (Rx)</option>
              <option value="otc">Pain, Cold & OTC</option>
              <option value="chronic">Chronic Care</option>
              <option value="derma">Skincare & Derma</option>
              <option value="wellness">Vitamins & Immunity</option>
              <option value="devices">Diagnostics & Devices</option>
              <option value="baby">Mother & Baby</option>
            </select>
          </div>

          <div class="admin-form-group">
            <label>Dosage Form (Grasha CAP 499) *</label>
            <select id="addMedDosageForm">
              <option value="Oral Solids (Tablets & Hard Gelatine Capsules)">Oral Solids (Tablets/Capsules)</option>
              <option value="Effervescent Tablets">Effervescent Tablets</option>
              <option value="Liquids (Syrup, Suspension & Powder for oral suspension)">Liquids & Syrups</option>
              <option value="Creams & Ointments (Dermatological formulations)">Creams & Ointments</option>
              <option value="Parenteral Preparations (Vials & Ampoules)">Parenteral (Vials/Ampoules)</option>
              <option value="Diagnostics & Medical Equipment">Diagnostics & Devices</option>
              <option value="Specialized Forms (Suppositories & Injections)">Specialized Dosage Forms</option>
            </select>
          </div>
        </div>

        <div class="form-row-2">
          <div class="admin-form-group">
            <label>Selling Price (KSh) *</label>
            <input type="number" id="addMedPrice" placeholder="e.g. 1200" />
          </div>

          <div class="admin-form-group">
            <label>Initial Stock Units *</label>
            <input type="number" id="addMedStock" placeholder="e.g. 50" />
          </div>
        </div>

        <div class="form-row-2">
          <div class="admin-form-group">
            <label>Manufacturer / Source</label>
            <input type="text" id="addMedMfg" value="Grasha Pharma Quality Sourced" />
          </div>

          <div class="admin-form-group">
            <label>Pack Size</label>
            <input type="text" id="addMedPack" placeholder="e.g. Strip of 10 Tablets" />
          </div>
        </div>

        <div style="display:flex; gap:16px; margin:8px 0 14px 0;">
          <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
            <input type="checkbox" id="addMedIsRx" checked style="accent-color:var(--primary);" />
            <span>Prescription Required (Rx)</span>
          </label>
          <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
            <input type="checkbox" id="addMedColdChain" style="accent-color:var(--primary);" />
            <span>Cold-Chain (2°C - 8°C) ❄️</span>
          </label>
        </div>

        <!-- ============================================== -->
        <!-- IMAGE UPLOADER WITH FILE READER & PRESETS -->
        <!-- ============================================== -->
        <div class="admin-form-group">
          <label>Product Photography (Upload File, Enter URL, or Pick Preset) *</label>
          
          <!-- Live Preview Box -->
          <img 
            id="medImagePreview" 
            src="${PHARMACY_IMAGE_PRESETS[0].url}" 
            class="image-preview-box" 
            alt="Preview" 
          />

          <!-- Drag and drop / click upload zone -->
          <div class="image-upload-wrapper" onclick="document.getElementById('imageFileInput').click()">
            <span style="font-size:24px;">📸</span>
            <div style="font-size:12px; font-weight:800; color:var(--primary); margin-top:4px;">
              Click to Upload Image from Computer / Phone
            </div>
            <div style="font-size:10px; color:#64748b;">Supports PNG, JPG, WEBP • Read instantly as data URL</div>
            <input 
              type="file" 
              id="imageFileInput" 
              accept="image/*" 
              style="display:none;" 
              onchange="app.handleImageFileSelect(event)" 
            />
          </div>

          <!-- Direct URL Option -->
          <div style="margin-top:8px;">
            <input 
              type="url" 
              id="imageUrlInput" 
              placeholder="Or enter direct image URL (e.g. MYDAWA Azure CDN link)..." 
              value="${PHARMACY_IMAGE_PRESETS[0].url}"
              oninput="app.handleImageUrlChange(this.value)"
            />
          </div>

          <!-- Quick Pharmacy Image Presets -->
          <div style="margin-top:10px;">
            <span style="font-size:11px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Or Choose from Grasha Standard Presets:</span>
            <div class="image-preset-picker">
              ${PHARMACY_IMAGE_PRESETS.map((p, idx) => `
                <div class="preset-chip ${idx === 0 ? 'active' : ''}" onclick="app.selectImagePreset('${p.url}', this)">
                  <img src="${p.url}" alt="${p.name}" />
                  <span>${p.name.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <button class="btn-primary-action" style="margin-top:16px;" onclick="app.submitNewMedicine()">
          ➕ Save &amp; Publish Medicine to Inventory
        </button>
      </div>
    `;
  }

  // ================================================================
  // AUTHENTICATION & LOGIN/REGISTER MODAL
  // ================================================================
  openAuthModal() {
    sounds.playTap();
    const user = window.store.state.currentUser;

    if (user) {
      // User is logged in: Show Account details & Switch Role options
      this.sheetBody.innerHTML = `
        <div style="text-align:center; margin-bottom:16px;">
          <div style="font-size:42px; margin-bottom:6px;">${user.avatar || '👤'}</div>
          <h3 style="font-size:17px; font-weight:900;">${user.name}</h3>
          <p style="font-size:12px; color:var(--primary); font-weight:700;">
            ${user.role === 'admin' ? '🛡️ Grasha Chief Pharmacist & Admin' : '👩 Registered Patient Account'}
          </p>
          <p style="font-size:11px; color:#64748b;">${user.email} • ${user.phone}</p>
        </div>

        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:var(--radius-md); padding:12px; margin-bottom:14px; font-size:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#64748b;">Delivery Address:</span>
            <span style="font-weight:700;">${user.estate || 'Westlands, Nairobi'}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#64748b;">Member Status:</span>
            <span style="font-weight:700; color:#059669;">Verified (PPB Compliant)</span>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn-hero-primary" onclick="app.toggleRole(); app.closeBottomSheet();">
            ⚡ Switch to ${user.role === 'admin' ? 'Patient Store' : 'Admin Operations Portal'}
          </button>
          
          ${user.role === 'admin' ? `
            <button class="btn-hero-secondary" onclick="app.navigateTo('admin'); app.closeBottomSheet();">
              📊 Open Admin Dashboard
            </button>
          ` : `
            <button class="btn-hero-secondary" onclick="app.navigateTo('rx'); app.closeBottomSheet();">
              📄 View My Prescriptions
            </button>
          `}

          <button onclick="app.logoutUser()" style="background:#fee2e2; border:1px solid #fca5a5; color:#dc2626; padding:10px; border-radius:8px; font-size:12.5px; font-weight:800; cursor:pointer; margin-top:6px;">
            Log Out
          </button>
        </div>
      `;
    } else {
      // User is logged out: Show Login / Demo Login Options
      this.sheetBody.innerHTML = `
        <div style="text-align:center; margin-bottom:16px;">
          <span style="font-size:36px;">💊</span>
          <h3 style="font-size:17px; font-weight:900;">GrashaPhama Account</h3>
          <p style="font-size:11.5px; color:#64748b;">Log in to access your prescriptions, live tracking, or admin operations.</p>
        </div>

        <div style="margin-bottom:14px;">
          <span style="font-size:11px; font-weight:800; color:var(--text-muted); text-transform:uppercase; display:block; margin-bottom:6px;">
            Instant 1-Click Demo Accounts:
          </span>
          
          <div class="demo-account-pill" onclick="app.quickLoginDemo('customer')">
            <div>
              <div style="font-size:12.5px; font-weight:800; color:#0f172a;">👩 Jane Wambui Kamau (Patient)</div>
              <div style="font-size:10.5px; color:#64748b;">Westlands, Nairobi • Prescriptions & M-Pesa Ready</div>
            </div>
            <span style="font-size:11px; font-weight:800; color:var(--primary);">Login →</span>
          </div>

          <div class="demo-account-pill" style="border-color:#fbbf24; background:#fefce8;" onclick="app.quickLoginDemo('admin')">
            <div>
              <div style="font-size:12.5px; font-weight:800; color:#78350f;">🛡️ Pharm. Angela Muthoni (Admin)</div>
              <div style="font-size:10.5px; color:#92400e;">Chief Pharmacist • Sales, Stock &amp; Inventory</div>
            </div>
            <span style="font-size:11px; font-weight:800; color:#b45309;">Login →</span>
          </div>
        </div>

        <div style="border-top:1px solid #e2e8f0; padding-top:12px;">
          <div class="admin-form-group">
            <label>Email Address</label>
            <input type="email" id="loginEmail" placeholder="admin@grashapharma.co.ke" />
          </div>
          <div class="admin-form-group">
            <label>Password</label>
            <input type="password" id="loginPass" placeholder="••••••••" />
          </div>

          <button class="btn-primary-action" onclick="app.executeManualLogin()">
            Sign In with Email
          </button>
        </div>
      `;
    }

    this.openBottomSheet();
  }

  quickLoginDemo(role) {
    sounds.playSuccess();
    window.store.switchRole(role);
    this.closeBottomSheet();
    if (role === 'admin') {
      alert('🛡️ Logged in as Pharm. Angela Muthoni (Chief Pharmacist & Admin). Operations portal ready.');
    } else {
      alert('👩 Logged in as Jane Wambui Kamau (Patient). Storefront and prescriptions active.');
    }
  }

  executeManualLogin() {
    const email = document.getElementById('loginEmail')?.value;
    const pass = document.getElementById('loginPass')?.value;
    if (!email || !pass) {
      alert('Please enter email and password.');
      return;
    }

    const res = window.store.login(email, pass);
    if (res.success) {
      sounds.playSuccess();
      this.closeBottomSheet();
      alert(`Welcome back, ${res.user.name}!`);
    } else {
      alert(res.message);
    }
  }

  logoutUser() {
    sounds.playTap();
    window.store.logout();
    this.closeBottomSheet();
    alert('Logged out successfully.');
    this.navigateTo('home');
  }

  toggleRole() {
    sounds.playTap();
    const curr = window.store.state.currentUser;
    if (curr && curr.role === 'admin') {
      window.store.switchRole('customer');
    } else {
      window.store.switchRole('admin');
    }
  }

  openAdminTab(tabName) {
    sounds.playTap();
    window.store.setAdminTab(tabName);
    window.store.setView('admin');
  }

  setInventoryFilter(filterName) {
    sounds.playTap();
    window.store.setInventoryFilter(filterName);
  }

  // ================================================================
  // INVENTORY OPERATIONS: STOCK ADJUSTMENT, REMOVE & ADD MEDICINE
  // ================================================================
  adjustStock(medId, delta) {
    sounds.playTap();
    window.store.adjustStock(medId, delta);
  }

  promptEditStock(medId, currentStock) {
    const newVal = prompt(`Update stock count for this medication:`, currentStock);
    if (newVal !== null && !isNaN(newVal)) {
      sounds.playSuccess();
      window.store.updateMedicineStock(medId, parseInt(newVal, 10));
    }
  }

  confirmDeleteMedicine(medId, medName) {
    if (confirm(`Are you sure you want to delete "${medName}" from Grasha Pharma inventory?`)) {
      sounds.playTap();
      window.store.removeMedicine(medId);
      alert(`"${medName}" has been removed from inventory.`);
    }
  }

  // --- Image Upload & Selection Handlers ---
  handleImageFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImageBase64 = e.target.result;
      const preview = document.getElementById('medImagePreview');
      const urlInput = document.getElementById('imageUrlInput');
      if (preview) preview.src = this.uploadedImageBase64;
      if (urlInput) urlInput.value = '(Uploaded Local Image File)';
      sounds.playSuccess();
    };
    reader.readAsDataURL(file);
  }

  handleImageUrlChange(url) {
    this.uploadedImageBase64 = null;
    const preview = document.getElementById('medImagePreview');
    if (preview && url) {
      preview.src = url;
    }
  }

  selectImagePreset(url, el) {
    sounds.playTap();
    this.uploadedImageBase64 = null;
    const preview = document.getElementById('medImagePreview');
    const urlInput = document.getElementById('imageUrlInput');
    if (preview) preview.src = url;
    if (urlInput) urlInput.value = url;

    document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  submitNewMedicine() {
    const name = document.getElementById('addMedName')?.value;
    const generic = document.getElementById('addMedGeneric')?.value;
    const category = document.getElementById('addMedCategory')?.value;
    const dosageForm = document.getElementById('addMedDosageForm')?.value;
    const price = document.getElementById('addMedPrice')?.value;
    const stock = document.getElementById('addMedStock')?.value;
    const mfg = document.getElementById('addMedMfg')?.value;
    const pack = document.getElementById('addMedPack')?.value;
    const isRx = document.getElementById('addMedIsRx')?.checked;
    const coldChain = document.getElementById('addMedColdChain')?.checked;
    const urlInput = document.getElementById('imageUrlInput')?.value;

    if (!name || !price || !stock) {
      alert('Please fill in Medicine Name, Selling Price, and Initial Stock.');
      return;
    }

    const finalImage = this.uploadedImageBase64 || (urlInput && urlInput !== '(Uploaded Local Image File)' ? urlInput : PHARMACY_IMAGE_PRESETS[0].url);

    const newMed = window.store.addMedicine({
      name,
      genericName: generic || name,
      category,
      dosageForm,
      price: parseInt(price, 10),
      stockCount: parseInt(stock, 10),
      manufacturer: mfg || 'Grasha Pharma Labs',
      packSize: pack || 'Standard Pack',
      isRx,
      temperatureControlled: coldChain,
      image: finalImage
    });

    sounds.playSuccess();
    alert(`🎉 "${newMed.name}" added to Grasha Pharma catalog successfully!\nStock count: ${newMed.stockCount} units.`);
    this.openAdminTab('stock');
  }

  handleOrderStatusChange(orderId, newStatus) {
    sounds.playSuccess();
    window.store.updateOrderStatus(orderId, newStatus);
    alert(`Order #${orderId} updated to: ${newStatus}`);
  }

  // ================================================================
  // CUSTOMER CART & CHECKOUT
  // ================================================================
  renderCartView(state) {
    const totals = window.store.getCartTotals();
    const interactions = window.store.detectInteractions();
    const rxSelected = state.prescriptions.find(p => p.id === state.selectedPrescriptionId);

    if (state.cart.length === 0) {
      this.contentEl.innerHTML = `
        <div style="text-align:center; padding: 60px 20px;">
          <div style="font-size: 54px; margin-bottom: 12px;">🛒</div>
          <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 6px;">Your Medical Cart is Empty</h3>
          <p style="font-size: 12.5px; color: #64748b; margin-bottom: 24px;">Browse Kenyan pharmacy essentials, chronic care medicines, or upload your doctor's prescription slip.</p>
          <button class="btn-primary-action" onclick="app.navigateTo('home')">
            Explore Pharmacy Catalog
          </button>
        </div>
      `;
      return;
    }

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:16px; font-weight:800;">My Cart (${totals.totalItemsCount} items)</h3>
        <button onclick="app.clearCart()" style="background:none; border:none; color:#ef4444; font-size:12px; font-weight:700; cursor:pointer;">
          Clear All
        </button>
      </div>

      <!-- Drug Interaction Alert -->
      ${interactions.length > 0 ? `
        <div style="background:#fef2f2; border:1.5px solid #ef4444; border-radius:var(--radius-md); padding:12px; margin-bottom:14px;">
          <div style="color:#991b1b; font-weight:800; font-size:12px;">
            ⚠️ Clinical Warning: Drug Interaction Detected
          </div>
          ${interactions.map(it => `
            <div style="font-size:11px; color:#7f1d1d; margin-top:3px;">
              <strong>${it.drugNames}</strong>: ${it.message}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Cart Items List with Real Photos -->
      <div style="margin-bottom:16px;">
        ${state.cart.map(item => {
          const med = window.store.getMedicineById(item.medicineId);
          if (!med) return '';
          return `
            <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:12px; margin-bottom:10px; box-shadow:var(--shadow-sm); display:flex; gap:12px; align-items:center;">
              <img src="${med.image}" style="width:50px; height:50px; object-fit:contain; border-radius:6px; border:1px solid #e2e8f0; padding:2px;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <div>
                    <h4 style="font-size:13px; font-weight:800; color:var(--text-main);">${med.name}</h4>
                    <p style="font-size:10.5px; color:var(--text-muted);">${med.genericName}</p>
                  </div>
                  <span style="font-size:13.5px; font-weight:800; color:var(--primary-dark);">KSh ${(med.price * item.quantity).toLocaleString()}</span>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
                  <span style="font-size:10.5px; color:var(--text-muted);">KSh ${med.price.toLocaleString()} each</span>
                  <div style="display:flex; align-items:center; gap:8px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:20px; padding:2px 8px;">
                    <button onclick="app.updateCartQty('${med.id}', -1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.minus}</button>
                    <span style="font-size:11.5px; font-weight:800;">${item.quantity}</span>
                    <button onclick="app.updateCartQty('${med.id}', 1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.plus}</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Prescription Attachment Box (PPB Compliant) -->
      ${totals.hasRxItems ? `
        <div style="background:#ffffff; border:1.5px solid ${rxSelected ? '#10b981' : '#f59e0b'}; border-radius:var(--radius-md); padding:12px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:12.5px; font-weight:800; color:${rxSelected ? '#065f46' : '#92400e'}; display:flex; align-items:center; gap:5px;">
              ${rxSelected ? '✓ Attached Doctor\'s Prescription (Rx)' : '⚠️ Prescription Slip Required'}
            </span>
            <button onclick="app.openPrescriptionUploadModal()" style="font-size:11px; color:var(--primary); font-weight:700; background:none; border:none; cursor:pointer;">
              ${rxSelected ? 'Change Rx' : '+ Upload Rx'}
            </button>
          </div>
          ${rxSelected ? `
            <p style="font-size:11px; color:#334155;">
              Verified for <strong>${rxSelected.patientName}</strong> (${rxSelected.doctorName} • ${rxSelected.clinic}).
            </p>
            <p style="font-size:10px; color:#059669; margin-top:3px;">
              * Remember to hand physical paper Rx slip to rider on delivery (PPB Kenya requirement).
            </p>
          ` : `
            <p style="font-size:11px; color:#b45309;">
              Your cart contains prescription items. Please attach a prescription above to enable checkout.
            </p>
          `}
        </div>
      ` : ''}

      <!-- Delivery Route Selection -->
      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
        <span style="font-size:13px; font-weight:800; display:block; margin-bottom:8px;">Delivery Network</span>
        <div style="display:flex; gap:8px;">
          <div 
            onclick="app.setDeliveryOption('nairobi_express')" 
            style="flex:1; border:1.5px solid ${state.deliveryOption === 'nairobi_express' ? 'var(--primary)' : 'var(--border-color)'}; background:${state.deliveryOption === 'nairobi_express' ? '#f0f9ff' : '#fff'}; border-radius:10px; padding:10px; cursor:pointer;"
          >
            <div style="font-size:12px; font-weight:800; color:var(--primary);">⚡ Nairobi Express</div>
            <div style="font-size:10px; color:#64748b; margin-top:2px;">Grasha Fleet (2-4 Hours)</div>
            <div style="font-size:11px; font-weight:800; color:#059669; margin-top:4px;">
              ${totals.subtotal >= 2500 ? 'FREE (Over 2.5k)' : 'KSh 200'}
            </div>
          </div>

          <div 
            onclick="app.setDeliveryOption('kenya_fargo')" 
            style="flex:1; border:1.5px solid ${state.deliveryOption === 'kenya_fargo' ? 'var(--primary)' : 'var(--border-color)'}; background:${state.deliveryOption === 'kenya_fargo' ? '#f0f9ff' : '#fff'}; border-radius:10px; padding:10px; cursor:pointer;"
          >
            <div style="font-size:12px; font-weight:800; color:#0f172a;">🚚 Countrywide Kenya</div>
            <div style="font-size:10px; color:#64748b; margin-top:2px;">G4S / Fargo Courier (24h)</div>
            <div style="font-size:11px; font-weight:800; color:#0f172a; margin-top:4px;">KSh 450</div>
          </div>
        </div>
      </div>

      <!-- Payment Method Selection (M-Pesa, Card, Cash on Delivery) -->
      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
        <span style="font-size:13px; font-weight:800; display:block; margin-bottom:8px;">Select Payment Option</span>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px; margin-bottom:8px;">
          <button 
            onclick="app.setPaymentMethod('mpesa')"
            style="border:1.5px solid ${state.paymentMethod === 'mpesa' ? '#00a859' : 'var(--border-color)'}; background:${state.paymentMethod === 'mpesa' ? '#f0fdf4' : '#fff'}; padding:8px 4px; border-radius:10px; text-align:center; cursor:pointer;"
          >
            <div style="font-size:16px;">📱</div>
            <div style="font-size:11px; font-weight:800; color:#00a859; margin-top:2px;">M-Pesa</div>
            <div style="font-size:9px; color:#64748b;">STK Prompt</div>
          </button>

          <button 
            onclick="app.setPaymentMethod('card')"
            style="border:1.5px solid ${state.paymentMethod === 'card' ? '#1d4ed8' : 'var(--border-color)'}; background:${state.paymentMethod === 'card' ? '#eff6ff' : '#fff'}; padding:8px 4px; border-radius:10px; text-align:center; cursor:pointer;"
          >
            <div style="font-size:16px;">💳</div>
            <div style="font-size:11px; font-weight:800; color:#1d4ed8; margin-top:2px;">Card</div>
            <div style="font-size:9px; color:#64748b;">Visa / Master</div>
          </button>

          <button 
            onclick="app.setPaymentMethod('cod')"
            style="border:1.5px solid ${state.paymentMethod === 'cod' ? '#334155' : 'var(--border-color)'}; background:${state.paymentMethod === 'cod' ? '#f8fafc' : '#fff'}; padding:8px 4px; border-radius:10px; text-align:center; cursor:pointer;"
          >
            <div style="font-size:16px;">💵</div>
            <div style="font-size:11px; font-weight:800; color:#334155; margin-top:2px;">Cash/COD</div>
            <div style="font-size:9px; color:#64748b;">Pay Courier</div>
          </button>
        </div>
      </div>

      <!-- Price Breakdown in KSH -->
      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:12.5px; color:#64748b; margin-bottom:6px;">
          <span>Subtotal</span>
          <span>KSh ${totals.subtotal.toLocaleString()}</span>
        </div>
        ${totals.savings > 0 ? `
          <div style="display:flex; justify-content:space-between; font-size:12.5px; color:#10b981; font-weight:700; margin-bottom:6px;">
            <span>Generic Savings</span>
            <span>-KSh ${totals.savings.toLocaleString()}</span>
          </div>
        ` : ''}
        <div style="display:flex; justify-content:space-between; font-size:12.5px; color:#64748b; margin-bottom:8px;">
          <span>${state.deliveryOption === 'nairobi_express' ? 'Nairobi Express (Grasha Fleet)' : 'G4S / Fargo Courier (Countrywide)'}</span>
          <span style="font-weight:700;">${totals.deliveryFee === 0 ? 'FREE' : 'KSh ' + totals.deliveryFee.toLocaleString()}</span>
        </div>
        <div style="border-top:1px dashed var(--border-color); padding-top:10px; display:flex; justify-content:space-between; font-size:16px; font-weight:900; color:var(--text-main);">
          <span>Total Payable</span>
          <span style="color:var(--primary-dark);">KSh ${totals.finalTotal.toLocaleString()}</span>
        </div>
      </div>

      <!-- Payment Execution Button -->
      ${state.paymentMethod === 'mpesa' ? `
        <button 
          class="btn-mpesa-action" 
          ${totals.hasRxItems && !rxSelected ? 'disabled' : ''} 
          onclick="app.openMpesaModal()"
        >
          <span>📱 Pay KSh ${totals.finalTotal.toLocaleString()} with Lipa Na M-Pesa</span>
        </button>
      ` : (state.paymentMethod === 'card' ? `
        <button 
          class="btn-card-action" 
          ${totals.hasRxItems && !rxSelected ? 'disabled' : ''} 
          onclick="app.openCardModal()"
        >
          <span>💳 Pay KSh ${totals.finalTotal.toLocaleString()} via Credit/Debit Card</span>
        </button>
      ` : `
        <button 
          class="btn-cod-action" 
          ${totals.hasRxItems && !rxSelected ? 'disabled' : ''} 
          onclick="app.openCodModal()"
        >
          <span>💵 Confirm Order - Pay KSh ${totals.finalTotal.toLocaleString()} on Delivery</span>
        </button>
      `)}
    `;

    this.contentEl.innerHTML = html;
  }

  // ================================================================
  // WHATSAPP CHATBOT
  // ================================================================
  renderWhatsAppView(state) {
    let html = `
      <div class="whatsapp-chat-container">
        <div class="whatsapp-chat-header">
          <div class="whatsapp-avatar">
            👩‍⚕️
            <div class="whatsapp-online-dot"></div>
          </div>
          <div style="flex:1;">
            <div style="font-size:13.5px; font-weight:800; display:flex; align-items:center; gap:4px;">
              <span>Grasha Pharma Care</span>
              <span style="color:#25d366; font-size:12px;">✓</span>
            </div>
            <div style="font-size:10px; color:#d1fae5;">+254 722 840 192 • Official PPB Registered</div>
          </div>
          <button onclick="window.open('https://wa.me/254722840192?text=Hello%20Grasha%20Pharma', '_blank')" style="background:#25d366; border:none; color:#fff; font-size:11px; font-weight:bold; padding:4px 8px; border-radius:12px; cursor:pointer;">
            Open App ↗
          </button>
        </div>

        <div style="background:#e5ddd5; padding:6px 10px; display:flex; gap:6px; overflow-x:auto; scrollbar-width:none;">
          <button onclick="app.sendWhatsAppPrompt('1️⃣ Upload Prescription')" style="background:#ffffff; border:none; padding:4px 8px; border-radius:14px; font-size:10.5px; font-weight:700; color:#075e54; white-space:nowrap; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
            📄 1. Upload Rx
          </button>
          <button onclick="app.sendWhatsAppPrompt('2️⃣ Lipa Na M-Pesa')" style="background:#ffffff; border:none; padding:4px 8px; border-radius:14px; font-size:10.5px; font-weight:700; color:#075e54; white-space:nowrap; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
            📱 2. M-Pesa Info
          </button>
          <button onclick="app.sendWhatsAppPrompt('3️⃣ Track Delivery')" style="background:#ffffff; border:none; padding:4px 8px; border-radius:14px; font-size:10.5px; font-weight:700; color:#075e54; white-space:nowrap; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
            🚚 3. Track Fleet
          </button>
          <button onclick="app.sendWhatsAppPrompt('4️⃣ Speak with Clinical Pharmacist')" style="background:#ffffff; border:none; padding:4px 8px; border-radius:14px; font-size:10.5px; font-weight:700; color:#075e54; white-space:nowrap; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
            👩‍⚕️ 4. Ask Pharmacist
          </button>
        </div>

        <div class="whatsapp-chat-body" id="waStream">
          ${state.whatsappMessages.map(msg => `
            <div class="wa-bubble ${msg.sender}">
              <div style="white-space: pre-wrap;">${msg.text}</div>
              <div class="wa-time">
                <span>${msg.time}</span>
                <span style="color:#34b7f1;">✓✓</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="whatsapp-chat-input-bar">
          <input 
            type="text" 
            id="waInput" 
            placeholder="Type a message or select 1, 2, 3, 4..." 
            class="whatsapp-input-field"
            onkeydown="if(event.key === 'Enter') app.handleSendWhatsApp()"
          />
          <button onclick="app.handleSendWhatsApp()" class="whatsapp-send-btn">
            ${ICONS.send}
          </button>
        </div>
      </div>
    `;

    this.contentEl.innerHTML = html;

    setTimeout(() => {
      const stream = document.getElementById('waStream');
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 50);
  }

  // ================================================================
  // COMPANY PROFILE
  // ================================================================
  renderProfileView(state) {
    const prof = GRASHA_PHARMA_PROFILE;

    let html = `
      <div style="background:var(--primary-gradient); color:#fff; border-radius:var(--radius-lg); padding:20px; margin-bottom:16px; box-shadow:var(--shadow-gloss);">
        <div style="font-size:11px; font-weight:800; background:rgba(255,255,255,0.2); padding:3px 8px; border-radius:12px; display:inline-block; margin-bottom:8px;">
          🇰🇪 OFFICIAL COMPANY PROFILE
        </div>
        <h2 style="font-size:19px; font-weight:900;">${prof.name}</h2>
        <p style="font-size:11.5px; color:#e0f2fe; margin-top:4px; line-height:1.4;">
          ${prof.legalRegistration}
        </p>
        <div style="display:flex; gap:12px; margin-top:10px; font-size:11px; font-weight:700; color:#bfdbfe;">
          <span>● Est. ${prof.established}</span>
          <span>● Regulator: ${prof.regulatoryBody}</span>
        </div>
      </div>

      <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
        <h4 style="font-size:13px; font-weight:800; color:var(--primary-dark); margin-bottom:4px;">🎯 OUR MISSION</h4>
        <p style="font-size:11.5px; color:#334155; line-height:1.4;">"${prof.mission}"</p>
        
        <h4 style="font-size:13px; font-weight:800; color:var(--primary-dark); margin-top:12px; margin-bottom:4px;">👁️ OUR VISION</h4>
        <p style="font-size:11.5px; color:#334155; line-height:1.4;">"${prof.vision}"</p>
      </div>

      <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
        <h4 style="font-size:13px; font-weight:800; color:#0f172a; margin-bottom:10px;">💪 OUR CORE STRENGTHS</h4>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${prof.strengths.map(s => `
            <div style="border-left:3px solid var(--primary); padding-left:8px;">
              <div style="font-size:12px; font-weight:800; color:#0f172a;">${s.title}</div>
              <p style="font-size:11px; color:#475569; margin-top:2px; line-height:1.4;">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
        <h4 style="font-size:13px; font-weight:800; color:#059669; margin-bottom:8px;">🛡️ COMMITMENT TO QUALITY</h4>
        <ul style="margin-left:16px; font-size:11px; color:#334155; line-height:1.5;">
          ${prof.commitmentsToQuality.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      <div style="background:#fff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
        <h4 style="font-size:13px; font-weight:800; color:#0f172a; margin-bottom:8px;">🔬 DOSAGE FORMS OFFERED</h4>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          ${prof.dosageFormsOffered.map(d => `
            <span style="background:#eff6ff; color:#1d4ed8; font-size:10.5px; font-weight:700; padding:4px 8px; border-radius:6px; border:1px solid #bfdbfe;">
              ${d}
            </span>
          `).join('')}
        </div>
      </div>

      <button class="btn-primary-action" onclick="app.navigateTo('home')">
        ← Back to Pharmacy Store
      </button>
    `;

    this.contentEl.innerHTML = html;
  }

  // ================================================================
  // PRESCRIPTIONS SCREEN
  // ================================================================
  renderPrescriptionView(state) {
    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:16px; font-weight:800;">My Prescriptions (Rx)</h3>
        <button onclick="app.openPrescriptionUploadModal()" style="background:var(--primary); color:#fff; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:700; cursor:pointer;">
          ${ICONS.upload} + Upload New
        </button>
      </div>

      <div>
        ${state.prescriptions.map(rx => `
          <div style="background:#ffffff; border:1.5px solid ${state.selectedPrescriptionId === rx.id ? 'var(--primary)' : 'var(--border-color)'}; border-radius:var(--radius-md); padding:14px; margin-bottom:12px; box-shadow:var(--shadow-sm); cursor:pointer;" onclick="app.selectPrescription('${rx.id}')">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <div>
                <span style="font-size:10px; font-weight:800; color:#10b981; background:#d1fae5; padding:2px 7px; border-radius:4px;">
                  ✓ ${rx.status}
                </span>
                <h4 style="font-size:13.5px; font-weight:800; margin-top:6px;">${rx.doctorName}</h4>
                <p style="font-size:11px; color:#64748b;">${rx.clinic} • Issued: ${rx.date}</p>
              </div>
              <input type="radio" name="rx_active" ${state.selectedPrescriptionId === rx.id ? 'checked' : ''} style="accent-color:var(--primary);" />
            </div>

            <div style="background:#f8fafc; border-radius:8px; padding:10px; margin:8px 0; font-size:11.5px;">
              <span style="font-weight:700; color:#475569; font-size:10.5px; text-transform:uppercase;">Prescribed Medications:</span>
              <ul style="margin-left:14px; margin-top:4px;">
                ${rx.medicinesListed.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; font-size:10.5px; color:#64748b;">
              <span>Patient: <strong>${rx.patientName}</strong></span>
              <span>Valid until: ${rx.validUntil}</span>
            </div>

            <button onclick="event.stopPropagation(); app.reorderRx('${rx.id}')" style="width:100%; margin-top:10px; background:var(--primary-light); color:var(--primary-dark); border:none; padding:8px; border-radius:8px; font-size:11.5px; font-weight:700; cursor:pointer;">
              🛒 1-Click Reorder Prescribed Medicines
            </button>
          </div>
        `).join('')}
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  // ================================================================
  // TRACKING VIEW
  // ================================================================
  renderTrackingView(state) {
    const order = state.activeOrder || state.orders[0];
    if (!order) {
      this.contentEl.innerHTML = `<p style="padding:20px; text-align:center;">No active orders found.</p>`;
      return;
    }

    let html = `
      <div style="background:#ffffff; border-radius:var(--radius-lg); padding:16px; margin-bottom:14px; border:1px solid var(--border-color); box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div>
            <span style="font-size:11px; font-weight:700; color:#64748b;">ORDER #${order.id}</span>
            <h3 style="font-size:16px; font-weight:800; color:#0f172a;">${order.status}</h3>
          </div>
          <span style="font-size:11px; font-weight:800; background:#e0f2fe; color:var(--primary-dark); padding:4px 10px; border-radius:20px;">
            ${order.deliverySpeed}
          </span>
        </div>

        <div style="height:120px; background:#e2e8f0; border-radius:var(--radius-md); position:relative; overflow:hidden; margin-bottom:12px; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, #bae6fd 10%, #e2e8f0 70%); opacity:0.8;"></div>
          <div style="position:relative; z-index:2; background:rgba(255,255,255,0.95); padding:6px 14px; border-radius:20px; font-size:12px; font-weight:800; box-shadow:0 4px 10px rgba(0,0,0,0.1); display:flex; align-items:center; gap:6px;">
            <span>🛵 ${order.riderName}:</span>
            <span style="color:var(--primary); font-weight:800;">ETA ${order.etaMinutes || '25'} mins</span>
          </div>
        </div>

        ${order.temperatureReading ? `
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; font-size:11px; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:6px; color:#0d9488; font-weight:700;">
              ${ICONS.cold} Insulin Cooler Sensor:
            </div>
            <strong style="color:#0f766e;">${order.temperatureReading}</strong>
          </div>
        ` : ''}

        <div style="background:#f8fafc; border-radius:var(--radius-md); padding:10px 12px; margin-bottom:10px; font-size:11.5px;">
          <div>Payment: <strong>${order.paymentMethod}</strong></div>
          <div style="color:#059669; font-weight:bold; margin-top:2px;">Original paper prescription collected on delivery.</div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #cbd5e1; padding-top:10px;">
          <div>
            <div style="font-size:12.5px; font-weight:800;">${order.riderName}</div>
            <div style="font-size:10.5px; color:#64748b;">${order.courier}</div>
          </div>
          <button onclick="alert('Calling courier: ' + '${order.riderPhone}')" style="background:var(--primary); color:#fff; border:none; padding:7px 14px; border-radius:20px; font-size:11.5px; font-weight:700; cursor:pointer;">
            📞 Call Rider
          </button>
        </div>
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  // ================================================================
  // ACTIONS, HANDLERS & MODALS
  // ================================================================
  navigateTo(viewName) {
    sounds.playTap();
    window.store.setView(viewName);
  }

  handleCategorySelect(catId) {
    sounds.playTap();
    window.store.setCategory(catId);
  }

  handleSearchInput(val) {
    window.store.setSearch(val);
  }

  clearSearch() {
    sounds.playTap();
    window.store.setSearch('');
  }

  addToCart(medId) {
    sounds.playSuccess();
    window.store.addToCart(medId, 1);
  }

  updateCartQty(medId, delta) {
    sounds.playTap();
    window.store.updateQuantity(medId, delta);
  }

  clearCart() {
    if (confirm('Clear all items from your cart?')) {
      sounds.playTap();
      window.store.state.cart = [];
      window.store.saveState();
    }
  }

  swapWithGeneric(medId) {
    sounds.playSuccess();
    window.store.swapWithGeneric(medId);
    this.closeBottomSheet();
  }

  setDeliveryOption(opt) {
    sounds.playTap();
    window.store.state.deliveryOption = opt;
    window.store.saveState();
  }

  setPaymentMethod(pm) {
    sounds.playTap();
    window.store.state.paymentMethod = pm;
    window.store.saveState();
  }

  selectPrescription(rxId) {
    sounds.playTap();
    window.store.selectPrescription(rxId);
  }

  handleSendWhatsApp() {
    const input = document.getElementById('waInput');
    if (!input || !input.value.trim()) return;
    sounds.playTap();
    window.store.sendWhatsAppMessage(input.value.trim());
    input.value = '';
  }

  sendWhatsAppPrompt(text) {
    sounds.playTap();
    window.store.sendWhatsAppMessage(text);
  }

  // --- Payment Execution Modals ---
  openMpesaModal() {
    const totals = window.store.getCartTotals();
    const phone = window.store.state.currentUser ? window.store.state.currentUser.phone : '0712 345 678';
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <div style="width:54px; height:54px; background:#00a859; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto;">
          <span style="font-size:26px; color:#fff;">📱</span>
        </div>
        <h3 style="font-size:17px; font-weight:900; color:#0f172a;">Lipa Na M-Pesa Online</h3>
        <p style="font-size:12px; color:#64748b; margin-top:2px;">Grasha Pharma Paybill: <strong>891200</strong></p>
      </div>

      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:var(--radius-md); padding:14px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
          <span>Account Name</span>
          <strong>Grasha Pharma Ltd</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:900; color:#00a859; border-top:1px dashed #bbf7d0; padding-top:6px; margin-top:4px;">
          <span>Amount to Pay</span>
          <span>KSh ${totals.finalTotal.toLocaleString()}</span>
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <label style="font-size:12px; font-weight:700; color:#334155; display:block; margin-bottom:4px;">Safaricom M-Pesa Phone Number</label>
        <input type="tel" id="mpesaPhone" value="${phone}" style="width:100%; border:1.5px solid #00a859; border-radius:8px; padding:10px 14px; font-size:14px; font-weight:700;" />
        <span style="font-size:10px; color:#64748b; margin-top:3px; display:block;">An STK Push prompt will be triggered to this number.</span>
      </div>

      <button class="btn-mpesa-action" onclick="app.executeMpesaPayment()">
        Send M-Pesa STK Push Prompt
      </button>
    `;
    this.openBottomSheet();
  }

  executeMpesaPayment() {
    const phone = document.getElementById('mpesaPhone')?.value || '0712 345 678';
    this.closeBottomSheet();
    
    setTimeout(() => {
      sounds.playSuccess();
      const code = 'QK' + Math.floor(10000000 + Math.random() * 90000000) + 'X';
      alert(`📲 M-PESA STK PROMPT RECEIVED!\n\nLipa Na M-Pesa to Grasha Pharma Ltd\nAmount: KSh ${window.store.getCartTotals().finalTotal.toLocaleString()}\n\n[PIN Verified ✓]\nTransaction Ref: ${code}`);
      
      const order = window.store.checkout('mpesa', { phone, code });
      alert(`🎉 Order #${order.id} Placed Successfully!\nGrasha dedicated fleet is packing your medications.`);
    }, 400);
  }

  openCardModal() {
    const totals = window.store.getCartTotals();
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <div style="width:54px; height:54px; background:#1d4ed8; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto;">
          <span style="font-size:26px; color:#fff;">💳</span>
        </div>
        <h3 style="font-size:17px; font-weight:900; color:#0f172a;">Pay via Credit or Debit Card</h3>
        <p style="font-size:12px; color:#64748b; margin-top:2px;">Visa, Mastercard, & Major Kenyan Banks</p>
      </div>

      <div style="margin-bottom:12px;">
        <label style="font-size:11.5px; font-weight:700; color:#334155; display:block; margin-bottom:4px;">Cardholder Name</label>
        <input type="text" id="cardName" value="${window.store.state.currentUser ? window.store.state.currentUser.name : 'Jane Wambui Kamau'}" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:9px 12px; font-size:13px;" />
      </div>

      <div style="margin-bottom:12px;">
        <label style="font-size:11.5px; font-weight:700; color:#334155; display:block; margin-bottom:4px;">Card Number</label>
        <input type="text" id="cardNum" value="4520 •••• •••• 8841" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:9px 12px; font-size:13px; font-weight:bold;" />
      </div>

      <div style="display:flex; gap:10px; margin-bottom:16px;">
        <div style="flex:1;">
          <label style="font-size:11.5px; font-weight:700; color:#334155; display:block; margin-bottom:4px;">Expiry Date</label>
          <input type="text" value="08/29" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:9px 12px; font-size:13px;" />
        </div>
        <div style="flex:1;">
          <label style="font-size:11.5px; font-weight:700; color:#334155; display:block; margin-bottom:4px;">CVV / CVC</label>
          <input type="password" value="•••" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:9px 12px; font-size:13px;" />
        </div>
      </div>

      <button class="btn-card-action" onclick="app.executeCardPayment()">
        Pay KSh ${totals.finalTotal.toLocaleString()} Securely
      </button>
    `;
    this.openBottomSheet();
  }

  executeCardPayment() {
    this.closeBottomSheet();
    setTimeout(() => {
      sounds.playSuccess();
      alert(`🔐 3D Secure / OTP Verified!\nCard charged KSh ${window.store.getCartTotals().finalTotal.toLocaleString()}`);
      const order = window.store.checkout('card', { cardLast4: '8841' });
      alert(`🎉 Order #${order.id} Placed Successfully!\nDispatched via Grasha Express Fleet.`);
    }, 400);
  }

  openCodModal() {
    const totals = window.store.getCartTotals();
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <div style="width:54px; height:54px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto;">
          <span style="font-size:26px; color:#fff;">💵</span>
        </div>
        <h3 style="font-size:17px; font-weight:900; color:#0f172a;">Cash on Delivery (Pay on Handover)</h3>
        <p style="font-size:12px; color:#64748b; margin-top:2px;">Pay with Cash or M-Pesa to our delivery rider</p>
      </div>

      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:var(--radius-md); padding:14px; margin-bottom:16px; font-size:12px; line-height:1.4;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span>Total Payable to Rider:</span>
          <strong style="color:#0f172a; font-size:14px;">KSh ${totals.finalTotal.toLocaleString()}</strong>
        </div>
        <div style="color:#059669; font-weight:bold; margin-top:6px;">
          ✓ Original physical doctor's prescription slip will be collected upon delivery handover.
        </div>
      </div>

      <button class="btn-cod-action" onclick="app.executeCodPayment()">
        Confirm Cash on Delivery Order
      </button>
    `;
    this.openBottomSheet();
  }

  executeCodPayment() {
    this.closeBottomSheet();
    sounds.playSuccess();
    const order = window.store.checkout('cod');
    alert(`🎉 Order #${order.id} Confirmed!\nOur rider Peter Kamau will collect KSh ${order.total.toLocaleString()} and your paper prescription upon arrival.`);
  }

  openPrescriptionUploadModal() {
    sounds.playTap();
    const user = window.store.state.currentUser;
    this.sheetBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <h3 style="font-size:16px; font-weight:800;">Upload Doctor's Prescription</h3>
        <button onclick="app.closeBottomSheet()" style="background:none; border:none; color:#64748b; font-size:18px; cursor:pointer;">✕</button>
      </div>

      <div style="border:2px dashed var(--primary); border-radius:var(--radius-md); background:#f0f9ff; padding:22px; text-align:center; margin-bottom:14px; cursor:pointer;" onclick="document.getElementById('rxInput').click()">
        <span style="font-size:36px;">📸</span>
        <h4 style="font-size:13.5px; font-weight:800; color:var(--primary-dark); margin-top:4px;">Snap Photo of Prescription Slip</h4>
        <p style="font-size:11px; color:#64748b; margin-top:2px;">Doctor's name, clinic stamp, patient name, and date must be legible.</p>
        <input type="file" id="rxInput" style="display:none;" accept="image/*,.pdf" onchange="alert('Prescription photo attached successfully!')" />
      </div>

      <div style="margin-bottom:10px;">
        <label style="font-size:11.5px; font-weight:700; color:#334155; display:block; margin-bottom:3px;">Patient Full Name</label>
        <input type="text" id="rxPatient" value="${user ? user.name : 'Jane Wambui Kamau'}" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:8px 12px; font-size:13px;" />
      </div>

      <div style="margin-bottom:10px;">
        <label style="font-size:11.5px; font-weight:700; color:#334155; display:block; margin-bottom:3px;">Doctor / Clinic Name</label>
        <input type="text" id="rxDoctor" value="Dr. David Mwangi, MBChB (Aga Khan Hospital)" style="width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:8px 12px; font-size:13px;" />
      </div>

      <button class="btn-primary-action" onclick="app.submitPrescription()">
        ✓ Submit Prescription to Pharmacist
      </button>
    `;
    this.openBottomSheet();
  }

  submitPrescription() {
    const patient = document.getElementById('rxPatient')?.value || 'Jane Wambui Kamau';
    const doctor = document.getElementById('rxDoctor')?.value || 'Dr. David Mwangi, MBChB';

    sounds.playSuccess();
    const newRx = window.store.uploadPrescription({
      patientName: patient,
      doctorName: doctor,
      clinic: 'Aga Khan University Hospital, Nairobi',
      medicinesListed: ['Augmentin 625mg (14 Tabs)', 'Panadol Extra (20 Tabs)', 'Hedex Extra (16 Tabs)']
    });

    this.closeBottomSheet();
    alert(`✅ Prescription #${newRx.id} submitted!\nPharm. Angela Muthoni has verified and approved your medicines.`);
    this.navigateTo('rx');
  }

  reorderRx(rxId) {
    sounds.playSuccess();
    window.store.addToCart('med-01', 1);
    window.store.addToCart('med-06', 1);
    this.navigateTo('cart');
  }

  openMedicineDetail(medId) {
    sounds.playTap();
    const med = window.store.getMedicineById(medId);
    if (!med) return;
    const isAdmin = window.store.state.currentUser && window.store.state.currentUser.role === 'admin';

    this.sheetBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
        <span class="rx-badge ${med.isRx ? 'rx-req' : 'otc-badge'}">${med.isRx ? 'Prescription Required (Rx)' : 'Over the Counter (OTC)'}</span>
        <button onclick="app.closeBottomSheet()" style="background:none; border:none; color:#64748b; font-size:18px; cursor:pointer;">✕</button>
      </div>

      <div style="text-align:center; padding:14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:var(--radius-md); margin-bottom:14px;">
        <img 
          src="${med.image}" 
          alt="${med.name}" 
          style="max-height:140px; margin:0 auto 10px auto; object-fit:contain;" 
          onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" 
        />
        <h2 style="font-size:17px; font-weight:900; color:#0f172a;">${med.name}</h2>
        <p style="font-size:12px; color:var(--primary); font-weight:700;">${med.genericName}</p>
        <p style="font-size:11px; color:#64748b; margin-top:2px;">Mfg: ${med.manufacturer} • ${med.packSize || med.dosageForm}</p>
      </div>

      ${isAdmin ? `
        <div style="background:#fef3c7; border:1px solid #fbbf24; border-radius:var(--radius-md); padding:10px 12px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:11.5px; font-weight:800; color:#78350f;">🛡️ Admin Stock Controls</div>
            <div style="font-size:10.5px; color:#92400e;">Current Stock: <strong>${med.stockCount || 0} units</strong></div>
          </div>
          <div style="display:flex; gap:6px;">
            <button onclick="app.adjustStock('${med.id}', 10); app.openMedicineDetail('${med.id}');" style="background:#f59e0b; color:#fff; border:none; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">
              +10 Restock
            </button>
            <button onclick="app.confirmDeleteMedicine('${med.id}', '${med.name}'); app.closeBottomSheet();" style="background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">
              Delete
            </button>
          </div>
        </div>
      ` : ''}

      ${med.genericAlternative ? `
        <div style="background:#ecfdf5; border:1.5px solid #10b981; border-radius:var(--radius-md); padding:10px 12px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:11.5px; font-weight:800; color:#065f46;">💡 Lower Cost Generic Equivalent</div>
            <div style="font-size:10.5px; color:#047857;">${med.genericAlternative.name} • <strong>KSh ${med.genericAlternative.price.toLocaleString()}</strong> (${med.genericAlternative.savings})</div>
          </div>
          <button onclick="app.swapWithGeneric('${med.id}')" style="background:#10b981; color:#fff; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:700; cursor:pointer;">
            Switch
          </button>
        </div>
      ` : ''}

      <div style="margin-bottom:12px;">
        <h4 style="font-size:12.5px; font-weight:800; color:#334155; margin-bottom:4px;">Indications / Uses:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:5px;">
          ${(med.uses || ['Clinical Healthcare Treatment']).map(u => `<span style="background:#f1f5f9; padding:3px 7px; border-radius:6px; font-size:11px; color:#475569;">${u}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <h4 style="font-size:12.5px; font-weight:800; color:#334155; margin-bottom:3px;">Dosage & Directions:</h4>
        <p style="font-size:11.5px; color:#475569; line-height:1.4;">${med.dosage || 'Take as advised by qualified healthcare practitioner.'}</p>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:12px; margin-top:14px;">
        <div>
          <span style="font-size:18px; font-weight:900; color:var(--primary-dark);">KSh ${med.price.toLocaleString()}</span>
          ${med.originalPrice ? `<span style="font-size:11px; color:#94a3b8; text-decoration:line-through; margin-left:6px;">KSh ${med.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <button class="btn-primary-action" style="width:auto; padding:10px 22px;" onclick="app.addToCart('${med.id}'); app.closeBottomSheet();">
          ${ICONS.plus} Add to Cart
        </button>
      </div>
    `;
    this.openBottomSheet();
  }

  openBottomSheet() {
    this.sheetOverlay.classList.add('active');
  }

  closeBottomSheet() {
    this.sheetOverlay.classList.remove('active');
  }

  toggleFluidMode() {
    const wrapper = document.getElementById('deviceWrapper');
    if (wrapper) {
      wrapper.classList.toggle('fluid-mode');
    }
  }
}

window.app = new GrashaApp();
