# 💊 Grasha Pharma — Clinical Web App, Pharmacy POS & E-Commerce Platform

**Grasha Pharma (GrashaPhama)** is a modern, responsive web application and Point-of-Sale (POS) platform modeled on Kenya's leading clinical pharmacy services and customized with **Grasha Pharma's official company profile, mission, strengths, and commitments to quality**.

Designed with an **Ultra-Glossy Blue & White Glassmorphism Theme**, a **Web-Based Pharmacy POS with Kenyan KRA eTIMS Tax Invoices**, **Daily Sales Report Generator**, **Google Maps Order Tracking with Live GPS**, **Google Account / Gmail & MySQL Authentication**, and **Lipa Na M-Pesa Online STK Push Checkout**.

Regulated by the **Pharmacy and Poisons Board (PPB Kenya)** and registered under the **Companies Act of Kenya (CAP. 499, section 14 (2))**.

---

## 🌟 Key Upgrades & Highlights

### 1. 🌐 Fully Responsive Web App & Glossy UI
- **Responsive Across Screens**: Native desktop widescreen experience (1200px+) with top navigation and desktop search bar, adapted seamlessly for tablets and mobile handhelds with a persistent quick-access bottom nav.
- **Glassmorphism Theme**: Royal blue (`#0284c7`, `#0369a1`) & pure ice-white aesthetic with `backdrop-filter: blur(24px)`, subtle specular borders, and micro-interactions.
- **Patient vs Admin Segregation**: Clean separation between customer patient shopping experience and pharmacist administrative controls.

### 2. 🧾 Pharmacy POS (Point of Sale) with Kenyan KRA eTIMS
- **Fast Cashier Terminal**:
  - Live search by medicine name, brand, or barcode.
  - Category filtering (All, Prescriptions, Cold-Chain, Chronic, Diagnostics, Wellness).
  - 1-click add to active sale ticket with quantity adjustments and stock limits.
  - Multi-payment support: **Lipa Na M-Pesa**, **Cash**, and **Credit/Debit Card**.
- **Kenya Revenue Authority (KRA) eTIMS Compliance**:
  - Distinguishes **Tax Exempt (Code E - Human Medicines)** under the Kenya VAT Act (0% VAT) from **Taxable Standard (Code A - Diagnostics/Supplements - 16% VAT)**.
  - Automatically generates **Fiscal Tax Invoices** with Pharmacy KRA PIN (`P051289120Z`), Control Unit (CU) Serial (`KRAMW0921804`), eTIMS Invoice Number, and SCDC signatures.
  - **Thermal Receipt Printing**: Printable 80mm receipt with QR code linking directly to KRA's eTIMS fiscal verification portal.

### 3. 📊 Daily Sales & Financial Report Generator
- Calculates real-time daily metrics:
  - Total Daily Gross Revenue in KSh.
  - Completed Transaction Count.
  - Payment channel breakdown: **Lipa Na M-Pesa**, **Cash**, and **Card**.
  - Tax breakdown: Total VAT Exempt sales vs VAT 16% Collected.
  - Top-selling medicines and velocity ranking.
- **1-Click Printable Audit Report**: Formatted for management and end-of-day cash reconciliation.

### 4. 📦 Stock & Inventory Control with Image Upload
- Real-time stock status badges (*In Stock*, *Low Stock < 15*, *Out of Stock*).
- Quick inline stock adjustments (`-5`, `+10` batch restock).
- **Add New Medicine Modal**:
  - Photo file picker reading Base64 image data URLs directly from device/computer.
  - Image URL support for cloud storage links.
  - Form validation for Dosage Form, Strength, Unit Price, Regulatory Classification, and Initial Stock.

### 5. 🔐 Real Database Credentials & Google Sign-In
- **Real MySQL Authentication**: Secure login against credentials stored in the `users` table:
  - **Demo Patient**: `jane.wambui@gmail.com` / `password123`
  - **Demo Admin**: `admin@grashapharma.co.ke` / `admin123`
- **Google Sign-In**: Integration with Google Identity Services (GIS) / Gmail OAuth.
- **Login Guard**: Prompt unauthenticated users before order placement while preserving cart contents.

### 6. 📱 Lipa Na M-Pesa Daraja STK Push Integration
- Built-in simulator and API proxy for Safaricom Daraja STK Push (LNMO - Lipa Na M-Pesa Online).
- Dedicated architecture guide and interactive testing modal under the `#mpesa` route.

### 7. 🗺️ Google Maps Live Order Tracking
- Real-time order dispatching with Google Maps polyline route from Grasha Pharma Central Hub (Upper Hill, Nairobi) to customer address.
- Cold-Chain IoT temperature monitoring (`3.8°C`, PPB compliant `2°C - 8°C`).
- Interactive rider actions (Call Rider, WhatsApp, Center View).

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- Node.js v18 or newer
- MySQL Server running on `127.0.0.1:3306` (Credentials: `root` / `root`)

### Setup Commands
```bash
# 1. Install dependencies
npm install

# 2. Run Database Setup (Creates grasha_pharma_db and seeds 8 tables)
npm run db:setup

# 3. Start Web App and API Server
npm start
```

### URLs
- **Main Web App**: [http://localhost:3000](http://localhost:3000)
- **POS & eTIMS Terminal**: [http://localhost:3000#pos](http://localhost:3000#pos)
- **Admin Dashboard**: [http://localhost:3000#admin](http://localhost:3000#admin)
- **Lipa Na M-Pesa Guide**: [http://localhost:3000#mpesa](http://localhost:3000#mpesa)

---

## ☁️ Cloud Deployment (Supabase, Vercel & Netlify)

See the comprehensive [DEPLOYMENT_GUIDE.md](file:///c:/Users/mwema/Downloads/medicine-ecommerce-app/DEPLOYMENT_GUIDE.md) for step-by-step instructions:
- **Supabase**: Cloud database setup, SQL schema execution, Google Auth provider setup.
- **Vercel**: One-click edge deployment with `vercel.json` and serverless API routing.
- **Netlify**: Serverless deployment with `netlify.toml`.
- **Safaricom Daraja**: Paybill 891200, Passkey, and Webhook configuration.
- **KRA eTIMS**: Fiscal compliance documentation.

---

## 👩‍⚕️ Customer vs Admin Privileges

| Feature | Customer / Patient Profile | Admin Operations & POS Portal |
| :--- | :--- | :--- |
| **Identity** | Patient Name & Google Account | Chief Pharmacist & PPB License #3912 |
| **Catalog** | Interactive clinical store with filters | Medicine catalog management (+/- stock) |
| **POS Terminal** | *(Hidden from customer)* | Fast cashier terminal with eTIMS receipt |
| **eTIMS Receipt** | View electronic invoice on completed order | Thermal print & generate KRA fiscal receipt |
| **Daily Sales** | *(Restricted)* | Revenue, M-Pesa/Cash/Card breakdown & print |
| **Order Tracking** | Live Google Maps route & cold chain sensor | Order dispatch & status update |
| **Safety Tools** | Drug interaction check & Generic switcher | Audit logs & stock notifications |
| **Consultation** | WhatsApp Pharmacist chat drawer | Administrative customer support |

---
*Licensed by Pharmacy and Poisons Board Kenya (PPB Reg #3912).*
