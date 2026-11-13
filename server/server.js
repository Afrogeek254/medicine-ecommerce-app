/**
 * Grasha Pharma (GrashaPhama) Express & MySQL Backend Server
 * Serves REST API for Catalog, Orders, Live Tracking, Prescriptions, Google Auth, and static PWA assets
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, testConnection, dbConfig } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// ====================================================================
// HEALTH & DATABASE STATUS
// ====================================================================
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      return res.json({
        status: 'degraded',
        database: 'mysql_unreachable',
        message: 'MySQL database not reachable. Please start MySQL and run npm run db:setup.',
        config: { host: dbConfig.host, port: dbConfig.port, database: dbConfig.database }
      });
    }

    const [medsCount] = await pool.query('SELECT COUNT(*) as count FROM medicines');
    const [ordersCount] = await pool.query('SELECT COUNT(*) as count FROM orders');
    const [usersCount] = await pool.query('SELECT COUNT(*) as count FROM users');

    res.json({
      status: 'ok',
      database: 'connected',
      engine: 'MySQL 8.x / MariaDB',
      counts: {
        medicines: medsCount[0].count,
        orders: ordersCount[0].count,
        users: usersCount[0].count
      },
      config: { host: dbConfig.host, port: dbConfig.port, database: dbConfig.database }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// ====================================================================
// AUTHENTICATION & GOOGLE SIGN-IN
// ====================================================================

// Google Sign-In Endpoint (accepts verified Google credential / profile)
app.post('/api/auth/google', async (req, res) => {
  try {
    const { googleId, email, name, avatar, role = 'customer' } = req.body;
    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Email and name are required' });
    }

    // Check if user already exists in MySQL
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    let user;

    if (existing.length > 0) {
      user = existing[0];
      // Update google ID and avatar if needed
      await pool.query(
        'UPDATE users SET google_id = COALESCE(?, google_id), avatar = COALESCE(?, avatar) WHERE id = ?',
        [googleId, avatar, user.id]
      );
      user.google_id = googleId || user.google_id;
      user.avatar = avatar || user.avatar;
    } else {
      // Create new patient record
      const newUserId = 'usr-goog-' + Date.now();
      await pool.query(
        `INSERT INTO users (id, name, email, role, phone, county, estate, avatar, google_id, google_email, loyalty_points)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [newUserId, name, email, role, '+254 700 000 000', 'Nairobi', 'Nairobi Westlands', avatar || '👩', googleId, email, 100]
      );
      const [created] = await pool.query('SELECT * FROM users WHERE id = ?', [newUserId]);
      user = created[0];
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Email / Password Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Account not found' });
    }

    const user = users[0];
    if (user.password_hash && user.password_hash !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Patient Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, county = 'Nairobi', estate } = req.body;
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const id = 'usr-' + Date.now();
    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, role, phone, county, estate, avatar, loyalty_points)
       VALUES (?, ?, ?, ?, 'customer', ?, ?, ?, '👩', 50)`,
      [id, name, email, password, phone, county, estate]
    );

    const [created] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json({ success: true, user: created[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ====================================================================
// MEDICINES CATALOG & INVENTORY
// ====================================================================
app.get('/api/medicines', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM medicines WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category_id = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (name LIKE ? OR generic_name LIKE ? OR brand LIKE ?)';
      const like = `%${search}%`;
      params.push(like, like, like);
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update stock (Admin inventory control)
app.put('/api/medicines/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock_quantity } = req.body;
    await pool.query('UPDATE medicines SET stock_quantity = ? WHERE id = ?', [stock_quantity, id]);
    res.json({ success: true, id, stock_quantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================================================================
// ORDERS & LIVE GOOGLE MAPS TRACKING
// ====================================================================
app.get('/api/orders', async (req, res) => {
  try {
    const { userId } = req.query;
    let query = 'SELECT * FROM orders ORDER BY created_at DESC';
    let params = [];
    if (userId) {
      query = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
      params = [userId];
    }
    const [orders] = await pool.query(query, params);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order by ID with items
app.get('/api/orders/:id', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) return res.status(404).json({ error: 'Order not found' });
    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
    res.json({ ...orders[0], items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place new Order (M-Pesa, Card, Cash)
app.post('/api/orders', async (req, res) => {
  try {
    const {
      id = 'GP-' + Math.floor(1000 + Math.random() * 9000),
      userId,
      customerName,
      customerPhone,
      deliveryCounty = 'Nairobi',
      deliveryAddress,
      deliverySpeed = 'Nairobi Express (Grasha Fleet)',
      subtotal,
      deliveryFee = 0,
      totalAmount,
      paymentMethod = 'mpesa',
      mpesaCode,
      rxId,
      items = []
    } = req.body;

    await pool.query(
      `INSERT INTO orders 
        (id, user_id, customer_name, customer_phone, delivery_county, delivery_address, delivery_speed, subtotal, delivery_fee, total_amount, payment_method, payment_status, mpesa_code, tracking_status, tracking_step, rx_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid', ?, 'Out for Delivery', 3, ?)`,
      [id, userId, customerName, customerPhone, deliveryCounty, deliveryAddress, deliverySpeed, subtotal, deliveryFee, totalAmount, paymentMethod, mpesaCode, rxId]
    );

    // Insert order items
    for (const item of items) {
      await pool.query(
        `INSERT INTO order_items (order_id, medicine_id, medicine_name, quantity, unit_price, subtotal)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, item.medicineId, item.name || 'Medicine Item', item.quantity, item.price, item.quantity * item.price]
      );
      // Reduce stock
      await pool.query('UPDATE medicines SET stock_quantity = GREATEST(0, stock_quantity - ?) WHERE id = ?', [item.quantity, item.medicineId]);
    }

    const [created] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    res.json({ success: true, order: created[0] });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update order tracking status (Admin dispatching)
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { tracking_status, tracking_step } = req.body;
    await pool.query(
      'UPDATE orders SET tracking_status = ?, tracking_step = COALESCE(?, tracking_step) WHERE id = ?',
      [tracking_status, tracking_step, id]
    );
    res.json({ success: true, id, tracking_status, tracking_step });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================================================================
// ADMIN SALES & ANALYTICS STATS
// ====================================================================
app.get('/api/stats', async (req, res) => {
  try {
    const [revenue] = await pool.query('SELECT SUM(total_amount) as totalRevenue, COUNT(*) as totalOrders FROM orders');
    const [lowStock] = await pool.query('SELECT COUNT(*) as count FROM medicines WHERE stock_quantity <= min_stock_alert');
    const [pendingRx] = await pool.query("SELECT COUNT(*) as count FROM prescriptions WHERE status = 'Pending Review'");

    res.json({
      totalRevenue: revenue[0].totalRevenue || 0,
      totalOrders: revenue[0].totalOrders || 0,
      lowStockCount: lowStock[0].count || 0,
      pendingRxCount: pendingRx[0].count || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`💊 Grasha Pharma E-Commerce API Server Running`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📱 Web App: http://localhost:${PORT}/index.html`);
  console.log(`💾 MySQL Database: ${dbConfig.database} @ ${dbConfig.host}:${dbConfig.port}`);
  console.log(`======================================================\n`);
  await testConnection();
});
