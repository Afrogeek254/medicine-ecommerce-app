-- ====================================================================
-- Grasha Pharma (GrashaPhama) - Production MySQL Database Schema
-- Registered under Companies Act of Kenya (CAP. 499, section 14 (2))
-- Regulated by Pharmacy and Poisons Board (PPB Kenya) | Est. April 2013
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `grasha_pharma_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `grasha_pharma_db`;

-- 1. Users Table (Patients & Licensed Pharmacist Admins, Google OAuth)
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NULL,
  `role` ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  `phone` VARCHAR(30) NULL,
  `county` VARCHAR(100) NOT NULL DEFAULT 'Nairobi',
  `estate` VARCHAR(255) NULL,
  `delivery_instructions` TEXT NULL,
  `avatar` TEXT NULL,
  `google_id` VARCHAR(120) NULL,
  `google_email` VARCHAR(150) NULL,
  `ppb_registration` VARCHAR(50) NULL,
  `loyalty_points` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email` (`email`),
  KEY `idx_users_google_id` (`google_id`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Medicine Categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `icon` VARCHAR(20) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Medicine Catalog & Inventory
CREATE TABLE IF NOT EXISTS `medicines` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `generic_name` VARCHAR(200) NOT NULL,
  `brand` VARCHAR(100) NULL,
  `category_id` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `prescription_required` BOOLEAN NOT NULL DEFAULT FALSE,
  `cold_chain` BOOLEAN NOT NULL DEFAULT FALSE,
  `stock_quantity` INT NOT NULL DEFAULT 50,
  `min_stock_alert` INT NOT NULL DEFAULT 15,
  `image_url` TEXT NULL,
  `dosage_form` VARCHAR(100) NULL,
  `pack_size` VARCHAR(100) NULL,
  `dosage_instructions` TEXT NULL,
  `storage_condition` VARCHAR(100) NULL,
  `ppb_registered` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_meds_category` (`category_id`),
  KEY `idx_meds_stock` (`stock_quantity`),
  KEY `idx_meds_prescription` (`prescription_required`),
  CONSTRAINT `fk_meds_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Prescriptions Table (Doctor Rx Slips verified under PPB Kenya rules)
CREATE TABLE IF NOT EXISTS `prescriptions` (
  `id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `patient_name` VARCHAR(150) NOT NULL,
  `doctor_name` VARCHAR(150) NOT NULL,
  `clinic` VARCHAR(150) NOT NULL,
  `date_issued` DATE NOT NULL,
  `status` ENUM('Verified & Approved', 'Pending Review', 'Dispensed', 'Rejected') NOT NULL DEFAULT 'Verified & Approved',
  `image_url` TEXT NULL,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_rx_user` (`user_id`),
  KEY `idx_rx_status` (`status`),
  CONSTRAINT `fk_rx_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Orders Table (Lipa Na M-Pesa & Card transactions with Live GPS Telemetry)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(30) NOT NULL,
  `delivery_county` VARCHAR(100) NOT NULL DEFAULT 'Nairobi',
  `delivery_address` TEXT NOT NULL,
  `delivery_lat` DECIMAL(10, 7) NOT NULL DEFAULT -1.2644000,
  `delivery_lng` DECIMAL(10, 7) NOT NULL DEFAULT 36.8030000,
  `delivery_speed` VARCHAR(100) NOT NULL DEFAULT 'Nairobi Express (Grasha Fleet)',
  `subtotal` DECIMAL(10,2) NOT NULL,
  `delivery_fee` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `payment_method` ENUM('mpesa', 'card', 'cod') NOT NULL DEFAULT 'mpesa',
  `payment_status` ENUM('pending', 'paid', 'refunded') NOT NULL DEFAULT 'paid',
  `mpesa_code` VARCHAR(50) NULL,
  `tracking_status` ENUM('Order Placed', 'Dispensing & Verified', 'Rider Picked Up', 'Out for Delivery', 'Delivered') NOT NULL DEFAULT 'Out for Delivery',
  `tracking_step` INT NOT NULL DEFAULT 3,
  `courier` VARCHAR(100) NOT NULL DEFAULT 'Grasha Dedicated Fleet (Nairobi)',
  `rider_name` VARCHAR(100) NOT NULL DEFAULT 'Samuel Ochieng',
  `rider_phone` VARCHAR(30) NOT NULL DEFAULT '+254 722 840 192',
  `rider_lat` DECIMAL(10, 7) NOT NULL DEFAULT -1.2780000,
  `rider_lng` DECIMAL(10, 7) NOT NULL DEFAULT 36.8120000,
  `cold_chain_temp` VARCHAR(20) NULL DEFAULT '3.8°C',
  `rx_id` VARCHAR(64) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_orders_user` (`user_id`),
  KEY `idx_orders_status` (`tracking_status`),
  KEY `idx_orders_payment` (`payment_status`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `order_id` VARCHAR(50) NOT NULL,
  `medicine_id` VARCHAR(64) NOT NULL,
  `medicine_name` VARCHAR(200) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order` (`order_id`),
  KEY `idx_order_items_med` (`medicine_id`),
  CONSTRAINT `fk_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_items_med` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Pill & Chronic Dose Reminders
CREATE TABLE IF NOT EXISTS `pill_reminders` (
  `id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `medicine_name` VARCHAR(200) NOT NULL,
  `dosage` VARCHAR(100) NOT NULL,
  `reminder_time` VARCHAR(20) NOT NULL,
  `meal_relation` VARCHAR(100) NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_reminders_user` (`user_id`),
  CONSTRAINT `fk_reminders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Audit Logs for PPB Pharmacist & System Actions
CREATE TABLE IF NOT EXISTS `admin_logs` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `admin_id` VARCHAR(64) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_logs_admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
