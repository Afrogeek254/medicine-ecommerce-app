/**
 * Grasha Pharma (GrashaPhama) Reactive State Store
 * Persistent Cart, Inventory Management, Admin Sales Monitoring, Auth & Roles, Lipa Na M-Pesa & WhatsApp
 */

class GrashaStore {
  constructor() {
    this.storageKey = 'grashapharma_mobile_v4_admin_auth';
    this.listeners = [];
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      // --- Authentication & User Profile ---
      currentUser: { ...DEMO_USERS[0] }, // Default to Patient/Customer (Jane Wambui Kamau)
      users: [...DEMO_USERS],
      authMode: 'login', // 'login' | 'register'

      // --- Catalog & Dynamic Inventory Management ---
      medicines: [...MEDICINES_DATABASE],
      inventoryFilter: 'all', // 'all' | 'low_stock' | 'out_of_stock' | 'cold_chain' | 'prescription'
      inventorySearchQuery: '',
      adminActiveTab: 'sales', // 'sales' | 'orders' | 'stock' | 'add'

      // --- Customer Cart ---
      cart: [
        { medicineId: 'med-01', quantity: 1, isGeneric: false }, // Augmentin 625mg (KSh 1,850)
        { medicineId: 'med-06', quantity: 2, isGeneric: false }  // Panadol Extra (KSh 240 x 2 = 480)
      ],

      // --- Prescriptions ---
      prescriptions: [...MOCK_PRESCRIPTIONS],
      selectedPrescriptionId: 'rx-nbi-2026-904',

      // --- Admin & Customer Orders ---
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
        estimatedDelivery: 'Arriving in 25 mins (Nairobi Westlands)',
        trackingStep: 3,
        courier: 'Grasha Pharma Dedicated Fleet (Nairobi)',
        riderName: 'Peter Kamau (Certified PPB Handler)',
        riderPhone: '+254 712 908 345',
        temperatureReading: '4.1°C (Monitored 2°C - 8°C)',
        rxId: 'rx-nbi-2026-904',
        etaMinutes: 25,
        paymentMethod: 'Lipa Na M-Pesa (STK Confirmed)'
      },

      // --- Pill Reminders ---
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
        },
        {
          id: 'rem-3',
          name: 'Lipitor (Atorvastatin 20mg)',
          dosage: '1 Tablet at bedtime',
          time: '21:30',
          period: 'Night',
          takenToday: false,
          streakDays: 28,
          pillsLeft: 6,
          autoRefill: true
        }
      ],

      // --- Customer Delivery Address ---
      deliveryAddress: {
        recipient: 'Jane Wambui Kamau',
        phone: '+254 712 345 678',
        county: 'Nairobi',
        estate: 'Westlands, Rhapta Road, Apt 3A',
        instructions: 'Call at gate for security clearance',
        type: 'Home'
      },
      deliveryOption: 'nairobi_express', // 'nairobi_express' (Grasha Fleet 2-4h) | 'kenya_fargo' (G4S / Fargo Courier 24h)
      paymentMethod: 'mpesa', // 'mpesa' | 'card' | 'cod' | 'insurance'
      selectedInsurance: 'Jubilee Health Insurance',
      insuranceMemberNo: 'JUB-882190-01',

      // --- WhatsApp Consultation ---
      whatsappMessages: [
        {
          id: 'wa-1',
          sender: 'bot',
          time: '20:30',
          text: '👋 Jambo! Welcome to *Grasha Pharma WhatsApp Care* (+254 722 840 192).\n\nLicensed by *Pharmacy & Poisons Board (PPB Kenya)*.\nHow can our clinical team assist you today?\n\n1️⃣ Upload Doctor\'s Prescription\n2️⃣ Lipa Na M-Pesa Assistance\n3️⃣ Track Delivery (Nairobi Fleet / G4S)\n4️⃣ Speak with Clinical Pharmacist'
        }
      ],

      // --- Navigation & Filter State ---
      selectedCategory: 'all',
      searchQuery: '',
      activeView: 'home', // 'home' | 'catalog' | 'cart' | 'rx' | 'tracking' | 'reminders' | 'whatsapp' | 'profile' | 'admin' | 'auth'
      selectedMedicineId: null
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure medicines array is preserved or seeded
        if (!parsed.medicines || !Array.isArray(parsed.medicines) || parsed.medicines.length === 0) {
          parsed.medicines = [...MEDICINES_DATABASE];
        }
        if (!parsed.adminOrders || !Array.isArray(parsed.adminOrders)) {
          parsed.adminOrders = [...INITIAL_ADMIN_SALES_ORDERS];
        }
        if (!parsed.users || !Array.isArray(parsed.users)) {
          parsed.users = [...DEMO_USERS];
        }
        return { ...this.getDefaultState(), ...parsed };
      }
    } catch (e) {
      console.warn('Could not load saved state:', e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state:', e);
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
    this.listeners.forEach(fn => fn(this.state));
  }

  // ================================================================
  // AUTHENTICATION & USER MANAGEMENT
  // ================================================================
  login(email, password) {
    const user = this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      this.state.currentUser = { ...user };
      if (user.role === 'admin') {
        this.state.activeView = 'admin';
      } else {
        this.state.activeView = 'home';
      }
      this.saveState();
      return { success: true, user: this.state.currentUser };
    }
    return { success: false, message: 'Invalid email or password. Try demo credentials!' };
  }

  register(userData) {
    const existing = this.state.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name || 'Grasha Patient',
      email: userData.email,
      password: userData.password || 'password123',
      role: 'customer',
      phone: userData.phone || '+254 712 345 678',
      avatar: '👤',
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
    this.state.activeView = 'home';
    this.saveState();
    return { success: true, user: newUser };
  }

  logout() {
    this.state.currentUser = null;
    this.state.activeView = 'auth';
    this.saveState();
  }

  switchRole(targetRole = 'admin') {
    if (targetRole === 'admin') {
      const adminUser = this.state.users.find(u => u.role === 'admin') || DEMO_USERS[1];
      this.state.currentUser = { ...adminUser };
      this.state.activeView = 'admin';
    } else {
      const custUser = this.state.users.find(u => u.role === 'customer') || DEMO_USERS[0];
      this.state.currentUser = { ...custUser };
      this.state.activeView = 'home';
    }
    this.saveState();
  }

  // ================================================================
  // INVENTORY & PRODUCT MANAGEMENT (ADMIN)
  // ================================================================
  getMedicines() {
    return this.state.medicines || [...MEDICINES_DATABASE];
  }

  getMedicineById(medicineId) {
    return this.state.medicines.find(m => m.id === medicineId) || 
           MEDICINES_DATABASE.find(m => m.id === medicineId);
  }

  addMedicine(data) {
    const newId = 'med-' + Date.now().toString().slice(-5);
    const price = parseInt(data.price, 10) || 500;
    const originalPrice = data.originalPrice ? parseInt(data.originalPrice, 10) : Math.round(price * 1.25);
    const stockCount = parseInt(data.stockCount, 10) || 50;

    const newMed = {
      id: newId,
      name: data.name,
      genericName: data.genericName || data.name,
      category: data.category || 'otc',
      isRx: !!data.isRx,
      price: price,
      originalPrice: originalPrice,
      discount: Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100)),
      rating: 5.0,
      reviews: 1,
      manufacturer: data.manufacturer || 'Grasha Pharma Certified',
      dosageForm: data.dosageForm || 'Oral Solids (Tablets & Hard Gelatine Capsules)',
      packSize: data.packSize || 'Pack of 30 Units',
      temperatureControlled: !!data.temperatureControlled,
      inStock: stockCount > 0,
      stockCount: stockCount,
      costPrice: data.costPrice ? parseInt(data.costPrice, 10) : Math.round(price * 0.65),
      tag: data.tag || (data.isRx ? 'Prescription Only' : 'Fast Relief'),
      image: data.image || PHARMACY_IMAGE_PRESETS[0].url,
      genericAlternative: null,
      uses: data.uses && Array.isArray(data.uses) ? data.uses : (data.uses ? [data.uses] : ['Therapeutic Treatment']),
      sideEffects: ['Mild gastric discomfort in rare instances'],
      dosage: data.dosage || 'Take as instructed by qualified healthcare professional.',
      warnings: data.warnings || 'Keep out of reach of children. Store in a cool dry place below 30°C.',
      interactionsWith: []
    };

    this.state.medicines.unshift(newMed);
    this.saveState();
    return newMed;
  }

  updateMedicineStock(medicineId, newStock) {
    const med = this.state.medicines.find(m => m.id === medicineId);
    if (med) {
      const stock = Math.max(0, parseInt(newStock, 10) || 0);
      med.stockCount = stock;
      med.inStock = stock > 0;
      this.saveState();
    }
  }

  adjustStock(medicineId, delta) {
    const med = this.state.medicines.find(m => m.id === medicineId);
    if (med) {
      const current = med.stockCount || 0;
      const updated = Math.max(0, current + delta);
      med.stockCount = updated;
      med.inStock = updated > 0;
      this.saveState();
    }
  }

  updateMedicine(medicineId, updatedFields) {
    const index = this.state.medicines.findIndex(m => m.id === medicineId);
    if (index !== -1) {
      this.state.medicines[index] = {
        ...this.state.medicines[index],
        ...updatedFields
      };
      if (updatedFields.stockCount !== undefined) {
        this.state.medicines[index].inStock = updatedFields.stockCount > 0;
      }
      this.saveState();
    }
  }

  removeMedicine(medicineId) {
    this.state.medicines = this.state.medicines.filter(m => m.id !== medicineId);
    // Also remove from active cart if present
    this.state.cart = this.state.cart.filter(i => i.medicineId !== medicineId);
    this.saveState();
  }

  // ================================================================
  // SALES, ANALYTICS & ORDERS MONITORING (ADMIN)
  // ================================================================
  getSalesAnalytics() {
    const orders = this.state.adminOrders || [];
    const medicines = this.getMedicines();

    let totalRevenue = 0;
    let mpesaTotal = 0;
    let cardTotal = 0;
    let codTotal = 0;
    let totalItemsSold = 0;

    orders.forEach(order => {
      const amount = order.total || 0;
      totalRevenue += amount;
      if (order.paymentMethod && order.paymentMethod.toLowerCase().includes('m-pesa')) {
        mpesaTotal += amount;
      } else if (order.paymentMethod && order.paymentMethod.toLowerCase().includes('card')) {
        cardTotal += amount;
      } else {
        codTotal += amount;
      }

      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(it => {
          totalItemsSold += (it.quantity || 1);
        });
      }
    });

    const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

    // Inventory metrics
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
    if (order) {
      order.status = newStatus;
      if (newStatus === 'Delivered') {
        order.deliveredAt = new Date().toLocaleString();
      }
    }
    // Also update customer's active order if matching
    if (this.state.activeOrder && this.state.activeOrder.id === orderId) {
      this.state.activeOrder.status = newStatus;
      if (newStatus === 'Prescription Verified') this.state.activeOrder.trackingStep = 1;
      else if (newStatus === 'Dispensed & Verified') this.state.activeOrder.trackingStep = 2;
      else if (newStatus === 'Out for Express Delivery') this.state.activeOrder.trackingStep = 3;
      else if (newStatus === 'Delivered') this.state.activeOrder.trackingStep = 4;
    }
    this.saveState();
  }

  // ================================================================
  // CUSTOMER CART & CHECKOUT OPERATIONS
  // ================================================================
  addToCart(medicineId, qty = 1) {
    const existing = this.state.cart.find(item => item.medicineId === medicineId);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.state.cart.push({ medicineId, quantity: qty, isGeneric: false });
    }
    this.saveState();
  }

  removeFromCart(medicineId) {
    this.state.cart = this.state.cart.filter(item => item.medicineId !== medicineId);
    this.saveState();
  }

  updateQuantity(medicineId, delta) {
    const item = this.state.cart.find(i => i.medicineId === medicineId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(medicineId);
    } else {
      this.saveState();
    }
  }

  swapWithGeneric(brandedMedId) {
    const med = this.getMedicineById(brandedMedId);
    if (!med || !med.genericAlternative) return;

    let genericProduct = this.getMedicineById(med.genericAlternative.id);
    if (!genericProduct) {
      genericProduct = {
        id: med.genericAlternative.id,
        name: med.genericAlternative.name,
        genericName: med.genericName,
        category: med.category,
        isRx: med.isRx,
        price: med.genericAlternative.price,
        originalPrice: med.price,
        discount: Math.round(((med.price - med.genericAlternative.price) / med.price) * 100),
        rating: 4.9,
        reviews: 420,
        manufacturer: med.genericAlternative.manufacturer,
        dosageForm: med.dosageForm,
        packSize: med.packSize,
        temperatureControlled: med.temperatureControlled,
        inStock: true,
        stockCount: 150,
        tag: 'Grasha Generic Equivalent',
        image: med.image,
        genericAlternative: null,
        uses: med.uses,
        sideEffects: med.sideEffects,
        dosage: med.dosage,
        warnings: med.warnings,
        interactionsWith: med.interactionsWith
      };
      this.state.medicines.push(genericProduct);
    }

    const cartIndex = this.state.cart.findIndex(i => i.medicineId === brandedMedId);
    if (cartIndex !== -1) {
      const currentQty = this.state.cart[cartIndex].quantity;
      this.state.cart.splice(cartIndex, 1, {
        medicineId: genericProduct.id,
        quantity: currentQty,
        isGeneric: true
      });
      this.saveState();
    }
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

  // --- Checkout Execution (M-Pesa / Card / COD / Insurance) ---
  checkout(paymentMethod = 'Lipa Na M-Pesa', paymentMeta = {}) {
    const totals = this.getCartTotals();
    const cartItemsData = this.state.cart.map(item => {
      const med = this.getMedicineById(item.medicineId);
      // Deduct stock in inventory
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
    } else if (paymentMethod === 'insurance') {
      paymentDisplay = `Insurance Claim (${paymentMeta.insuranceName || 'Jubilee Health'})`;
      mpesaCode = 'INS-CLAIM';
    }

    const orderId = 'GP-' + Math.floor(1000 + Math.random() * 9000);
    const customer = this.state.currentUser || DEMO_USERS[0];

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryAddress: this.state.deliveryAddress.estate + ', ' + this.state.deliveryAddress.county,
      items: cartItemsData,
      total: totals.finalTotal,
      subtotal: totals.subtotal,
      savings: totals.savings,
      status: 'Prescription Verified',
      deliverySpeed: isNairobi ? 'Nairobi Express (Grasha Fleet 2-4h) ⚡' : 'Countrywide Express (G4S / Fargo 24h) 🚚',
      estimatedDelivery: isNairobi ? 'Today within 2-4 Hours' : 'Tomorrow by 11:00 AM',
      trackingStep: 1,
      courier: isNairobi ? 'Grasha Pharma Dedicated Fleet (Nairobi)' : 'G4S / Fargo Courier Kenya',
      riderName: isNairobi ? 'Peter Kamau (PPB Certified Handler)' : 'G4S Courier Express Agent',
      riderPhone: '+254 712 908 345',
      rxId: totals.hasRxItems ? this.state.selectedPrescriptionId : null,
      paymentMethod: paymentDisplay,
      mpesaCode: mpesaCode,
      temperatureReading: totals.hasColdChain ? '3.9°C (Continuous Telemetry)' : null,
      etaMinutes: isNairobi ? 45 : 120
    };

    // Prepend to customer active orders
    this.state.activeOrder = newOrder;
    this.state.orders.unshift(newOrder);

    // Also register in Admin Orders for real-time sales monitoring
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

    this.state.cart = [];
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
      pillsLeft: 30,
      autoRefill: true,
      ...reminder
    });
    this.saveState();
  }

  // --- WhatsApp Bot Messaging ---
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
        reply = "📄 *Prescription Upload Assistance*\n\nYou can upload your doctor's slip photo directly in the app under the *'Prescriptions'* tab. Our clinical team reviews slips in under 5 minutes.\n\n*Important PPB Rule:* Please keep the physical prescription slip ready to hand to our courier upon delivery handover.";
      } else if (lower.includes('2') || lower.includes('mpesa') || lower.includes('m-pesa') || lower.includes('lipa') || lower.includes('paybill')) {
        reply = "📱 *Lipa Na M-Pesa Information*\n\n• *Business Paybill:* 891200\n• *Account Name:* Grasha Pharma\n\nWhen ordering in the cart, select 'Lipa Na M-Pesa' to get an instant STK prompt sent to your Safaricom phone!";
      } else if (lower.includes('3') || lower.includes('track') || lower.includes('delivery') || lower.includes('nairobi') || lower.includes('fargo') || lower.includes('g4s')) {
        reply = "🚚 *Delivery Tracking*\n\n• *Nairobi County:* Delivered in 2-4 hours by our dedicated Grasha fleet (Van KDA 419P). Free delivery on orders above KSh 2,500!\n• *Rest of Kenya:* Delivered within 24 hours via G4S and Fargo Courier.\n\nCheck the *'Track'* tab for live GPS telemetry.";
      } else if (lower.includes('4') || lower.includes('pharmacist') || lower.includes('angela') || lower.includes('doctor')) {
        reply = "👩‍⚕️ *Clinical Pharmacist Consultation*\n\nPharm. Angela Muthoni, B.Pharm (PPB Reg #3912) is reviewing your message. How can we advise on your dosage, food interactions, or generic substitutions?";
      } else if (lower.includes('card') || lower.includes('visa') || lower.includes('mastercard')) {
        reply = "💳 *Card Payment Available*\n\nWe accept Visa, Mastercard, and major Kenyan bank debit/credit cards with 3D Secure verification.";
      } else if (lower.includes('cash') || lower.includes('cod')) {
        reply = "💵 *Cash on Delivery (COD)*\n\nYou can inspect your sealed package and pay cash or M-Pesa directly to our delivery courier upon handover.";
      } else {
        reply = "Thank you for reaching out to *Grasha Pharma WhatsApp Care* (+254 722 840 192).\n\nReply with:\n1️⃣ Upload Rx\n2️⃣ Lipa Na M-Pesa\n3️⃣ Track Delivery\n4️⃣ Ask Pharmacist";
      }

      const botMsg = {
        id: 'wa-bot-' + (Date.now() + 1),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: reply
      };
      this.state.whatsappMessages.push(botMsg);
      this.saveState();
    }, 600);
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
