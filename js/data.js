/**
 * Grasha Pharma (GrashaPhama) Medicine Database & Clinical Safety Rules
 * Modeled after Kenya's leading e-pharmacy (MYDAWA) & Grasha Pharma Company Profile
 * Registered under the Companies Act of Kenya (CAP. 499, section 14 (2))
 * Licensed by Pharmacy and Poisons Board (PPB Kenya) | Est. April 2013
 */

// --- Company Profile (Extracted from official company document) ---
const GRASHA_PHARMA_PROFILE = {
  name: "Grasha Pharma (GrashaPhama)",
  legalRegistration: "Registered business in Kenya as per the Companies Act of Kenya (CAP. 499, section 14 (2))",
  regulatoryBody: "Pharmacy and Poisons Board (PPB Kenya)",
  established: "April 2013",
  hotline: "+254 722 840 192",
  whatsapp: "+254 722 840 192",
  paybill: "891200",
  mission: "Grasha pharma strives to provide excellent products and services to the clients by being honest, fair, reliable and responsible in all our business Practices. Through our knowledge and significant experience in the industry, we add value to our customers and build long term relationships which are mutually beneficial.",
  vision: "Grasha pharma will be one of the leading & trusted pharmaceutical Companies in the region by offering time demanded, quality products & services that improves the quality of lives of millions of people.",
  strengths: [
    {
      title: "Quality Products",
      desc: "Committed to offer the best quality products to our customers. Our team of qualified professionals works relentlessly to ensure product quality from sourcing up to distribution."
    },
    {
      title: "Competitive Pricing",
      desc: "To us, healthcare is not a privilege; it's a right for every human. We ensure the availability of products at an affordable price without compromising quality. Excellent Customer Service ensures customer needs are met on time without fail."
    },
    {
      title: "Qualified Management",
      desc: "Our Management team consists of highly-qualified, high-performing professionals with rich experience in the pharmaceutical industry and business strategy."
    },
    {
      title: "Committed Business Professionals",
      desc: "Passionate individuals who are highly trained, experienced, self-motivated, and self-driven to fulfill the challenging demands of the healthcare industry."
    }
  ],
  commitmentsToQuality: [
    "Ensure the efficacy, safety, and reliability of products and services, keeping customer and patient benefit as priority.",
    "Conduct business in full compliance with local regulations (PPB) and international quality standards (GMP).",
    "Maintain legal and regulatory data, document, and record management.",
    "Ensure personnel possess appropriate training, skills, education, and competency.",
    "Continuous workplace risk assessment and preventive measures to enhance operating conditions.",
    "Prompt, ethical resolution of any product or service quality concerns.",
    "Periodic performance reviews for continual quality improvement."
  ],
  dosageFormsOffered: [
    "Oral Solids (Tablets & Hard Gelatine Capsules)",
    "Effervescent Tablets",
    "Liquids (Syrup, Suspension & Powder for oral suspension)",
    "Creams & Ointments (Dermatological formulations)",
    "Parenteral Preparations (Vials & Ampoules)",
    "Specialized Forms: Suppositories, Ophthalmic drops/creams, Prefilled syringes, Lyophilized injections"
  ],
  distributionNetwork: {
    nairobi: "Dedicated fleet of Grasha Pharma temperature-monitored vehicles for 2-hour to 4-hour express delivery across Nairobi County.",
    countrywide: "Strategic delivery partnership with G4S Courier and Fargo Courier delivering within 24 hours to all major cities across Kenya (Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Machakos)."
  }
};

// --- Product Categories (Replicated & Optimized from MYDAWA) ---
const MEDICINE_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'grid', count: 28 },
  { id: 'prescription', name: 'Prescription (Rx)', icon: 'file-text', count: 8, badge: 'PPB Verified' },
  { id: 'chronic', name: 'Chronic Care', icon: 'heart', count: 7, badge: 'Refill 30-Day' },
  { id: 'otc', name: 'Pain, Cold & OTC', icon: 'shield', count: 6, badge: 'Fast Relief' },
  { id: 'derma', name: 'Skincare & Derma', icon: 'sparkles', count: 4, badge: 'Dermatologist' },
  { id: 'wellness', name: 'Vitamins & Immunity', icon: 'zap', count: 5, badge: 'Daily Health' },
  { id: 'devices', name: 'Diagnostics & Devices', icon: 'activity', count: 4, badge: 'ISO Certified' },
  { id: 'baby', name: 'Mother & Baby', icon: 'smile', count: 4, badge: 'Gentle Care' }
];

// --- Kenyan Medicines Database (Real MYDAWA Product Images & KSH Pricing) ---
const MEDICINES_DATABASE = [
  {
    id: 'med-01',
    name: 'Augmentin 625mg Tablets',
    genericName: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    category: 'prescription',
    isRx: true,
    price: 1850,
    originalPrice: 2400,
    discount: 23,
    rating: 4.9,
    reviews: 1420,
    manufacturer: 'GlaxoSmithKline / Grasha Quality Sourced',
    dosageForm: 'Oral Solids (Film-Coated Tablets)',
    packSize: 'Strip of 14 Tablets',
    temperatureControlled: false,
    inStock: true,
    stockCount: 120,
    tag: 'Top Antibiotic',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg',
    genericAlternative: {
      id: 'gen-amox-clav',
      name: 'Amoxi-Clav 625mg Grasha Generic',
      price: 950,
      savings: 'Save 49%',
      manufacturer: 'Grasha Pharma Labs'
    },
    uses: ['Bacterial Respiratory Infections', 'Tonsillitis & Sinusitis', 'Skin & Soft Tissue Infections', 'Dental Abscess'],
    sideEffects: ['Mild stomach discomfort', 'Nausea', 'Loose stool'],
    dosage: '1 tablet twice daily after meals for 5-7 days or as directed by doctor.',
    warnings: 'Complete full prescribed course. Do not use if allergic to penicillin.',
    interactionsWith: ['methotrexate', 'warfarin', 'allopurinol']
  },
  {
    id: 'med-02',
    name: 'Coartem 80/480mg (Malaria Dose)',
    genericName: 'Artemether (80mg) + Lumefantrine (480mg)',
    category: 'prescription',
    isRx: true,
    price: 650,
    originalPrice: 850,
    discount: 24,
    rating: 4.9,
    reviews: 2180,
    manufacturer: 'Novartis / PPB Approved',
    dosageForm: 'Oral Solids (Tablets)',
    packSize: 'Pack of 6 Dispersible Tablets',
    temperatureControlled: false,
    inStock: true,
    stockCount: 300,
    tag: 'Kenya Malaria Care',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/01881/01881_1.jpg',
    genericAlternative: null,
    uses: ['Acute Uncomplicated P. Falciparum Malaria', 'Fever & Chills Malaria Treatment'],
    sideEffects: ['Headache', 'Dizziness', 'Loss of appetite'],
    dosage: 'Take with food or high-fat drink (milk) according to strict schedule (Hour 0, 8, 24, 36, 48, 60).',
    warnings: 'Complete all 6 doses. If vomiting occurs within 1 hour, repeat dose.',
    interactionsWith: ['ketoconazole', 'erythromycin', 'quinine']
  },
  {
    id: 'med-03',
    name: 'Lantus SoloStar Insulin Pen (100 IU/ml)',
    genericName: 'Insulin Glargine (Recombinant DNA 3ml)',
    category: 'chronic',
    isRx: true,
    price: 3600,
    originalPrice: 4500,
    discount: 20,
    rating: 4.9,
    reviews: 840,
    manufacturer: 'Sanofi-Aventis',
    dosageForm: 'Parenteral Preparations (Prefilled Syringe Pen)',
    packSize: '1 SoloStar Pen (300 Units)',
    temperatureControlled: true, // Cold Chain 2°C - 8°C
    inStock: true,
    stockCount: 45,
    tag: 'Cold-Chain ❄️ 2°C - 8°C',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/02041/02041_1.jpg',
    genericAlternative: {
      id: 'gen-semglee',
      name: 'Basaglar / Biosimilar Glargine',
      price: 2400,
      savings: 'Save 33%',
      manufacturer: 'Biocon / Mylan'
    },
    uses: ['Type 1 Diabetes Mellitus', 'Type 2 Diabetes once-daily basal control'],
    sideEffects: ['Hypoglycemia (low blood sugar)', 'Mild injection site redness'],
    dosage: 'Inject subcutaneously once daily at the exact same hour.',
    warnings: 'Must be transported in Grasha Pharma validated cooler box (2°C - 8°C). Never freeze.',
    interactionsWith: ['beta-blockers', 'oral-hypoglycemics', 'alcohol']
  },
  {
    id: 'med-04',
    name: 'Glucophage XR 500mg',
    genericName: 'Metformin Hydrochloride Extended Release (500mg)',
    category: 'chronic',
    isRx: true,
    price: 1100,
    originalPrice: 1450,
    discount: 24,
    rating: 4.8,
    reviews: 1650,
    manufacturer: 'Merck Healthcare / Grasha Sourced',
    dosageForm: 'Oral Solids (Extended Release Tablets)',
    packSize: 'Box of 60 Tablets (1 Month Supply)',
    temperatureControlled: false,
    inStock: true,
    stockCount: 180,
    tag: 'Diabetes Control',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00750/00750_1.jpg',
    genericAlternative: {
      id: 'gen-metformin-500',
      name: 'Metformin ER 500mg Grasha Generic',
      price: 480,
      savings: 'Save 56%',
      manufacturer: 'Grasha Pharma Generics'
    },
    uses: ['Type 2 Diabetes Glycemic Control', 'Insulin resistance management in PCOS'],
    sideEffects: ['Nausea', 'Abdominal bloating', 'Metallic taste in mouth'],
    dosage: '1-2 tablets once daily with evening dinner. Swallow whole.',
    warnings: 'Avoid excessive alcohol. Stay hydrated throughout the day.',
    interactionsWith: ['alcohol', 'iodinated-radiological-contrast', 'furosemide']
  },
  {
    id: 'med-05',
    name: 'Ventolin Inhaler Evohaler (100mcg)',
    genericName: 'Salbutamol Sulfate (100mcg per actuation)',
    category: 'prescription',
    isRx: true,
    price: 750,
    originalPrice: 950,
    discount: 21,
    rating: 4.9,
    reviews: 2900,
    manufacturer: 'GlaxoSmithKline',
    dosageForm: 'Inhaler (200 Metered Puffs)',
    packSize: '1 Inhaler Device (200 Doses)',
    temperatureControlled: false,
    inStock: true,
    stockCount: 110,
    tag: 'Asthma Relief',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00797/00797_1.jpg',
    genericAlternative: {
      id: 'gen-salbutamol',
      name: 'Asthalin 100mcg Inhaler',
      price: 420,
      savings: 'Save 44%',
      manufacturer: 'Cipla Kenya'
    },
    uses: ['Acute Bronchospasm', 'Bronchial Asthma attacks', 'Exercise-induced wheezing'],
    sideEffects: ['Mild finger tremors', 'Elevated pulse (Palpitations)'],
    dosage: '1 to 2 puffs inhaled when experiencing tightness or shortness of breath.',
    warnings: 'Keep cap on nozzle. If wheezing persists after 20 minutes, seek emergency medical care.',
    interactionsWith: ['propranolol', 'atenolol', 'digoxin']
  },
  {
    id: 'med-06',
    name: 'Panadol Extra Tablets (Paracetamol + Caffeine)',
    genericName: 'Paracetamol (500mg) + Caffeine (65mg)',
    category: 'otc',
    isRx: false,
    price: 240,
    originalPrice: 300,
    discount: 20,
    rating: 4.9,
    reviews: 4800,
    manufacturer: 'Haleon / GSK Kenya',
    dosageForm: 'Oral Solids (Film-Coated Tablets)',
    packSize: 'Blister Pack of 20 Tablets',
    temperatureControlled: false,
    inStock: true,
    stockCount: 500,
    tag: 'Everyday Pain Relief',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/03078/03078_1.jpg',
    genericAlternative: null,
    uses: ['Severe Headaches & Migraines', 'Toothache & Joint Pains', 'Fever & Body Aches'],
    sideEffects: ['Restlessness from caffeine if taken near bedtime'],
    dosage: '2 tablets swallowed with water every 6 hours as needed. Max 8 tablets in 24 hours.',
    warnings: 'Contains Paracetamol. Do not combine with other paracetamol products to protect liver.',
    interactionsWith: ['warfarin', 'alcohol']
  },
  {
    id: 'med-07',
    name: 'Hedex Extra Strong Tablets',
    genericName: 'Paracetamol (400mg) + Aspirin (250mg) + Caffeine (50mg)',
    category: 'otc',
    isRx: false,
    price: 220,
    originalPrice: 280,
    discount: 21,
    rating: 4.8,
    reviews: 3200,
    manufacturer: 'Haleon Consumer Kenya',
    dosageForm: 'Oral Solids (Tablets)',
    packSize: 'Pack of 16 Tablets',
    temperatureControlled: false,
    inStock: true,
    stockCount: 420,
    tag: 'Fast Headache Relief',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00617/00617_1.jpg',
    genericAlternative: null,
    uses: ['Fast Headache Relief', 'Fever', 'Neuralgia', 'Toothache'],
    sideEffects: ['Stomach acidity', 'Heartburn'],
    dosage: '1 to 2 tablets every 6 hours with food or plenty of water.',
    warnings: 'Contains Aspirin. Do not take with other NSAID painkillers like Brufen/Ibuprofen.',
    interactionsWith: ['ibuprofen', 'diclofenac', 'warfarin', 'aspirin']
  },
  {
    id: 'med-08',
    name: 'Brufen 400mg Tablets (Ibuprofen)',
    genericName: 'Ibuprofen BP (400mg)',
    category: 'otc',
    isRx: false,
    price: 380,
    originalPrice: 480,
    discount: 21,
    rating: 4.8,
    reviews: 2100,
    manufacturer: 'Abbott Healthcare',
    dosageForm: 'Oral Solids (Sugar-Coated Tablets)',
    packSize: 'Strip of 20 Tablets',
    temperatureControlled: false,
    inStock: true,
    stockCount: 260,
    tag: 'Anti-inflammatory',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00540/00540.jpg',
    genericAlternative: {
      id: 'gen-ibu-400',
      name: 'Ibuprofen 400mg Grasha Generic',
      price: 180,
      savings: 'Save 53%',
      manufacturer: 'Grasha Pharma'
    },
    uses: ['Rheumatic Pain', 'Dysmenorrhea (Menstrual Pain)', 'Dental Pain & Swelling', 'Fever'],
    sideEffects: ['Gastric irritation', 'Nausea', 'Heartburn'],
    dosage: '1 tablet 3 times daily immediately after meals with a glass of water.',
    warnings: 'Do not take on an empty stomach. Contraindicated with active peptic ulcers or concurrent aspirin.',
    interactionsWith: ['hedex', 'aspirin', 'warfarin', 'lisinopril']
  },
  {
    id: 'med-09',
    name: 'Panadol Advance 500mg Tablets (20s)',
    genericName: 'Paracetamol with Optizorb Technology (500mg)',
    category: 'otc',
    isRx: false,
    price: 210,
    originalPrice: 260,
    discount: 19,
    rating: 4.9,
    reviews: 3500,
    manufacturer: 'Haleon / GSK Kenya',
    dosageForm: 'Oral Solids (Tablets)',
    packSize: 'Pack of 20 Tablets',
    temperatureControlled: false,
    inStock: true,
    stockCount: 400,
    tag: 'Gentle on Stomach',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00617/00617_1.jpg',
    genericAlternative: null,
    uses: ['Fast Pain Relief', 'Fever', 'Sore Throat', 'Muscle Aches'],
    sideEffects: ['None when taken as directed'],
    dosage: '1-2 tablets every 4-6 hours with water.',
    warnings: 'Do not exceed 8 tablets in 24 hours.',
    interactionsWith: ['alcohol']
  },
  {
    id: 'med-10',
    name: 'Omron M2 Basic Blood Pressure Monitor',
    genericName: 'Digital Automatic Upper Arm Blood Pressure Machine',
    category: 'devices',
    isRx: false,
    price: 4800,
    originalPrice: 6200,
    discount: 23,
    rating: 4.9,
    reviews: 1120,
    manufacturer: 'Omron Healthcare Japan / PPB Cleared',
    dosageForm: 'Medical Device Kit (Device + Cuff + Batteries)',
    packSize: '1 Complete Boxed Unit',
    temperatureControlled: false,
    inStock: true,
    stockCount: 30,
    tag: 'Clinically Validated',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/02776/02776_1.jpg',
    genericAlternative: null,
    uses: ['Hypertension Tracking', 'Irregular Heartbeat Detection', 'Home BP Monitoring'],
    sideEffects: ['None'],
    dosage: 'Measure morning and evening while seated calmly for 5 minutes.',
    warnings: 'Keep arm supported at heart level during reading.',
    interactionsWith: []
  },
  {
    id: 'med-11',
    name: 'Accu-Chek Instant Blood Glucose Kit',
    genericName: 'Wireless Blood Sugar Monitor + FastClix Lancing Pen',
    category: 'devices',
    isRx: false,
    price: 2950,
    originalPrice: 3800,
    discount: 22,
    rating: 4.8,
    reviews: 950,
    manufacturer: 'Roche Diagnostics',
    dosageForm: 'Diagnostic Starter Kit (Meter + 10 Strips + Lancets)',
    packSize: 'Complete Diabetes Kit',
    temperatureControlled: false,
    inStock: true,
    stockCount: 40,
    tag: 'Diabetes Essential',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/02663/02663_1.jpg',
    genericAlternative: null,
    uses: ['Accurate Blood Glucose Measurement in 4 Seconds', 'Clear Target Range Indicator'],
    sideEffects: ['Mild fingertip prick tenderness'],
    dosage: 'Check fasting and 2 hours after meals.',
    warnings: 'Keep test strip container tightly closed.',
    interactionsWith: []
  },
  {
    id: 'med-12',
    name: 'Grasha Effervescent Vitamin C 1000mg + Zinc',
    genericName: 'Ascorbic Acid (1000mg) + Zinc Sulfate (10mg)',
    category: 'wellness',
    isRx: false,
    price: 650,
    originalPrice: 850,
    discount: 24,
    rating: 4.9,
    reviews: 1820,
    manufacturer: 'Grasha Pharma Formulation Lab',
    dosageForm: 'Effervescent Tablets (Fast Dissolving)',
    packSize: 'Tube of 20 Effervescent Tablets (Orange Flavour)',
    temperatureControlled: false,
    inStock: true,
    stockCount: 220,
    tag: 'Grasha Immunity 🍊',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00561/00561_1.jpg',
    genericAlternative: null,
    uses: ['Immune System Strengthening', 'Cold & Flu Prevention', 'Antioxidant Defense'],
    sideEffects: ['None when taken as directed'],
    dosage: 'Dissolve 1 effervescent tablet in a glass of water (200ml) daily and drink immediately.',
    warnings: 'Store tube tightly sealed in a dry cool place.',
    interactionsWith: []
  },
  {
    id: 'med-13',
    name: 'Grasha Pediatric Paracetamol Syrup 120mg/5ml',
    genericName: 'Paracetamol Pediatric Oral Suspension (120mg/5ml)',
    category: 'baby',
    isRx: false,
    price: 280,
    originalPrice: 350,
    discount: 20,
    rating: 4.9,
    reviews: 980,
    manufacturer: 'Grasha Pharma Liquid Dosage Wing',
    dosageForm: 'Liquids (Oral Suspension, Strawberry Flavor)',
    packSize: 'Amber Bottle of 100ml + Measuring Spoon',
    temperatureControlled: false,
    inStock: true,
    stockCount: 160,
    tag: 'Gentle Kids Care',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/01540/01540_1.jpg',
    genericAlternative: null,
    uses: ['Infant & Child Fever', 'Teething Pain Relief', 'Post-Vaccination Pyrexia'],
    sideEffects: ['Rare mild sensitivity'],
    dosage: 'Administer according to weight/age using the provided measuring spoon. Max 4 doses in 24 hours.',
    warnings: 'Keep out of reach of children. Shake well before use.',
    interactionsWith: []
  },
  {
    id: 'med-14',
    name: 'CeraVe Moisturizing Cream for Dry Skin (340g)',
    genericName: '3 Essential Ceramides + Hyaluronic Acid Formula',
    category: 'derma',
    isRx: false,
    price: 2600,
    originalPrice: 3200,
    discount: 19,
    rating: 4.9,
    reviews: 1450,
    manufacturer: 'L\'Oréal Dermatological Beauty',
    dosageForm: 'Creams & Ointments (Barrier Cream)',
    packSize: 'Tub of 340g (12 oz)',
    temperatureControlled: false,
    inStock: true,
    stockCount: 65,
    tag: 'Dermatologist Choice',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/02715/02715_1.jpg',
    genericAlternative: null,
    uses: ['Restores Protective Skin Barrier', 'Eczema & Very Dry Itchy Skin', 'Non-comedogenic 24h Hydration'],
    sideEffects: ['None'],
    dosage: 'Apply generously to face and body as often as needed.',
    warnings: 'For external use only.',
    interactionsWith: []
  },
  {
    id: 'med-15',
    name: 'Grasha Hydrocortisone 1% Cream',
    genericName: 'Hydrocortisone Acetate (1% w/w)',
    category: 'derma',
    isRx: true,
    price: 320,
    originalPrice: 420,
    discount: 24,
    rating: 4.7,
    reviews: 580,
    manufacturer: 'Grasha Pharma Creams & Ointments Wing',
    dosageForm: 'Creams & Ointments (Topical)',
    packSize: 'Tube of 15g',
    temperatureControlled: false,
    inStock: true,
    stockCount: 110,
    tag: 'Itch & Eczema Relief',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00563/00563_1.jpg',
    genericAlternative: null,
    uses: ['Mild Eczema & Dermatitis', 'Insect Bites & Stings', 'Skin Redness & Allergic Rash'],
    sideEffects: ['Mild burning or stinging if applied to broken skin'],
    dosage: 'Apply sparingly to affected area 1 to 2 times daily for up to 7 days.',
    warnings: 'Do not use on open wounds or infected acne lesions.',
    interactionsWith: []
  },
  {
    id: 'med-16',
    name: 'Grasha Parenteral Ceftriaxone 1g Injection Vial',
    genericName: 'Ceftriaxone Sodium USP (1g Powder for Injection)',
    category: 'prescription',
    isRx: true,
    price: 450,
    originalPrice: 600,
    discount: 25,
    rating: 4.9,
    reviews: 340,
    manufacturer: 'Grasha Pharma Parenteral Wing (Vials & Ampoules)',
    dosageForm: 'Parenteral Preparations (Vials & Ampoules)',
    packSize: '1 Vial + 10ml Water for Injection',
    temperatureControlled: false,
    inStock: true,
    stockCount: 75,
    tag: 'Clinical Parenteral',
    image: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/05611/05611_1.jpg',
    genericAlternative: null,
    uses: ['Severe Hospital-Grade Bacterial Infections', 'Meningitis', 'Intra-abdominal Infections', 'Sepsis'],
    sideEffects: ['Injection site soreness', 'Diarrhea'],
    dosage: 'Administer IV/IM strictly under certified clinical supervision.',
    warnings: 'Prescription strictly required. Reconstitution requires sterile technique.',
    interactionsWith: ['calcium-containing-diluents', 'warfarin']
  }
];

// --- Clinical Drug Interaction Rules ---
const DRUG_INTERACTIONS = [
  {
    drugs: ['med-07', 'med-08'], // Hedex (Aspirin) + Brufen (Ibuprofen)
    severity: 'HIGH',
    title: 'Severe NSAID Overdose & Gastrointestinal Bleeding Risk',
    message: 'Concurrent use of Hedex (which contains Aspirin) and Brufen (Ibuprofen) significantly damages stomach lining, risking gastric ulcers and intestinal hemorrhage.',
    recommendation: 'Do NOT take these together. Stick with Panadol Extra (Paracetamol) if additional pain relief is needed.'
  },
  {
    drugs: ['med-03', 'med-05'], // Lantus Insulin + Ventolin
    severity: 'MODERATE',
    title: 'Blood Glucose Elevation Risk',
    message: 'Salbutamol (Ventolin) may transiently increase blood sugar levels, demanding extra monitoring for your Lantus Insulin regimen.',
    recommendation: 'Check blood glucose 1-2 hours after using Ventolin inhaler.'
  },
  {
    drugs: ['med-01', 'med-07'], // Augmentin + Hedex
    severity: 'LOW',
    title: 'Salicylate Absorption Notice',
    message: 'High dose salicylates may mildly alter renal clearance of penicillins.',
    recommendation: 'Take with full glass of water at least 1 hour apart.'
  }
];

// --- Prescriptions Archive (Kenyan Doctor Prescriptions) ---
const MOCK_PRESCRIPTIONS = [
  {
    id: 'rx-nbi-2026-904',
    patientName: 'Jane Wambui Kamau',
    doctorName: 'Dr. David Mwangi, MBChB, MMed',
    clinic: 'Aga Khan University Hospital, Nairobi',
    date: '2026-11-06',
    status: 'Verified by PPB Pharmacist',
    medicinesListed: ['Augmentin 625mg (14 Tabs)', 'Panadol Extra (20 Tabs)', 'Brufen 400mg (20 Tabs)'],
    validUntil: '2027-05-06',
    verifiedBy: 'Pharm. Angela Muthoni, B.Pharm #PPB-3912',
    insuranceProvider: 'Jubilee Health Insurance (Member #JUB-882190)',
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f8fafc" stroke="%23cbd5e1" stroke-width="2"/><text x="20" y="35" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230369a1">AGA KHAN UNIVERSITY HOSPITAL</text><text x="20" y="52" font-family="sans-serif" font-size="10" fill="%2364748b">3rd Parklands Ave, Nairobi • Lic %23KMPDC-8841</text><line x1="20" y1="65" x2="280" y2="65" stroke="%230284c7" stroke-width="2"/><text x="20" y="88" font-family="sans-serif" font-size="11" fill="%231e293b">Patient: Jane Wambui Kamau (34y / F)</text><text x="20" y="106" font-family="sans-serif" font-size="11" fill="%231e293b">Date: 06 Nov 2026</text><text x="20" y="140" font-family="serif" font-size="28" font-weight="bold" fill="%230284c7">Rx</text><text x="56" y="138" font-family="sans-serif" font-size="12" font-weight="bold" fill="%230f172a">1. Augmentin 625mg Tabs</text><text x="56" y="154" font-family="sans-serif" font-size="10" fill="%2364748b">Sig: 1 tab PO BD x 7/7 (14 Tabs)</text><text x="56" y="184" font-family="sans-serif" font-size="12" font-weight="bold" fill="%230f172a">2. Panadol Extra Tablets</text><text x="56" y="200" font-family="sans-serif" font-size="10" fill="%2364748b">Sig: 2 tabs PO QDS PRN (20 Tabs)</text><text x="56" y="230" font-family="sans-serif" font-size="12" font-weight="bold" fill="%230f172a">3. Brufen (Ibuprofen) 400mg</text><text x="56" y="246" font-family="sans-serif" font-size="10" fill="%2364748b">Sig: 1 tab PO TDS pc (20 Tabs)</text><path d="M 40 320 Q 90 300 140 320 T 240 310" fill="none" stroke="%231d4ed8" stroke-width="2"/><text x="140" y="348" font-family="sans-serif" font-size="9" fill="%2364748b">Dr. David Mwangi, MBChB</text><rect x="180" y="358" width="100" height="28" fill="%23dcfce7" rx="4"/><text x="190" y="376" font-family="sans-serif" font-size="9" font-weight="bold" fill="%2315803d">PPB VERIFIED ✓</text></svg>'
  }
];

// --- Pharmacist Knowledge Base (Kenya Context) ---
const PHARMACIST_RESPONSES = [
  {
    keywords: ['delivery', 'nairobi', 'fargo', 'g4s', 'time', 'shipping'],
    reply: "Jambo! At Grasha Pharma, we operate our own fleet of vehicles for 2 to 4 hour express deliveries across Nairobi County (Westlands, Kilimani, Karen, Upper Hill, Eastleigh, CBD, South B, etc.). For countrywide orders across Kenya (Mombasa, Kisumu, Nakuru, Eldoret), we partner with G4S and Fargo Courier to deliver safely to your doorstep within 24 hours!"
  },
  {
    keywords: ['mpesa', 'm-pesa', 'lipa', 'pay', 'payment', 'card', 'cash', 'cod', 'insurance'],
    reply: "We offer 3 flexible payment options:\n1. 📱 Lipa Na M-Pesa STK Push directly on your phone (Paybill 891200).\n2. 💳 Debit / Credit Card (Visa & Mastercard).\n3. 💵 Cash / M-Pesa on Delivery (hand over original paper prescription to courier upon receipt)."
  },
  {
    keywords: ['generic', 'cheaper', 'grasha', 'substitute', 'cost', 'lipitor', 'augmentin'],
    reply: "As part of Grasha Pharma's core commitment that 'Healthcare is not a privilege; it is a right for every human', we manufacture and source FDA/PPB-approved generic alternatives with the exact same active pharmaceutical ingredient (API), bioequivalence, and therapeutic potency, saving you 40% to 70%!"
  },
  {
    keywords: ['prescription', 'rx', 'upload', 'doctor', 'verify', 'slip'],
    reply: "Ordering prescription medicine is easy on Grasha Pharma! Simply tap 'Upload Rx' at the top of the app. Take a clear photo of your doctor's slip. Our registered clinical pharmacist will verify your prescription within 5 minutes, configure your cart, and dispatch your order. Please note you must hand the physical paper Rx to the rider upon delivery as required by Kenyan law (PPB)."
  },
  {
    keywords: ['company', 'grasha', 'who', 'about', 'profile', 'founded', 'license'],
    reply: "Grasha Pharma is a premier Kenyan pharmaceutical enterprise registered under the Companies Act of Kenya (CAP. 499, section 14 (2)) and fully licensed by the Pharmacy and Poisons Board (PPB). Operating since April 2013, we specialize in oral solids, effervescent tablets, liquids/syrups, creams & ointments, and parenterals (vials/ampoules), providing affordable, world-class healthcare to all Kenyans."
  },
  {
    keywords: ['cold', 'chain', 'insulin', 'fridge', 'temp'],
    reply: "All cold-chain medications (such as Lantus Insulin) are transported in Grasha Pharma validated isothermal cooler boxes with calibrated cooling packs maintained at 2°C to 8°C. Our delivery vehicles carry digital temperature loggers to ensure strict cold-chain compliance."
  },
  {
    keywords: ['jambo', 'hello', 'hi', 'habari', 'help', 'pharmacist', 'whatsapp'],
    reply: "Habari! I am Pharm. Angela Muthoni, B.Pharm, your dedicated licensed clinical pharmacist at Grasha Pharma. How can I assist you with your prescriptions, medication advice, or dosage instructions today?"
  }
];

// --- Authenticated Demo Users (Patient/Customer vs Grasha Admin) ---
const DEMO_USERS = [
  {
    id: 'usr-cust-1',
    name: 'Jane Wambui Kamau',
    email: 'jane.wambui@gmail.com',
    password: 'password123',
    role: 'customer',
    phone: '+254 712 345 678',
    avatar: '👩',
    county: 'Nairobi',
    estate: 'Westlands, Rhapta Road, Apt 3A',
    deliveryInstructions: 'Call at gate for security clearance',
    memberSince: 'April 2023',
    loyaltyPoints: 480,
    prescriptionCount: 2,
    totalOrdersCount: 3
  },
  {
    id: 'usr-admin-1',
    name: 'Pharm. Angela Muthoni',
    email: 'admin@grashapharma.co.ke',
    password: 'admin123',
    role: 'admin',
    phone: '+254 722 840 192',
    avatar: '🛡️',
    title: 'Chief Pharmacist & Operations Lead',
    ppbReg: 'PPB-3912',
    facility: 'Grasha Pharma Main Micro-Hub, Nairobi',
    memberSince: 'April 2013'
  }
];

// --- High Quality Medical Image Presets for Quick Inventory Addition ---
const PHARMACY_IMAGE_PRESETS = [
  {
    id: 'preset-tabs',
    name: 'Tablets / Capsules Blister',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    dosageForm: 'Oral Solids (Tablets & Hard Gelatine Capsules)'
  },
  {
    id: 'preset-bottle',
    name: 'Medicine Bottle / Pills',
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=80',
    dosageForm: 'Oral Solids (Tablets & Hard Gelatine Capsules)'
  },
  {
    id: 'preset-syrup',
    name: 'Syrup / Oral Suspension',
    url: 'https://images.unsplash.com/photo-1576073719676-aa955fc186ee?w=500&auto=format&fit=crop&q=80',
    dosageForm: 'Liquids (Syrup, Suspension & Powder for oral suspension)'
  },
  {
    id: 'preset-cream',
    name: 'Ointment / Cream Tube',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    dosageForm: 'Creams & Ointments (Dermatological formulations)'
  },
  {
    id: 'preset-injection',
    name: 'Injection / Sterile Vial',
    url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=80',
    dosageForm: 'Parenteral Preparations (Vials & Ampoules)'
  },
  {
    id: 'preset-device',
    name: 'Diagnostic Health Device',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=80',
    dosageForm: 'Diagnostics & Medical Equipment'
  },
  {
    id: 'preset-effervescent',
    name: 'Effervescent Tube / Vitamins',
    url: 'https://images.unsplash.com/photo-1616671285442-0f0e0c90c749?w=500&auto=format&fit=crop&q=80',
    dosageForm: 'Effervescent Tablets'
  },
  {
    id: 'preset-mydawa-antibiotic',
    name: 'Augmentin Antibiotic (MYDAWA)',
    url: 'https://storagemydawadocsprod.blob.core.windows.net/productimages/00567/00567_1.jpg',
    dosageForm: 'Oral Solids (Tablets & Hard Gelatine Capsules)'
  }
];

// --- Rich Historical & Live Sales Orders for Admin Monitoring ---
const INITIAL_ADMIN_SALES_ORDERS = [
  {
    id: 'GP-9022',
    date: '2026-11-12 19:45',
    customerName: 'Kiprono Cheruiyot',
    customerPhone: '+254 728 112 349',
    deliveryAddress: 'Kilimani, Dennis Pritt Rd, Nairobi',
    items: [
      { medicineId: 'med-01', name: 'Augmentin 625mg Tablets', quantity: 2, price: 1850 },
      { medicineId: 'med-06', name: 'Panadol Extra Tablets', quantity: 1, price: 240 }
    ],
    total: 3940,
    status: 'Out for Express Delivery',
    courier: 'Grasha Fleet Nairobi (Van KDA 419P)',
    riderName: 'Peter Kamau',
    paymentMethod: 'Lipa Na M-Pesa',
    mpesaCode: 'QK7812903X',
    deliveryType: 'Nairobi Express (2-4h)'
  },
  {
    id: 'GP-8840',
    date: '2026-11-12 18:30',
    customerName: 'Jane Wambui Kamau',
    customerPhone: '+254 712 345 678',
    deliveryAddress: 'Westlands, Rhapta Road, Apt 3A, Nairobi',
    items: [
      { medicineId: 'med-03', name: 'Lantus SoloStar Insulin Pen (100 IU/ml)', quantity: 1, price: 3600, coldChain: true },
      { medicineId: 'med-05', name: 'Ventolin Inhaler Evohaler (100mcg)', quantity: 1, price: 750 }
    ],
    total: 4350,
    status: 'Dispensed & Verified',
    courier: 'Grasha Cold-Chain Express Fleet ❄️',
    riderName: 'Peter Kamau (PPB Certified)',
    paymentMethod: 'Lipa Na M-Pesa',
    mpesaCode: 'QK4491028L',
    deliveryType: 'Nairobi Express Cold-Chain'
  },
  {
    id: 'GP-8114',
    date: '2026-11-12 15:20',
    customerName: 'Grace Achieng',
    customerPhone: '+254 701 992 451',
    deliveryAddress: 'Milimani Estate, Kisumu',
    items: [
      { medicineId: 'med-02', name: 'Coartem 80/480mg Tablets', quantity: 1, price: 650 },
      { medicineId: 'med-12', name: 'Grasha Effervescent Vitamin C 1000mg', quantity: 2, price: 650 }
    ],
    total: 2400,
    status: 'Dispatched to G4S Courier',
    courier: 'G4S Courier Express Kenya (Waybill #G4S-991204)',
    riderName: 'G4S Courier Officer',
    paymentMethod: 'Credit / Debit Card (Ending in 4821)',
    mpesaCode: null,
    deliveryType: 'Countrywide G4S (24h)'
  },
  {
    id: 'GP-7721',
    date: '2026-11-11 14:10',
    customerName: 'David Njoroge',
    customerPhone: '+254 722 840 993',
    deliveryAddress: 'Karen Plains, Nairobi',
    items: [
      { medicineId: 'med-04', name: 'Glucophage XR 500mg', quantity: 1, price: 1100 },
      { medicineId: 'med-10', name: 'Omron M2 Basic Blood Pressure Monitor', quantity: 1, price: 5800 }
    ],
    total: 6900,
    status: 'Delivered',
    courier: 'Grasha Fleet Nairobi - Van KDA 419P',
    riderName: 'Samuel Ochieng',
    paymentMethod: 'Cash on Delivery (Courier Handover)',
    mpesaCode: 'QJ8912KL99',
    deliveryType: 'Nairobi Express'
  },
  {
    id: 'GP-6902',
    date: '2026-11-10 11:05',
    customerName: 'Fatuma Hassan',
    customerPhone: '+254 733 456 781',
    deliveryAddress: 'Nyali, Links Road, Mombasa',
    items: [
      { medicineId: 'med-14', name: 'CeraVe Moisturising Cream (340g)', quantity: 1, price: 3400 },
      { medicineId: 'med-15', name: 'Hydrocortisone 1% Cream (30g)', quantity: 2, price: 380 }
    ],
    total: 4610,
    status: 'Delivered',
    courier: 'Fargo Courier Kenya (Tracking #FRG-4401)',
    riderName: 'Fargo Courier Agent',
    paymentMethod: 'Lipa Na M-Pesa',
    mpesaCode: 'QH330911KP',
    deliveryType: 'Countrywide Fargo Courier (24h)'
  }
];

