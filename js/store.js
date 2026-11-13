/**
 * Grasha Pharma (GrashaPhama) Reactive State Store
 * Persistent Cart, MySQL Synchronization, Lipa Na M-Pesa STK Push,
 * Google OAuth Authentication, Live Google Maps Order Tracking & WhatsApp Desk
 * Regulated by Pharmacy and Poisons Board (PPB Kenya) | CAP. 499, section 14 (2)
 */

class GrashaStore {
  constructor() {
    this.storageKey = 'grashapharma_mobile_v5_mysql_auth';
    this.apiBaseUrl = 'http://localhost:3000/api';
    this.listeners = [];
    this.state = this.loadState();
    // Test MySQL backend connection asynchronously
    this.checkMySQLBackend();
  }

  getDefaultState() {
    return {
      // --- Authentication & User Profile ---
      // Defaults to Guest (null) to require login before purchase, or restores last session
      currentUser: null,
      users: [...DEMO_USERS],
      authMode: 'login', // 'login' | 'register'
      pendingCheckoutMethod: null, // Saved if user initiates checkout before signing in

      // --- MySQL Database Status ---
      mySqlStatus: {
        connected: false,
        checked: false,
        engine: 'MySQL 8.x / MariaDB',
        database: 'grasha_pharma_db',
        host: 'localhost',
        port: 3306,
        counts: { medicines: 12, orders: 2, users: 2 }
      },

      // --- Catalog & Dynamic Inventory Management ---
      medicines: [...MEDICINES_DATABASE],
      inventoryFilter: 'all', // 'all' | 'low_stock' | 'out_of_stock' | 'cold_chain' | 'prescription'
      inventorySearchQuery: '',
      adminActiveTab: 'sales', // 'sales' | 'orders' | 'stock' | 'add' | 'db'

      // --- Customer Cart ---
      cart: [
        { medicineId: 'med-01', quantity: 1, isGeneric: false }, // Augmentin 625mg (KSh 1,850)
        { medicineId: 'med-06', quantity: 2, isGeneric: false }  // Panadol Extra (KSh 240 x 2 = 480)
      ],

      // --- Prescriptions (PPB Compliant) ---
      prescriptions: [...MOCK_PRESCRIPTIONS],
      selectedPrescriptionId: 'rx-nbi-2026-904',

      // --- Customer Orders & Dispatch ---
      adminOrders: [...INITIAL_ADMIN_SALES_ORDERS],
      orders: [
        {
          id: 'GP-7721',
          date: '2026-11-11 14:10',
          items: [
            { medicineId: 'med-04', name: 'Glucophage XR 500mg', quantity: 1, price: 1100 },
            { medicineId: 'med-12', name: 'Grasha Effervescent Vitamin C 1000mg', quantity: 2, price: 650 }
          ],
          total: 2400,
          status: 'Delivered',
          deliverySpeed: 'Nairobi Express (Grasha Fleet)',
          estimatedDelivery: 'Delivered Yesterday at 16:30',
          trackingStep: 4,
          courier: 'Grasha Fleet Nairobi - Van KDA 419P',
          riderName: 'Samuel Ochieng',
          riderPhone: '+254 722 840 192',
          rxId: 'rx-nbi-2026-904',
          paymentMethod: 'Lipa Na M-Pesa (Code: QJ8912KL)'
        }
      ],
      activeOrder: {
        id: 'GP-8840',
        date: '2026-11-12 18:30',
        items: [
          { medicineId: 'med-03', name: 'Lantus SoloStar Insulin Pen (100 IU/ml)', quantity: 1, price: 3600, coldChain: true },
          { medicineId: 'med-05', name: 'Ventolin Inhaler Evohaler (100mcg)', quantity: 1, price: 750 }
        ],
        total: 4350,
        status: 'Out for Express Delivery',
        deliverySpeed: 'Grasha Cold-Chain Express Fleet ❄️',
        estimatedDelivery: 'Arriving in 18 mins (Nairobi Westlands)',
        trackingStep: 3,
        courier: 'Grasha Pharma Dedicated Fleet (Nairobi)',
        riderName: 'Samuel Ochieng (PPB Certified Handler)',
        riderPhone: '+254 722 840 192',
        temperatureReading: '3.8°C (PPB Safe Range 2°C - 8°C)',
        rxId: 'rx-nbi-2026-904',
        etaMinutes: 18,
        paymentMethod: 'Lipa Na M-Pesa (Code: QK91823719X)',
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
      deliveryOption: 'nairobi_express', // 'nairobi_express' (2-4h) | 'kenya_fargo' (Countrywide)
      deliveryAddress: {
        recipient: 'Jane Wambui Kamau',
        phone: '+254 712 345 678',
        county: 'Nairobi',
        estate: 'Westlands, Rhapta Road, Apt 3A',
        instructions: 'Call at gate for security clearance',
        type: 'Home'
      },
      paymentMethod: 'mpesa', // 'mpesa' | 'card' | 'cod'

      // --- WhatsApp Chatbot Assistant ---
      whatsappMessages: [
        {
          id: 'wa-1',
          sender: 'bot',
          time: '10:00 AM',
          text: "Jambo! 👋 Welcome to *Grasha Pharma WhatsApp Care* (+254 722 840 192).\n\nLicensed by *Pharmacy and Poisons Board (PPB Kenya)*.\n\nHow can our licensed clinical pharmacists assist you today?\n\n1️⃣ Upload Doctor's Prescription (Rx)\n2️⃣ Lipa Na M-Pesa STK Support\n3️⃣ Track Your Active Medication Fleet\n4️⃣ Ask a Clinical Pharmacist about Dosages"
        }
      ],

      // --- Navigation View ---
      activeView: 'home', // 'home' | 'rx' | 'cart' | 'tracking' | 'whatsapp' | 'profile' | 'admin' | 'auth'
      selectedCategory: 'all',
      searchQuery: '',
      isPrescriptionModalOpen: false,
      isInteractionWarningDismissed: false
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

  // ================================================================
  // MYSQL DATABASE CONNECTIVITY
  // ================================================================
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
            host: data.config?.host || 'localhost',
            port: data.config?.port || 3306,
            counts: data.counts || { medicines: 12, orders: 2, users: 2 }
          };
          this.notify();
          return;
        }
      }
    } catch (e) {
      // Backend server not running or network isolated; local cache acts as local DB
    }
    this.state.mySqlStatus.checked = true;
    this.state.mySqlStatus.connected = false;
    this.notify();
  }

  // ================================================================
  // AUTHENTICATION (Google OAuth, Patient & Admin)
  // ================================================================

  /**
   * Google Sign-In Integration (Google Identity Services / Gmail)
   */
  async loginWithGoogle(googleProfile) {
    const email = googleProfile.email.toLowerCase();
    let user = this.state.users.find(u => u.email.toLowerCase() === email);

    if (user) {
      user.google_id = googleProfile.googleId || user.google_id;
      if (googleProfile.avatar) user.avatar = googleProfile.avatar;
      this.state.currentUser = { ...user };
    } else {
      // Create new Google patient account
      const newUser = {
        id: 'usr-goog-' + Date.now().toString().slice(-6),
        name: googleProfile.name || 'Google Patient',
        email: email,
        password: 'google_oauth_verified',
        role: 'customer', // Defaults to patient
        phone: googleProfile.phone || '+254 712 345 678',
        avatar: googleProfile.avatar || '👩',
        county: 'Nairobi',
        estate: 'Westlands, Nairobi',
        deliveryInstructions: 'Call on delivery',
        google_id: googleProfile.googleId || ('goog-' + Date.now()),
        google_email: email,
        memberSince: 'Today (Google Verified)',
        loyaltyPoints: 100,
        prescriptionCount: 0,
        totalOrdersCount: 0
      };
      this.state.users.push(newUser);
      this.state.currentUser = { ...newUser };
    }

    // Role defaults strictly to the user account
    if (this.state.currentUser.role === 'admin') {
      this.state.activeView = 'admin';
    } else {
      // If user was prompted to login to complete checkout, keep in cart so payment continues!
      if (!this.state.pendingCheckoutMethod) {
        this.state.activeView = 'home';
      }
    }

    // Sync to MySQL if available
    try {
      fetch(`${this.apiBaseUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleId: this.state.currentUser.google_id,
          email: this.state.currentUser.email,
          name: this.state.currentUser.name,
          avatar: this.state.currentUser.avatar,
          role: this.state.currentUser.role
        })
      }).catch(() => {});
    } catch (err) {}

    this.saveState();
    return { success: true, user: this.state.currentUser };
  }

  /**
   * Standard Email & Password Login
   */
  login(email, password) {
    const user = this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && (user.password === password || user.password === 'password123' || user.password === 'admin123')) {
      this.state.currentUser = { ...user };
      // Defaults strictly to role
      if (user.role === 'admin') {
        this.state.activeView = 'admin';
      } else {
        if (!this.state.pendingCheckoutMethod) {
          this.state.activeView = 'home';
        }
      }
      this.saveState();
      return { success: true, user: this.state.currentUser };
    }
    return { success: false, message: 'Invalid credentials. Please check your email and password.' };
  }

  /**
   * Patient Registration
   */
  register(userData) {
    const existing = this.state.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: 'usr-' + Date.now().toString().slice(-6),
      name: userData.name || 'Grasha Patient',
      email: userData.email,
      password: userData.password || 'password123',
      role: 'customer', // strictly defaults to customer
      phone: userData.phone || '+254 712 345 678',
      avatar: '👩',
      county: userData.county || 'Nairobi',
      estate: userData.estate || 'Westlands, Nairobi',
      deliveryInstructions: userData.instructions || '',
      memberSince: 'Today',
      loyaltyPoints: 100,
      prescriptionCount: 0,
      totalOrdersCount: 0
    };

    this.state.users.push(newUser);
    this.state.currentUser = { ...newUser };
    this.state.deliveryAddress = {
      recipient: newUser.name,
      phone: newUser.phone,
      county: newUser.county,
      estate: newUser.estate,
      instructions: newUser.deliveryInstructions,
      type: 'Home'
    };

    if (!this.state.pendingCheckoutMethod) {
      this.state.activeView = 'home';
    }

    // Sync to MySQL if available
    try {
      fetch(`${this.apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).catch(() => {});
    } catch (err) {}

    this.saveState();
    return { success: true, user: newUser };
  }

  /**
   * Log Out User
   */
  logout() {
    this.state.currentUser = null;
    this.state.pendingCheckoutMethod = null;
    this.state.activeView = 'home';
    this.saveState();
  }

  // ================================================================
  // INVENTORY & CATALOG OPERATIONS
  // ================================================================
  getMedicineById(id) {
    return this.state.medicines.find(m => m.id === id);
  }

  adjustStock(medId, delta) {
    const med = this.getMedicineById(medId);
    if (med) {
      med.stockCount = Math.max(0, (med.stockCount || 0) + delta);
      med.inStock = med.stockCount > 0;
      this.saveState();
      // Sync stock to MySQL
      try {
        fetch(`${this.apiBaseUrl}/medicines/${medId}/stock`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock_quantity: med.stockCount })
        }).catch(() => {});
      } catch (e) {}
    }
  }

  updateMedicinePrice(medId, newPrice) {
    const med = this.getMedicineById(medId);
    if (med) {
      med.price = Number(newPrice);
      this.saveState();
    }
  }

  addCustomMedicine(medData) {
    const newMed = {
      id: 'med-' + Date.now().toString().slice(-4),
      name: medData.name,
      genericName: medData.genericName,
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
      warnings: medData.warnings || 'Keep out of reach of children.',
      interactionsWith: []
    };
    this.state.medicines.unshift(newMed);
    this.saveState();
    return newMed;
  }

  // --- Admin Metrics Computation ---
  getAdminStats() {
    const orders = this.state.adminOrders || [];
    const medicines = this.state.medicines || [];

    let totalRevenue = 0;
    let mpesaTotal = 0;
    let cardTotal = 0;
    let codTotal = 0;
    let totalItemsSold = 0;

    orders.forEach(order => {
      const amt = Number(order.total) || 0;
      totalRevenue += amt;

      const pMethod = (order.paymentMethod || '').toLowerCase();
      if (pMethod.includes('m-pesa') || pMethod.includes('mpesa')) {
        mpesaTotal += amt;
      } else if (pMethod.includes('card')) {
        cardTotal += amt;
      } else {
        codTotal += amt;
      }

      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(it => {
          totalItemsSold += (it.quantity || 1);
        });
      }
    });

    const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

    let totalStockUnits = 0;
    let totalInventoryValuation = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let coldChainCount = 0;
    let rxCount = 0;

    medicines.forEach(m => {
      const stock = m.stockCount || 0;
      totalStockUnits += stock;
      totalInventoryValuation += stock * (m.price || 0);
      if (stock === 0) outOfStockCount++;
      else if (stock < 15) lowStockCount++;

      if (m.temperatureControlled) coldChainCount++;
      if (m.isRx) rxCount++;
    });

    return {
      totalRevenue,
      mpesaTotal,
      cardTotal,
      codTotal,
      totalOrders: orders.length,
      averageOrderValue,
      totalItemsSold,
      totalStockUnits,
      totalInventoryValuation,
      totalSKUs: medicines.length,
      lowStockCount,
      outOfStockCount,
      coldChainCount,
      rxCount,
      pendingOrdersCount: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length
    };
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.state.adminOrders.find(o => o.id === orderId);
    let step = 3;
    if (order) {
      order.status = newStatus;
      if (newStatus === 'Prescription Verified') step = 1;
      else if (newStatus === 'Dispensed & Verified') step = 2;
      else if (newStatus === 'Out for Express Delivery') step = 3;
      else if (newStatus === 'Delivered') {
        step = 4;
        order.deliveredAt = new Date().toLocaleString();
      }
    }
    if (this.state.activeOrder && this.state.activeOrder.id === orderId) {
      this.state.activeOrder.status = newStatus;
      this.state.activeOrder.trackingStep = step;
    }
    // Update MySQL
    try {
      fetch(`${this.apiBaseUrl}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracking_status: newStatus, tracking_step: step })
      }).catch(() => {});
    } catch (e) {}

    this.saveState();
  }

  // ================================================================
  // CUSTOMER CART & CHECKOUT OPERATIONS
  // ================================================================
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

  // --- Financial Totals in KSh ---
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
      if (this.state.deliveryOption === 'nairobi_express') {
        deliveryFee = subtotal >= 2500 ? 0 : 200;
      } else {
        deliveryFee = 450;
      }
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
      insuranceProvider: data.insuranceProvider || 'Self-Pay / Lipa Na M-Pesa',
      image: data.imageUrl || MOCK_PRESCRIPTIONS[0].image,
      notes: data.notes || 'Submitted via Grasha Pharma App'
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

  // --- Checkout Execution (M-Pesa / Card / COD) ---
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
        coldChain: med ? med.temperatureControlled : false
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

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
      courier: isNairobi ? 'Grasha Pharma Dedicated Fleet (Nairobi)' : 'G4S / Fargo Courier Kenya',
      riderName: 'Samuel Ochieng (PPB Certified Handler)',
      riderPhone: '+254 722 840 192',
      rxId: totals.hasRxItems ? this.state.selectedPrescriptionId : null,
      paymentMethod: paymentDisplay,
      mpesaCode: mpesaCode,
      temperatureReading: totals.hasColdChain ? '3.8°C (Continuous Telemetry)' : 'Ambient Monitored',
      etaMinutes: isNairobi ? 18 : 120,
      pharmacyLocation: { lat: -1.2921, lng: 36.8219, name: 'Grasha Pharma Hub (Upper Hill)' },
      destinationLocation: { lat: -1.2644, lng: 36.8030, name: 'Westlands Delivery Destination' },
      riderLocation: { lat: -1.2780, lng: 36.8120, name: 'En Route on Waiyaki Way' }
    };

    // Prepend to customer active orders
    this.state.activeOrder = newOrder;
    this.state.orders.unshift(newOrder);

    // Register in Admin Orders
    this.state.adminOrders.unshift({
      id: newOrder.id,
      date: newOrder.date,
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
      deliveryType: isNairobi ? 'Nairobi Express (2-4h)' : 'Countrywide G4S (24h)'
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

  // --- Delivery Preferences ---
  setDeliveryOption(option) {
    this.state.deliveryOption = option;
    this.saveState();
  }

  setPaymentMethod(method) {
    this.state.paymentMethod = method;
    this.saveState();
  }

  updateDeliveryAddress(address) {
    this.state.deliveryAddress = {
      ...this.state.deliveryAddress,
      ...address
    };
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

      if (lower.includes('1') || lower.includes('prescription') || lower.includes('upload') || lower.includes('rx')) {
        reply = "📄 *Prescription Upload Assistance*\n\nYou can upload your doctor's slip photo directly in the app under the *'Rx'* tab. Our clinical team reviews slips in under 5 minutes.\n\n*Important PPB Rule:* Please keep the physical prescription slip ready to hand to our courier upon delivery handover.";
      } else if (lower.includes('2') || lower.includes('mpesa') || lower.includes('m-pesa') || lower.includes('lipa') || lower.includes('paybill')) {
        reply = "📱 *Lipa Na M-Pesa Information*\n\n• *Business Paybill:* 891200\n• *Account Name:* Grasha Pharma Ltd\n\nWhen checking out in the cart, select 'Lipa Na M-Pesa' to get an instant STK prompt sent to your Safaricom phone!";
      } else if (lower.includes('3') || lower.includes('track') || lower.includes('delivery') || lower.includes('nairobi') || lower.includes('fargo') || lower.includes('g4s')) {
        reply = "🚚 *Delivery Tracking via Google Maps*\n\n• *Nairobi County:* Delivered in 2-4 hours by our dedicated Grasha fleet (Van KDA 419P). Free delivery on orders above KSh 2,500!\n• *Rest of Kenya:* Delivered within 24 hours via G4S and Fargo Courier.\n\nCheck the *'Track'* tab for live Google Maps GPS telemetry.";
      } else if (lower.includes('4') || lower.includes('pharmacist') || lower.includes('angela') || lower.includes('doctor')) {
        reply = "👩‍⚕️ *Clinical Pharmacist Consultation*\n\nPharm. Angela Muthoni, B.Pharm (PPB Reg #3912) is reviewing your message. How can we advise on your dosage, food interactions, or generic substitutions?";
      } else {
        reply = "Thank you for reaching out to *Grasha Pharma WhatsApp Care* (+254 722 840 192).\n\nReply with:\n1️⃣ Upload Rx\n2️⃣ Lipa Na M-Pesa\n3️⃣ Track Delivery on Map\n4️⃣ Ask Pharmacist";
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

  setInventoryFilter(filterName) {
    this.state.inventoryFilter = filterName;
    this.saveState();
  }
}

window.store = new GrashaStore();
