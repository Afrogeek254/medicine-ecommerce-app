# 🏥 GrashaPhama (Grasha Pharma) - E-Commerce Mobile App for Medicine Delivery

**Grasha Pharma (GrashaPhama)** is a clinical-grade, user-centric mobile application modeled on Kenya's leading online pharmacy (**MYDAWA**) and customized with **Grasha Pharma's official company profile, mission, strengths, and commitments to quality**.

Designed with a high-end **Glossy Blue & White Theme**, real-time **Lipa Na M-Pesa STK Push checkout**, Kenyan health insurance processing, and **Pharmacy and Poisons Board (PPB Kenya)** regulatory compliance.

---

## 🏢 Grasha Pharma Corporate Profile (Mapped from Official Documents)

| Attribute | Official Profile Details |
| :--- | :--- |
| **Legal Entity** | Registered business in Kenya as per the **Companies Act of Kenya (CAP. 499, section 14 (2))** |
| **Regulatory Authority** | **Pharmacy and Poisons Board (PPB Kenya)** |
| **Established** | **April 2013** (Over a decade of trusted pharmaceutical manufacturing & distribution) |
| **Mission** | *"Grasha pharma strives to provide excellent products and services to the clients by being honest, fair, reliable and responsible in all our business Practices. Through our knowledge and significant experience in the industry, we add value to our customers and build long term relationships which are mutually beneficial."* |
| **Vision** | *"Grasha pharma will be one of the leading & trusted pharmaceutical Companies in the region by offering time demanded, quality products & services that improves the quality of lives of millions of people."* |
| **Core Slogan / Ethos** | *"To us, healthcare is not a privilege; it's a right for every human."* |
| **Dosage Forms Portfolio** | • Oral Solids (Tablets & Hard Gelatine Capsules)<br>• Effervescent Tablets<br>• Liquids (Syrup, Suspension & Powder for suspension)<br>• Creams & Ointments<br>• Parenteral Preparations (Vials & Ampoules)<br>• Specialized Forms: Suppositories, Ophthalmic Drops & Creams, Prefilled Syringes |
| **Logistics & Fleet** | • **Nairobi County**: Own dedicated fleet of temperature-monitored distribution vehicles (2–4 hour delivery).<br>• **Countrywide Kenya**: Strategic delivery partnership with **G4S** and **Fargo Courier** guaranteeing delivery **within 24 hours** in all major cities of Kenya. |

---

## 🌟 Key Features (Replicated & Enhanced from MYDAWA)

### 1. 📄 Streamlined Prescription Upload (Self-Pay or Insurance)
- Seamless camera photo capture or PDF upload of doctor's prescription slip.
- Instant review and verification by **licensed pharmaceutical technologists & clinical pharmacists** (under 5 minutes).
- Direct compliance with Kenyan law: delivery riders collect the **original physical prescription slip** upon delivery handover.

### 2. 📱 Kenyan Payment Integrations
- **Lipa Na M-Pesa STK Push**: Instant prompt delivered to customer's Safaricom phone with auto-filled Paybill (**891200**) and total.
- **Kenyan Health Insurances**: Direct pre-authorization claim submission for **Jubilee, Britam, AAR, Madison, CIC, Old Mutual**, and **Social Health Authority (SHA / NHIF)**.

### 3. 💡 Generic Medicine Alternative Switcher (Save 40% – 70%)
- Promotes Grasha Pharma's ethos of affordable healthcare by offering 1-click swaps from expensive brand names to FDA/PPB-approved generic molecules with identical active pharmaceutical ingredients (API) and potency.

### 4. ⚠️ Clinical Drug-to-Drug Interaction Engine
- Real-time cart safety checker detecting hazardous combinations (e.g., **Hedex + Brufen** flagging NSAID overdose risk).

### 5. ❄️ Cold-Chain Continuous Telemetry (2°C – 8°C)
- Temperature-sensitive biologics and insulins (such as **Lantus SoloStar**) are packed in certified isothermal cooler boxes with live sensor telemetry displayed on the tracking screen (**4.1°C**).

### 6. 🛵 Dual-Tier Kenyan Logistics Tracking
- **Nairobi County (Own Grasha Fleet)**: 2 to 4-hour express delivery. **FREE delivery** on orders above KES 2,500.
- **Major Cities Across Kenya (G4S / Fargo Courier)**: 24-hour delivery to Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, etc.

### 7. 🔑 User Login & Role Switching
- **Patient/Customer Account**: Jane Wambui Kamau (`jane.wambui@gmail.com` / `password123`) with prescription archive, saved Nairobi delivery address, and M-Pesa phone number.
- **Admin / Chief Pharmacist Account**: Pharm. Angela Muthoni (`admin@grashapharma.co.ke` / `admin123`) with access to the Operations Portal.
- **1-Click Role Switcher**: Tap **"⚡ Switch Role (Admin / Patient)"** in the top presentation toolbar or the account drawer to instantly toggle modes.

### 8. 🛡️ GrashaPharma Admin Operations Portal
- **Sales & Revenue Monitoring**:
  - Live KPI dashboard tracking **Total Revenue in KSh**, total orders, average order value (AOV), and inventory capital valuation ($\sum \text{price} \times \text{stock}$).
  - Payment channel breakdown (Lipa Na M-Pesa vs Card vs COD).
  - Recent sales transactions table.
- **Customer Orders Dispatch**:
  - View incoming orders with customer name, phone number, delivery address, items, and M-Pesa receipt reference codes (`QK...`).
  - Interactive status dropdown (*Prescription Verified*, *Dispensed & Verified*, *Out for Express Delivery*, *Delivered*).
- **Stock & Inventory Management**:
  - Real-time stock status badges (*In Stock*, *Low Stock < 15*, *Out of Stock*).
  - Quick inline stock steppers (`-1`, `+1`, `+10` batch restock, and click-to-edit prompt).
  - Filter inventory by *All*, *Low Stock*, *Out of Stock*, *Cold-Chain ❄️*, or *Rx Only*.
  - Delete / Remove inventory items with instant store catalog sync.
- **Add New Medicine with Image Upload**:
  - Add products matching Grasha's 6 dosage forms (Oral solids, effervescent, liquids, creams/ointments, parenterals, specialized).
  - **3 Ways to Add Images**:
    1. 📸 **File Upload**: Direct file chooser / drag-and-drop converting local image files into base64 data URLs via `FileReader`.
    2. 🌐 **Direct URL**: Input external CDN URLs (such as MYDAWA Azure blob links).
    3. 💊 **Pharmacy Presets**: 8 quick-click presets (Blister tabs, Syrup bottle, Insulin pen, Ointment tube, Diagnostics, etc.).

### 9. 💬 24/7 Live Pharmacist Consultation & WhatsApp Chatbot
- Built-in WhatsApp consultation drawer linked to **Pharm. Angela Muthoni, B.Pharm (PPB Reg #3912)** with quick chips and external WhatsApp redirect to `+254 722 840 192`.

---

## 🚀 How to Run the Application

### Option A: Open Mobile Web App / PWA Immediately
Open [`index.html`](file:///c:/Users/mwema/Downloads/medicine-ecommerce-app/index.html) directly in any modern browser:

```powershell
Start-Process "c:\Users\mwema\Downloads\medicine-ecommerce-app\index.html"
```

- **iPhone 16 Pro Viewport**: Realistic smartphone chassis with Dynamic Island, native status bar, and gesture bar.
- **Tablet / Responsive Toggle**: Click **"🔄 Switch View"** on the top toolbar to switch to wide responsive mode.
- **PWA Installation**: In Chrome/Safari, select **"Install App"** / **"Add to Home Screen"** to use standalone on your device.

---

### Option B: Native React Native / Expo Codebase
```bash
cd react-native-source
npm install
npx expo start
```
- Press `a` for Android Emulator.
- Press `i` for iOS Simulator.
- Scan QR code via **Expo Go** on an iPhone or Android phone.
