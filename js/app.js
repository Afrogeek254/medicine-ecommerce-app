/**
 * Grasha Pharma (GrashaPhama) Mobile Application Controller
 * High-End Glossy Theme • Mobile-First Responsive Layout • Google Maps Order Tracking
 * Google Account Authentication • MySQL Database Synchronization
 * Regulated by Pharmacy and Poisons Board (PPB Kenya) | CAP. 499, section 14 (2)
 */

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
  camera: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  upload: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  cold: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  send: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  database: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
};

class GrashaApp {
  constructor() {
    this.contentEl = document.getElementById('appContent');
    this.sheetOverlay = document.getElementById('bottomSheetOverlay');
    this.sheetBody = document.getElementById('sheetBody');
    this.uploadedImageBase64 = null;
    this.googleMapInstance = null;
    this.riderMarker = null;
    this.riderMoveInterval = null;
    this.init();
  }

  init() {
    window.store.subscribe(state => this.render(state));
    this.render(window.store.state);
  }

  render(state) {
    this.updateHeader(state);
    this.updateBottomNav(state.activeView, state);

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

  // ================================================================
  // AVATAR HEADER (Clean, Uncrowded, Role-Strict)
  // Patient: Avatar + Name ONLY (Click opens Patient Account)
  // Admin: Sales, Stocks, Admin Name, WhatsApp Bot ONLY
  // Guest: Brand Logo + Sign In Button
  // ================================================================
  updateHeader(state) {
    const header = document.getElementById('appHeader');
    if (!header) return;

    const user = state.currentUser;
    const totals = window.store.getCartTotals();

    // 1. Guest Profile Header
    if (!user) {
      header.innerHTML = `
        <div class="header-brand-logo" onclick="app.navigateTo('home')">
          <div class="brand-logo-pill">💊 GrashaPhama</div>
          <span class="ppb-badge">🇰🇪 PPB #3912</span>
        </div>
        <div class="header-actions">
          <button class="btn-login-header" onclick="app.openAuthModal('header')">Sign In</button>
        </div>
      `;
      return;
    }

    // 2. Admin Profile Header: Sales, Stocks, Admin Name, WhatsApp Bot ONLY
    if (user.role === 'admin') {
      const adminShortName = user.name.replace('Pharm. ', '').split(' ')[0];
      header.innerHTML = `
        <div class="header-admin-box" onclick="app.navigateTo('profile')" title="Admin Operations Portal">
          <div class="header-admin-avatar">🛡️</div>
          <div class="header-admin-name">Pharm. ${adminShortName}</div>
        </div>
        <div class="header-admin-actions">
          <button class="hdr-admin-btn sales-btn" onclick="app.openAdminTab('sales')" title="Live Sales & Revenue">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Sales</span>
          </button>
          <button class="hdr-admin-btn stock-btn" onclick="app.openAdminTab('stock')" title="Medicine Stocks">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>Stocks</span>
          </button>
          <button class="hdr-admin-btn wa-btn" onclick="app.navigateTo('whatsapp')" title="WhatsApp Desk">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp</span>
          </button>
        </div>
      `;
      return;
    }

    // 3. Patient Profile Header: Avatar + Patient Name ONLY, Cart button on right
    const avatarHtml = user.avatar && user.avatar.startsWith('http')
      ? `<img src="${user.avatar}" alt="Avatar" onerror="this.parentElement.textContent='👩'">`
      : (user.avatar || '👩');

    header.innerHTML = `
      <div class="header-patient-box" onclick="app.navigateTo('profile')" title="Patient Account & Features">
        <div class="header-patient-avatar">${avatarHtml}</div>
        <div class="header-patient-name">${user.name}</div>
      </div>
      <div class="header-actions">
        <button class="hdr-cart-btn" onclick="app.navigateTo('cart')" title="View Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          ${totals.totalItemsCount > 0 ? `<span class="cart-badge">${totals.totalItemsCount}</span>` : ''}
        </button>
      </div>
    `;
  }

  // ================================================================
  // BOTTOM NAVIGATION BAR
  // ================================================================
  updateBottomNav(activeView, state) {
    const bottomNav = document.getElementById('bottomNav');
    if (!bottomNav) return;

    const isAdmin = state.currentUser && state.currentUser.role === 'admin';

    if (isAdmin) {
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
        <button class="nav-item ${activeView === 'whatsapp' ? 'active' : ''}" data-view="whatsapp" onclick="app.navigateTo('whatsapp')">
          <div class="nav-icon" style="color:#25d366;">${ICONS.whatsapp}</div>
          <span class="nav-label">Chat</span>
        </button>
        <button class="nav-item ${activeView === 'profile' || activeView === 'admin' ? 'active' : ''}" data-view="profile" onclick="app.navigateTo('profile')">
          <div class="nav-icon">${ICONS.shield}</div>
          <span class="nav-label">Portal</span>
        </button>
      `;
    } else {
      const totals = window.store.getCartTotals();
      bottomNav.innerHTML = `
        <button class="nav-item ${activeView === 'home' ? 'active' : ''}" data-view="home" onclick="app.navigateTo('home')">
          <div class="nav-icon">${ICONS.home}</div>
          <span class="nav-label">Store</span>
        </button>
        <button class="nav-item ${activeView === 'rx' ? 'active' : ''}" data-view="rx" onclick="app.navigateTo('rx')">
          <div class="nav-icon">${ICONS.rx}</div>
          <span class="nav-label">Rx</span>
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
        <button class="nav-item ${activeView === 'profile' ? 'active' : ''}" data-view="profile" onclick="app.navigateTo('profile')">
          <div class="nav-icon">${ICONS.shield}</div>
          <span class="nav-label">Account</span>
        </button>
      `;
    }
  }

  // ================================================================
  // VIEW: HOME PHARMACY STORE
  // ================================================================
  renderHomeView(state) {
    const allMeds = state.medicines;
    const interactions = window.store.detectInteractions();

    const filteredMeds = allMeds.filter(m => {
      const matchCat = state.selectedCategory === 'all' || m.category === state.selectedCategory;
      const matchQuery = !state.searchQuery || 
        m.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        m.genericName.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });

    let html = `
      <!-- Glossy Hero Card -->
      <div class="glossy-hero-card">
        <div style="font-size:11px; font-weight:800; background:rgba(255,255,255,0.22); padding:3px 10px; border-radius:12px; display:inline-block; margin-bottom:8px; border:1px solid rgba(255,255,255,0.4);">
          🇰🇪 GRASHA PHARMA • EST. APRIL 2013
        </div>
        <h2 style="font-size:19px; font-weight:900; line-height:1.2; text-shadow:0 1px 2px rgba(0,0,0,0.15);">
          Kenya's Trusted Online Pharmacy Delivery
        </h2>
        <p style="font-size:11.5px; color:#e0f2fe; margin-top:5px; line-height:1.4;">
          Nairobi Express Fleet (2-4 hrs) • Countrywide G4S/Fargo (24 hrs) • Cold-Chain Insulins & Biologics
        </p>

        <div style="display:flex; gap:8px; margin-top:14px;">
          <button onclick="app.navigateTo('rx')" style="background:#ffffff; color:var(--primary-dark); border:none; padding:8px 14px; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.15);">
            📄 Upload Prescription (Rx)
          </button>
          <button onclick="app.navigateTo('tracking')" style="background:rgba(255,255,255,0.2); color:#ffffff; border:1px solid rgba(255,255,255,0.5); padding:8px 14px; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; cursor:pointer;">
            📍 Live Maps Tracking
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-bar-glossy">
        <span class="search-icon">${ICONS.search}</span>
        <input 
          type="text" 
          placeholder="Search medicines, paracetamol, insulins..." 
          value="${state.searchQuery || ''}"
          oninput="app.handleSearchInput(this.value)"
        />
      </div>

      <!-- Drug Interaction Alert (Clinical Safety) -->
      ${interactions.length > 0 ? `
        <div style="background:#fef2f2; border:1.5px solid #ef4444; border-radius:var(--radius-md); padding:12px; margin-bottom:14px; box-shadow:var(--shadow-sm);">
          <div style="color:#991b1b; font-weight:800; font-size:12px; display:flex; align-items:center; gap:6px;">
            ⚠️ Clinical Warning: Drug Interaction in Cart
          </div>
          ${interactions.map(it => `
            <div style="font-size:11px; color:#7f1d1d; margin-top:4px;">
              <strong>${it.drugNames}</strong>: ${it.message}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Categories Pills -->
      <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:10px; margin-bottom:14px; -webkit-overflow-scrolling:touch;">
        ${[
          { id: 'all', name: 'All Products', icon: '💊' },
          { id: 'prescription', name: 'Prescription (Rx)', icon: '📋' },
          { id: 'cold_chain', name: 'Cold-Chain', icon: '❄️' },
          { id: 'chronic', name: 'Chronic Care', icon: '❤️' },
          { id: 'pain_relief', name: 'Pain Relief', icon: '🩹' },
          { id: 'devices', name: 'Diagnostics', icon: '🩺' },
          { id: 'wellness', name: 'Wellness', icon: '🌿' }
        ].map(cat => `
          <button 
            onclick="app.handleCategorySelect('${cat.id}')"
            style="white-space:nowrap; padding:7px 13px; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; cursor:pointer; border:1px solid ${state.selectedCategory === cat.id ? 'var(--primary)' : 'rgba(2,132,199,0.15)'}; background:${state.selectedCategory === cat.id ? 'var(--primary-gradient)' : '#ffffff'}; color:${state.selectedCategory === cat.id ? '#ffffff' : 'var(--text-main)'}; box-shadow:${state.selectedCategory === cat.id ? 'var(--shadow-gloss)' : 'var(--shadow-sm)'};"
          >
            <span>${cat.icon} ${cat.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Medicine Products Grid -->
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:12px;">
        ${filteredMeds.map(med => {
          const inCart = state.cart.find(i => i.medicineId === med.id);
          return `
            <div class="glossy-card" style="padding:12px; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden;">
              ${med.temperatureControlled ? `
                <div style="position:absolute; top:8px; right:8px; background:#e0f2fe; color:#0369a1; font-size:9.5px; font-weight:800; padding:2px 6px; border-radius:8px; display:flex; align-items:center; gap:3px;">
                  ❄️ 2-8°C
                </div>
              ` : (med.isRx ? `
                <div style="position:absolute; top:8px; right:8px; background:#fef3c7; color:#92400e; font-size:9.5px; font-weight:800; padding:2px 6px; border-radius:8px;">
                  Rx Slip
                </div>
              ` : '')}

              <div onclick="app.openMedicineDetail('${med.id}')" style="cursor:pointer; text-align:center;">
                <img src="${med.image}" style="width:100%; height:110px; object-fit:contain; border-radius:8px; margin-bottom:8px;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
                <h4 style="font-size:12.5px; font-weight:800; color:var(--text-main); line-height:1.2; text-align:left; min-height:30px;">
                  ${med.name}
                </h4>
                <p style="font-size:10.5px; color:var(--text-muted); text-align:left; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                  ${med.genericName}
                </p>
              </div>

              <div style="margin-top:10px;">
                <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
                  <span style="font-size:14px; font-weight:900; color:var(--primary-dark);">
                    KSh ${med.price.toLocaleString()}
                  </span>
                  <span style="font-size:9.5px; color:#059669; font-weight:700;">
                    ${med.stockCount > 15 ? 'In Stock' : (med.stockCount > 0 ? 'Low (' + med.stockCount + ')' : 'Out of Stock')}
                  </span>
                </div>

                ${inCart ? `
                  <div style="display:flex; align-items:center; justify-content:space-between; background:var(--primary-light); border-radius:20px; padding:3px 8px;">
                    <button onclick="app.updateCartQty('${med.id}', -1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.minus}</button>
                    <span style="font-size:12px; font-weight:800; color:var(--primary-dark);">${inCart.quantity}</span>
                    <button onclick="app.updateCartQty('${med.id}', 1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.plus}</button>
                  </div>
                ` : `
                  <button 
                    onclick="app.addToCart('${med.id}')"
                    style="width:100%; background:var(--primary-gradient); color:#fff; border:none; padding:7px 0; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; cursor:pointer; box-shadow:var(--shadow-gloss);"
                  >
                    + Add to Cart
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  // ================================================================
  // VIEW: CART & CHECKOUT (PROMPTS LOGIN BEFORE PURCHASE)
  // ================================================================
  renderCartView(state) {
    const totals = window.store.getCartTotals();
    const interactions = window.store.detectInteractions();
    const rxSelected = state.prescriptions.find(p => p.id === state.selectedPrescriptionId);

    if (state.cart.length === 0) {
      this.contentEl.innerHTML = `
        <div style="text-align:center; padding:60px 20px;">
          <div style="font-size:54px; margin-bottom:12px;">🛒</div>
          <h3 style="font-size:17px; font-weight:800; margin-bottom:6px;">Your Medical Cart is Empty</h3>
          <p style="font-size:12.5px; color:#64748b; margin-bottom:24px;">Browse Kenyan pharmacy essentials, chronic care medicines, or upload your doctor's prescription slip.</p>
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
          <div style="color:#991b1b; font-weight:800; font-size:12px;">⚠️ Clinical Warning: Drug Interaction Detected</div>
          ${interactions.map(it => `
            <div style="font-size:11px; color:#7f1d1d; margin-top:3px;">
              <strong>${it.drugNames}</strong>: ${it.message}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Cart Items List -->
      <div style="margin-bottom:16px;">
        ${state.cart.map(item => {
          const med = window.store.getMedicineById(item.medicineId);
          if (!med) return '';
          return `
            <div class="glossy-card" style="padding:12px; margin-bottom:10px; display:flex; gap:12px; align-items:center;">
              <img src="${med.image}" style="width:48px; height:48px; object-fit:contain; border-radius:6px; border:1px solid #e2e8f0; padding:2px;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
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
            <p style="font-size:11px; color:#334155;">Verified for <strong>${rxSelected.patientName}</strong> (${rxSelected.doctorName} • ${rxSelected.clinic}).</p>
          ` : `
            <p style="font-size:11px; color:#b45309;">Your cart contains prescription items. Please attach a prescription above to enable checkout.</p>
          `}
        </div>
      ` : ''}

      <!-- Delivery Route Selection -->
      <div class="glossy-card" style="padding:14px; margin-bottom:14px;">
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

      <!-- Payment Method Selection -->
      <div class="glossy-card" style="padding:14px; margin-bottom:14px;">
        <span style="font-size:13px; font-weight:800; display:block; margin-bottom:8px;">Select Payment Option</span>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px;">
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

      <!-- Price Breakdown -->
      <div class="glossy-card" style="padding:14px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:12.5px; color:#64748b; margin-bottom:6px;">
          <span>Subtotal</span>
          <span>KSh ${totals.subtotal.toLocaleString()}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:12.5px; color:#64748b; margin-bottom:8px;">
          <span>Delivery</span>
          <span style="font-weight:700;">${totals.deliveryFee === 0 ? 'FREE' : 'KSh ' + totals.deliveryFee.toLocaleString()}</span>
        </div>
        <div style="border-top:1px dashed var(--border-color); padding-top:10px; display:flex; justify-content:space-between; font-size:16px; font-weight:900; color:var(--text-main);">
          <span>Total Payable</span>
          <span style="color:var(--primary-dark);">KSh ${totals.finalTotal.toLocaleString()}</span>
        </div>
      </div>

      <!-- Checkout Flow: Intercepted by handleCheckoutIntent to ensure user is logged in before purchase -->
      ${state.paymentMethod === 'mpesa' ? `
        <button 
          class="btn-mpesa-action" 
          ${totals.hasRxItems && !rxSelected ? 'disabled style="opacity:0.6;"' : ''} 
          onclick="app.handleCheckoutIntent('mpesa')"
        >
          <span>📱 Pay KSh ${totals.finalTotal.toLocaleString()} with Lipa Na M-Pesa</span>
        </button>
      ` : (state.paymentMethod === 'card' ? `
        <button 
          class="btn-card-action" 
          ${totals.hasRxItems && !rxSelected ? 'disabled style="opacity:0.6;"' : ''} 
          onclick="app.handleCheckoutIntent('card')"
        >
          <span>💳 Pay KSh ${totals.finalTotal.toLocaleString()} via Credit/Debit Card</span>
        </button>
      ` : `
        <button 
          class="btn-cod-action" 
          ${totals.hasRxItems && !rxSelected ? 'disabled style="opacity:0.6;"' : ''} 
          onclick="app.handleCheckoutIntent('cod')"
        >
          <span>💵 Confirm Order - Pay KSh ${totals.finalTotal.toLocaleString()} on Delivery</span>
        </button>
      `)}
    `;

    this.contentEl.innerHTML = html;
  }

  /**
   * Enforce Authentication Before Purchase
   */
  handleCheckoutIntent(paymentMethod) {
    sounds.playTap();
    const user = window.store.state.currentUser;

    // 1. User is not logged in: Prompt to Sign In before completing purchase!
    if (!user) {
      window.store.state.pendingCheckoutMethod = paymentMethod;
      this.openAuthModal('checkout');
      return;
    }

    // 2. User is logged in as Admin: Admin accounts cannot place customer orders
    if (user.role === 'admin') {
      alert('🛡️ You are currently signed in as an Admin Pharmacist.\n\nMedicine delivery orders must be placed under a Patient profile.');
      return;
    }

    // 3. User is logged in as Patient: Proceed with purchase!
    if (paymentMethod === 'mpesa') {
      this.openMpesaModal();
    } else if (paymentMethod === 'card') {
      this.openCardModal();
    } else {
      this.openCodModal();
    }
  }

  // ================================================================
  // GOOGLE MAPS LIVE ORDER TRACKING
  // ================================================================
  renderTrackingView(state) {
    const order = state.activeOrder || state.orders[0];
    if (!order) {
      this.contentEl.innerHTML = `
        <div style="padding:40px 20px; text-align:center;">
          <div style="font-size:48px;">📦</div>
          <h3 style="font-size:16px; font-weight:800; margin-top:10px;">No Active Orders</h3>
          <p style="font-size:12px; color:#64748b; margin-top:4px;">Place an order from the pharmacy catalog to track live dispatch on Google Maps.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="glossy-card" style="padding:16px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <span style="font-size:11px; font-weight:800; color:#64748b;">ORDER #${order.id}</span>
            <h3 style="font-size:16.5px; font-weight:900; color:#0f172a; margin-top:2px;">${order.status}</h3>
          </div>
          <span style="font-size:11px; font-weight:800; background:#e0f2fe; color:var(--primary-dark); padding:4px 10px; border-radius:20px;">
            ${order.deliverySpeed}
          </span>
        </div>

        <!-- Interactive Google Maps Container -->
        <div class="map-track-container" id="googleMapTrack">
          <div class="map-overlay-badge">
            <span class="live-pulse-dot"></span>
            <span>LIVE GPS • ${order.riderName}</span>
          </div>

          <a 
            href="https://www.google.com/maps/dir/?api=1&origin=-1.2921,36.8219&destination=-1.2644,36.8030" 
            target="_blank" 
            class="map-directions-btn"
          >
            <span>🗺️ Google Maps</span>
          </a>
        </div>

        <!-- Dynamic ETA Badge -->
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:12px; font-weight:800; color:var(--primary-dark);">
            ⏱️ Estimated Arrival: <strong>~${order.etaMinutes || 18} mins</strong>
          </span>
          <span style="font-size:11px; color:#059669; font-weight:700;">Nairobi Traffic: Normal</span>
        </div>

        <!-- Dispatch Milestones Timeline -->
        <div style="margin:16px 0 14px 4px;">
          <div style="display:flex; gap:12px; margin-bottom:12px; position:relative;">
            <div style="width:20px; height:20px; border-radius:50%; background:#059669; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; flex-shrink:0;">✓</div>
            <div>
              <div style="font-size:12px; font-weight:800; color:#0f172a;">Order Confirmed & Paid via Lipa Na M-Pesa</div>
              <div style="font-size:10px; color:#64748b;">Payment Ref: ${order.mpesaCode || 'QK91823719X'}</div>
            </div>
          </div>

          <div style="display:flex; gap:12px; margin-bottom:12px;">
            <div style="width:20px; height:20px; border-radius:50%; background:#059669; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; flex-shrink:0;">✓</div>
            <div>
              <div style="font-size:12px; font-weight:800; color:#0f172a;">Prescription Verified by PPB Chief Pharmacist #3912</div>
              <div style="font-size:10px; color:#64748b;">Dispensed from Upper Hill Central Hub</div>
            </div>
          </div>

          <div style="display:flex; gap:12px; margin-bottom:12px;">
            <div style="width:20px; height:20px; border-radius:50%; background:#0284c7; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; flex-shrink:0;">🛵</div>
            <div>
              <div style="font-size:12px; font-weight:800; color:var(--primary-dark);">Rider Picked Up &amp; En Route via Waiyaki Way</div>
              <div style="font-size:10px; color:#64748b;">Courier: ${order.riderName} (${order.riderPhone})</div>
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            <div style="width:20px; height:20px; border-radius:50%; background:#e2e8f0; color:#64748b; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold; flex-shrink:0;">🏠</div>
            <div>
              <div style="font-size:12px; font-weight:700; color:#64748b;">Delivery to ${order.deliveryAddress || 'Westlands, Nairobi'}</div>
              <div style="font-size:10px; color:#94a3b8;">Original physical Rx slip collected on handover (PPB Law)</div>
            </div>
          </div>
        </div>

        <!-- Cold Chain IoT Sensor Telemetry -->
        ${order.temperatureReading ? `
          <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center; font-size:11.5px; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:6px; color:#0d9488; font-weight:800;">
              ${ICONS.cold} Insulin Cooler Telemetry:
            </div>
            <strong style="color:#0f766e; font-size:13px;">${order.temperatureReading}</strong>
          </div>
        ` : ''}

        <!-- Courier Contact Card -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #cbd5e1; padding-top:12px;">
          <div>
            <div style="font-size:13px; font-weight:800; color:#0f172a;">${order.riderName}</div>
            <div style="font-size:10.5px; color:#64748b;">${order.courier}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button onclick="window.open('tel:${order.riderPhone}')" style="background:var(--primary-gradient); color:#fff; border:none; padding:8px 14px; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; cursor:pointer; box-shadow:var(--shadow-gloss);">
              📞 Call Rider
            </button>
            <button onclick="window.open('https://wa.me/254722840192?text=Hello%20Samuel,%20tracking%20order%20${order.id}')" style="background:#25d366; color:#fff; border:none; padding:8px 12px; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; cursor:pointer;">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;

    this.contentEl.innerHTML = html;
    this.initGoogleMapForTracking(order);
  }

  initGoogleMapForTracking(order) {
    setTimeout(() => {
      const mapEl = document.getElementById('googleMapTrack');
      if (!mapEl) return;

      const nairobiPharmacy = { lat: -1.2921, lng: 36.8219 }; // Upper Hill Hub
      const customerDestination = { lat: -1.2644, lng: 36.8030 }; // Westlands Destination
      let riderPos = { lat: -1.2780, lng: 36.8120 }; // En route

      if (window.google && window.google.maps) {
        try {
          const map = new google.maps.Map(mapEl, {
            zoom: 13,
            center: { lat: -1.278, lng: 36.812 },
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
            ]
          });
          this.googleMapInstance = map;

          // Pharmacy Hub Marker
          new google.maps.Marker({
            position: nairobiPharmacy,
            map: map,
            title: 'Grasha Pharma Central Distribution Hub (Upper Hill)'
          });

          // Customer Destination Marker
          new google.maps.Marker({
            position: customerDestination,
            map: map,
            title: 'Your Delivery Address (Westlands)'
          });

          // Rider Moving Marker
          this.riderMarker = new google.maps.Marker({
            position: riderPos,
            map: map,
            title: 'Grasha Courier 🛵 ' + order.riderName
          });

          // Route Polyline
          new google.maps.Polyline({
            path: [nairobiPharmacy, riderPos, customerDestination],
            geodesic: true,
            strokeColor: '#0284c7',
            strokeOpacity: 0.85,
            strokeWeight: 4,
            map: map
          });
          return;
        } catch (e) {
          console.warn('Google Maps JS error, loading fallback view:', e);
        }
      }

      // Reliable Interactive Map Fallback (Always works offline & in sandbox)
      mapEl.innerHTML = `
        <iframe 
          src="https://www.openstreetmap.org/export/embed.html?bbox=36.7800,-1.3100,36.8400,-1.2550&layer=mapnik&marker=-1.2780,36.8120" 
          style="width:100%; height:100%; border:0;" 
          loading="lazy">
        </iframe>
        <div class="map-overlay-badge">
          <span class="live-pulse-dot"></span>
          <span>LIVE GPS • ${order.riderName}</span>
        </div>
        <a 
          href="https://www.google.com/maps/dir/?api=1&origin=-1.2921,36.8219&destination=-1.2644,36.8030" 
          target="_blank" 
          class="map-directions-btn"
        >
          <span>🗺️ Open in Google Maps</span>
        </a>
      `;
    }, 200);
  }

  // ================================================================
  // SEPARATE CUSTOMER PROFILE & ADMIN PROFILE VIEWS
  // ================================================================
  renderProfileView(state) {
    const user = state.currentUser;

    // 1. Guest / Logged Out: Prompt Sign-In
    if (!user) {
      this.contentEl.innerHTML = `
        <div class="glossy-card" style="text-align:center; padding:32px 18px; margin-bottom:16px;">
          <div style="font-size:46px; margin-bottom:10px;">🔐</div>
          <h3 style="font-size:18px; font-weight:900; color:var(--primary-dark);">Sign In to GrashaPhama</h3>
          <p style="font-size:12px; color:#64748b; margin-top:4px; margin-bottom:20px;">
            Sign in to track orders on Google Maps, manage prescriptions, and receive M-Pesa receipts.
          </p>
          <button class="btn-primary-action" onclick="app.openAuthModal('profile')">
            Sign In with Google or Email
          </button>
        </div>
      `;
      return;
    }

    // 2. Admin Operations Portal View
    if (user.role === 'admin') {
      const stats = window.store.getAdminStats();
      const mySql = state.mySqlStatus;
      this.contentEl.innerHTML = `
        <!-- Admin Profile Header Card -->
        <div style="background:linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color:#fff; border-radius:var(--radius-lg); padding:20px; margin-bottom:16px; box-shadow:var(--shadow-gloss);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <div style="font-size:10.5px; font-weight:800; background:rgba(255,255,255,0.2); padding:3px 8px; border-radius:12px; display:inline-block; margin-bottom:6px;">
                🛡️ CHIEF PHARMACIST & ADMIN
              </div>
              <h2 style="font-size:18px; font-weight:900;">${user.name}</h2>
              <p style="font-size:11.5px; color:#bfdbfe; margin-top:2px;">PPB Registration: <strong>PPB #3912</strong> • Clinical Operations</p>
              <p style="font-size:10.5px; color:#93c5fd; margin-top:2px;">${user.email}</p>
            </div>
            <button onclick="app.logoutUser()" style="background:rgba(239,68,68,0.25); color:#fee2e2; border:1px solid rgba(239,68,68,0.5); padding:6px 12px; border-radius:var(--radius-full); font-size:11px; font-weight:800; cursor:pointer;">
              Sign Out
            </button>
          </div>
        </div>

        <!-- Quick Admin Navigation -->
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin-bottom:16px;">
          <button onclick="app.openAdminTab('sales')" style="background:#ffffff; border:1.5px solid var(--border-color); border-radius:var(--radius-md); padding:12px 6px; text-align:center; cursor:pointer; box-shadow:var(--shadow-sm);">
            <div style="font-size:18px;">📊</div>
            <div style="font-size:11.5px; font-weight:800; color:#b45309; margin-top:4px;">Sales</div>
            <div style="font-size:10px; color:#64748b;">KSh ${stats.totalRevenue.toLocaleString()}</div>
          </button>
          <button onclick="app.openAdminTab('stock')" style="background:#ffffff; border:1.5px solid var(--border-color); border-radius:var(--radius-md); padding:12px 6px; text-align:center; cursor:pointer; box-shadow:var(--shadow-sm);">
            <div style="font-size:18px;">📦</div>
            <div style="font-size:11.5px; font-weight:800; color:#0284c7; margin-top:4px;">Stock</div>
            <div style="font-size:10px; color:#64748b;">${stats.totalStockUnits} Units</div>
          </button>
          <button onclick="app.navigateTo('whatsapp')" style="background:#ffffff; border:1.5px solid var(--border-color); border-radius:var(--radius-md); padding:12px 6px; text-align:center; cursor:pointer; box-shadow:var(--shadow-sm);">
            <div style="font-size:18px;">💬</div>
            <div style="font-size:11.5px; font-weight:800; color:#059669; margin-top:4px;">WhatsApp</div>
            <div style="font-size:10px; color:#64748b;">Desk</div>
          </button>
        </div>

        <!-- MySQL Database Console Widget -->
        <div class="glossy-card" style="padding:16px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">🗄️</span>
              <h4 style="font-size:13.5px; font-weight:800; color:var(--text-main);">MySQL Database Storage</h4>
            </div>
            <span style="font-size:10.5px; font-weight:800; padding:3px 8px; border-radius:var(--radius-full); ${mySql.connected ? 'background:#dcfce7; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}">
              ${mySql.connected ? '● MySQL Connected' : '● Local Cache (MySQL Ready)'}
            </span>
          </div>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px; font-size:11.5px; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#64748b;">Database:</span>
              <strong>${mySql.database} (Port ${mySql.port})</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span style="color:#64748b;">Tables:</span>
              <span>users (${state.users.length}), medicines (${state.medicines.length}), orders (${state.adminOrders.length})</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748b;">Engine:</span>
              <span>InnoDB • UTF8MB4 • schema.sql &amp; seed.sql</span>
            </div>
          </div>

          <div style="display:flex; gap:8px;">
            <button onclick="app.downloadSqlDump()" style="flex:1; background:var(--primary-gradient); color:#fff; border:none; padding:8px 12px; border-radius:8px; font-size:11px; font-weight:800; cursor:pointer;">
              💾 Export SQL Dump
            </button>
            <button onclick="app.checkDatabaseConnection()" style="background:#ffffff; border:1.5px solid var(--border-color); color:var(--primary); padding:8px 12px; border-radius:8px; font-size:11px; font-weight:800; cursor:pointer;">
              🔄 Test DB
            </button>
          </div>
        </div>

        <button class="btn-primary-action" onclick="app.navigateTo('admin')">
          Open Full Admin Operations Portal →
        </button>
      `;
      return;
    }

    // 3. Customer Profile View (Patient Account & Features)
    const activeOrder = state.activeOrder;
    this.contentEl.innerHTML = `
      <!-- Patient Profile Header Card -->
      <div style="background:var(--primary-gradient); color:#fff; border-radius:var(--radius-lg); padding:20px; margin-bottom:16px; box-shadow:var(--shadow-gloss);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="display:flex; gap:12px; align-items:center;">
            <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center; font-size:24px; border:2px solid #fff;">
              ${user.avatar || '👩'}
            </div>
            <div>
              <h2 style="font-size:17px; font-weight:900;">${user.name}</h2>
              <div style="font-size:11px; color:#e0f2fe; margin-top:2px;">
                ${user.google_email ? '✓ Connected with Google (' + user.google_email + ')' : user.email}
              </div>
              <div style="font-size:10.5px; color:#bfdbfe; margin-top:2px;">
                📱 ${user.phone} • 📍 ${user.estate || 'Westlands, Nairobi'}
              </div>
            </div>
          </div>
          <button onclick="app.logoutUser()" style="background:rgba(239,68,68,0.25); color:#fee2e2; border:1px solid rgba(239,68,68,0.5); padding:6px 12px; border-radius:var(--radius-full); font-size:11px; font-weight:800; cursor:pointer;">
            Log Out
          </button>
        </div>
      </div>

      <!-- Customer Features & Navigation Cards -->
      <div class="glossy-card" style="padding:14px; margin-bottom:12px;">
        <span style="font-size:12px; font-weight:800; color:#64748b; text-transform:uppercase; display:block; margin-bottom:10px;">
          Patient Services &amp; Management
        </span>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <!-- 1. Live Orders & Tracking -->
          <div onclick="app.navigateTo('tracking')" style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:20px;">📦</span>
              <div>
                <div style="font-size:13px; font-weight:800; color:#0f172a;">My Orders &amp; Live GPS Tracking</div>
                <div style="font-size:10.5px; color:#64748b;">
                  ${activeOrder ? 'Active: #' + activeOrder.id + ' • ' + activeOrder.status : 'Track medicine fleet on Google Maps'}
                </div>
              </div>
            </div>
            <span style="font-size:13px; font-weight:800; color:var(--primary);">Track →</span>
          </div>

          <!-- 2. My Prescriptions -->
          <div onclick="app.navigateTo('rx')" style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:20px;">📋</span>
              <div>
                <div style="font-size:13px; font-weight:800; color:#0f172a;">My Prescriptions (Rx)</div>
                <div style="font-size:10.5px; color:#64748b;">${state.prescriptions.length} doctor's slips uploaded &amp; verified</div>
              </div>
            </div>
            <span style="font-size:13px; font-weight:800; color:var(--primary);">View →</span>
          </div>

          <!-- 3. Pill & Chronic Reminders -->
          <div onclick="app.navigateTo('reminders')" style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:20px;">⏰</span>
              <div>
                <div style="font-size:13px; font-weight:800; color:#0f172a;">Daily Pill &amp; Dose Reminders</div>
                <div style="font-size:10.5px; color:#64748b;">Never miss your insulin or morning blood pressure dose</div>
              </div>
            </div>
            <span style="font-size:13px; font-weight:800; color:var(--primary);">Open →</span>
          </div>

          <!-- 4. WhatsApp Pharmacist Chat -->
          <div onclick="app.navigateTo('whatsapp')" style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:20px;">💬</span>
              <div>
                <div style="font-size:13px; font-weight:800; color:#059669;">WhatsApp Pharmacist Consultation</div>
                <div style="font-size:10.5px; color:#64748b;">Consult licensed PPB pharmacists on WhatsApp (+254 722 840 192)</div>
              </div>
            </div>
            <span style="font-size:13px; font-weight:800; color:#059669;">Chat →</span>
          </div>
        </div>
      </div>

      <!-- Grasha Pharma Official Corporate Credentials -->
      <div class="glossy-card" style="padding:14px; margin-bottom:16px;">
        <h4 style="font-size:13px; font-weight:800; color:var(--primary-dark); margin-bottom:6px;">
          🇰🇪 OFFICIAL PPB REGULATION CREDENTIALS
        </h4>
        <div style="font-size:11.5px; color:#334155; line-height:1.5;">
          <div>• <strong>Legal Registration:</strong> Companies Act of Kenya (CAP. 499, section 14 (2))</div>
          <div>• <strong>Regulatory Authority:</strong> Pharmacy and Poisons Board (PPB Kenya)</div>
          <div>• <strong>Licensed Since:</strong> April 2013 • Main Micro-Hub Nairobi</div>
        </div>
      </div>
    `;
  }

  // ================================================================
  // AUTHENTICATION MODAL (GOOGLE ACCOUNT & EMAIL SIGN-IN)
  // ================================================================
  openAuthModal(reason = 'default') {
    sounds.playTap();
    const user = window.store.state.currentUser;

    if (user) {
      // If user is already logged in, show account summary and logout button
      this.sheetBody.innerHTML = `
        <div style="text-align:center; margin-bottom:16px;">
          <div style="font-size:42px; margin-bottom:6px;">${user.avatar || '👩'}</div>
          <h3 style="font-size:17px; font-weight:900;">${user.name}</h3>
          <p style="font-size:12px; color:var(--primary); font-weight:700;">
            ${user.role === 'admin' ? '🛡️ Grasha Chief Pharmacist & Admin' : '👩 Registered Patient Account'}
          </p>
          <p style="font-size:11.5px; color:#64748b;">${user.email} • ${user.phone}</p>
        </div>

        <button onclick="app.logoutUser()" style="width:100%; background:#fee2e2; border:1px solid #fca5a5; color:#dc2626; padding:12px; border-radius:var(--radius-md); font-size:13px; font-weight:800; cursor:pointer;">
          Log Out
        </button>
      `;
      this.openBottomSheet();
      return;
    }

    // User is logged out: Show Google Sign-in & Authentication options
    const isCheckoutPrompt = reason === 'checkout';

    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <span style="font-size:36px;">💊</span>
        <h3 style="font-size:17.5px; font-weight:900; color:#0f172a;">
          ${isCheckoutPrompt ? 'Sign In to Complete Purchase' : 'Welcome to GrashaPhama'}
        </h3>
        <p style="font-size:12px; color:#64748b; margin-top:3px;">
          ${isCheckoutPrompt 
            ? 'Please sign in with your Google Account or email to track your order live on Google Maps and receive M-Pesa receipts.' 
            : 'Sign in to access your prescriptions, live tracking on Google Maps, and Kenyan pharmacy services.'}
        </p>
      </div>

      <!-- Google Sign-In Button (Official Google Authentication Flow) -->
      <button class="btn-google-auth" onclick="app.loginWithGoogle()">
        <svg class="google-icon-svg" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        <span>Continue with Google Account</span>
      </button>

      <div style="display:flex; align-items:center; gap:10px; margin:14px 0;">
        <div style="flex:1; height:1px; background:#e2e8f0;"></div>
        <span style="font-size:11px; color:#94a3b8; font-weight:700;">OR 1-CLICK DEMO LOGIN</span>
        <div style="flex:1; height:1px; background:#e2e8f0;"></div>
      </div>

      <!-- Quick 1-Click Patient Sign-in -->
      <div class="demo-account-pill" onclick="app.quickLoginDemo('customer')">
        <div>
          <div style="font-size:12.5px; font-weight:800; color:#0f172a;">👩 Jane Wambui Kamau (Patient)</div>
          <div style="font-size:10.5px; color:#64748b;">jane.wambui@gmail.com • Westlands, Nairobi</div>
        </div>
        <span style="font-size:11.5px; font-weight:800; color:var(--primary);">Sign In →</span>
      </div>

      <!-- Quick 1-Click Admin Sign-in -->
      <div class="demo-account-pill" style="border-color:#fbbf24; background:#fefce8;" onclick="app.quickLoginDemo('admin')">
        <div>
          <div style="font-size:12.5px; font-weight:800; color:#78350f;">🛡️ Pharm. Angela Muthoni (Admin)</div>
          <div style="font-size:10.5px; color:#92400e;">admin@grashapharma.co.ke • PPB #3912</div>
        </div>
        <span style="font-size:11.5px; font-weight:800; color:#b45309;">Sign In →</span>
      </div>

      <!-- Manual Email Login Form -->
      <div style="border-top:1px solid #e2e8f0; padding-top:12px; margin-top:12px;">
        <div class="admin-form-group">
          <label>Email Address</label>
          <input type="email" id="loginEmail" placeholder="jane.wambui@gmail.com" />
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

    this.openBottomSheet();
  }

  /**
   * Google Sign-In Execution
   */
  async loginWithGoogle(emailOverride = null) {
    sounds.playSuccess();
    const email = emailOverride || 'jane.wambui@gmail.com';
    const googleProfile = {
      googleId: 'goog-' + Date.now(),
      email: email,
      name: email.includes('admin') ? 'Pharm. Angela Muthoni' : 'Jane Wambui Kamau',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      phone: '+254 712 345 678'
    };

    const res = await window.store.loginWithGoogle(googleProfile);
    this.closeBottomSheet();

    if (res.success) {
      alert(`🎉 Welcome back, ${res.user.name}!\nSigned in via Google Account (${res.user.email}).`);

      // If user was prompted to login during checkout, smoothly resume payment!
      if (window.store.state.pendingCheckoutMethod) {
        const method = window.store.state.pendingCheckoutMethod;
        setTimeout(() => {
          if (method === 'mpesa') this.openMpesaModal();
          else if (method === 'card') this.openCardModal();
          else if (method === 'cod') this.openCodModal();
        }, 300);
      }
    }
  }

  quickLoginDemo(role) {
    sounds.playSuccess();
    if (role === 'admin') {
      window.store.login('admin@grashapharma.co.ke', 'admin123');
      this.closeBottomSheet();
      alert('🛡️ Logged in as Pharm. Angela Muthoni (Chief Pharmacist & Admin). Operations portal ready.');
    } else {
      window.store.login('jane.wambui@gmail.com', 'password123');
      this.closeBottomSheet();
      alert('👩 Logged in as Jane Wambui Kamau (Patient). Storefront and prescriptions active.');
      
      // If purchase was waiting, resume payment modal!
      if (window.store.state.pendingCheckoutMethod) {
        const method = window.store.state.pendingCheckoutMethod;
        setTimeout(() => {
          if (method === 'mpesa') this.openMpesaModal();
          else if (method === 'card') this.openCardModal();
          else if (method === 'cod') this.openCodModal();
        }, 300);
      }
    }
  }

  executeManualLogin() {
    const email = document.getElementById('loginEmail')?.value;
    const pass = document.getElementById('loginPass')?.value;
    if (!email || !pass) {
      alert('Please enter your email and password.');
      return;
    }

    const res = window.store.login(email, pass);
    if (res.success) {
      sounds.playSuccess();
      this.closeBottomSheet();
      alert(`Welcome back, ${res.user.name}!`);

      if (window.store.state.pendingCheckoutMethod) {
        const method = window.store.state.pendingCheckoutMethod;
        setTimeout(() => {
          if (method === 'mpesa') this.openMpesaModal();
          else if (method === 'card') this.openCardModal();
          else if (method === 'cod') this.openCodModal();
        }, 300);
      }
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

  // ================================================================
  // MODALS: M-PESA, CARD, CASH ON DELIVERY
  // ================================================================
  openMpesaModal() {
    const totals = window.store.getCartTotals();
    const phone = window.store.state.currentUser ? window.store.state.currentUser.phone : '0712 345 678';
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <div style="width:54px; height:54px; background:#00a859; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto; box-shadow:0 4px 14px rgba(0,168,89,0.3);">
          <span style="font-size:26px; color:#fff;">📱</span>
        </div>
        <h3 style="font-size:17.5px; font-weight:900; color:#0f172a;">Lipa Na M-Pesa Online</h3>
        <p style="font-size:12px; color:#64748b; margin-top:2px;">Grasha Pharma Ltd • Paybill: <strong>891200</strong></p>
      </div>

      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:var(--radius-md); padding:14px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
          <span>Account Name</span>
          <strong>Grasha Pharma Ltd</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:14.5px; font-weight:900; color:#00a859; border-top:1px dashed #bbf7d0; padding-top:6px; margin-top:4px;">
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
        <div style="width:54px; height:54px; background:#1d4ed8; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto; box-shadow:0 4px 14px rgba(29,78,216,0.3);">
          <span style="font-size:26px; color:#fff;">💳</span>
        </div>
        <h3 style="font-size:17.5px; font-weight:900; color:#0f172a;">Credit / Debit Card Checkout</h3>
        <p style="font-size:12px; color:#64748b; margin-top:2px;">Secured by 3D-Secure 2.0 Kenyan Gateway</p>
      </div>

      <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:var(--radius-md); padding:12px; margin-bottom:14px; font-size:12.5px;">
        <div style="display:flex; justify-content:space-between; font-weight:800; color:#1e40af;">
          <span>Total Charge</span>
          <span>KSh ${totals.finalTotal.toLocaleString()}</span>
        </div>
      </div>

      <div class="admin-form-group">
        <label>Cardholder Name</label>
        <input type="text" id="cardName" value="${window.store.state.currentUser ? window.store.state.currentUser.name : 'Jane Wambui'}" />
      </div>

      <div class="admin-form-group">
        <label>Card Number</label>
        <input type="text" id="cardNumber" placeholder="4242 •••• •••• 8841" value="4242 •••• •••• 8841" />
      </div>

      <div style="display:flex; gap:10px;">
        <div class="admin-form-group" style="flex:1;">
          <label>Expiry (MM/YY)</label>
          <input type="text" id="cardExpiry" placeholder="12/28" value="12/28" />
        </div>
        <div class="admin-form-group" style="flex:1;">
          <label>CVV / CVC</label>
          <input type="password" id="cardCvv" placeholder="•••" value="882" />
        </div>
      </div>

      <button class="btn-card-action" onclick="app.executeCardPayment()">
        Authorize KSh ${totals.finalTotal.toLocaleString()}
      </button>
    `;
    this.openBottomSheet();
  }

  executeCardPayment() {
    this.closeBottomSheet();
    setTimeout(() => {
      sounds.playSuccess();
      const order = window.store.checkout('card', { cardLast4: '8841' });
      alert(`🎉 Card Payment Approved!\n\nOrder #${order.id} is being processed by Grasha Pharma.`);
    }, 400);
  }

  openCodModal() {
    const totals = window.store.getCartTotals();
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <div style="width:54px; height:54px; background:#334155; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto;">
          <span style="font-size:26px; color:#fff;">💵</span>
        </div>
        <h3 style="font-size:17.5px; font-weight:900; color:#0f172a;">Pay on Delivery (Cash / M-Pesa)</h3>
        <p style="font-size:12px; color:#64748b; margin-top:2px;">Inspect your sealed package upon courier arrival.</p>
      </div>

      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:var(--radius-md); padding:14px; margin-bottom:16px; font-size:12px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span>Deliver To:</span>
          <strong>${window.store.state.deliveryAddress.estate || 'Westlands, Nairobi'}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:900; color:var(--text-main); border-top:1px dashed #cbd5e1; padding-top:6px; margin-top:6px;">
          <span>Amount on Delivery</span>
          <span>KSh ${totals.finalTotal.toLocaleString()}</span>
        </div>
      </div>

      <button class="btn-cod-action" onclick="app.executeCodPayment()">
        Confirm Order (Pay KSh ${totals.finalTotal.toLocaleString()} on Delivery)
      </button>
    `;
    this.openBottomSheet();
  }

  executeCodPayment() {
    this.closeBottomSheet();
    setTimeout(() => {
      sounds.playSuccess();
      const order = window.store.checkout('cod');
      alert(`🎉 Order #${order.id} Placed!\nPlease have cash or M-Pesa ready on delivery.`);
    }, 400);
  }

  // ================================================================
  // PRESCRIPTION (Rx) SCREEN & UPLOAD
  // ================================================================
  renderPrescriptionView(state) {
    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:16px; font-weight:800;">My Prescriptions (Rx)</h3>
        <button onclick="app.openPrescriptionUploadModal()" style="background:var(--primary-gradient); color:#fff; border:none; padding:7px 14px; border-radius:20px; font-size:11.5px; font-weight:800; cursor:pointer; box-shadow:var(--shadow-gloss);">
          ${ICONS.upload} + Upload New
        </button>
      </div>

      <div>
        ${state.prescriptions.map(rx => `
          <div class="glossy-card" style="padding:14px; margin-bottom:12px; cursor:pointer; border:1.5px solid ${state.selectedPrescriptionId === rx.id ? 'var(--primary)' : 'rgba(255,255,255,0.85)'};" onclick="app.selectPrescription('${rx.id}')">
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

            <div style="border-top:1px dashed var(--border-color); padding-top:8px; margin-top:8px;">
              <span style="font-size:10.5px; font-weight:700; color:#475569;">Medicines Verified:</span>
              <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">
                ${rx.medicinesListed.map(m => `
                  <span style="background:var(--primary-light); color:var(--primary-dark); font-size:10.5px; font-weight:700; padding:2px 8px; border-radius:6px;">${m}</span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  openPrescriptionUploadModal() {
    sounds.playTap();
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <span style="font-size:36px;">📄</span>
        <h3 style="font-size:17px; font-weight:900;">Upload Doctor's Prescription</h3>
        <p style="font-size:11.5px; color:#64748b; margin-top:2px;">Reviewed by licensed Kenya PPB Pharmacists in under 5 minutes.</p>
      </div>

      <div class="admin-form-group">
        <label>Doctor's Full Name &amp; KMPDC Number</label>
        <input type="text" id="rxDoctor" placeholder="Dr. Patrick Ndung'u, MBChB (KMPDC #8812)" />
      </div>

      <div class="admin-form-group">
        <label>Hospital or Clinic Name</label>
        <input type="text" id="rxClinic" placeholder="Aga Khan University Hospital, Nairobi" />
      </div>

      <div class="admin-form-group">
        <label>Select Photo of Paper Slip</label>
        <input type="file" id="rxFile" accept="image/*" />
      </div>

      <button class="btn-primary-action" onclick="app.executePrescriptionUpload()">
        Submit for PPB Verification
      </button>
    `;
    this.openBottomSheet();
  }

  executePrescriptionUpload() {
    const doctor = document.getElementById('rxDoctor')?.value || 'Dr. Patrick Ndung\'u, MBChB';
    const clinic = document.getElementById('rxClinic')?.value || 'Aga Khan University Hospital';

    sounds.playSuccess();
    const newRx = window.store.uploadPrescription({ doctorName: doctor, clinic: clinic });
    this.closeBottomSheet();
    alert(`✓ Prescription #${newRx.id} uploaded and verified!\nRemember to hand physical slip to rider on delivery.`);
  }

  selectPrescription(id) {
    sounds.playTap();
    window.store.selectPrescription(id);
  }

  // ================================================================
  // REMINDERS & CHAT
  // ================================================================
  renderRemindersView(state) {
    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:16px; font-weight:800;">Pill &amp; Dose Reminders</h3>
        <button onclick="app.openAddReminderModal()" style="background:var(--primary-gradient); color:#fff; border:none; padding:7px 14px; border-radius:20px; font-size:11.5px; font-weight:800; cursor:pointer;">
          + Add Reminder
        </button>
      </div>

      <div>
        ${state.pillReminders.map(rem => `
          <div class="glossy-card" style="padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:10px; font-weight:800; color:var(--primary); background:var(--primary-light); padding:2px 6px; border-radius:4px;">
                ⏰ ${rem.time} • ${rem.period}
              </span>
              <h4 style="font-size:13.5px; font-weight:800; margin-top:4px;">${rem.name}</h4>
              <p style="font-size:11px; color:#64748b;">${rem.dosage}</p>
            </div>
            <button 
              onclick="app.toggleReminder('${rem.id}')"
              style="background:${rem.takenToday ? '#059669' : '#ffffff'}; color:${rem.takenToday ? '#ffffff' : '#64748b'}; border:1.5px solid ${rem.takenToday ? '#059669' : '#cbd5e1'}; padding:8px 14px; border-radius:20px; font-size:11.5px; font-weight:800; cursor:pointer;"
            >
              ${rem.takenToday ? '✓ Taken' : 'Mark Taken'}
            </button>
          </div>
        `).join('')}
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  toggleReminder(id) {
    sounds.playTap();
    window.store.togglePillReminder(id);
  }

  openAddReminderModal() {
    sounds.playTap();
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <span style="font-size:36px;">⏰</span>
        <h3 style="font-size:17px; font-weight:900;">Add Dose Reminder</h3>
      </div>
      <div class="admin-form-group">
        <label>Medicine Name</label>
        <input type="text" id="remName" placeholder="Glucophage XR 500mg" />
      </div>
      <div class="admin-form-group">
        <label>Dosage</label>
        <input type="text" id="remDosage" placeholder="1 Tablet with dinner" />
      </div>
      <div class="admin-form-group">
        <label>Time</label>
        <input type="time" id="remTime" value="20:00" />
      </div>
      <button class="btn-primary-action" onclick="app.executeAddReminder()">
        Save Reminder
      </button>
    `;
    this.openBottomSheet();
  }

  executeAddReminder() {
    const name = document.getElementById('remName')?.value || 'Daily Medicine';
    const dosage = document.getElementById('remDosage')?.value || '1 Tablet';
    const time = document.getElementById('remTime')?.value || '19:30';

    sounds.playSuccess();
    window.store.addPillReminder({ name, dosage, time, period: 'Daily' });
    this.closeBottomSheet();
  }

  renderWhatsAppView(state) {
    let html = `
      <div style="background:#075e54; color:#fff; border-radius:var(--radius-md) var(--radius-md) 0 0; padding:12px 16px; display:flex; align-items:center; gap:10px;">
        <div style="width:36px; height:36px; border-radius:50%; background:#25d366; display:flex; align-items:center; justify-content:center; font-size:18px;">
          👩‍⚕️
        </div>
        <div>
          <h4 style="font-size:13.5px; font-weight:800;">Grasha Pharma WhatsApp Care</h4>
          <span style="font-size:10px; color:#dcf8c6;">● Online • PPB Clinical Desk (+254 722 840 192)</span>
        </div>
      </div>

      <div id="waChatBox" style="background:#efeae2; min-height:360px; max-height:420px; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:8px;">
        ${state.whatsappMessages.map(m => `
          <div style="max-width:82%; align-self:${m.sender === 'user' ? 'flex-end' : 'flex-start'}; background:${m.sender === 'user' ? '#dcf8c6' : '#ffffff'}; padding:8px 12px; border-radius:10px; font-size:12px; line-height:1.4; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
            <div>${m.text.replace(/\n/g, '<br>')}</div>
            <span style="font-size:9.5px; color:#64748b; display:block; text-align:right; margin-top:2px;">${m.time}</span>
          </div>
        `).join('')}
      </div>

      <div style="background:#f0f2f5; padding:8px 12px; border-radius:0 0 var(--radius-md) var(--radius-md); display:flex; gap:8px;">
        <input 
          type="text" 
          id="waInput" 
          placeholder="Ask about medications, M-Pesa, deliveries..." 
          style="flex:1; border:none; border-radius:20px; padding:8px 14px; font-size:12.5px; outline:none;" 
          onkeydown="if(event.key==='Enter') app.sendWhatsApp()"
        />
        <button onclick="app.sendWhatsApp()" style="background:#075e54; color:#fff; border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">
          ${ICONS.send}
        </button>
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  sendWhatsApp() {
    const input = document.getElementById('waInput');
    const text = input?.value?.trim();
    if (!text) return;
    input.value = '';
    sounds.playTap();
    window.store.sendWhatsAppMessage(text);
  }

  // ================================================================
  // ADMIN DASHBOARD SCREEN
  // ================================================================
  renderAdminView(state) {
    const stats = window.store.getAdminStats();
    const tab = state.adminActiveTab || 'sales';
    const mySql = state.mySqlStatus;

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:16px; font-weight:900;">Admin Operations Portal</h3>
        <span style="font-size:10.5px; font-weight:800; color:#b45309; background:#fef3c7; padding:3px 8px; border-radius:12px;">
          PPB Pharmacist #3912
        </span>
      </div>

      <!-- Admin Tabs -->
      <div style="display:flex; gap:6px; margin-bottom:14px; overflow-x:auto;">
        ${[
          { id: 'sales', label: '📊 Sales' },
          { id: 'orders', label: '📦 Orders' },
          { id: 'stock', label: '💊 Stock' },
          { id: 'db', label: '🗄️ MySQL DB' }
        ].map(t => `
          <button 
            onclick="app.openAdminTab('${t.id}')"
            style="padding:7px 14px; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; cursor:pointer; border:1px solid ${tab === t.id ? 'var(--primary)' : 'var(--border-color)'}; background:${tab === t.id ? 'var(--primary-gradient)' : '#ffffff'}; color:${tab === t.id ? '#ffffff' : 'var(--text-main)'};"
          >
            ${t.label}
          </button>
        `).join('')}
      </div>
    `;

    if (tab === 'sales') {
      html += `
        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px; margin-bottom:14px;">
          <div class="glossy-card" style="padding:12px;">
            <span style="font-size:11px; color:#64748b;">Total Revenue</span>
            <div style="font-size:17px; font-weight:900; color:#059669; margin-top:4px;">
              KSh ${stats.totalRevenue.toLocaleString()}
            </div>
            <span style="font-size:10px; color:#10b981;">Lipa Na M-Pesa Confirmed</span>
          </div>
          <div class="glossy-card" style="padding:12px;">
            <span style="font-size:11px; color:#64748b;">Total Orders</span>
            <div style="font-size:17px; font-weight:900; color:var(--primary-dark); margin-top:4px;">
              ${stats.totalOrders} Orders
            </div>
            <span style="font-size:10px; color:#64748b;">Avg: KSh ${stats.averageOrderValue.toLocaleString()}</span>
          </div>
        </div>

        <div class="glossy-card" style="padding:14px;">
          <h4 style="font-size:13px; font-weight:800; margin-bottom:8px;">Recent Customer Transactions</h4>
          ${state.adminOrders.slice(0, 5).map(o => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:11.5px;">
              <div>
                <strong>#${o.id}</strong> • ${o.customerName}
                <div style="font-size:10px; color:#64748b;">${o.paymentMethod}</div>
              </div>
              <span style="font-weight:800; color:#059669;">KSh ${Number(o.total).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tab === 'orders') {
      html += `
        <div>
          ${state.adminOrders.map(o => `
            <div class="glossy-card" style="padding:12px; margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="font-size:12px; font-weight:800;">#${o.id} • ${o.customerName}</span>
                <span style="font-size:11px; font-weight:800; color:var(--primary);">${o.status}</span>
              </div>
              <div style="font-size:11px; color:#64748b; margin-bottom:8px;">
                ${o.deliveryAddress} • Total: KSh ${Number(o.total).toLocaleString()}
              </div>
              <div style="display:flex; gap:6px;">
                <button onclick="window.store.updateOrderStatus('${o.id}', 'Dispensed & Verified')" style="font-size:10.5px; padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer;">
                  Dispensed
                </button>
                <button onclick="window.store.updateOrderStatus('${o.id}', 'Out for Express Delivery')" style="font-size:10.5px; padding:4px 8px; border-radius:6px; border:1px solid #0284c7; color:#0284c7; background:#fff; cursor:pointer;">
                  Out for Delivery
                </button>
                <button onclick="window.store.updateOrderStatus('${o.id}', 'Delivered')" style="font-size:10.5px; padding:4px 8px; border-radius:6px; border:1px solid #059669; color:#059669; background:#fff; cursor:pointer;">
                  Mark Delivered
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tab === 'stock') {
      html += `
        <div class="glossy-card" style="padding:12px;">
          <h4 style="font-size:13px; font-weight:800; margin-bottom:10px;">Medicines Stock &amp; Price Control</h4>
          ${state.medicines.map(m => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:12px;">
              <div>
                <strong>${m.name}</strong>
                <div style="font-size:10.5px; color:#64748b;">KSh ${m.price.toLocaleString()} • Stock: <strong>${m.stockCount}</strong></div>
              </div>
              <div style="display:flex; gap:4px;">
                <button onclick="window.store.adjustStock('${m.id}', 10)" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; padding:4px 8px; border-radius:4px; font-size:10.5px; font-weight:700; cursor:pointer;">+10 Stock</button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tab === 'db') {
      html += `
        <div class="glossy-card" style="padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <h4 style="font-size:13.5px; font-weight:800;">MySQL Database Status</h4>
            <span style="font-size:10.5px; font-weight:800; padding:2px 7px; border-radius:4px; ${mySql.connected ? 'background:#dcfce7; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}">
              ${mySql.connected ? 'Connected' : 'Offline (Local Sync Ready)'}
            </span>
          </div>
          <p style="font-size:11.5px; color:#64748b; line-height:1.4; margin-bottom:12px;">
            Connected to <code>grasha_pharma_db</code> on port 3306. Run <code>npm run db:setup</code> and <code>npm start</code> to activate live MySQL server.
          </p>
          <div style="display:flex; gap:8px;">
            <button onclick="app.downloadSqlDump()" class="btn-primary-action" style="padding:8px 12px; font-size:11.5px;">
              💾 Export Live SQL Dump
            </button>
          </div>
        </div>
      `;
    }

    this.contentEl.innerHTML = html;
  }

  openAdminTab(tabName) {
    sounds.playTap();
    window.store.setAdminTab(tabName);
    this.navigateTo('admin');
  }

  downloadSqlDump() {
    sounds.playSuccess();
    const state = window.store.state;
    let sql = `-- Grasha Pharma Live MySQL Database Dump\n-- Generated on: ${new Date().toISOString()}\n\n`;
    sql += `USE \`grasha_pharma_db\`;\n\n`;
    
    state.medicines.forEach(m => {
      sql += `UPDATE \`medicines\` SET \`price\` = ${m.price}, \`stock_quantity\` = ${m.stockCount || 50} WHERE \`id\` = '${m.id}';\n`;
    });

    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grasha_pharma_dump_${Date.now()}.sql`;
    a.click();
    URL.revokeObjectURL(url);
    alert('✓ Live MySQL dump generated and downloaded!');
  }

  checkDatabaseConnection() {
    sounds.playTap();
    window.store.checkMySQLBackend();
    setTimeout(() => {
      alert(`Database Status: ${window.store.state.mySqlStatus.connected ? 'Connected to MySQL!' : 'Using Local Storage Cache (Start MySQL and run npm start for live backend connection).'}`);
    }, 400);
  }

  // ================================================================
  // GENERAL HELPERS & NAVIGATION
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

  addToCart(medId) {
    sounds.playSuccess();
    window.store.addToCart(medId, 1);
  }

  updateCartQty(medId, delta) {
    sounds.playTap();
    window.store.updateCartQuantity(medId, delta);
  }

  clearCart() {
    sounds.playTap();
    if (confirm('Clear all items from your cart?')) {
      window.store.clearCart();
    }
  }

  setDeliveryOption(opt) {
    sounds.playTap();
    window.store.setDeliveryOption(opt);
  }

  setPaymentMethod(pm) {
    sounds.playTap();
    window.store.setPaymentMethod(pm);
  }

  openMedicineDetail(medId) {
    sounds.playTap();
    const med = window.store.getMedicineById(medId);
    if (!med) return;

    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:14px;">
        <img src="${med.image}" style="width:120px; height:120px; object-fit:contain; border-radius:10px; border:1px solid #e2e8f0; padding:4px;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
        <h3 style="font-size:16px; font-weight:900; margin-top:8px;">${med.name}</h3>
        <p style="font-size:12px; color:var(--text-muted);">${med.genericName}</p>
        <div style="font-size:18px; font-weight:900; color:var(--primary-dark); margin-top:6px;">
          KSh ${med.price.toLocaleString()}
        </div>
      </div>

      <div style="background:#f8fafc; border-radius:8px; padding:10px 12px; font-size:11.5px; line-height:1.4; margin-bottom:14px;">
        <div><strong>Dosage Form:</strong> ${med.dosageForm || 'Oral Solids'}</div>
        <div><strong>Dosage Instructions:</strong> ${med.dosage || '1 tablet daily'}</div>
        <div><strong>Storage:</strong> ${med.temperatureControlled ? '❄️ Strict 2-8°C Cold Chain' : 'Store below 25°C'}</div>
      </div>

      <button class="btn-primary-action" onclick="app.addToCart('${med.id}'); app.closeBottomSheet();">
        Add to Medical Cart
      </button>
    `;
    this.openBottomSheet();
  }

  openBottomSheet() {
    this.sheetOverlay.classList.add('active');
  }

  closeBottomSheet() {
    this.sheetOverlay.classList.remove('active');
  }
}

window.app = new GrashaApp();
