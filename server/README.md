# Grasha Pharma MySQL Backend & API Setup Guide

This backend provides a complete MySQL database layer and REST API for the **Grasha Pharma (GrashaPhama)** Mobile E-Commerce Web App.

---

## 🚀 Quick Setup Instructions

### Prerequisites
1. **Node.js** (v16 or higher)
2. **MySQL Server** (MySQL 8.x, 5.7, MariaDB, or XAMPP / WampServer)

### 1. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp server/.env.example .env
```
Edit `.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=grasha_pharma_db
DB_PORT=3306
PORT=3000
```

### 2. Install Dependencies
From the project root:
```bash
npm install
```

### 3. Initialize MySQL Database & Tables
Run the automated schema and seed runner:
```bash
npm run db:setup
```
This automatically:
- Creates the `grasha_pharma_db` database
- Runs `database/schema.sql` (creates `users`, `medicines`, `categories`, `orders`, `order_items`, `prescriptions`, `pill_reminders`, `admin_logs`)
- Runs `database/seed.sql` (populates Kenya PPB medicines catalog, demo users, orders)

### 4. Start the Application & API Server
```bash
npm start
```
- **Mobile Web App**: [http://localhost:3000](http://localhost:3000)
- **API Health & MySQL Status**: [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Medicines API**: [http://localhost:3000/api/medicines](http://localhost:3000/api/medicines)

---

## 🗄️ Database Tables Overview

| Table | Purpose |
| :--- | :--- |
| `users` | Patients, Admins, Google OAuth profile credentials, and loyalty points |
| `categories` | Medicine categories (Prescription, Cold-Chain, Chronic, Devices, Wellness) |
| `medicines` | Complete inventory with Kenyan pricing (KSh), stock, images, dosage forms |
| `prescriptions` | Doctor Rx slips, PPB pharmacist verification notes and statuses |
| `orders` | Order headers, M-Pesa transaction codes, delivery address & live rider coordinates |
| `order_items` | Individual line items per order |
| `pill_reminders` | Chronic patient dosage schedules |
| `admin_logs` | Audit trail for pharmacist actions |
