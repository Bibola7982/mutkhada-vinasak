/* =========================================================================
   MUTKHADA VINASAK — PRODUCT DATA (single source of truth)
   -------------------------------------------------------------------------
   Edit the values below to change the website content without touching
   HTML/CSS/JS logic. This file is loaded as a <script> (defines window.PRODUCT).
   ========================================================================= */
window.PRODUCT = {
  // --- Core product identity ---
  name: "MUTKHADA VINASAK",
  nameHi: "मुतखड़ा विनासक",
  productName: "MUTKHADA VINASAK POWDER",
  tagline: "AYURVEDIC POWDER",
  badge: "AYURVEDIC PROPRIETARY MEDICINE",
  description:
    "Traditional Ayurvedic formulation presented in a convenient powder format.",

  // --- Pricing / weight ---
  price: 1999,
  currencySymbol: "₹",
  weight: "150 gm",
  maxQuantity: 10,
  shipping: "FREE",

  // --- Manufacturing info ---
  batch: "MV001",
  mfgDate: "AUG 2026",
  expiryDate: "JULY 2027",
  mfgLicense: "1280-ISM (HR)",
  manufacturer: "SUNRISE PHARMA AYURVEDIC COMPANY",
  manufacturerAddress: "VPO Kallayat, Distt. Kaithal (Haryana)",

  // --- Contact ---
  whatsappNumber: "8684948560",          // 10-digit, no + here
  whatsappUrl: "https://wa.me/918684948560",
  email: "panwarss115@gmail.com",
  supportLocation: "Hansi, Hisar, Haryana - 125033",

  // --- Composition (DO NOT change spellings / quantities / botanical names) ---
  composition: [
    { common: "Fitkari",  botanical: "Alum",                        part: "Powder", qty: "0.17" },
    { common: "Indrayava",botanical: "Holarrhena Antidysenterica",  part: "Seed",   qty: "2.71" },
    { common: "Kalmi Sora",botanical: "Potassii Nitras",            part: "Powder", qty: "0.80" },
    { common: "Jwakhar",  botanical: "Potasii Carbonas",           part: "Powder", qty: "0.82" },
    { common: "Mishri",   botanical: "Saccharum Officinarum",       part: "Powder", qty: "5.50" }
  ],
  compositionBase: "Each 10 gm contains out of -",

  // --- Product information / traditional use ---
  benefitsInfo:
    "Help to dissolve Kidney Stones, Remove kidney stones with very short therapy, it is diuretic and helps in stopping pain.",
  benefitsNote:
    "These statements are provided for product information and should not be considered a substitute for professional medical advice.",

  // --- Dosage ---
  dosage: "Adults 1–2 gm powder twice a day or as directed by the physician.",
  dosageNote: "Use under medical supervision.",

  // --- Warnings / cautions ---
  warnings: [
    "Do not use if seal is broken or damaged.",
    "TO BE TAKEN UNDER MEDICAL SUPERVISION.",
    "Store in a cool & dry place away from direct sunlight.",
    "Keep out of reach of children."
  ],

  // --- Disclaimer ---
  disclaimer:
    "This website provides product information for general informational purposes. " +
    "Product information should not be considered a substitute for professional medical advice, " +
    "diagnosis or treatment. Consult a qualified healthcare professional before using any health-related product.",

  // --- Image references (relative to repo root) ---
  // All product photographs supplied by the business (10 real product photos).
  // `gallery` is the ordered list used on the homepage gallery, hero and cards.
  // Add/remove photos here and the whole site updates automatically.
  images: {
    gallery: [
      "./assets/product-photo-1.png",
      "./assets/product-photo-2.png",
      "./assets/product-photo-3.png",
      "./assets/product-photo-4.png",
      "./assets/product-photo-5.png",
      "./assets/product-photo-6.png",
      "./assets/product-photo-7.png",
      "./assets/product-photo-8.png",
      "./assets/product-photo-9.png",
      "./assets/product-photo-10.png"
    ],
    // Primary photo used for hero / cards / order summary (first gallery photo).
    hero:    "./assets/product-photo-1.png",
    qr:      "./assets/payment-qr.png"
  }
};
