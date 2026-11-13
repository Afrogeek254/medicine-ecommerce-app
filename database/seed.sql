-- ====================================================================
-- Grasha Pharma (GrashaPhama) - Production MySQL Seed Data
-- ====================================================================

USE `grasha_pharma_db`;

-- 1. Insert Categories
INSERT INTO `categories` (`id`, `name`, `icon`, `display_order`) VALUES
('all', 'All Medications', '💊', 1),
('prescription', 'Prescription (Rx)', '📋', 2),
('cold_chain', 'Cold-Chain (2-8°C)', '❄️', 3),
('chronic', 'Chronic Care', '❤️', 4),
('pain_relief', 'Pain & Fever', '🩹', 5),
('devices', 'Diagnostics & Devices', '🩺', 6),
('wellness', 'Vitamins & Wellness', '🌿', 7)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 2. Insert Users
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `phone`, `county`, `estate`, `delivery_instructions`, `avatar`, `google_id`, `google_email`, `ppb_registration`, `loyalty_points`) VALUES
('usr-cust-1', 'Jane Wambui Kamau', 'jane.wambui@gmail.com', 'password123', 'customer', '+254 712 345 678', 'Nairobi', 'Westlands, Rhapta Road, Apt 3A', 'Call at gate for security clearance', '👩', '109827364519283746152', 'jane.wambui@gmail.com', NULL, 480),
('usr-admin-1', 'Pharm. Angela Muthoni', 'admin@grashapharma.co.ke', 'admin123', 'admin', '+254 722 840 192', 'Nairobi', 'Upper Hill, Hospital Road', 'Main Pharmacy Hub Reception', '🛡️', NULL, NULL, 'PPB-3912', 1250)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 3. Insert Kenyan Pharmacy Medicines
INSERT INTO `medicines` (`id`, `name`, `generic_name`, `brand`, `category_id`, `price`, `prescription_required`, `cold_chain`, `stock_quantity`, `min_stock_alert`, `image_url`, `dosage_form`, `pack_size`, `dosage_instructions`, `storage_condition`) VALUES
('med-01', 'Augmentin 625mg Tablets', 'Amoxicillin / Clavulanic Acid 500mg/125mg', 'Augmentin (GSK)', 'prescription', 1850.00, 1, 0, 42, 10, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg', 'Oral Solids (Film-Coated Tablets)', 'Strip of 14 Tablets', '1 tablet twice daily after meals for 7 days', 'Store below 25°C in dry place'),
('med-02', 'Coartem 80/480mg Tablets', 'Artemether 80mg / Lumefantrine 480mg', 'Coartem (Novartis)', 'prescription', 850.00, 1, 0, 85, 20, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00492/00492_1.jpg', 'Oral Solids (Tablets)', 'Pack of 6 Dispersible Tablets', '1 tablet twice daily with fatty food for 3 days', 'Store below 30°C'),
('med-03', 'Lantus SoloStar Insulin 100 IU/ml', 'Insulin Glargine 100 Units/ml', 'Lantus (Sanofi)', 'cold_chain', 3600.00, 1, 1, 14, 5, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00388/00388_1.jpg', 'Parenteral (Prefilled SoloStar Pen)', '5 x 3ml Cartridges', 'Inject subcutaneously once daily at bedtime', 'Strict Cold Chain 2°C to 8°C (Do NOT Freeze)'),
('med-04', 'Glucophage XR 500mg', 'Metformin Hydrochloride 500mg Extended Release', 'Glucophage (Merck)', 'chronic', 1100.00, 1, 0, 68, 15, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00219/00219_1.jpg', 'Oral Solids (Extended Release Tablets)', 'Box of 60 Tablets', '1-2 tablets once daily with evening meal', 'Store below 25°C'),
('med-05', 'Ventolin Inhaler Evohaler 100mcg', 'Salbutamol Sulfate 100mcg/dose', 'Ventolin (GSK)', 'prescription', 750.00, 1, 0, 53, 10, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00142/00142_1.jpg', 'Inhalation Aerosol (CFC-free)', '1 Inhaler Device (200 Doses)', '1 to 2 puffs inhaled as needed for acute wheezing', 'Store below 30°C away from direct heat'),
('med-06', 'Panadol Extra Tablets (20s)', 'Paracetamol 500mg + Caffeine 65mg', 'Panadol (Haleon)', 'pain_relief', 240.00, 0, 0, 120, 25, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00781/00781_1.jpg', 'Oral Solids (Film-Coated Tablets)', 'Blister Pack of 20 Tablets', '2 tablets swallowed with water every 4-6 hours', 'Store below 25°C'),
('med-07', 'Hedex Extra Strong Tablets', 'Paracetamol 500mg + Caffeine 50mg', 'Hedex (GlaxoSmithKline)', 'pain_relief', 180.00, 0, 0, 160, 30, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00823/00823_1.jpg', 'Oral Solids (Tablets)', 'Pack of 16 Tablets', '1 to 2 tablets every 6 hours with food', 'Store below 30°C'),
('med-08', 'Brufen 400mg Tablets (20s)', 'Ibuprofen 400mg', 'Brufen (Abbott)', 'pain_relief', 420.00, 0, 0, 95, 20, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00914/00914_1.jpg', 'Oral Solids (Sugar-Coated Tablets)', 'Strip of 20 Tablets', '1 tablet 3 times daily immediately after meals', 'Store below 25°C'),
('med-09', 'Accu-Chek Instant Blood Glucose Meter Kit', 'Blood Glucose Monitoring System', 'Accu-Chek (Roche)', 'devices', 2850.00, 0, 0, 22, 5, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/01045/01045_1.jpg', 'Medical Device Kit', '1 Meter + 10 Strips + Lancing Device', 'Test capillary blood before breakfast and 2h post-meal', 'Store in protective case at 15-30°C'),
('med-10', 'Omron M2 Basic Blood Pressure Monitor', 'Automated Upper Arm Blood Pressure Monitor', 'Omron Healthcare', 'devices', 4950.00, 0, 0, 18, 5, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/01112/01112_1.jpg', 'Medical Device Kit', 'Arm Cuff (22-32cm) + Digital Monitor', 'Rest 5 minutes seated before taking 2 readings', 'Keep clean and dry'),
('med-11', 'Grasha Effervescent Vitamin C 1000mg + Zinc', 'Ascorbic Acid 1000mg + Zinc Citrate 10mg', 'Grasha Wellness', 'wellness', 650.00, 0, 0, 140, 25, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/01240/01240_1.jpg', 'Effervescent Tablets (Fast Dissolving)', 'Tube of 20 Effervescent Tablets', 'Dissolve 1 tablet in 200ml cold water once daily', 'Keep tube tightly capped, store below 25°C'),
('med-12', 'Centrum Silver Adults 50+ Multivitamin', 'Comprehensive Multivitamin & Mineral Complex', 'Centrum (Pfizer)', 'wellness', 2250.00, 0, 0, 36, 10, 'https://storagemydawadocsprod.blob.core.windows.net/productimages/01305/01305_1.jpg', 'Oral Solids (Coated Tablets)', 'Bottle of 60 Tablets', '1 tablet daily with a main meal', 'Store in cool dry place')
ON DUPLICATE KEY UPDATE `price`=VALUES(`price`), `stock_quantity`=VALUES(`stock_quantity`);

-- 4. Insert Verified Prescriptions
INSERT INTO `prescriptions` (`id`, `user_id`, `patient_name`, `doctor_name`, `clinic`, `date_issued`, `status`, `image_url`, `notes`) VALUES
('rx-nbi-2026-904', 'usr-cust-1', 'Jane Wambui Kamau', 'Dr. Patrick M. Ndung\'u (KMPDC #8812)', 'The Aga Khan University Hospital, Doctors Plaza 3rd Floor', '2026-11-08', 'Verified & Approved', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80', 'Verified by Pharm. Angela Muthoni (PPB #3912). Hand physical slip to rider.'),
('rx-nbi-2026-881', 'usr-cust-1', 'Jane Wambui Kamau', 'Dr. Amina Abdi (KMPDC #10423)', 'Nairobi Hospital Outpatient Center, Galleria Mall', '2026-10-14', 'Dispensed', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80', 'Dispensed & archived.')
ON DUPLICATE KEY UPDATE `status`=VALUES(`status`);

-- 5. Insert Active and Delivered Orders
INSERT INTO `orders` (`id`, `user_id`, `customer_name`, `customer_phone`, `delivery_county`, `delivery_address`, `delivery_lat`, `delivery_lng`, `delivery_speed`, `subtotal`, `delivery_fee`, `total_amount`, `payment_method`, `payment_status`, `mpesa_code`, `tracking_status`, `tracking_step`, `courier`, `rider_name`, `rider_phone`, `rider_lat`, `rider_lng`, `cold_chain_temp`, `rx_id`) VALUES
('GP-8840', 'usr-cust-1', 'Jane Wambui Kamau', '+254 712 345 678', 'Nairobi', 'Westlands, Rhapta Road, Apt 3A', -1.2644000, 36.8030000, 'Grasha Cold-Chain Express Fleet ❄️', 4350.00, 0.00, 4350.00, 'mpesa', 'paid', 'QK91823719X', 'Out for Delivery', 3, 'Grasha Pharma Dedicated Fleet (Nairobi)', 'Samuel Ochieng', '+254 722 840 192', -1.2780000, 36.8120000, '3.8°C', 'rx-nbi-2026-904'),
('GP-7721', 'usr-cust-1', 'Jane Wambui Kamau', '+254 712 345 678', 'Nairobi', 'Westlands, Rhapta Road, Apt 3A', -1.2644000, 36.8030000, 'Nairobi Express (Grasha Fleet)', 2400.00, 0.00, 2400.00, 'mpesa', 'paid', 'QJ89120045L', 'Delivered', 4, 'Grasha Fleet Nairobi - Van KDA 419P', 'Samuel Ochieng', '+254 722 840 192', -1.2644000, 36.8030000, NULL, 'rx-nbi-2026-904')
ON DUPLICATE KEY UPDATE `tracking_status`=VALUES(`tracking_status`);

-- 6. Insert Order Items
INSERT INTO `order_items` (`order_id`, `medicine_id`, `medicine_name`, `quantity`, `unit_price`, `subtotal`) VALUES
('GP-8840', 'med-03', 'Lantus SoloStar Insulin Pen (100 IU/ml)', 1, 3600.00, 3600.00),
('GP-8840', 'med-05', 'Ventolin Inhaler Evohaler (100mcg)', 1, 750.00, 750.00),
('GP-7721', 'med-04', 'Glucophage XR 500mg', 1, 1100.00, 1100.00),
('GP-7721', 'med-11', 'Grasha Effervescent Vitamin C 1000mg', 2, 650.00, 1300.00);

-- 7. Insert Pill Reminders
INSERT INTO `pill_reminders` (`id`, `user_id`, `medicine_name`, `dosage`, `reminder_time`, `meal_relation`, `is_active`) VALUES
('rem-1', 'usr-cust-1', 'Glucophage XR 500mg', '1 Tablet with evening meal', '07:30 PM', 'With Dinner', 1),
('rem-2', 'usr-cust-1', 'Lantus SoloStar Insulin', '18 Units subcutaneous injection', '10:00 PM', 'Before Bedtime', 1)
ON DUPLICATE KEY UPDATE `dosage`=VALUES(`dosage`);
