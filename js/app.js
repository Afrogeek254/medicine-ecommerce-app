/**
 * Grasha Pharma (GrashaPhama) Responsive Web App & POS Controller
 * Ultra-Glossy Blue & White Theme • Full Desktop & Mobile Responsive Architecture
 * Point of Sale (POS) Counter System • KRA eTIMS Tax Compliance • Lipa Na M-Pesa STK Push
 * Google Account Authentication • Live Google Maps Order Tracking • Daily Sales Reports
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
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  rx: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  tracking: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  pill: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
  whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  pos: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  receipt: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  upload: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  printer: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  camera: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  cold: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>`
};

class GrashaApp {
  constructor() {
    this.contentEl = document.getElementById('appContent');
    this.sheetOverlay = document.getElementById('bottomSheetOverlay');
    this.sheetBody = document.getElementById('sheetBody');
    this.googleMapInstance = null;
    this.tempUploadedImage = null;
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
      case 'pos':
        this.renderPosView(state);
        break;
      case 'admin':
        this.renderAdminView(state);
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
      case 'mpesa-guide':
        this.renderMpesaGuideView(state);
        break;
      case 'profile':
        this.renderProfileView(state);
        break;
      default:
        this.renderHomeView(state);
    }
  }

  // ====================================================================
  // RESPONSIVE GLOSSY HEADER (DESKTOP & MOBILE)
  // ====================================================================
  updateHeader(state) {
    const header = document.getElementById('appHeader');
    if (!header) return;

    const user = state.currentUser;
    const totals = window.store.getCartTotals();
    const isAdmin = user && user.role === 'admin';
    const activeView = state.activeView;

    let userBtnHtml = '';
    if (!user) {
      userBtnHtml = `
        <button class="btn-header-signin" onclick="app.openAuthModal('header')">
          Sign In
        </button>
      `;
    } else if (isAdmin) {
      userBtnHtml = `
        <div class="patient-header-btn" onclick="app.navigateTo('pos')" title="Open POS Terminal &amp; Admin">
          <div class="header-avatar-circle" style="background:linear-gradient(135deg, #f59e0b, #d97706);">🛡️</div>
          <span class="patient-name-label">Pharm. Angela (Admin)</span>
        </div>
      `;
    } else {
      const avatarContent = user.avatar && user.avatar.startsWith('http')
        ? `<img src="${user.avatar}" alt="${user.name}">`
        : (user.avatar || '👩');
      userBtnHtml = `
        <div class="patient-header-btn" onclick="app.navigateTo('profile')" title="Patient Account">
          <div class="header-avatar-circle">${avatarContent}</div>
          <span class="patient-name-label">${user.name.split(' ')[0]}</span>
        </div>
      `;
    }

    header.innerHTML = `
      <div class="header-container">
        <!-- Brand Logo & PPB Badge -->
        <div class="header-brand" onclick="app.navigateTo('home')">
          <span class="brand-pill">💊 GrashaPhama</span>
          <span class="badge-ppb">🇰🇪 PPB #3912</span>
        </div>

        <!-- Desktop Navigation Menu Links -->
        <nav class="desktop-nav-links">
          <button class="nav-link-btn ${activeView === 'home' ? 'active' : ''}" onclick="app.navigateTo('home')">
            ${ICONS.home} Store
          </button>
          <button class="nav-link-btn ${activeView === 'rx' ? 'active' : ''}" onclick="app.navigateTo('rx')">
            ${ICONS.rx} Rx Upload
          </button>
          <button class="nav-link-btn ${activeView === 'tracking' ? 'active' : ''}" onclick="app.navigateTo('tracking')">
            ${ICONS.tracking} Live Tracking
          </button>
          <button class="nav-link-btn ${activeView === 'reminders' ? 'active' : ''}" onclick="app.navigateTo('reminders')">
            ${ICONS.pill} Dose Reminder
          </button>
          <button class="nav-link-btn pos-highlight ${activeView === 'pos' ? 'active' : ''}" onclick="app.handlePosClick()">
            ${ICONS.pos} POS Terminal
          </button>
          <button class="nav-link-btn ${activeView === 'mpesa-guide' ? 'active' : ''}" onclick="app.navigateTo('mpesa-guide')">
            📱 M-Pesa API
          </button>
        </nav>

        <!-- Live Header Search Input (Desktop) -->
        <div class="header-search-bar">
          <span class="header-search-icon">${ICONS.search}</span>
          <input 
            type="text" 
            class="header-search-input" 
            placeholder="Search paracetamol, insulin, antibiotics..." 
            value="${state.searchQuery || ''}"
            oninput="app.handleSearchInput(this.value)"
          />
        </div>

        <!-- User Profile & Cart Controls -->
        <div class="header-user-controls">
          ${userBtnHtml}

          <!-- Cart Button with Counter -->
          <button class="btn-header-cart" onclick="app.navigateTo('cart')" title="View Shopping Cart">
            ${ICONS.cart}
            ${totals.totalItemsCount > 0 ? `<span class="cart-counter-badge">${totals.totalItemsCount}</span>` : ''}
          </button>
        </div>
      </div>
    `;
  }

  handlePosClick() {
    sounds.playTap();
    const user = window.store.state.currentUser;
    if (user && user.role === 'admin') {
      window.store.setView('pos');
    } else {
      // Prompt admin login
      this.openAuthModal('pos');
    }
  }

  // ====================================================================
  // MOBILE BOTTOM NAVIGATION BAR
  // ====================================================================
  updateBottomNav(activeView, state) {
    const bottomNav = document.getElementById('bottomNav');
    if (!bottomNav) return;

    const isAdmin = state.currentUser && state.currentUser.role === 'admin';
    const totals = window.store.getCartTotals();

    if (isAdmin) {
      bottomNav.innerHTML = `
        <button class="nav-item ${activeView === 'home' ? 'active' : ''}" onclick="app.navigateTo('home')">
          <div class="nav-icon">${ICONS.home}</div>
          <span>Store</span>
        </button>
        <button class="nav-item ${activeView === 'pos' ? 'active' : ''}" onclick="app.navigateTo('pos')" style="color:#d97706;">
          <div class="nav-icon">${ICONS.pos}</div>
          <span>POS</span>
        </button>
        <button class="nav-item ${activeView === 'admin' ? 'active' : ''}" onclick="app.navigateTo('admin')">
          <div class="nav-icon">${ICONS.receipt}</div>
          <span>Reports</span>
        </button>
        <button class="nav-item ${activeView === 'whatsapp' ? 'active' : ''}" onclick="app.navigateTo('whatsapp')">
          <div class="nav-icon" style="color:#25d366;">${ICONS.whatsapp}</div>
          <span>Chat</span>
        </button>
      `;
    } else {
      bottomNav.innerHTML = `
        <button class="nav-item ${activeView === 'home' ? 'active' : ''}" onclick="app.navigateTo('home')">
          <div class="nav-icon">${ICONS.home}</div>
          <span>Store</span>
        </button>
        <button class="nav-item ${activeView === 'rx' ? 'active' : ''}" onclick="app.navigateTo('rx')">
          <div class="nav-icon">${ICONS.rx}</div>
          <span>Rx</span>
        </button>
        <button class="nav-item ${activeView === 'cart' ? 'active' : ''}" onclick="app.navigateTo('cart')">
          <div class="nav-icon" style="position:relative;">
            ${ICONS.cart}
            ${totals.totalItemsCount > 0 ? `<span class="cart-counter-badge" style="top:-6px;right:-10px;">${totals.totalItemsCount}</span>` : ''}
          </div>
          <span>Cart</span>
        </button>
        <button class="nav-item ${activeView === 'tracking' ? 'active' : ''}" onclick="app.navigateTo('tracking')">
          <div class="nav-icon">${ICONS.tracking}</div>
          <span>Track</span>
        </button>
        <button class="nav-item ${activeView === 'profile' ? 'active' : ''}" onclick="app.navigateTo('profile')">
          <div class="nav-icon">${ICONS.pill}</div>
          <span>Account</span>
        </button>
      `;
    }
  }

  // ====================================================================
  // VIEW 1: CUSTOMER FACING WEBSITE (E-COMMERCE STORE)
  // ====================================================================
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
      <!-- Website Hero Banner -->
      <section class="website-hero-banner">
        <div class="hero-grid">
          <div>
            <div class="hero-pill-badge">
              🇰🇪 OFFICIAL KENYA PHARMACY &amp; POISONS BOARD REGULATED (PPB #3912)
            </div>
            <h1 class="hero-title" style="margin-top:12px;">
              Clinical-Grade Medicine Delivery Across Kenya
            </h1>
            <p class="hero-subtitle">
              Nairobi Express Delivery within 2-4 Hours • Temperature-Monitored Insulins (2°C - 8°C) • Doctor's Prescription Upload &amp; KRA eTIMS Validated Receipts.
            </p>

            <div class="hero-badges-row">
              <span class="hero-pill-badge">⚡ Nairobi Express 2-4 Hours</span>
              <span class="hero-pill-badge">❄️ Cold-Chain Telemetry (2°C - 8°C)</span>
              <span class="hero-pill-badge">🧾 eTIMS KRA Invoicing</span>
              <span class="hero-pill-badge">📱 Lipa Na M-Pesa STK</span>
            </div>

            <div class="hero-cta-buttons">
              <button class="btn-hero-primary" onclick="app.navigateTo('rx')">
                📄 Upload Prescription (Rx Slip)
              </button>
              <button class="btn-hero-secondary" onclick="app.navigateTo('tracking')">
                🗺️ Live Google Maps Tracking
              </button>
            </div>
          </div>

          <!-- Quick Prescription Upload & POS Card -->
          <div style="background:rgba(255,255,255,0.18); backdrop-filter:blur(16px); border:1.5px solid rgba(255,255,255,0.4); border-radius:18px; padding:20px; box-shadow:0 8px 30px rgba(0,0,0,0.15);">
            <div style="font-size:12px; font-weight:800; color:#dbeafe; margin-bottom:8px;">CLINICAL QUICK DESK</div>
            <h3 style="font-size:17px; font-weight:900;">Need Prescription Verification?</h3>
            <p style="font-size:12px; color:#e0f2fe; margin-top:4px; line-height:1.4;">
              Upload your doctor's slip photo for rapid review by our licensed clinical pharmacists in under 5 minutes.
            </p>
            <div style="display:flex; gap:8px; margin-top:14px;">
              <button onclick="app.openPrescriptionUploadModal()" style="background:#ffffff; color:var(--primary-dark); border:none; padding:10px 18px; border-radius:var(--radius-full); font-size:12px; font-weight:800; cursor:pointer;">
                + Upload Photo / Slip
              </button>
              <button onclick="app.navigateTo('whatsapp')" style="background:#25d366; color:#ffffff; border:none; padding:10px 14px; border-radius:var(--radius-full); font-size:12px; font-weight:800; cursor:pointer;">
                💬 Chat WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Services Highlights Ribbon -->
      <div class="service-ribbon">
        <div class="service-pill-card">
          <div class="service-icon-box">🚚</div>
          <div class="service-text">
            <h5>Nairobi &amp; Countrywide Fleet</h5>
            <p>2-4 hrs Nairobi • 24 hrs Fargo</p>
          </div>
        </div>
        <div class="service-pill-card">
          <div class="service-icon-box">❄️</div>
          <div class="service-text">
            <h5>Cold-Chain Telemetry</h5>
            <p>2°C - 8°C Certified Coolers</p>
          </div>
        </div>
        <div class="service-pill-card">
          <div class="service-icon-box">🧾</div>
          <div class="service-text">
            <h5>KRA eTIMS Electronic Tax</h5>
            <p>Compliant invoice on every order</p>
          </div>
        </div>
        <div class="service-pill-card">
          <div class="service-icon-box">📱</div>
          <div class="service-text">
            <h5>Lipa Na M-Pesa STK</h5>
            <p>Instant phone push • Paybill 891200</p>
          </div>
        </div>
      </div>

      <!-- Clinical Drug-to-Drug Interaction Warning -->
      ${interactions.length > 0 ? `
        <div style="background:#fef2f2; border:1.5px solid #ef4444; border-radius:var(--radius-md); padding:16px; margin-bottom:20px; box-shadow:var(--shadow-sm);">
          <div style="color:#991b1b; font-weight:900; font-size:13.5px; display:flex; align-items:center; gap:8px;">
            ⚠️ Clinical Warning: Drug-to-Drug Interaction Detected in Cart
          </div>
          ${interactions.map(it => `
            <div style="font-size:12px; color:#7f1d1d; margin-top:5px; line-height:1.4;">
              <strong>${it.drugNames}</strong>: ${it.message}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Interactive Categories Pills Bar -->
      <div class="categories-bar">
        ${[
          { id: 'all', name: 'All Products', icon: '💊' },
          { id: 'prescription', name: 'Prescription (Rx)', icon: '📋' },
          { id: 'cold_chain', name: 'Cold-Chain (2-8°C)', icon: '❄️' },
          { id: 'chronic', name: 'Chronic Care', icon: '❤️' },
          { id: 'pain_relief', name: 'Pain & Fever', icon: '🩹' },
          { id: 'devices', name: 'Diagnostics & Devices', icon: '🩺' },
          { id: 'wellness', name: 'Vitamins & Wellness', icon: '🌿' }
        ].map(cat => `
          <button 
            class="category-tab-btn ${state.selectedCategory === cat.id ? 'active' : ''}"
            onclick="app.handleCategorySelect('${cat.id}')"
          >
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Medicines Product Catalog Grid -->
      <div class="medicines-catalog-grid">
        ${filteredMeds.map(med => {
          const inCart = state.cart.find(i => i.medicineId === med.id);
          return `
            <div class="medicine-card">
              ${med.temperatureControlled ? `
                <span class="med-badge-tag badge-cold">❄️ 2-8°C Cold Chain</span>
              ` : (med.isRx ? `
                <span class="med-badge-tag badge-rx">📋 Rx Required</span>
              ` : '')}

              <div class="med-image-box" onclick="app.openMedicineDetail('${med.id}')">
                <img src="${med.image}" alt="${med.name}" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
              </div>

              <div>
                <h4 class="med-title" onclick="app.openMedicineDetail('${med.id}')" style="cursor:pointer;">
                  ${med.name}
                </h4>
                <p class="med-generic">${med.genericName}</p>

                <div class="med-price-row">
                  <span class="med-price">KSh ${med.price.toLocaleString()}</span>
                  <span class="med-stock-status" style="color:${med.stockCount > 15 ? '#059669' : (med.stockCount > 0 ? '#d97706' : '#dc2626')};">
                    ${med.stockCount > 15 ? '● In Stock (' + med.stockCount + ')' : (med.stockCount > 0 ? '⚠️ Low Stock (' + med.stockCount + ')' : 'Out of Stock')}
                  </span>
                </div>

                ${inCart ? `
                  <div style="display:flex; align-items:center; justify-content:space-between; background:var(--primary-light); border-radius:var(--radius-full); padding:4px 12px;">
                    <button onclick="app.updateCartQty('${med.id}', -1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.minus}</button>
                    <span style="font-size:13px; font-weight:900; color:var(--primary-dark);">${inCart.quantity} in Cart</span>
                    <button onclick="app.updateCartQty('${med.id}', 1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">${ICONS.plus}</button>
                  </div>
                ` : `
                  <button class="btn-add-cart" onclick="app.addToCart('${med.id}')">
                    + Add to Cart
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Generic Medicine Switcher Promotion Section -->
      <div class="glossy-card" style="margin-top:28px; background:linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%); border:1.5px solid #86efac; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div style="max-width:680px;">
          <span style="font-size:11px; font-weight:800; background:#dcfce7; color:#15803d; padding:3px 10px; border-radius:12px;">
            GENERIC MEDICINE SAVINGS (KENYA PPB APPROVED)
          </span>
          <h3 style="font-size:17px; font-weight:900; color:#166534; margin-top:6px;">
            Save up to 40% - 70% with Equivalent Active Pharmaceutical Ingredients
          </h3>
          <p style="font-size:12.5px; color:#374151; margin-top:4px;">
            Our clinical team promotes affordable healthcare by offering direct substitutions from expensive foreign brands to certified FDA/PPB bioequivalent molecules.
          </p>
        </div>
        <button onclick="app.navigateTo('rx')" class="btn-primary-action" style="max-width:220px; background:linear-gradient(135deg, #059669 0%, #047857 100%);">
          Upload Rx Slip for Savings →
        </button>
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  // ====================================================================
  // VIEW 2: POS (POINT OF SALE) TERMINAL (ADMIN COUNTER SYSTEM)
  // ====================================================================
  renderPosView(state) {
    const user = state.currentUser;
    const totals = window.store.getPosTotals();
    const allMeds = state.medicines;

    let html = `
      <!-- POS Top Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
        <div>
          <span style="font-size:11px; font-weight:800; background:#fef3c7; color:#b45309; padding:3px 8px; border-radius:8px;">
            🧾 CLOUD POS &amp; KRA eTIMS COUNTER TERMINAL
          </span>
          <h2 style="font-size:22px; font-weight:900; color:var(--text-main); margin-top:4px;">
            Pharmacy Point of Sale (POS)
          </h2>
          <p style="font-size:12px; color:var(--text-muted);">
            Cashier: <strong>${user ? user.name : 'Pharm. Angela Muthoni (Chief Pharmacist)'}</strong> • CU Serial: <strong>KRAMW0921804</strong>
          </p>
        </div>

        <div style="display:flex; gap:8px;">
          <button onclick="app.navigateTo('admin')" style="background:#ffffff; border:1.5px solid var(--border-color); color:var(--primary); padding:9px 16px; border-radius:var(--radius-full); font-size:12.5px; font-weight:800; cursor:pointer;">
            📊 Daily Sales Reports
          </button>
          <button onclick="app.openAddProductModal()" style="background:var(--primary-gradient); color:#ffffff; border:none; padding:9px 18px; border-radius:var(--radius-full); font-size:12.5px; font-weight:800; cursor:pointer; box-shadow:var(--shadow-gloss);">
            + Add New Medicine (Upload Photo)
          </button>
        </div>
      </div>

      <!-- POS Dual Layout: Left Products Catalog, Right Active Register -->
      <div class="pos-layout-grid">
        
        <!-- Left: POS Products Quick-Select -->
        <div class="pos-catalog-panel">
          <div class="pos-search-header">
            <input 
              type="text" 
              class="pos-search-input" 
              placeholder="Scan barcode or type medicine name to add to ticket..." 
              oninput="app.handlePosSearch(this.value)"
              id="posSearchInput"
            />
          </div>

          <!-- Quick Category Filters -->
          <div style="display:flex; gap:6px; overflow-x:auto; margin-bottom:14px; padding-bottom:6px;">
            ${[
              { id: 'all', name: 'All' },
              { id: 'pain_relief', name: 'Pain Relief' },
              { id: 'prescription', name: 'Prescription' },
              { id: 'cold_chain', name: 'Cold Chain' },
              { id: 'devices', name: 'Devices' },
              { id: 'wellness', name: 'Wellness' }
            ].map(c => `
              <button 
                onclick="app.filterPosCategory('${c.id}')"
                style="padding:5px 12px; border-radius:var(--radius-full); font-size:11.5px; font-weight:800; border:1px solid #cbd5e1; background:#ffffff; cursor:pointer;"
              >
                ${c.name}
              </button>
            `).join('')}
          </div>

          <!-- Product Grid for Quick Touch / Click -->
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:12px; max-height:580px; overflow-y:auto; padding-right:4px;">
            ${allMeds.map(m => `
              <div 
                onclick="app.addToPos('${m.id}')" 
                style="background:#f8fafc; border:1.5px solid var(--border-color); border-radius:var(--radius-md); padding:10px; cursor:pointer; transition:all 0.15s ease; position:relative;"
                onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-2px)';"
                onmouseout="this.style.borderColor='var(--border-color)'; this.style.transform='none';"
              >
                <div style="display:flex; gap:8px; align-items:center; margin-bottom:6px;">
                  <img src="${m.image}" style="width:40px; height:40px; object-fit:contain; border-radius:6px; background:#fff; border:1px solid #e2e8f0;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
                  <div style="overflow:hidden;">
                    <div style="font-size:12px; font-weight:800; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${m.name}
                    </div>
                    <div style="font-size:10px; color:var(--text-muted);">${m.dosageForm || 'Oral Solids'}</div>
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:baseline;">
                  <span style="font-size:13px; font-weight:900; color:var(--primary-dark);">KSh ${m.price.toLocaleString()}</span>
                  <span style="font-size:10.5px; font-weight:800; color:${m.stockCount > 15 ? '#059669' : '#dc2626'};">
                    Stock: ${m.stockCount}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Active POS Counter Register & eTIMS Tax Invoice -->
        <div class="pos-ticket-panel">
          <div class="pos-ticket-header">
            <div>
              <h3 style="font-size:16px; font-weight:900; color:var(--text-main);">Current Sale Ticket</h3>
              <span style="font-size:11px; color:var(--text-muted);">
                ${totals.itemCount} Units Selected
              </span>
            </div>
            <button onclick="app.clearPosTicket()" style="background:none; border:none; color:#ef4444; font-size:11.5px; font-weight:800; cursor:pointer;">
              Clear Ticket
            </button>
          </div>

          <!-- Customer Name & Phone for eTIMS Receipt -->
          <div style="margin-bottom:12px;">
            <div style="display:flex; gap:8px;">
              <input 
                type="text" 
                id="posCustomerName" 
                placeholder="Patient Name (e.g. Jane Wambui)" 
                value="${state.posCustomer.name || 'Walk-in Patient'}" 
                style="flex:1; border:1.5px solid var(--border-color); border-radius:8px; padding:7px 10px; font-size:12px;"
              />
              <input 
                type="tel" 
                id="posCustomerPhone" 
                placeholder="Phone (07...)" 
                value="${state.posCustomer.phone || '+254 700 000 000'}" 
                style="width:130px; border:1.5px solid var(--border-color); border-radius:8px; padding:7px 10px; font-size:12px;"
              />
            </div>
          </div>

          <!-- Active Ticket Items List -->
          <div class="pos-ticket-items">
            ${state.posTicket.length === 0 ? `
              <div style="text-align:center; padding:30px 10px; color:#94a3b8; font-size:12.5px;">
                Ticket is empty.<br>Click any medicine on the left to add.
              </div>
            ` : state.posTicket.map(it => `
              <div class="pos-ticket-item">
                <div style="flex:1; overflow:hidden;">
                  <div style="font-size:12px; font-weight:800; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${it.name}
                  </div>
                  <div style="font-size:10.5px; color:var(--text-muted);">
                    KSh ${it.price.toLocaleString()} &times; ${it.quantity} = <strong>KSh ${(it.price * it.quantity).toLocaleString()}</strong>
                    <span style="font-size:9.5px; background:${it.taxCode === 'A' ? '#fee2e2' : '#dcfce7'}; color:${it.taxCode === 'A' ? '#991b1b' : '#166534'}; padding:1px 4px; border-radius:4px; margin-left:4px;">
                      ${it.taxCode === 'A' ? 'VAT 16%' : 'Exempt (E)'}
                    </span>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:6px;">
                  <button onclick="app.updatePosQty('${it.medicineId}', -1)" style="border:1px solid #cbd5e1; background:#fff; width:24px; height:24px; border-radius:4px; cursor:pointer;">-</button>
                  <span style="font-size:12px; font-weight:800;">${it.quantity}</span>
                  <button onclick="app.updatePosQty('${it.medicineId}', 1)" style="border:1px solid #cbd5e1; background:#fff; width:24px; height:24px; border-radius:4px; cursor:pointer;">+</button>
                  <button onclick="app.removePosItem('${it.medicineId}')" style="border:none; background:none; color:#ef4444; cursor:pointer; margin-left:4px;">✕</button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- eTIMS Tax Calculation Breakdown -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; font-size:12px; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#64748b;">
              <span>Subtotal:</span>
              <span>KSh ${totals.subtotal.toLocaleString()}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#059669;">
              <span>VAT Exempt (Human Medicines):</span>
              <span>KSh ${totals.vatExemptTotal.toLocaleString()}</span>
            </div>
            ${totals.vat16Total > 0 ? `
              <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#b45309;">
                <span>VAT 16% (Medical Devices/Taxable):</span>
                <span>KSh ${totals.vat16Total.toLocaleString()}</span>
              </div>
            ` : ''}
            <div style="border-top:1.5px dashed #cbd5e1; padding-top:6px; margin-top:6px; display:flex; justify-content:space-between; font-size:16px; font-weight:900; color:var(--text-main);">
              <span>Total Payable:</span>
              <span style="color:var(--primary-dark);">KSh ${totals.grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <!-- Payment Method Selector -->
          <div class="pos-payment-methods">
            <button class="btn-pos-pay ${state.posCustomer.paymentMethod === 'mpesa' ? 'active' : ''}" onclick="app.setPosPaymentMethod('mpesa')">
              📱 Lipa Na M-Pesa
            </button>
            <button class="btn-pos-pay ${state.posCustomer.paymentMethod === 'cash' ? 'active' : ''}" onclick="app.setPosPaymentMethod('cash')">
              💵 Cash Counter
            </button>
            <button class="btn-pos-pay ${state.posCustomer.paymentMethod === 'card' ? 'active' : ''}" onclick="app.setPosPaymentMethod('card')">
              💳 Debit / Card
            </button>
          </div>

          <!-- Execute Sale Button -->
          <button class="btn-pos-complete" onclick="app.executePosSale()" ${totals.itemCount === 0 ? 'disabled style="opacity:0.5;"' : ''}>
            ${ICONS.printer} Complete Sale &amp; Print eTIMS Receipt
          </button>
        </div>
      </div>
    `;

    this.contentEl.innerHTML = html;
  }

  addToPos(medId) {
    sounds.playTap();
    window.store.addToPosTicket(medId, 1);
  }

  updatePosQty(medId, delta) {
    sounds.playTap();
    window.store.updatePosTicketQuantity(medId, delta);
  }

  removePosItem(medId) {
    sounds.playTap();
    window.store.removeFromPosTicket(medId);
  }

  clearPosTicket() {
    sounds.playTap();
    window.store.clearPosTicket();
  }

  setPosPaymentMethod(method) {
    sounds.playTap();
    window.store.state.posCustomer.paymentMethod = method;
    this.render(window.store.state);
  }

  async executePosSale() {
    sounds.playSuccess();
    const custName = document.getElementById('posCustomerName')?.value || 'Walk-in Patient';
    const custPhone = document.getElementById('posCustomerPhone')?.value || '+254 700 000 000';
    window.store.state.posCustomer.name = custName;
    window.store.state.posCustomer.phone = custPhone;

    const receipt = await window.store.completePosSale(window.store.state.posCustomer.paymentMethod);
    if (receipt) {
      this.openEtimsReceiptModal(receipt);
    }
  }

  // ====================================================================
  // eTIMS KRA OFFICIAL TAX INVOICE RECEIPT MODAL
  // ====================================================================
  openEtimsReceiptModal(receipt) {
    sounds.playSuccess();
    this.sheetBody.innerHTML = `
      <div class="etims-receipt-container" id="printableReceipt">
        <div class="etims-receipt-header">
          <h3>GRASHA PHARMA LIMITED</h3>
          <p>Hospital Road, Upper Hill, Nairobi, Kenya</p>
          <p>KRA PIN: <strong>${receipt.kraPin}</strong></p>
          <p>PPB License: <strong>PPB-3912</strong> • CAP. 499 (Sec. 14)</p>
          <p>Tel: +254 722 840 192 • Paybill: 891200</p>
        </div>

        <div class="etims-dotted-line"></div>

        <div>
          <div><strong>TAX INVOICE (eTIMS)</strong></div>
          <div>INVOICE NO: <strong>${receipt.etimsInvoiceNo}</strong></div>
          <div>CU SERIAL: <strong>${receipt.cuSerial}</strong></div>
          <div>DATE/TIME: ${receipt.date}</div>
          <div>CASHIER: ${receipt.cashierName}</div>
          <div>CUSTOMER: ${receipt.customerName} (${receipt.customerPhone})</div>
        </div>

        <div class="etims-dotted-line"></div>

        <table class="etims-table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th class="num">QTY</th>
              <th class="num">PRICE</th>
              <th class="num">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${receipt.items.map(it => `
              <tr>
                <td>${it.name} ${it.taxCode === 'A' ? '(A)' : '(E)'}</td>
                <td class="num">${it.quantity}</td>
                <td class="num">${it.price.toLocaleString()}</td>
                <td class="num">${(it.price * it.quantity).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="etims-dotted-line"></div>

        <div style="font-size:12px;">
          <div style="display:flex; justify-content:space-between;">
            <span>TOTAL EXEMPT (E):</span>
            <strong>KSh ${Number(receipt.vatExemptTotal).toLocaleString()}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>TOTAL TAXABLE 16% (A):</span>
            <strong>KSh ${Number(receipt.vatTaxableTotal).toLocaleString()}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>TOTAL VAT (16%):</span>
            <strong>KSh ${Number(receipt.vat16Total).toLocaleString()}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:900; margin-top:4px;">
            <span>NET TOTAL PAYABLE:</span>
            <span>KSh ${Number(receipt.totalAmount).toLocaleString()}</span>
          </div>
        </div>

        <div class="etims-dotted-line"></div>

        <div>
          <div>PAYMENT: <strong>${receipt.paymentMethod}</strong></div>
          <div>M-PESA REF / AUTH: <strong>${receipt.mpesaCode}</strong></div>
          <div>SC DEVICE CODE: <strong>${receipt.scdc}</strong></div>
        </div>

        <div class="etims-qr-box">
          <div style="font-weight:bold; margin-bottom:4px;">[ KRA eTIMS VERIFIED ]</div>
          <div style="font-size:10px; word-break:break-all; color:#475569;">
            ${receipt.qrString}
          </div>
          <div style="font-size:9.5px; color:#64748b; margin-top:4px;">
            Scan QR on KRA eTIMS Portal to verify electronic signature
          </div>
        </div>

        <div style="text-align:center; font-size:11px; margin-top:14px; color:#475569;">
          *** Asante kwa Kutembelea Grasha Pharma ***<br>
          Quality Medicines • Prompt Healthcare Delivery
        </div>
      </div>

      <div style="display:flex; gap:10px; margin-top:16px;" class="no-print">
        <button class="btn-primary-action" onclick="window.print()">
          ${ICONS.printer} Print Official Receipt
        </button>
        <button onclick="app.closeBottomSheet()" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:12px 20px; border-radius:var(--radius-md); font-weight:800; cursor:pointer;">
          Close
        </button>
      </div>
    `;
    this.openBottomSheet();
  }

  // ====================================================================
  // VIEW 3: ADMIN DASHBOARD & DAILY SALES REPORT ENGINE
  // ====================================================================
  renderAdminView(state) {
    const tab = state.adminActiveTab || 'pos';
    const report = window.store.getDailySalesReport();
    const mySql = state.mySqlStatus;

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
        <div>
          <span style="font-size:11px; font-weight:800; background:#fef3c7; color:#b45309; padding:3px 8px; border-radius:8px;">
            🛡️ PHARMACIST OPERATIONS &amp; MANAGEMENT
          </span>
          <h2 style="font-size:22px; font-weight:900; color:var(--text-main); margin-top:4px;">
            Admin Portal &amp; Sales Reports
          </h2>
        </div>

        <div style="display:flex; gap:8px;">
          <button onclick="app.navigateTo('pos')" class="btn-primary-action" style="padding:9px 18px; max-width:200px;">
            ⚡ Open POS Terminal
          </button>
        </div>
      </div>

      <!-- Admin Tabs -->
      <div style="display:flex; gap:8px; margin-bottom:20px; border-bottom:1.5px solid var(--border-color); padding-bottom:8px; overflow-x:auto;">
        ${[
          { id: 'sales', label: '📊 Daily Sales Reports' },
          { id: 'stock', label: '💊 Inventory & Stock Control' },
          { id: 'orders', label: '📦 Orders & Dispatch' },
          { id: 'db', label: '🗄️ MySQL Database Console' }
        ].map(t => `
          <button 
            onclick="app.openAdminTab('${t.id}')"
            style="padding:8px 18px; border-radius:var(--radius-full); font-size:13px; font-weight:800; cursor:pointer; border:1px solid ${tab === t.id ? 'var(--primary)' : 'transparent'}; background:${tab === t.id ? 'var(--primary-gradient)' : '#ffffff'}; color:${tab === t.id ? '#ffffff' : 'var(--text-main)'}; box-shadow:${tab === t.id ? 'var(--shadow-gloss)' : 'none'};"
          >
            ${t.label}
          </button>
        `).join('')}
      </div>
    `;

    if (tab === 'sales') {
      html += `
        <!-- Daily Sales Summary Metrics -->
        <div class="sales-metric-grid">
          <div class="sales-metric-card">
            <span class="label">Gross Sales Revenue</span>
            <div class="value" style="color:#059669;">KSh ${report.grossRevenue.toLocaleString()}</div>
            <span style="font-size:11px; color:#10b981;">● ${report.totalOrders} Transactions</span>
          </div>
          <div class="sales-metric-card">
            <span class="label">Lipa Na M-Pesa Total</span>
            <div class="value" style="color:#00a859;">KSh ${report.mpesaTotal.toLocaleString()}</div>
            <span style="font-size:11px; color:#64748b;">Paybill 891200 STK</span>
          </div>
          <div class="sales-metric-card">
            <span class="label">Cash Counter Total</span>
            <div class="value" style="color:#334155;">KSh ${report.cashTotal.toLocaleString()}</div>
            <span style="font-size:11px; color:#64748b;">In-Store Handover</span>
          </div>
          <div class="sales-metric-card">
            <span class="label">Average Basket</span>
            <div class="value" style="color:var(--primary-dark);">KSh ${report.averageTicketValue.toLocaleString()}</div>
            <span style="font-size:11px; color:#64748b;">Per customer</span>
          </div>
        </div>

        <!-- Sales Transactions Table -->
        <div class="glossy-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h4 style="font-size:15px; font-weight:900;">Today's Sales Records (${report.reportDate})</h4>
            <button onclick="window.print()" style="background:#ffffff; border:1.5px solid var(--border-color); padding:6px 14px; border-radius:6px; font-size:12px; font-weight:800; cursor:pointer;">
              ${ICONS.printer} Print Report
            </button>
          </div>

          <table class="sales-report-table">
            <thead>
              <tr>
                <th>ORDER / INVOICE</th>
                <th>CUSTOMER</th>
                <th>TYPE</th>
                <th>PAYMENT</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              ${report.ordersList.map(o => `
                <tr>
                  <td>
                    <strong>#${o.id}</strong><br>
                    <span style="font-size:10px; color:#64748b;">${o.etimsInvoiceNo || 'Online Dispatch'}</span>
                  </td>
                  <td>${o.customerName || 'Walk-in'}</td>
                  <td>
                    <span style="font-size:10.5px; font-weight:800; padding:2px 6px; border-radius:4px; ${o.orderType === 'pos_counter' ? 'background:#fef3c7; color:#92400e;' : 'background:#e0f2fe; color:#0369a1;'}">
                      ${o.orderType === 'pos_counter' ? 'POS Counter' : 'Online Fleet'}
                    </span>
                  </td>
                  <td>${o.paymentMethod || 'M-Pesa'}</td>
                  <td><strong>KSh ${Number(o.total).toLocaleString()}</strong></td>
                  <td>
                    <span style="color:#059669; font-weight:bold;">${o.status || 'Paid'}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === 'stock') {
      html += `
        <div class="glossy-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <h4 style="font-size:16px; font-weight:900;">Medicines Stock &amp; Inventory Management</h4>
              <p style="font-size:12px; color:var(--text-muted);">Real-time inventory levels, re-order alerts &amp; price controls</p>
            </div>
            <button onclick="app.openAddProductModal()" class="btn-primary-action" style="max-width:200px;">
              + Add Product &amp; Photo
            </button>
          </div>

          <div style="overflow-x:auto;">
            <table class="sales-report-table">
              <thead>
                <tr>
                  <th>MEDICINE</th>
                  <th>CATEGORY</th>
                  <th>PRICE (KSH)</th>
                  <th>STOCK LEVEL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                ${state.medicines.map(m => `
                  <tr>
                    <td>
                      <div style="display:flex; gap:10px; align-items:center;">
                        <img src="${m.image}" style="width:36px; height:36px; object-fit:contain; border-radius:4px; border:1px solid #e2e8f0;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
                        <div>
                          <strong>${m.name}</strong><br>
                          <span style="font-size:11px; color:#64748b;">${m.genericName}</span>
                        </div>
                      </div>
                    </td>
                    <td>${m.category}</td>
                    <td><strong>KSh ${m.price.toLocaleString()}</strong></td>
                    <td>
                      <span style="font-weight:900; color:${m.stockCount > 15 ? '#059669' : '#dc2626'};">
                        ${m.stockCount} Units
                      </span>
                    </td>
                    <td>
                      <div style="display:flex; gap:4px;">
                        <button onclick="app.adjustMedStock('${m.id}', 10)" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:800; cursor:pointer;">+10 Stock</button>
                        <button onclick="app.adjustMedStock('${m.id}', 50)" style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:800; cursor:pointer;">+50</button>
                        <button onclick="app.adjustMedStock('${m.id}', -5)" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:800; cursor:pointer;">-5</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (tab === 'orders') {
      html += `
        <div class="glossy-card">
          <h4 style="font-size:16px; font-weight:900; margin-bottom:14px;">Online Orders &amp; Dispatch Fleet</h4>
          ${state.adminOrders.map(o => `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:13px; font-weight:800;">Order #${o.id} • ${o.customerName}</span>
                <span style="font-size:11px; font-weight:800; background:#e0f2fe; color:var(--primary-dark); padding:3px 8px; border-radius:10px;">
                  ${o.status}
                </span>
              </div>
              <div style="font-size:11.5px; color:#64748b; margin-bottom:8px;">
                ${o.deliveryAddress} • Total: KSh ${Number(o.total).toLocaleString()} • ${o.paymentMethod}
              </div>
              <div style="display:flex; gap:6px;">
                <button onclick="window.store.updateOrderStatus('${o.id}', 'Dispensed & Verified')" style="font-size:11px; padding:5px 10px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; cursor:pointer;">
                  ✓ Dispensed
                </button>
                <button onclick="window.store.updateOrderStatus('${o.id}', 'Out for Express Delivery')" style="font-size:11px; padding:5px 10px; border-radius:6px; border:1px solid #0284c7; color:#0284c7; background:#fff; cursor:pointer;">
                  🛵 Out for Delivery
                </button>
                <button onclick="window.store.updateOrderStatus('${o.id}', 'Delivered')" style="font-size:11px; padding:5px 10px; border-radius:6px; border:1px solid #059669; color:#059669; background:#fff; cursor:pointer;">
                  🏠 Mark Delivered
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tab === 'db') {
      html += `
        <div class="glossy-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h4 style="font-size:16px; font-weight:900;">MySQL Database Console</h4>
            <span style="font-size:11px; font-weight:800; padding:3px 10px; border-radius:12px; ${mySql.connected ? 'background:#dcfce7; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}">
              ${mySql.connected ? '● MySQL Connected' : '● Local Cache (Sync Ready)'}
            </span>
          </div>
          <p style="font-size:12px; color:#475569; line-height:1.5; margin-bottom:14px;">
            Database: <code>${mySql.database}</code> • Host: <code>${mySql.host}:${mySql.port}</code> • Tables: <code>users</code>, <code>medicines</code>, <code>orders</code>, <code>order_items</code>, <code>prescriptions</code>.
          </p>
          <div style="display:flex; gap:8px;">
            <button onclick="app.downloadSqlDump()" class="btn-primary-action" style="max-width:240px;">
              💾 Export Live SQL Database Dump
            </button>
            <button onclick="app.checkDatabaseConnection()" style="background:#ffffff; border:1.5px solid var(--border-color); color:var(--primary); padding:10px 18px; border-radius:var(--radius-md); font-weight:800; cursor:pointer;">
              🔄 Re-test MySQL Connection
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
    this.render(window.store.state);
  }

  adjustMedStock(medId, delta) {
    sounds.playTap();
    window.store.adjustStock(medId, delta);
  }

  // ====================================================================
  // MODAL: ADD NEW MEDICINE WITH PHOTO UPLOAD (BASE64 OR URL)
  // ====================================================================
  openAddProductModal() {
    sounds.playTap();
    this.tempUploadedImage = null;
    this.sheetBody.innerHTML = `
      <div style="margin-bottom:16px;">
        <h3 style="font-size:18px; font-weight:900; color:var(--text-main);">Add New Medicine Product</h3>
        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">Upload medicine photo &amp; add to live inventory and POS catalog.</p>
      </div>

      <div class="admin-form-group">
        <label>Medicine Brand Name</label>
        <input type="text" id="newMedName" placeholder="e.g. Cipro 500mg Tablets" />
      </div>

      <div class="admin-form-group">
        <label>Generic / Active Chemical Name</label>
        <input type="text" id="newMedGeneric" placeholder="e.g. Ciprofloxacin Hydrochloride 500mg" />
      </div>

      <div style="display:flex; gap:12px;">
        <div class="admin-form-group" style="flex:1;">
          <label>Price in KSh</label>
          <input type="number" id="newMedPrice" placeholder="1250" />
        </div>
        <div class="admin-form-group" style="flex:1;">
          <label>Initial Stock Units</label>
          <input type="number" id="newMedStock" placeholder="60" value="50" />
        </div>
      </div>

      <div style="display:flex; gap:12px;">
        <div class="admin-form-group" style="flex:1;">
          <label>Category</label>
          <select id="newMedCategory">
            <option value="prescription">Prescription (Rx)</option>
            <option value="pain_relief">Pain &amp; Fever</option>
            <option value="cold_chain">Cold-Chain (2°C - 8°C)</option>
            <option value="chronic">Chronic Care</option>
            <option value="devices">Diagnostics &amp; Devices</option>
            <option value="wellness">Vitamins &amp; Wellness</option>
          </select>
        </div>
        <div class="admin-form-group" style="flex:1;">
          <label>Dosage Form</label>
          <input type="text" id="newMedDosage" placeholder="Oral Solids (Tablets)" value="Oral Solids (Tablets)" />
        </div>
      </div>

      <!-- Image File Upload / Photo Input -->
      <div class="admin-form-group">
        <label>Product Image (Upload Photo or Paste URL)</label>
        <input type="file" id="newMedFile" accept="image/*" onchange="app.handleImageFileSelect(event)" style="margin-bottom:8px;" />
        <input type="text" id="newMedImageUrl" placeholder="Or enter image URL: https://..." />
        <div id="imagePreviewBox" style="margin-top:8px; display:none; text-align:center;">
          <img id="imagePreview" src="" style="max-height:100px; border-radius:8px; border:1px solid #cbd5e1;" />
        </div>
      </div>

      <button class="btn-primary-action" onclick="app.executeAddProduct()">
        + Save Product to Catalog &amp; MySQL
      </button>
    `;
    this.openBottomSheet();
  }

  handleImageFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.tempUploadedImage = e.target.result;
        const box = document.getElementById('imagePreviewBox');
        const img = document.getElementById('imagePreview');
        if (box && img) {
          img.src = this.tempUploadedImage;
          box.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    }
  }

  executeAddProduct() {
    const name = document.getElementById('newMedName')?.value?.trim();
    const genericName = document.getElementById('newMedGeneric')?.value?.trim();
    const price = Number(document.getElementById('newMedPrice')?.value);
    const stock = Number(document.getElementById('newMedStock')?.value) || 50;
    const category = document.getElementById('newMedCategory')?.value || 'pain_relief';
    const dosageForm = document.getElementById('newMedDosage')?.value || 'Oral Solids (Tablets)';
    const imageUrl = this.tempUploadedImage || document.getElementById('newMedImageUrl')?.value?.trim();

    if (!name || !price) {
      alert('Please enter both medicine name and price.');
      return;
    }

    sounds.playSuccess();
    window.store.addCustomMedicine({
      name,
      genericName,
      price,
      stockCount: stock,
      category,
      dosageForm,
      image: imageUrl,
      isRx: category === 'prescription' || category === 'cold_chain',
      temperatureControlled: category === 'cold_chain'
    });

    this.closeBottomSheet();
    alert(`✓ Product "${name}" added to pharmacy catalog & inventory!`);
  }

  // ====================================================================
  // VIEW 4: LIPA NA M-PESA DARAJA API INTEGRATION GUIDE
  // ====================================================================
  renderMpesaGuideView(state) {
    this.contentEl.innerHTML = `
      <div style="max-width:900px; margin:0 auto;">
        <div style="margin-bottom:20px;">
          <span style="font-size:11px; font-weight:800; background:#dcfce7; color:#15803d; padding:3px 8px; border-radius:8px;">
            SAFARICOM DARAJA API 2.0 • M-PESA EXPRESS
          </span>
          <h2 style="font-size:24px; font-weight:900; color:var(--text-main); margin-top:6px;">
            Lipa Na M-Pesa Integration Architecture Guide
          </h2>
          <p style="font-size:13px; color:var(--text-muted); margin-top:4px;">
            Official guide on connecting the Grasha Pharma E-Commerce Web App to Safaricom's Daraja API for live STK Push payments.
          </p>
        </div>

        <!-- Architecture Card -->
        <div class="glossy-card">
          <h3 style="font-size:16px; font-weight:900; color:#059669; margin-bottom:10px;">
            1. Core Integration Credentials (Paybill 891200)
          </h3>
          <p style="font-size:12.5px; line-height:1.5; color:#334155; margin-bottom:12px;">
            To process real customer payments in Kenya, create a developer app on <a href="https://developer.safaricom.co.ke/" target="_blank" style="color:var(--primary); font-weight:bold;">Safaricom Daraja Portal</a> and obtain your production keys:
          </p>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; font-family:monospace; font-size:12px; line-height:1.6;">
            MPESA_ENVIRONMENT = "sandbox" # or "production"<br>
            MPESA_CONSUMER_KEY = "YourDarajaConsumerKey"<br>
            MPESA_CONSUMER_SECRET = "YourDarajaConsumerSecret"<br>
            MPESA_BUSINESS_SHORT_CODE = "891200"<br>
            MPESA_PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"<br>
            MPESA_CALLBACK_URL = "https://your-domain.vercel.app/api/mpesa/callback"
          </div>
        </div>

        <!-- Step-by-Step STK Push Flow -->
        <div class="glossy-card">
          <h3 style="font-size:16px; font-weight:900; color:var(--primary-dark); margin-bottom:10px;">
            2. Customer STK Push Payment Flow
          </h3>
          <div style="display:flex; flex-direction:column; gap:10px; font-size:12.5px; color:#334155;">
            <div><strong>Step A (Customer Cart):</strong> Customer clicks "Pay with Lipa Na M-Pesa" in the cart or at the POS counter.</div>
            <div><strong>Step B (Express API):</strong> App calls <code>POST /api/mpesa/stkpush</code> with customer phone and total amount.</div>
            <div><strong>Step C (Safaricom Network):</strong> Safaricom triggers a prompt directly onto the patient's phone: <em>"Do you want to pay KSh X to Grasha Pharma Ltd Paybill 891200? Enter M-Pesa PIN:"</em></div>
            <div><strong>Step D (Instant Callback):</strong> Upon PIN entry, Safaricom sends payment receipt (e.g. <code>QK91823719X</code>) to our webhook. Order is automatically set to "Paid" and dispatched!</div>
          </div>
        </div>

        <!-- Interactive STK Push Test Tool -->
        <div class="glossy-card" style="background:#f0fdf4; border:1.5px solid #86efac;">
          <h3 style="font-size:15px; font-weight:900; color:#166534; margin-bottom:8px;">
            🧪 Test Lipa Na M-Pesa Simulator
          </h3>
          <div style="display:flex; gap:10px; margin-bottom:10px; flex-wrap:wrap;">
            <input type="tel" id="simPhone" value="0712345678" style="padding:10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:bold; width:160px;" />
            <input type="number" id="simAmount" value="2400" style="padding:10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:bold; width:120px;" />
            <button onclick="app.testSimulateStk()" class="btn-mpesa-action" style="max-width:240px; padding:10px 16px;">
              Trigger STK Prompt
            </button>
          </div>
          <div id="simResult" style="font-size:11.5px; color:#065f46; display:none;"></div>
        </div>
      </div>
    `;
  }

  testSimulateStk() {
    const phone = document.getElementById('simPhone')?.value || '0712345678';
    const amount = document.getElementById('simAmount')?.value || '2400';
    sounds.playSuccess();
    const resBox = document.getElementById('simResult');
    if (resBox) {
      resBox.style.display = 'block';
      resBox.innerHTML = `
        <strong>✓ STK Prompt Triggered!</strong><br>
        CheckoutRequestID: ws_CO_${Date.now()}<br>
        Simulated Prompt delivered to <strong>${phone}</strong> for KSh <strong>${Number(amount).toLocaleString()}</strong> to Paybill <strong>891200</strong>.<br>
        Receipt: <strong>QK${Math.floor(10000000 + Math.random() * 90000000)}X</strong>
      `;
    }
  }

  // ====================================================================
  // VIEW 5: GOOGLE MAPS LIVE ORDER TRACKING
  // ====================================================================
  renderTrackingView(state) {
    const order = state.activeOrder || state.orders[0];
    if (!order) {
      this.contentEl.innerHTML = `
        <div style="padding:50px 20px; text-align:center;">
          <div style="font-size:54px;">📦</div>
          <h3 style="font-size:18px; font-weight:900; margin-top:10px;">No Active Orders</h3>
          <p style="font-size:13px; color:#64748b; margin-top:4px;">Place an order from the store or POS to track live GPS telemetry on Google Maps.</p>
        </div>
      `;
      return;
    }

    this.contentEl.innerHTML = `
      <div style="max-width:960px; margin:0 auto;">
        <div class="glossy-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <div>
              <span style="font-size:11px; font-weight:800; color:#64748b;">ORDER #${order.id} • ${order.etimsInvoiceNo || 'eTIMS Validated'}</span>
              <h3 style="font-size:18px; font-weight:900; color:var(--text-main); margin-top:2px;">${order.status}</h3>
            </div>
            <span style="font-size:11px; font-weight:800; background:#e0f2fe; color:var(--primary-dark); padding:4px 12px; border-radius:20px;">
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
              style="position:absolute; bottom:14px; right:14px; background:var(--primary-gradient); color:#fff; border:none; padding:8px 16px; border-radius:20px; font-size:11.5px; font-weight:800; text-decoration:none; z-index:10; box-shadow:var(--shadow-gloss);"
            >
              🗺️ Open in Google Maps
            </a>
          </div>

          <!-- Estimated Arrival Banner -->
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <span style="font-size:13px; font-weight:800; color:var(--primary-dark);">
              ⏱️ Estimated Delivery: <strong>~${order.etaMinutes || 18} mins (Nairobi Westlands)</strong>
            </span>
            <span style="font-size:11.5px; color:#059669; font-weight:700;">Traffic Light &amp; Weather Clear</span>
          </div>

          <!-- Cold-Chain IoT Sensor -->
          ${order.temperatureReading ? `
            <div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:10px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-bottom:14px;">
              <div style="display:flex; align-items:center; gap:6px; color:#0d9488; font-weight:800;">
                ${ICONS.cold} Insulin Cooler Continuous Sensor:
              </div>
              <strong style="color:#0f766e; font-size:13.5px;">${order.temperatureReading}</strong>
            </div>
          ` : ''}

          <!-- Rider Contact & Calling -->
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed #cbd5e1; padding-top:14px;">
            <div>
              <div style="font-size:13.5px; font-weight:900;">${order.riderName}</div>
              <div style="font-size:11px; color:#64748b;">${order.courier}</div>
            </div>
            <div style="display:flex; gap:8px;">
              <button onclick="window.open('tel:${order.riderPhone}')" class="btn-primary-action" style="padding:8px 16px; font-size:12px;">
                📞 Call Courier
              </button>
              <button onclick="window.open('https://wa.me/254722840192?text=Order%20${order.id}')" style="background:#25d366; color:#fff; border:none; padding:8px 14px; border-radius:var(--radius-md); font-size:12px; font-weight:800; cursor:pointer;">
                💬 WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initGoogleMapForTracking(order);
  }

  initGoogleMapForTracking(order) {
    setTimeout(() => {
      const mapEl = document.getElementById('googleMapTrack');
      if (!mapEl) return;

      const nairobiPharmacy = { lat: -1.2921, lng: 36.8219 };
      const customerDestination = { lat: -1.2644, lng: 36.8030 };
      const riderPos = { lat: -1.2780, lng: 36.8120 };

      if (window.google && window.google.maps) {
        try {
          const map = new google.maps.Map(mapEl, {
            zoom: 13,
            center: { lat: -1.278, lng: 36.812 },
            disableDefaultUI: true,
            zoomControl: true
          });

          new google.maps.Marker({ position: nairobiPharmacy, map, title: 'Grasha Central Hub (Upper Hill)' });
          new google.maps.Marker({ position: customerDestination, map, title: 'Delivery Destination' });
          new google.maps.Marker({ position: riderPos, map, title: 'Rider 🛵 ' + order.riderName });

          new google.maps.Polyline({
            path: [nairobiPharmacy, riderPos, customerDestination],
            geodesic: true,
            strokeColor: '#0284c7',
            strokeOpacity: 0.85,
            strokeWeight: 4,
            map
          });
          return;
        } catch (e) {}
      }

      // Fallback
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
      `;
    }, 200);
  }

  // ====================================================================
  // VIEW 6: CART & ONLINE PURCHASE FLOW (PROMPT LOGIN FIRST)
  // ====================================================================
  renderCartView(state) {
    const totals = window.store.getCartTotals();
    const rxSelected = state.prescriptions.find(p => p.id === state.selectedPrescriptionId);

    if (state.cart.length === 0) {
      this.contentEl.innerHTML = `
        <div style="text-align:center; padding:60px 20px;">
          <div style="font-size:54px; margin-bottom:12px;">🛒</div>
          <h3 style="font-size:18px; font-weight:800; margin-bottom:6px;">Your Medical Shopping Cart is Empty</h3>
          <p style="font-size:13px; color:#64748b; margin-bottom:24px;">Browse Kenyan pharmacy essentials, chronic care medicines, or upload your doctor's slip.</p>
          <button class="btn-primary-action" onclick="app.navigateTo('home')" style="max-width:260px; margin:0 auto;">
            Explore Medicine Catalog
          </button>
        </div>
      `;
      return;
    }

    this.contentEl.innerHTML = `
      <div style="max-width:880px; margin:0 auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="font-size:18px; font-weight:900;">Shopping Cart (${totals.totalItemsCount} items)</h3>
          <button onclick="app.clearCart()" style="background:none; border:none; color:#ef4444; font-size:12px; font-weight:800; cursor:pointer;">
            Clear Cart
          </button>
        </div>

        <div style="display:grid; grid-template-columns: 1.4fr 1fr; gap:20px;">
          <!-- Left: Items -->
          <div>
            ${state.cart.map(item => {
              const med = window.store.getMedicineById(item.medicineId);
              if (!med) return '';
              return `
                <div class="glossy-card" style="padding:14px; margin-bottom:12px; display:flex; gap:14px; align-items:center;">
                  <img src="${med.image}" style="width:54px; height:54px; object-fit:contain; border-radius:8px; border:1px solid #e2e8f0; padding:2px;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between;">
                      <div>
                        <h4 style="font-size:13.5px; font-weight:800;">${med.name}</h4>
                        <p style="font-size:11px; color:#64748b;">${med.genericName}</p>
                      </div>
                      <span style="font-size:14px; font-weight:900; color:var(--primary-dark);">KSh ${(med.price * item.quantity).toLocaleString()}</span>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                      <span style="font-size:11px; color:#64748b;">KSh ${med.price.toLocaleString()} each</span>
                      <div style="display:flex; align-items:center; gap:8px; background:var(--bg-app); border:1px solid var(--border-color); border-radius:20px; padding:2px 8px;">
                        <button onclick="app.updateCartQty('${med.id}', -1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">-</button>
                        <span style="font-size:12px; font-weight:800;">${item.quantity}</span>
                        <button onclick="app.updateCartQty('${med.id}', 1)" style="border:none; background:none; color:var(--primary); font-weight:bold; cursor:pointer;">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}

            <!-- Prescription Warning -->
            ${totals.hasRxItems ? `
              <div style="background:#fefce8; border:1.5px solid #f59e0b; border-radius:var(--radius-md); padding:14px; margin-bottom:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:12.5px; font-weight:800; color:#92400e;">
                    ${rxSelected ? '✓ Attached Doctor\'s Prescription (Rx)' : '⚠️ Prescription Slip Required'}
                  </span>
                  <button onclick="app.openPrescriptionUploadModal()" style="font-size:11.5px; color:var(--primary); font-weight:800; background:none; border:none; cursor:pointer;">
                    ${rxSelected ? 'Change Rx' : '+ Upload Rx'}
                  </button>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Right: Summary & Checkout Buttons -->
          <div>
            <div class="glossy-card">
              <h4 style="font-size:15px; font-weight:900; margin-bottom:12px;">Order Summary</h4>
              <div style="display:flex; justify-content:space-between; font-size:13px; color:#64748b; margin-bottom:8px;">
                <span>Subtotal:</span>
                <span>KSh ${totals.subtotal.toLocaleString()}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px; color:#64748b; margin-bottom:12px;">
                <span>Delivery:</span>
                <span style="font-weight:700;">${totals.deliveryFee === 0 ? 'FREE' : 'KSh ' + totals.deliveryFee.toLocaleString()}</span>
              </div>
              <div style="border-top:1.5px dashed var(--border-color); padding-top:10px; display:flex; justify-content:space-between; font-size:17px; font-weight:900; margin-bottom:16px;">
                <span>Total Payable:</span>
                <span style="color:var(--primary-dark);">KSh ${totals.finalTotal.toLocaleString()}</span>
              </div>

              <!-- Payment Method Selector -->
              <div style="display:flex; gap:6px; margin-bottom:14px;">
                <button onclick="window.store.setPaymentMethod('mpesa')" class="btn-pos-pay ${state.paymentMethod === 'mpesa' ? 'active' : ''}" style="flex:1;">
                  📱 M-Pesa
                </button>
                <button onclick="window.store.setPaymentMethod('card')" class="btn-pos-pay ${state.paymentMethod === 'card' ? 'active' : ''}" style="flex:1;">
                  💳 Card
                </button>
                <button onclick="window.store.setPaymentMethod('cod')" class="btn-pos-pay ${state.paymentMethod === 'cod' ? 'active' : ''}" style="flex:1;">
                  💵 COD
                </button>
              </div>

              <button class="btn-primary-action" onclick="app.handleCheckoutIntent('${state.paymentMethod}')">
                Proceed to Payment (KSh ${totals.finalTotal.toLocaleString()}) →
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  handleCheckoutIntent(method) {
    sounds.playTap();
    const user = window.store.state.currentUser;

    if (!user) {
      window.store.state.pendingCheckoutMethod = method;
      this.openAuthModal('checkout');
      return;
    }

    if (user.role === 'admin') {
      alert('🛡️ You are currently logged in as an Admin Pharmacist.\nPlease place counter sales through the POS Terminal.');
      return;
    }

    // Process payment modal
    this.openPaymentExecutionModal(method);
  }

  openPaymentExecutionModal(method) {
    const totals = window.store.getCartTotals();
    const user = window.store.state.currentUser;

    if (method === 'mpesa') {
      this.sheetBody.innerHTML = `
        <div style="text-align:center; margin-bottom:16px;">
          <div style="width:54px; height:54px; background:#00a859; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px auto; color:#fff; font-size:24px;">
            📱
          </div>
          <h3 style="font-size:18px; font-weight:900;">Lipa Na M-Pesa Online STK</h3>
          <p style="font-size:12px; color:#64748b;">Paybill: <strong>891200</strong> • Grasha Pharma Ltd</p>
        </div>

        <div class="admin-form-group">
          <label>Safaricom M-Pesa Number</label>
          <input type="tel" id="checkoutMpesaPhone" value="${user ? user.phone : '0712345678'}" />
        </div>

        <button class="btn-mpesa-action" onclick="app.executeMpesaCheckout()">
          Trigger STK Push (KSh ${totals.finalTotal.toLocaleString()})
        </button>
      `;
    } else {
      this.sheetBody.innerHTML = `
        <div style="text-align:center; margin-bottom:16px;">
          <h3 style="font-size:18px; font-weight:900;">Confirm Order Handover</h3>
          <p style="font-size:12px; color:#64748b;">Pay KSh <strong>${totals.finalTotal.toLocaleString()}</strong> upon delivery inspection.</p>
        </div>
        <button class="btn-primary-action" onclick="app.executeGenericCheckout('${method}')">
          Confirm Order
        </button>
      `;
    }
    this.openBottomSheet();
  }

  executeMpesaCheckout() {
    this.closeBottomSheet();
    sounds.playSuccess();
    const order = window.store.checkout('Lipa Na M-Pesa');
    alert(`🎉 M-Pesa STK Prompt Sent!\nOrder #${order.id} placed successfully.`);
  }

  executeGenericCheckout(method) {
    this.closeBottomSheet();
    sounds.playSuccess();
    const order = window.store.checkout(method);
    alert(`🎉 Order #${order.id} confirmed!`);
  }

  // ====================================================================
  // AUTHENTICATION MODAL (GOOGLE ACCOUNT & REAL MYSQL LOGIN)
  // ====================================================================
  openAuthModal(reason = 'header') {
    sounds.playTap();
    const isCheckout = reason === 'checkout';
    const isPos = reason === 'pos';

    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:18px;">
        <span style="font-size:36px;">🔐</span>
        <h3 style="font-size:18px; font-weight:900; color:var(--text-main);">
          ${isPos ? 'Admin Pharmacist Sign In' : (isCheckout ? 'Sign In to Complete Purchase' : 'Sign In to GrashaPhama')}
        </h3>
        <p style="font-size:12px; color:var(--text-muted); margin-top:3px;">
          ${isPos ? 'Enter Chief Pharmacist credentials to access POS counter and eTIMS tax system.' : 'Sign in using your Google account or email credentials stored in the MySQL database.'}
        </p>
      </div>

      <!-- Google Sign-In Button -->
      <button class="btn-google-auth" onclick="app.loginWithGoogle()">
        <svg class="google-icon-svg" viewBox="0 0 48 48" style="width:20px;height:20px;">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        <span>Continue with Google Account</span>
      </button>

      <div style="display:flex; align-items:center; gap:10px; margin:14px 0;">
        <div style="flex:1; height:1px; background:#e2e8f0;"></div>
        <span style="font-size:11px; color:#94a3b8; font-weight:800;">OR 1-CLICK VERIFIED LOGIN</span>
        <div style="flex:1; height:1px; background:#e2e8f0;"></div>
      </div>

      <!-- Quick 1-Click Admin Login -->
      <div class="demo-account-pill" style="border-color:#fbbf24; background:#fefce8;" onclick="app.quickLogin('admin')">
        <div>
          <div style="font-size:13px; font-weight:800; color:#78350f;">🛡️ Pharm. Angela Muthoni (Admin &amp; POS)</div>
          <div style="font-size:11px; color:#92400e;">admin@grashapharma.co.ke • Password: <code>admin123</code></div>
        </div>
        <span style="font-size:12px; font-weight:900; color:#b45309;">Login →</span>
      </div>

      <!-- Quick 1-Click Patient Login -->
      <div class="demo-account-pill" onclick="app.quickLogin('customer')">
        <div>
          <div style="font-size:13px; font-weight:800; color:#0f172a;">👩 Jane Wambui Kamau (Patient Customer)</div>
          <div style="font-size:11px; color:#64748b;">jane.wambui@gmail.com • Password: <code>password123</code></div>
        </div>
        <span style="font-size:12px; font-weight:900; color:var(--primary);">Login →</span>
      </div>

      <!-- Manual Credential Form -->
      <div style="border-top:1px solid #e2e8f0; padding-top:14px; margin-top:14px;">
        <div class="admin-form-group">
          <label>Email Address</label>
          <input type="email" id="authEmail" placeholder="e.g. admin@grashapharma.co.ke" />
        </div>
        <div class="admin-form-group">
          <label>Password</label>
          <input type="password" id="authPass" placeholder="••••••••" />
        </div>
        <button class="btn-primary-action" onclick="app.executeManualAuth()">
          Sign In with Email &amp; Password
        </button>
      </div>
    `;
    this.openBottomSheet();
  }

  async loginWithGoogle() {
    sounds.playSuccess();
    const res = await window.store.loginWithGoogle({
      googleId: 'goog-' + Date.now(),
      email: 'jane.wambui@gmail.com',
      name: 'Jane Wambui Kamau',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      phone: '+254 712 345 678'
    });
    this.closeBottomSheet();
    if (res.success) {
      alert(`🎉 Welcome back, ${res.user.name}!\nSigned in via Google Account.`);
    }
  }

  async quickLogin(role) {
    sounds.playSuccess();
    const email = role === 'admin' ? 'admin@grashapharma.co.ke' : 'jane.wambui@gmail.com';
    const pass = role === 'admin' ? 'admin123' : 'password123';
    const res = await window.store.login(email, pass);
    this.closeBottomSheet();
    if (res.success) {
      alert(`✓ Signed in as ${res.user.name} (${res.user.role.toUpperCase()})`);
    }
  }

  async executeManualAuth() {
    const email = document.getElementById('authEmail')?.value;
    const pass = document.getElementById('authPass')?.value;
    if (!email || !pass) {
      alert('Please enter your email and password.');
      return;
    }
    const res = await window.store.login(email, pass);
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
    alert('Logged out successfully.');
    this.navigateTo('home');
  }

  // ====================================================================
  // VIEW 7: PRESCRIPTIONS & WHATSAPP
  // ====================================================================
  renderPrescriptionView(state) {
    this.contentEl.innerHTML = `
      <div style="max-width:880px; margin:0 auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <span style="font-size:11px; font-weight:800; background:#d1fae5; color:#065f46; padding:3px 8px; border-radius:8px;">
              PPB KENYA COMPLIANT REVIEW
            </span>
            <h2 style="font-size:22px; font-weight:900; margin-top:4px;">Doctor's Prescriptions (Rx)</h2>
          </div>
          <button onclick="app.openPrescriptionUploadModal()" class="btn-primary-action" style="max-width:180px;">
            + Upload New Rx
          </button>
        </div>

        <div>
          ${state.prescriptions.map(rx => `
            <div class="glossy-card" style="padding:16px; margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <span style="font-size:10px; font-weight:800; color:#059669; background:#d1fae5; padding:2px 8px; border-radius:4px;">
                    ✓ ${rx.status}
                  </span>
                  <h4 style="font-size:15px; font-weight:900; margin-top:6px;">${rx.doctorName}</h4>
                  <p style="font-size:12px; color:#64748b;">${rx.clinic} • Date: ${rx.date}</p>
                </div>
                <button onclick="alert('Viewing prescription slip photo...')" style="background:var(--primary-light); color:var(--primary-dark); border:none; padding:6px 12px; border-radius:6px; font-size:11.5px; font-weight:800; cursor:pointer;">
                  View Slip
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  openPrescriptionUploadModal() {
    sounds.playTap();
    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <h3 style="font-size:18px; font-weight:900;">Upload Doctor's Prescription</h3>
        <p style="font-size:12px; color:#64748b; margin-top:2px;">Reviewed by licensed Kenya PPB Pharmacists in under 5 minutes.</p>
      </div>
      <div class="admin-form-group">
        <label>Doctor's Name &amp; KMPDC Number</label>
        <input type="text" id="rxDoctor" placeholder="Dr. Patrick Ndung'u, MBChB" />
      </div>
      <div class="admin-form-group">
        <label>Clinic or Hospital Name</label>
        <input type="text" id="rxClinic" placeholder="Aga Khan University Hospital" />
      </div>
      <div class="admin-form-group">
        <label>Select Photo / PDF</label>
        <input type="file" id="rxFile" accept="image/*,application/pdf" />
      </div>
      <button class="btn-primary-action" onclick="app.executePrescriptionUpload()">
        Submit for PPB Verification
      </button>
    `;
    this.openBottomSheet();
  }

  executePrescriptionUpload() {
    const doctor = document.getElementById('rxDoctor')?.value || 'Dr. Patrick Ndung\'u, MBChB';
    const clinic = document.getElementById('rxClinic')?.value || 'Aga Khan Hospital';
    sounds.playSuccess();
    window.store.uploadPrescription({ doctorName: doctor, clinic });
    this.closeBottomSheet();
    alert('✓ Prescription uploaded successfully for pharmacist verification!');
  }

  renderWhatsAppView(state) {
    this.contentEl.innerHTML = `
      <div style="max-width:720px; margin:0 auto;">
        <div style="background:#075e54; color:#fff; border-radius:14px 14px 0 0; padding:16px 20px; display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; border-radius:50%; background:#25d366; display:flex; align-items:center; justify-content:center; font-size:20px;">
            👩‍⚕️
          </div>
          <div>
            <h4 style="font-size:15px; font-weight:900;">Grasha Pharma WhatsApp Care</h4>
            <span style="font-size:11px; color:#dcf8c6;">● Online • PPB Clinical Desk (+254 722 840 192)</span>
          </div>
        </div>

        <div style="background:#efeae2; min-height:380px; max-height:440px; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px;">
          ${state.whatsappMessages.map(m => `
            <div style="max-width:80%; align-self:${m.sender === 'user' ? 'flex-end' : 'flex-start'}; background:${m.sender === 'user' ? '#dcf8c6' : '#ffffff'}; padding:10px 14px; border-radius:10px; font-size:13px; line-height:1.45; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
              <div>${m.text.replace(/\n/g, '<br>')}</div>
              <span style="font-size:10px; color:#64748b; display:block; text-align:right; margin-top:3px;">${m.time}</span>
            </div>
          `).join('')}
        </div>

        <div style="background:#f0f2f5; padding:12px 16px; border-radius:0 0 14px 14px; display:flex; gap:10px;">
          <input 
            type="text" 
            id="waInput" 
            placeholder="Type your message about medicines, Lipa Na M-Pesa, deliveries..." 
            style="flex:1; border:none; border-radius:24px; padding:10px 18px; font-size:13.5px; outline:none;" 
            onkeydown="if(event.key==='Enter') app.sendWhatsApp()"
          />
          <button onclick="app.sendWhatsApp()" style="background:#075e54; color:#fff; border:none; width:42px; height:42px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">
            ➤
          </button>
        </div>
      </div>
    `;
  }

  sendWhatsApp() {
    const input = document.getElementById('waInput');
    const text = input?.value?.trim();
    if (!text) return;
    input.value = '';
    sounds.playTap();
    window.store.sendWhatsAppMessage(text);
  }

  renderRemindersView(state) {
    this.contentEl.innerHTML = `
      <div style="max-width:760px; margin:0 auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:18px; font-weight:900;">Daily Chronic Dose Reminders</h3>
            <p style="font-size:12px; color:#64748b;">Automated schedules for insulin, blood pressure &amp; wellness</p>
          </div>
          <button onclick="app.openAddReminderModal()" class="btn-primary-action" style="max-width:180px;">
            + Add Reminder
          </button>
        </div>

        <div>
          ${state.pillReminders.map(r => `
            <div class="glossy-card" style="padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span style="font-size:11px; font-weight:800; color:var(--primary); background:var(--primary-light); padding:2px 8px; border-radius:4px;">
                  ⏰ ${r.time} • ${r.period}
                </span>
                <h4 style="font-size:14px; font-weight:900; margin-top:4px;">${r.name}</h4>
                <p style="font-size:12px; color:#64748b;">${r.dosage}</p>
              </div>
              <button onclick="window.store.togglePillReminder('${r.id}')" style="background:${r.takenToday ? '#059669' : '#fff'}; color:${r.takenToday ? '#fff' : '#64748b'}; border:1.5px solid ${r.takenToday ? '#059669' : '#cbd5e1'}; padding:8px 16px; border-radius:20px; font-size:12px; font-weight:800; cursor:pointer;">
                ${r.takenToday ? '✓ Taken' : 'Mark Taken'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  openAddReminderModal() {
    sounds.playTap();
    this.sheetBody.innerHTML = `
      <div style="margin-bottom:14px;">
        <h3 style="font-size:17px; font-weight:900;">Add Dose Reminder</h3>
      </div>
      <div class="admin-form-group">
        <label>Medicine Name</label>
        <input type="text" id="remName" placeholder="e.g. Glucophage XR 500mg" />
      </div>
      <div class="admin-form-group">
        <label>Dosage</label>
        <input type="text" id="remDosage" placeholder="e.g. 1 Tablet with dinner" />
      </div>
      <div class="admin-form-group">
        <label>Time</label>
        <input type="time" id="remTime" value="19:30" />
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

  renderProfileView(state) {
    const user = state.currentUser;
    if (!user) {
      this.openAuthModal('header');
      return;
    }

    this.contentEl.innerHTML = `
      <div style="max-width:760px; margin:0 auto;">
        <div class="glossy-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; gap:14px; align-items:center;">
              <div style="width:52px; height:52px; border-radius:50%; background:var(--primary-gradient); display:flex; align-items:center; justify-content:center; color:#fff; font-size:24px;">
                ${user.avatar || '👩'}
              </div>
              <div>
                <h3 style="font-size:18px; font-weight:900;">${user.name}</h3>
                <div style="font-size:12px; color:var(--text-muted);">${user.email} • ${user.phone}</div>
                <div style="font-size:11px; color:#059669; font-weight:bold; margin-top:2px;">Role: ${user.role.toUpperCase()}</div>
              </div>
            </div>
            <button onclick="app.logoutUser()" style="background:#fee2e2; border:1px solid #fecaca; color:#dc2626; padding:8px 16px; border-radius:var(--radius-full); font-weight:800; cursor:pointer;">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // General Nav & Controls
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
    if (confirm('Clear all items from your shopping cart?')) {
      window.store.clearCart();
    }
  }

  openMedicineDetail(medId) {
    sounds.playTap();
    const med = window.store.getMedicineById(medId);
    if (!med) return;

    this.sheetBody.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <img src="${med.image}" style="max-height:140px; object-fit:contain; border-radius:8px;" onerror="this.src='https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg';" />
        <h3 style="font-size:18px; font-weight:900; margin-top:10px;">${med.name}</h3>
        <p style="font-size:12.5px; color:var(--text-muted);">${med.genericName}</p>
        <div style="font-size:20px; font-weight:900; color:var(--primary-dark); margin-top:6px;">
          KSh ${med.price.toLocaleString()}
        </div>
      </div>

      <div style="background:#f8fafc; border-radius:10px; padding:12px; font-size:12px; line-height:1.5; margin-bottom:16px;">
        <div><strong>Dosage Form:</strong> ${med.dosageForm || 'Oral Solids'}</div>
        <div><strong>Dosage Instructions:</strong> ${med.dosage || 'As directed by physician'}</div>
        <div><strong>Storage:</strong> ${med.temperatureControlled ? '❄️ Strict 2°C - 8°C Cold Chain' : 'Store below 25°C in dry place'}</div>
      </div>

      <button class="btn-primary-action" onclick="app.addToCart('${med.id}'); app.closeBottomSheet();">
        + Add to Shopping Cart
      </button>
    `;
    this.openBottomSheet();
  }

  downloadSqlDump() {
    sounds.playSuccess();
    const state = window.store.state;
    let sql = `-- Grasha Pharma Live MySQL Database Dump\n-- Generated on: ${new Date().toISOString()}\n\nUSE \`grasha_pharma_db\`;\n\n`;
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

  openBottomSheet() {
    this.sheetOverlay.classList.add('active');
  }

  closeBottomSheet() {
    this.sheetOverlay.classList.remove('active');
  }
}

window.app = new GrashaApp();
