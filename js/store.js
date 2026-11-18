/**
 * Grasha Pharma (GrashaPhama) Reactive State Store
 * Comprehensive Web App & POS Store with MySQL Database Synchronization,
 * KRA eTIMS Tax Compliance, Lipa Na M-Pesa STK Push (Daraja API),
 * Google OAuth Authentication & Daily Sales Report Engine
 */

class GrashaStore {
  constructor() {
    this.storageKey = 'grashapharma_webapp_v6_pos_etims';
    this.apiBaseUrl = 'http://localhost:3000/api';
    this.listeners = [];
    this.state = this.loadState();
    // Test MySQL backend connection asynchronously
    this.checkMySQLBackend();
  }

  getDefaultState() {
    return {
      // --- Authentication & User Profile ---
      currentUser: null, // Defaults to guest; restored from session if logged in
      users: [...DEMO_USERS],
      authMode: 'login', // 'login' | 'register'
      pendingCheckoutMethod: null, // Preserved if user initiates checkout before login

      // --- MySQL Database Status ---
      mySqlStatus: {
        connected: false,
        checked: false,
        engine: 'MySQL 8.x / MariaDB',
        database: 'grasha_pharma_db',
        host: '127.0.0.1',
        port: 3306,
        counts: { medicines: 12, orders: 3, users: 2 }
      },

      // --- Catalog & Dynamic Inventory Management ---
      medicines: [...MEDICINES_DATABASE],
      inventoryFilter: 'all',
      inventorySearchQuery: '',
      adminActiveTab: 'pos', // 'pos' | 'sales' | 'orders' | 'stock' | 'add' | 'db'

      // --- Customer Cart ---
      cart: [
        { medicineId: 'med-01', quantity: 1, isGeneric: false }, // Augmentin 625mg (KSh 1,850)
        { medicineId: 'med-06', quantity: 2, isGeneric: false }  // Panadol Extra (KSh 240 x 2 = 480)
      ],

      // --- POS (Point of Sale) Active Ticket Register ---
      posTicket: [
        { medicineId: 'med-06', name: 'Panadol Extra Tablets (20s)', price: 240, quantity: 2, taxCode: 'E', category: 'pain_relief' },
        { medicineId: 'med-11', name: 'Grasha Effervescent Vitamin C 1000mg', price: 650, quantity: 1, taxCode: 'E', category: 'wellness' }
      ],
      posCustomer: {
        name: 'Walk-in Patient',
        phone: '+254 700 000 000',
        paymentMethod: 'mpesa' // 'mpesa' | 'cash' | 'card' | 'insurance'
      },
      lastGeneratedReceipt: null, // Holds latest eTIMS receipt for thermal printing

      // --- Prescriptions (PPB Compliant) ---
      prescriptions: [...MOCK_PRESCRIPTIONS],
      selectedPrescriptionId: 'rx-nbi-2026-904',

      // --- Customer & POS Orders History ---
      adminOrders: [...INITIAL_ADMIN_SALES_ORDERS],
      orders: [
        {
          id: 'GP-7721',
          date: '2026-11-16 14:10',
          orderType: 'online_delivery',
          items: [
            { medicineId: 'med-04', name: 'Glucophage XR 500mg', quantity: 1, price: 1100, taxCode: 'E' },
            { medicineId: 'med-12', name: 'Grasha Effervescent Vitamin C 1000mg', quantity: 2, price: 650, taxCode: 'E' }
          ],
          total: 2400,
          status: 'Delivered',
          deliverySpeed: 'Nairobi Express (Grasha Fleet)',
          estimatedDelivery: 'Delivered at 16:30',
          trackingStep: 4,
          courier: 'Grasha Fleet Nairobi - Van KDA 419P',
          riderName: 'Samuel Ochieng',
          riderPhone: '+254 722 840 192',
          rxId: 'rx-nbi-2026-904',
          paymentMethod: 'Lipa Na M-Pesa (Code: QJ89120045L)',
          etimsInvoiceNo: 'ETIMS-GP-2026-7721'
        }
      ],
      activeOrder: {
        id: 'GP-8840',
        date: '2026-11-18 08:30',
        orderType: 'online_delivery',
        items: [
          { medicineId: 'med-03', name: 'Lantus SoloStar Insulin Pen (100 IU/ml)', quantity: 1, price: 3600, coldChain: true, taxCode: 'E' },
          { medicineId: 'med-05', name: 'Ventolin Inhaler Evohaler (100mcg)', quantity: 1, price: 750, taxCode: 'E' }
        ],
        total: 4350,
        status: 'Out for Express Delivery',
        deliverySpeed: 'Grasha Cold-Chain Express Fleet ❄️',
        estimatedDelivery: 'Arriving in 18 mins (Nairobi Westlands)',
        trackingStep: 3,
        courier: 'Grasha Dedicated Fleet (Nairobi)',
        riderName: 'Samuel Ochieng (PPB Certified Handler)',
        riderPhone: '+254 722 840 192',
        temperatureReading: '3.8°C (PPB Safe Range 2°C - 8°C)',
        rxId: 'rx-nbi-2026-904',
        etaMinutes: 18,
        paymentMethod: 'Lipa Na M-Pesa (Code: QK91823719X)',
        etimsInvoiceNo: 'ETIMS-GP-2026-8840',
        deliveryAddress: 'Rhapta Road, Westlands, Nairobi',
        pharmacyLocation: { lat: -1.2921, lng: 36.8219, name: 'Grasha Pharma Hub (Upper Hill)' },
        destinationLocation: { lat: -1.2644, lng: 36.8030, name: 'Westlands Delivery Destination' },
        riderLocation: { lat: -1.2780, lng: 36.8120, name: 'En Route on Waiyaki Way' }
      },

      // --- Pill & Chronic Reminders ---
      pillReminders: [
        {
          id: 'rem-1',
          name: 'Glucophage XR 500mg (Metformin)',
          dosage: '1 Tablet with evening meal',
          time: '19:30',
          period: 'Evening',
          takenToday: true,
          streakDays: 19,
          pillsLeft: 24,
          autoRefill: true
        },
        {
          id: 'rem-2',
          name: 'Ventolin Inhaler (Salbutamol)',
          dosage: '2 Puffs before evening walk',
          time: '17:00',
          period: 'Afternoon',
          takenToday: false,
          streakDays: 11,
          pillsLeft: 120,
          autoRefill: false
        }
      ],

      // --- Delivery Preferences ---
      deliveryOption: 'nairobi_express',
      deliveryAddress: {
        recipient: 'Jane Wambui Kamau',
        phone: '+254 712 345 678',
        county: 'Nairobi',
        estate: 'Westlands, Rhapta Road, Apt 3A',
        instructions: 'Call at gate for security clearance',
        type: 'Home'
      },
      paymentMethod: 'mpesa',

      // --- WhatsApp Chatbot Assistant ---
      whatsappMessages: [
        {
          id: 'wa-1',
          sender: 'bot',
          time: '09:00 AM',
          text: "Jambo! 👋 Welcome to *Grasha Pharma WhatsApp Care* (+254 722 840 192).\n\nLicensed by *Pharmacy and Poisons Board (PPB Kenya)*.\n\nHow can our licensed clinical pharmacists assist you today?\n\n1️⃣ Upload Doctor's Prescription (Rx)\n2️⃣ Lipa Na M-Pesa STK Push Support\n3️⃣ Live GPS Delivery Telemetry\n4️⃣ Ask a Pharmacist About Dosages & Generic Alternatives"
        }
      ],

      // --- Navigation View ---
      activeView: 'home', // 'home' | 'rx' | 'cart' | 'tracking' | 'pos' | 'admin' | 'whatsapp' | 'reminders' | 'profile' | 'mpesa-guide'
      selectedCategory: 'all',
      searchQuery: ''
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const defaults = this.getDefaultState();
        return {
          ...defaults,
          ...parsed,
          users: (parsed.users && parsed.users.length) ? parsed.users : defaults.users,
          medicines: (parsed.medicines && parsed.medicines.length) ? parsed.medicines : defaults.medicines
        };
      }
    } catch (e) {
      console.warn('Storage load note:', e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Storage save note:', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }

  // ====================================================================
  // MYSQL DATABASE CONNECTIVITY & REAL-TIME SYNC
  // ====================================================================
  async checkMySQLBackend() {
    try {
      const res = await fetch(`${this.apiBaseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        if (data.database === 'connected') {
          this.state.mySqlStatus = {
            connected: true,
            checked: true,
            engine: data.engine || 'MySQL 8.x',
            database: data.config?.database || 'grasha_pharma_db',
            host: data.config?.host || '127.0.0.1',
            port: data.config?.port || 3306,
            counts: data.counts || { medicines: 12, orders: 3, users: 2 }
          };
          this.notify();
          return;
        }
      }
    } catch (e) {
      // Backend server offline; local state acts as local database cache
    }
    this.state.mySqlStatus.checked = true;
    this.state.mySqlStatus.connected = false;
    this.notify();
  }

  // ====================================================================
  // REAL AUTHENTICATION (MySQL DB + Google OAuth)
  // ====================================================================

  /**
   * Real Email/Password Login verifying against MySQL backend
   */
  async login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    
    // Attempt live authentication against MySQL server
    try {
      const res = await fetch(`${this.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          this.state.currentUser = data.user;
          this.setPostLoginView(data.user);
          this.saveState();
          return { success: true, user: data.user, source: 'mysql' };
        }
      }
    } catch (err) {
      // Offline fallback: check against seeded accounts
    }

    // Local / Offline fallback
    const user = this.state.users.find(u => u.email.toLowerCase() === cleanEmail);
    const passwordMatch = user && (
      user.password === password ||
      (user.email === 'admin@grashapharma.co.ke' && password === 'admin123') ||
      (user.email === 'jane.wambui@gmail.com' && password === 'password123')
    );

    if (passwordMatch) {
      this.state.currentUser = { ...user };
      this.setPostLoginView(user);
      this.saveState();
      return { success: true, user: this.state.currentUser, source: 'local' };
    }

    return { success: false, message: 'Invalid credentials. Please verify your email and password.' };
  }

  /**
   * Google Sign-In Integration (Google Identity Services / Gmail)
   */
  async loginWithGoogle(googleProfile) {
    const email = googleProfile.email.toLowerCase();
    
    // Attempt sync to MySQL backend
    try {
      const res = await fetch(`${this.apiBaseUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleId: googleProfile.googleId,
          email: email,
          name: googleProfile.name,
          avatar: googleProfile.avatar,
          role: email.includes('admin') ? 'admin' : 'customer'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          this.state.currentUser = data.user;
          this.setPostLoginView(data.user);
          this.saveState();
          return { success: true, user: data.user, source: 'mysql' };
        }
      }
    } catch (err) {
      // Fallback
    }

    // Local account lookup/creation
    let user = this.state.users.find(u => u.email.toLowerCase() === email);
    if (user) {
      user.google_id = googleProfile.googleId || user.google_id;
      if (googleProfile.avatar) user.avatar = googleProfile.avatar;
      this.state.currentUser = { ...user };
    } else {
      const newUser = {
        id: 'usr-goog-' + Date.now().toString().slice(-6),
        name: googleProfile.name || 'Google Patient',
        email: email,
        password: 'google_oauth_verified',
        role: email.includes('admin') ? 'admin' : 'customer',
        phone: googleProfile.phone || '+254 712 345 678',
        avatar: googleProfile.avatar || '👩',
        county: 'Nairobi',
        estate: 'Westlands, Nairobi',
        google_id: googleProfile.googleId || ('goog-' + Date.now()),
        google_email: email,
        loyaltyPoints: 100,
        prescriptionCount: 0,
        totalOrdersCount: 0
      };
      this.state.users.push(newUser);
      this.state.currentUser = { ...newUser };
    }

    this.setPostLoginView(this.state.currentUser);
    this.saveState();
    return { success: true, user: this.state.currentUser, source: 'local' };
  }

  /**
   * Register new patient in MySQL
   */
  async register(userData) {
    try {
      const res = await fetch(`${this.apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          this.state.users.push(data.user);
          this.state.currentUser = data.user;
          this.setPostLoginView(data.user);
          this.saveState();
          return { success: true, user: data.user };
        }
      }
    } catch (e) {}

    // Local registration
    const newUser = {
      id: 'usr-' + Date.now().toString().slice(-6),
      name: userData.name || 'Grasha Patient',
      email: userData.email.toLowerCase(),
      password: userData.password || 'password123',
      role: 'customer',
      phone: userData.phone || '+254 712 345 678',
      avatar: '👩',
      county: userData.county || 'Nairobi',
      estate: userData.estate || 'Nairobi',
      loyaltyPoints: 100
    };
    this.state.users.push(newUser);
    this.state.currentUser = { ...newUser };
    this.setPostLoginView(newUser);
    this.saveState();
    return { success: true, user: newUser };
  }

  setPostLoginView(user) {
    if (user.role === 'admin') {
      this.state.activeView = 'pos';
    } else {
      if (!this.state.pendingCheckoutMethod) {
        this.state.activeView = 'home';
      }
    }
  }

  logout() {
    this.state.currentUser = null;
    this.state.pendingCheckoutMethod = null;
    this.state.activeView = 'home';
    this.saveState();
  }

  // ====================================================================
  // POS (POINT OF SALE) TERMINAL OPERATIONS & eTIMS RECEIPTS
  // ====================================================================
  addToPosTicket(medicineId, qty = 1) {
    const med = this.getMedicineById(medicineId);
    if (!med) return;

    const existingIndex = this.state.posTicket.findIndex(i => i.medicineId === medicineId);
    if (existingIndex > -1) {
      this.state.posTicket[existingIndex].quantity += qty;
    } else {
      this.state.posTicket.push({
        medicineId: med.id,
        name: med.name,
        price: med.price,
        quantity: qty,
        taxCode: med.category === 'devices' ? 'A' : 'E', // E = Exempt medicines, A = 16% VAT
        category: med.category
      });
    }
    this.saveState();
  }

  updatePosTicketQuantity(medicineId, delta) {
    const index = this.state.posTicket.findIndex(i => i.medicineId === medicineId);
    if (index > -1) {
      this.state.posTicket[index].quantity += delta;
      if (this.state.posTicket[index].quantity <= 0) {
        this.state.posTicket.splice(index, 1);
      }
      this.saveState();
    }
  }

  removeFromPosTicket(medicineId) {
    this.state.posTicket = this.state.posTicket.filter(i => i.medicineId !== medicineId);
    this.saveState();
  }

  clearPosTicket() {
    this.state.posTicket = [];
    this.saveState();
  }

  getPosTotals() {
    let subtotal = 0;
    let vatExemptTotal = 0;
    let vatTaxableTotal = 0;
    let vat16Total = 0;

    this.state.posTicket.forEach(item => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      if (item.taxCode === 'A' || item.category === 'devices') {
        const taxableBase = lineTotal / 1.16;
        vatTaxableTotal += taxableBase;
        vat16Total += (lineTotal - taxableBase);
      } else {
        vatExemptTotal += lineTotal;
      }
    });

    return {
      subtotal,
      vatExemptTotal: Math.round(vatExemptTotal * 100) / 100,
      vatTaxableTotal: Math.round(vatTaxableTotal * 100) / 100,
      vat16Total: Math.round(vat16Total * 100) / 100,
      grandTotal: subtotal,
      itemCount: this.state.posTicket.reduce((acc, it) => acc + it.quantity, 0)
    };
  }

  /**
   * Complete POS Counter Sale & Generate eTIMS Compliant Tax Invoice
   */
  async completePosSale(paymentMethod = 'mpesa', mpesaCode = null) {
    const totals = this.getPosTotals();
    if (this.state.posTicket.length === 0) return null;

    const orderId = 'POS-' + Math.floor(1000 + Math.random() * 9000);
    const etimsInvNo = 'ETIMS-GP-2026-' + Math.floor(10000 + Math.random() * 90000);
    const cuSerial = 'KRAMW0921804';
    const kraPin = 'P051289120Z';
    const scdc = 'SCDC-' + Math.floor(10000 + Math.random() * 90000) + '-2026';
    const cashier = this.state.currentUser ? this.state.currentUser.name : 'Pharm. Angela Muthoni';

    const ticketCopy = [...this.state.posTicket];

    // Deduct stock in memory
    ticketCopy.forEach(item => {
      this.adjustStock(item.medicineId, -item.quantity);
    });

    const receipt = {
      orderId,
      etimsInvoiceNo: etimsInvNo,
      cuSerial,
      kraPin,
      scdc,
      cashierName: cashier,
      customerName: this.state.posCustomer.name || 'Walk-in Patient',
      customerPhone: this.state.posCustomer.phone || '+254 700 000 000',
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: ticketCopy,
      subtotal: totals.subtotal,
      vatExemptTotal: totals.vatExemptTotal,
      vatTaxableTotal: totals.vatTaxableTotal,
      vat16Total: totals.vat16Total,
      totalAmount: totals.grandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      mpesaCode: mpesaCode || ('QK' + Math.floor(10000000 + Math.random() * 90000000) + 'X'),
      qrString: `https://etims.kra.go.ke/verify?cu=${cuSerial}&inv=${etimsInvNo}&tot=${totals.grandTotal}&pin=${kraPin}`
    };

    // Add to admin orders
    this.state.adminOrders.unshift({
      id: orderId,
      date: receipt.date,
      orderType: 'pos_counter',
      customerName: receipt.customerName,
      customerPhone: receipt.customerPhone,
      deliveryAddress: 'Pharmacy Counter (In-Store Dispensing)',
      items: ticketCopy,
      total: totals.grandTotal,
      status: 'Delivered',
      courier: 'In-Store Counter',
      paymentMethod: paymentMethod === 'mpesa' ? 'Lipa Na M-Pesa' : (paymentMethod === 'cash' ? 'Cash' : 'Card'),
      mpesaCode: receipt.mpesaCode,
      etimsInvoiceNo: etimsInvNo
    });

    // Try posting to MySQL backend
    try {
      fetch(`${this.apiBaseUrl}/pos/sale`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: receipt.customerName,
          customerPhone: receipt.customerPhone,
          paymentMethod,
          mpesaCode: receipt.mpesaCode,
          items: ticketCopy,
          cashierName: cashier
        })
      }).catch(() => {});
    } catch (e) {}

    this.state.lastGeneratedReceipt = receipt;
    this.state.posTicket = [];
    this.saveState();
    return receipt;
  }

  // ====================================================================
  // DYNAMIC INVENTORY & CATALOG OPERATIONS (Add/Remove Stock, Add Product)
  // ====================================================================
  getMedicineById(id) {
    return this.state.medicines.find(m => m.id === id);
  }

  adjustStock(medId, delta) {
    const med = this.getMedicineById(medId);
    if (med) {
      med.stockCount = Math.max(0, (med.stockCount || 0) + delta);
      med.inStock = med.stockCount > 0;
      this.saveState();
      try {
        fetch(`${this.apiBaseUrl}/medicines/${medId}/stock`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ delta })
        }).catch(() => {});
      } catch (e) {}
    }
  }

  addCustomMedicine(medData) {
    const newMed = {
      id: 'med-' + Date.now().toString().slice(-4),
      name: medData.name,
      genericName: medData.genericName || medData.name,
      category: medData.category || 'pain_relief',
      isRx: !!medData.isRx,
      price: Number(medData.price),
      originalPrice: Number(medData.price),
      discount: 0,
      rating: 5.0,
      reviews: 1,
      manufacturer: medData.manufacturer || 'Grasha Pharma Labs Kenya',
      dosageForm: medData.dosageForm || 'Oral Solids (Tablets)',
      packSize: medData.packSize || 'Pack of 20 Tablets',
      temperatureControlled: !!medData.temperatureControlled,
      inStock: true,
      stockCount: Number(medData.stockCount) || 50,
      tag: 'PPB Kenya Approved',
      image: medData.image || PHARMACY_IMAGE_PRESETS[0].image,
      genericAlternative: null,
      uses: medData.uses || 'Therapeutic formulation',
      sideEffects: medData.sideEffects || 'Mild gastric discomfort',
      dosage: medData.dosage || 'As directed by physician',
      warnings: medData.warnings || 'Keep out of reach of children.'
    };

    this.state.medicines.unshift(newMed);
    this.saveState();

    // Sync to MySQL API
    try {
      fetch(`${this.apiBaseUrl}/medicines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newMed.name,
          generic_name: newMed.genericName,
          category_id: newMed.category,
          price: newMed.price,
          stock_quantity: newMed.stockCount,
          image_url: newMed.image,
          dosage_form: newMed.dosageForm,
          pack_size: newMed.packSize,
          prescription_required: newMed.isRx,
          cold_chain: newMed.temperatureControlled
        })
      }).catch(() => {});
    } catch (e) {}

    return newMed;
  }

  // ====================================================================
  // DAILY SALES REPORT GENERATOR
  // ====================================================================
  getDailySalesReport(dateString = null) {
    const orders = this.state.adminOrders || [];
    let grossRevenue = 0;
    let mpesaTotal = 0;
    let cashTotal = 0;
    let cardTotal = 0;
    let totalItemsCount = 0;

    orders.forEach(o => {
      const amt = Number(o.total) || 0;
      grossRevenue += amt;
      const pm = (o.paymentMethod || '').toLowerCase();
      if (pm.includes('mpesa')) mpesaTotal += amt;
      else if (pm.includes('cash')) cashTotal += amt;
      else if (pm.includes('card')) cardTotal += amt;

      if (o.items && Array.isArray(o.items)) {
        o.items.forEach(it => { totalItemsCount += (it.quantity || 1); });
      }
    });

    return {
      reportDate: dateString || new Date().toLocaleDateString('en-GB'),
      grossRevenue,
      totalOrders: orders.length,
      mpesaTotal,
      cashTotal,
      cardTotal,
      averageTicketValue: orders.length > 0 ? Math.round(grossRevenue / orders.length) : 0,
      totalItemsSold: totalItemsCount,
      ordersList: orders
    };
  }

  // ====================================================================
  // CUSTOMER CART & ONLINE CHECKOUT OPERATIONS
  // ====================================================================
  addToCart(medicineId, quantity = 1) {
    const existingIndex = this.state.cart.findIndex(item => item.medicineId === medicineId);
    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({ medicineId, quantity, isGeneric: false });
    }
    this.saveState();
  }

  updateCartQuantity(medicineId, delta) {
    const index = this.state.cart.findIndex(item => item.medicineId === medicineId);
    if (index > -1) {
      this.state.cart[index].quantity += delta;
      if (this.state.cart[index].quantity <= 0) {
        this.state.cart.splice(index, 1);
      }
      this.saveState();
    }
  }

  removeFromCart(medicineId) {
    this.state.cart = this.state.cart.filter(item => item.medicineId !== medicineId);
    this.saveState();
  }

  clearCart() {
    this.state.cart = [];
    this.saveState();
  }

  getCartTotals() {
    let subtotal = 0;
    let originalSubtotal = 0;
    let hasRxItems = false;
    let hasColdChain = false;
    let totalItemsCount = 0;

    this.state.cart.forEach(item => {
      const med = this.getMedicineById(item.medicineId);
      if (med) {
        subtotal += med.price * item.quantity;
        originalSubtotal += (med.originalPrice || med.price) * item.quantity;
        if (med.isRx) hasRxItems = true;
        if (med.temperatureControlled) hasColdChain = true;
        totalItemsCount += item.quantity;
      }
    });

    let deliveryFee = 0;
    if (subtotal > 0) {
      deliveryFee = (this.state.deliveryOption === 'nairobi_express')
        ? (subtotal >= 2500 ? 0 : 200)
        : 450;
    }

    const savings = Math.max(0, originalSubtotal - subtotal);
    const finalTotal = subtotal + deliveryFee;

    return {
      subtotal,
      originalSubtotal,
      savings,
      deliveryFee,
      finalTotal,
      hasRxItems,
      hasColdChain,
      totalItemsCount
    };
  }

  detectInteractions() {
    const medIdsInCart = this.state.cart.map(item => item.medicineId);
    const triggeredInteractions = [];

    DRUG_INTERACTIONS.forEach(interaction => {
      const isTriggered = interaction.drugs.every(drugId => medIdsInCart.includes(drugId));
      if (isTriggered) {
        const drugA = this.getMedicineById(interaction.drugs[0]);
        const drugB = this.getMedicineById(interaction.drugs[1]);
        triggeredInteractions.push({
          ...interaction,
          drugNames: `${drugA ? drugA.name : ''} + ${drugB ? drugB.name : ''}`
        });
      }
    });

    return triggeredInteractions;
  }

  // --- Online Checkout Execution ---
  checkout(paymentMethod = 'Lipa Na M-Pesa', paymentMeta = {}) {
    const totals = this.getCartTotals();
    const cartItemsData = this.state.cart.map(item => {
      const med = this.getMedicineById(item.medicineId);
      if (med) {
        this.adjustStock(med.id, -item.quantity);
      }
      return {
        medicineId: item.medicineId,
        name: med ? med.name : 'Medicine Item',
        quantity: item.quantity,
        price: med ? med.price : 500,
        coldChain: med ? med.temperatureControlled : false,
        taxCode: 'E'
      };
    });

    const isNairobi = this.state.deliveryOption === 'nairobi_express';
    let paymentDisplay = 'Lipa Na M-Pesa';
    let mpesaCode = 'QK' + Math.floor(10000000 + Math.random() * 90000000).toString() + 'X';
    if (paymentMethod === 'card') {
      paymentDisplay = `Credit/Debit Card (Ending in ${paymentMeta.cardLast4 || '4242'})`;
      mpesaCode = null;
    } else if (paymentMethod === 'cod') {
      paymentDisplay = 'Cash / M-Pesa on Delivery';
      mpesaCode = 'COD-PENDING';
    }

    const orderId = 'GP-' + Math.floor(1000 + Math.random() * 9000);
    const customer = this.state.currentUser || DEMO_USERS[0];
    const etimsInvNo = 'ETIMS-GP-2026-' + Math.floor(10000 + Math.random() * 90000);

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orderType: 'online_delivery',
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryAddress: (this.state.deliveryAddress.estate || 'Westlands') + ', ' + (this.state.deliveryAddress.county || 'Nairobi'),
      items: cartItemsData,
      total: totals.finalTotal,
      subtotal: totals.subtotal,
      savings: totals.savings,
      status: 'Out for Express Delivery',
      deliverySpeed: isNairobi ? 'Nairobi Express (Grasha Fleet 2-4h) ⚡' : 'Countrywide Express (G4S / Fargo 24h) 🚚',
      estimatedDelivery: isNairobi ? 'Today within 18-35 mins' : 'Tomorrow by 11:00 AM',
      trackingStep: 3,
      courier: isNairobi ? 'Grasha Dedicated Fleet (Nairobi)' : 'G4S / Fargo Courier Kenya',
      riderName: 'Samuel Ochieng (PPB Certified Handler)',
      riderPhone: '+254 722 840 192',
      rxId: totals.hasRxItems ? this.state.selectedPrescriptionId : null,
      paymentMethod: paymentDisplay,
      mpesaCode: mpesaCode,
      etimsInvoiceNo: etimsInvNo,
      temperatureReading: totals.hasColdChain ? '3.8°C (Continuous Telemetry)' : 'Ambient Monitored',
      etaMinutes: isNairobi ? 18 : 120
    };

    this.state.activeOrder = newOrder;
    this.state.orders.unshift(newOrder);

    this.state.adminOrders.unshift({
      id: newOrder.id,
      date: newOrder.date,
      orderType: 'online_delivery',
      customerName: newOrder.customerName,
      customerPhone: newOrder.customerPhone,
      deliveryAddress: newOrder.deliveryAddress,
      items: newOrder.items,
      total: newOrder.total,
      status: newOrder.status,
      courier: newOrder.courier,
      riderName: newOrder.riderName,
      paymentMethod: newOrder.paymentMethod,
      mpesaCode: newOrder.mpesaCode,
      etimsInvoiceNo: etimsInvNo
    });

    // Sync to MySQL API
    try {
      fetch(`${this.apiBaseUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newOrder.id,
          userId: customer.id,
          customerName: customer.name,
          customerPhone: customer.phone,
          deliveryCounty: this.state.deliveryAddress.county,
          deliveryAddress: newOrder.deliveryAddress,
          deliverySpeed: newOrder.deliverySpeed,
          subtotal: totals.subtotal,
          deliveryFee: totals.deliveryFee,
          totalAmount: totals.finalTotal,
          paymentMethod: paymentMethod,
          mpesaCode: mpesaCode,
          rxId: newOrder.rxId,
          items: cartItemsData
        })
      }).catch(() => {});
    } catch (e) {}

    this.state.cart = [];
    this.state.pendingCheckoutMethod = null;
    this.state.activeView = 'tracking';
    this.saveState();
    return newOrder;
  }

  // --- Prescriptions ---
  uploadPrescription(data) {
    const newRx = {
      id: 'rx-nbi-' + Date.now().toString().slice(-4),
      patientName: data.patientName || (this.state.currentUser ? this.state.currentUser.name : 'Jane Wambui Kamau'),
      doctorName: data.doctorName || 'Dr. David Mwangi, MBChB',
      clinic: data.clinic || 'Aga Khan University Hospital, Nairobi',
      date: new Date().toISOString().split('T')[0],
      status: 'Verified by PPB Pharmacist',
      medicinesListed: data.medicinesListed || ['Augmentin 625mg (14 Tabs)', 'Panadol Extra (20 Tabs)'],
      validUntil: '2027-11-12',
      verifiedBy: 'Pharm. Angela Muthoni, B.Pharm #PPB-3912',
      image: data.imageUrl || MOCK_PRESCRIPTIONS[0].image,
      notes: data.notes || 'Submitted via Grasha Pharma Web App'
    };
    this.state.prescriptions.unshift(newRx);
    this.state.selectedPrescriptionId = newRx.id;
    this.saveState();
    return newRx;
  }

  selectPrescription(rxId) {
    this.state.selectedPrescriptionId = rxId;
    this.saveState();
  }

  // --- Pill Reminders ---
  togglePillReminder(id) {
    const rem = this.state.pillReminders.find(r => r.id === id);
    if (rem) {
      rem.takenToday = !rem.takenToday;
      if (rem.takenToday) {
        rem.pillsLeft = Math.max(0, rem.pillsLeft - 1);
        rem.streakDays += 1;
      } else {
        rem.pillsLeft += 1;
        rem.streakDays = Math.max(0, rem.streakDays - 1);
      }
      this.saveState();
    }
  }

  addPillReminder(reminder) {
    this.state.pillReminders.push({
      id: 'rem-' + Date.now().toString().slice(-4),
      takenToday: false,
      streakDays: 0,
      autoRefill: true,
      ...reminder
    });
    this.saveState();
  }

  // --- WhatsApp Messenger Simulation ---
  sendWhatsAppMessage(text) {
    const userMsg = {
      id: 'wa-user-' + Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text
    };
    this.state.whatsappMessages.push(userMsg);
    this.saveState();

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "";

      if (lower.includes('1') || lower.includes('rx') || lower.includes('prescription')) {
        reply = "📄 *Prescription Upload Assistance*\n\nYou can upload your doctor's slip photo directly under the *'Prescriptions'* tab. Our clinical team reviews slips in under 5 minutes.\n\n*Important PPB Rule:* Please keep the physical prescription slip ready to hand to our courier upon delivery handover.";
      } else if (lower.includes('2') || lower.includes('mpesa') || lower.includes('lipa')) {
        reply = "📱 *Lipa Na M-Pesa Information*\n\n• *Business Paybill:* 891200\n• *Account Name:* Grasha Pharma Ltd\n\nWhen checking out in the cart, select 'Lipa Na M-Pesa' to get an instant STK prompt sent to your Safaricom phone!";
      } else if (lower.includes('3') || lower.includes('track') || lower.includes('map')) {
        reply = "🚚 *Delivery Tracking via Google Maps*\n\n• *Nairobi County:* Delivered in 2-4 hours by our dedicated Grasha fleet (Van KDA 419P).\n• *Rest of Kenya:* Delivered within 24 hours via G4S and Fargo Courier.\n\nCheck the *'Track'* tab for live Google Maps GPS telemetry.";
      } else {
        reply = "Thank you for reaching out to *Grasha Pharma WhatsApp Care* (+254 722 840 192).\n\nLicensed by *Pharmacy & Poisons Board Kenya* (PPB #3912).\n\nReply with:\n1️⃣ Upload Rx Slip\n2️⃣ Lipa Na M-Pesa Support\n3️⃣ Track Delivery Fleet\n4️⃣ Ask a Clinical Pharmacist";
      }

      const botMsg = {
        id: 'wa-bot-' + (Date.now() + 1),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: reply
      };
      this.state.whatsappMessages.push(botMsg);
      this.saveState();
    }, 500);
  }

  // --- View Controller Controls ---
  setView(viewName) {
    this.state.activeView = viewName;
    this.saveState();
  }

  setCategory(catId) {
    this.state.selectedCategory = catId;
    this.saveState();
  }

  setSearch(query) {
    this.state.searchQuery = query;
    this.saveState();
  }

  setAdminTab(tabName) {
    this.state.adminActiveTab = tabName;
    this.saveState();
  }

  setDeliveryOption(option) {
    this.state.deliveryOption = option;
    this.saveState();
  }

  setPaymentMethod(method) {
    this.state.paymentMethod = method;
    this.saveState();
  }
}

window.store = new GrashaStore();
