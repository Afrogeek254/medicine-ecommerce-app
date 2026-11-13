# 💊 GrashaPhama (Grasha Pharma) - E-Commerce Mobile App for Medicine Delivery

**Grasha Pharma (GrashaPhama)** is a clinical-grade, user-centric mobile web application modeled on Kenya's leading online pharmacy (**MYDAWA**) and customized with **Grasha Pharma's official company profile, mission, strengths, and commitments to quality**.

Designed with an **Ultra-Glossy Blue & White Glassmorphism Theme**, **Google Maps Order Tracking with Live GPS**, **Google Account / Gmail Authentication**, **Full MySQL Database Backend**, and **Lipa Na M-Pesa Online STK Push Checkout**.

Regulated by the **Pharmacy and Poisons Board (PPB Kenya)** and registered under the **Companies Act of Kenya (CAP. 499, section 14 (2))**.

---

## 📱 Mobile-First App Design (No Phone Bezels or Mockup Lines)

- **Edge-to-Edge Mobile Layout**: Simulated phone borders, frames, and fake hardware notches have been completely removed.
- **Responsive Architecture**: Runs full-screen on mobile devices and clean, centered responsive container (up to 480px) on desktop screens with smooth ambient backdrops.
- **Ultra-Glossy Aesthetic**: Frosted glassmorphism (`backdrop-filter: blur(24px)`), specular light reflections (`box-shadow: inset 0 1px 1.5px rgba(255, 255, 255, 0.85)`), and smooth tactile micro-animations.

---

## 👤 Uncrowded, Role-Strict Avatar Header

### 1. Patient Profile Header
- **Left**: **Patient Avatar + Patient Name** (e.g. `👩 Jane Wambui`). Clean, spacious, and readable. Clicking navigates directly to the Patient Account & Features.
- **Right**: Sleek Cart button with real-time item counter badge.
- **No Clutter**: Role switch buttons, WhatsApp icons, and squeezed location subtitles have been removed from the patient header avatar area.

### 2. Admin Profile Header
- **Left**: **Admin Avatar + Admin Name** (e.g. `🛡️ Pharm. Angela`). Clicking opens the Admin Operations Portal.
- **Right**: Exactly four essential controls:
  1. **Sales** (📊 Sales Analytics)
  2. **Stocks** (📦 Medicine Stock Management)
  3. **Admin Name** (Avatar pill)
  4. **WhatsApp Bot** (💬 Customer Support Desk)
- **No View Phone/Tablet Toggle** or manual role switch.

### 3. Guest Profile Header
- **Left**: Brand Logo (`💊 GrashaPhama`) with `🇰🇪 PPB #3912` regulatory badge.
- **Right**: Glossy `Sign In` button.

---

## 🔐 Authentication & Checkout Flow

- **Login Prompt Before Purchase**: When a guest or unauthenticated customer taps to checkout (*Lipa Na M-Pesa*, *Card*, or *Cash on Delivery*), the app prompts them to sign in first.
- **Google Account / Gmail Authentication**: 1-click **Continue with Google** button supporting Google Identity Services (GIS), custom Gmail sign-in, and instant demo patient login.
- **Seamless Cart Preservation**: Once signed in, the user is immediately resumed into their selected payment modal (e.g., M-Pesa STK push) with all cart items intact.
- **Strict Role Defaults**: Logging in as a patient defaults to the patient store; logging in as an admin (`admin@grashapharma.co.ke`) defaults to the Operations Portal.

---

## 🗺️ Google Maps Live Order Tracking

- **Interactive Google Maps View**:
  - **Pharmacy Origin Pin**: Grasha Pharma Central Hub, Upper Hill, Nairobi (`-1.2921, 36.8219`)
  - **Customer Destination Pin**: Westlands, Nairobi (`-1.2644, 36.8030`)
  - **Delivery Motorcycle Pin**: 🛵 Samuel Ochieng (Grasha Dedicated Fleet, `-1.2780, 36.8120`)
  - **Delivery Route Polyline**: Smooth delivery route connecting pharmacy hub to customer destination.
  - **Animated Movement**: Live GPS telemetry advancing towards destination.
  - **Direct Controls**: Center on Rider, Destination, or Open in Google Maps app for turn-by-turn navigation.
- **Live ETA Countdown**: Real-time traffic-adjusted arrival estimation (e.g. `~18 mins`).
- **Cold-Chain IoT Sensor**: Continuous telemetry display for insulins/biologics (e.g. `3.8°C`, PPB compliant `2°C - 8°C`).
- **Rider Contact**: 1-tap `Call Rider (+254 722 840 192)` and `WhatsApp Rider`.

---

## 🗄️ MySQL Database Backend Integration

The app comes with a complete MySQL database layer and REST API:

- **`database/schema.sql`**: Production DDL schema creating:
  - `users` (Patients, Pharmacist Admins, Google OAuth credentials)
  - `categories` (Prescriptions, Cold-Chain, Chronic, Diagnostics, Wellness)
  - `medicines` (Full catalog with KSh prices, stock counts, dosage forms, images)
  - `prescriptions` (Doctor slips with PPB verification statuses)
  - `orders` (Orders, M-Pesa receipt codes, GPS coordinates, tracking stages)
  - `order_items` (Order line items)
  - `pill_reminders` (Patient chronic dosage schedules)
  - `admin_logs` (Audit trail)
- **`database/seed.sql`**: Pre-loaded with Kenyan PPB medicines, Jane Wambui demo patient, Pharm. Angela admin, active orders, and doctor prescriptions.
- **`server/server.js`**: Express.js REST API with `mysql2/promise` connection pooling.
- **Admin MySQL Console**: Live database status monitor, table count inspector, and 1-click live SQL dump exporter.

### Starting the MySQL Backend:
```bash
# 1. Install server dependencies
npm install

# 2. Configure your MySQL credentials in .env (or server/.env.example)
# DB_HOST=localhost, DB_USER=root, DB_PASSWORD=, DB_NAME=grasha_pharma_db

# 3. Initialize database tables & seed data
npm run db:setup

# 4. Start API server
npm start
```
The app runs at `http://localhost:3000` (or directly via `index.html` with offline cache).

---

## 👩‍⚕️ Customer Profile vs Admin Profile

| Feature | Customer / Patient Profile | Admin Operations Portal |
| :--- | :--- | :--- |
| **Identity** | Patient Name & Google Account | Chief Pharmacist & PPB License #3912 |
| **Orders** | My Orders & Live Google Maps Tracking | Order Management & Status Dispatching |
| **Prescriptions** | My Doctor Rx Slips & Upload Slip | Rx Review & Approval Queue |
| **Inventory** | Browse catalog & add to cart | Stock Adjustment, Expiry & Price Control |
| **Sales** | View my purchase history | Live Revenue, M-Pesa Settlements, Avg Basket |
| **Database** | Seamless automatic local/cloud sync | MySQL Status Widget & Live SQL Dump Export |
| **Support** | Consult Pharmacist on WhatsApp | Respond to patient customer service desk |
| **Sign Out** | Clean Logout button | Clean Logout button |
