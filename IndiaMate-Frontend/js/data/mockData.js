// --- 1. Multi-Currency Live Forex Rates ---
export const FOREX_RATES = {
  USD: 87.40,
  EUR: 94.20,
  GBP: 110.80,
  AUD: 57.10
};

// --- 2. Wallet & Transaction Data ---
export const walletData = {
  balanceINR: 12480,
  linkedCard: "Visa •• 4417 (US)",
  domesticUpiId: "traveler@okhdfcbank",
  transactions: [
    { name: "Auto ride — Connaught Place", meta: "UPI • Today, 10:12 AM", amount: -140 },
    { name: "Wallet top-up (Forex)", meta: "Visa card conversion • Today, 9:02 AM", amount: 5000 },
    { name: "Apollo 24x7 Pharmacy", meta: "UPI • Today, 8:15 AM", amount: -320 },
    { name: "Chandni Chowk market stall", meta: "UPI • Yesterday", amount: -620 }
  ]
};

// --- 3. User Emergency Medical Profile ---
export const userMedicalProfile = {
  bloodGroup: "O+ (Positive)",
  drugAllergies: "Penicillin, Sulfa Drugs",
  conditions: "Mild Asthma (Carries Inhaler)",
  emergencyContact: "+91-98765-43210 (Sister - Priya)",
  insurancePolicy: "Allianz Global Travel #AX-99281-IN"
};

// --- 4. Doctor & Hospital Directory ---
export const doctorData = [
  {
    id: "doc-1",
    name: "Dr. Anjali Mehta",
    spec: "General Physician",
    hospital: "Max Super Speciality Hospital, Saket",
    accreditation: "NABH & JCI Accredited",
    languages: ["English", "Hindi", "French"],
    distance: "1.8 km",
    cashless: true,
    available24x7: false,
    phone: "+91-11-2651-5050"
  },
  {
    id: "doc-2",
    name: "Dr. Rohan Kapoor",
    spec: "Gastroenterologist (Stomach Care)",
    hospital: "Fortis Escorts Heart & Liver Institute",
    accreditation: "NABH Accredited Trauma Center",
    languages: ["English", "Hindi", "German"],
    distance: "3.4 km",
    cashless: true,
    available24x7: true,
    phone: "+91-11-4713-5000"
  },
  {
    id: "doc-3",
    name: "Dr. Vikramaditya Sen",
    spec: "Orthopedic (Bone & Fracture)",
    hospital: "Indraprastha Apollo Hospital",
    accreditation: "JCI International Accredited",
    languages: ["English", "Hindi", "Spanish"],
    distance: "4.2 km",
    cashless: true,
    available24x7: true,
    phone: "+91-11-2692-5858"
  },
  {
    id: "doc-4",
    name: "Dr. Sarah D'Souza",
    spec: "Dentist & Dental Trauma",
    hospital: "Clove Dental Super Clinic, Connaught Place",
    accreditation: "ISO & NABH Certified",
    languages: ["English", "Hindi"],
    distance: "0.9 km",
    cashless: false,
    available24x7: false,
    phone: "+91-11-4356-9000"
  },
  {
    id: "doc-5",
    name: "Apollo 24x7 Emergency Chemist",
    spec: "24x7 Pharmacy & First Aid",
    hospital: "Connaught Place Inner Circle",
    accreditation: "Licensed 24x7 Emergency Chemist",
    languages: ["English", "Hindi"],
    distance: "0.4 km",
    cashless: false,
    available24x7: true,
    phone: "+91-11-2332-1100"
  }
];

// --- 5. Global-to-Indian Generic Medicine Mapper ---
export const globalMedicineMap = [
  {
    globalBrand: "Tylenol / Acetaminophen / Panadol",
    indianSalt: "Paracetamol (Crocin 650 / Dolo 650)",
    use: "Fever, headache, body pain",
    otc: "Over-the-Counter (No prescription needed)",
    dosage: "500mg – 650mg after meals"
  },
  {
    globalBrand: "Advil / Motrin / Nurofen",
    indianSalt: "Ibuprofen (Brufen 400 / Combiflam)",
    use: "Muscle ache, anti-inflammatory & toothache",
    otc: "Over-the-Counter",
    dosage: "400mg with food / water"
  },
  {
    globalBrand: "Pepto-Bismol / Imodium",
    indianSalt: "Loperamide (Eldoper) / ORS Electrolyte",
    use: "Traveler's diarrhea & stomach cramping",
    otc: "Over-the-Counter (Electral ORS recommended)",
    dosage: "1 sachet in 1 liter clean sealed water"
  },
  {
    globalBrand: "Benadryl / Claritin / Zyrtec",
    indianSalt: "Cetirizine 10mg (Cetzine / Okacet)",
    use: "Pollution allergy, runny nose & insect bites",
    otc: "Over-the-Counter",
    dosage: "1 tablet (10mg) at bedtime"
  },
  {
    globalBrand: "Dramamine / Gravol",
    indianSalt: "Dimenhydrinate / Ondansetron (Emeset)",
    use: "Motion sickness & vomiting during mountain/cab rides",
    otc: "Over-the-Counter",
    dosage: "1 tablet 30 mins before travel"
  }
];

// --- 6. Verified Safe Shelters & Police Booths ---
export const safeShelters = [
  { name: "24x7 Tourist Police Facilitation Booth", loc: "Pahar Ganj / NDLS Gate 1", distance: "0.6 km", phone: "112" },
  { name: "Connaught Place Police Station", loc: "Near Shivaji Stadium Metro", distance: "1.1 km", phone: "+91-11-2334-1122" },
  { name: "NABH Emergency Safe Triage", loc: "Safdarjung Hospital ER", distance: "3.1 km", phone: "102" }
];

// --- 7. Emergency Contacts ---
export const internationalSosContacts = [
  { name: "National Emergency Central", sub: "Police, Fire, Medical (112)", number: "112" },
  { name: "Tourist Police Helpline", sub: "Dedicated 24x7 Multilingual Assistance", number: "1363" },
  { name: "Govt. Free Ambulance", sub: "National Ambulance Dispatch (108 / 102)", number: "108" },
  { name: "US Embassy Consular Emergency", sub: "Consular direct assistance", number: "+91-11-2419-8000" }
];

export const domesticSosContacts = [
  { name: "National Emergency Number", sub: "Police, Fire, Medical (112)", number: "112" },
  { name: "Railway Passenger Helpline", sub: "Train security, medical emergency", number: "139" },
  { name: "Govt. Free Ambulance", sub: "Medical Emergency 108", number: "108" },
  { name: "Women Safety Helpline", sub: "Nationwide 24x7 Police Helpline", number: "1091" },
  { name: "National Highway Helpline", sub: "NHAI Highway breakdown & accident", number: "1033" }
];

// --- 8. Embassy Directory ---
export const embassyDirectory = [
  { country: "United States", name: "US Embassy, New Delhi", phone: "+91-11-2419-8000", address: "Shantipath, Chanakyapuri", passportHelp: "24x7 Consular Emergency for lost passports" },
  { country: "United Kingdom", name: "British High Commission", phone: "+91-11-2419-2100", address: "Chanakyapuri, New Delhi", passportHelp: "Emergency Travel Document (ETD) support" },
  { country: "European Union", name: "EU Delegation / France Embassy", phone: "+91-11-4319-6100", address: "Nyaya Marg, Chanakyapuri", passportHelp: "Schengen emergency travel assistance" },
  { country: "Australia", name: "Australian High Commission", phone: "+91-11-4139-9900", address: "1/50G Shantipath, Chanakyapuri", passportHelp: "24/7 Consular Emergency Centre" }
];

// --- 9. Verified e-SIM Plans ---
export const esimPlans = [
  { provider: "Airtel Tourist eSIM", data: "1.5 GB/Day (30 Days)", priceINR: 499, priceUSD: "$5.7", store: "Official Counter, T3 Arrivals" },
  { provider: "Jio Welcome Pass", data: "2 GB/Day (28 Days)", priceINR: 399, priceUSD: "$4.5", store: "Any Reliance Digital / Airport Kiosk" },
  { provider: "Airalo India eSIM (Digital)", data: "3 GB Data Only (30 Days)", priceINR: 870, priceUSD: "$10.0", store: "Instant In-App Download" }
];

// --- 10. Curated Iconic Food Outlets & Trails ---
export const foodData = [
  {
    id: "delhi-karims",
    city: "Delhi",
    name: "Karim Hotel",
    loc: "Gali Kababian, Jama Masjid",
    est: "Est. 1913 (110+ Years)",
    heroDish: "Mutton Korma & Shahi Seekh Kebab",
    dietary: ["Halal", "Non-veg"],
    allergens: ["Dairy / Ghee", "Tree Nuts"],
    spiceLevel: "Medium Spicy 🌶️🌶️",
    fssaiRating: "4.5★ FSSAI Certified",
    waterSafety: "Certified RO & Sealed Water Bottles",
    openKitchen: "Open tandoor & live charcoal grilling",
    freshBatchTime: "12:30 PM – 3:30 PM & 7:00 PM – 11:30 PM",
    demystifier: "Slow-cooked mutton infused with aromatic cardamom, cloves, and rich fried-onion gravy.",
    vernacularCard: "भैया, 1 मटन कोरमा और 2 खमीरी रोटी दीजिए। मसाले मध्यम रखिए और ऊपर से सुरक्षित पानी ही दीजिएगा।"
  },
  {
    id: "delhi-paranthe",
    city: "Delhi",
    name: "Pt. Gaya Prasad Shiv Charan",
    loc: "Paranthe Wali Gali, Chandni Chowk",
    est: "Est. 1872 (150+ Years)",
    heroDish: "Rabri Paratha & Spiced Matar Paratha",
    dietary: ["Pure Veg", "Jain Friendly"],
    allergens: ["Gluten / Wheat", "Dairy / Pure Ghee"],
    spiceLevel: "Mild to Tangy 🌶️",
    fssaiRating: "4.0★ FSSAI Hygienic",
    waterSafety: "In-house RO Purified Water System",
    openKitchen: "Live front-counter deep frying in brass kadhais",
    freshBatchTime: "9:00 AM – 1:00 PM",
    demystifier: "Crispy pan-fried flatbread stuffed with sweetened reduced milk or spiced green peas.",
    vernacularCard: "भैया, एक बिना लहसुन-प्याज का शुद्ध शाकाहारी पराठा दीजिए। कम तीखा रखिए।"
  },
  {
    id: "jaipur-lmb",
    city: "Jaipur",
    name: "Laxmi Misthan Bhandar (LMB)",
    loc: "Johari Bazaar, Pink City",
    est: "Est. 1727 (290+ Years)",
    heroDish: "Paneer Ghewar & Special Pyaaz Kachori",
    dietary: ["Pure Veg"],
    allergens: ["Gluten", "Dairy / Milk Solids", "Pistachio / Almonds"],
    spiceLevel: "Mild & Sweet 🍯",
    fssaiRating: "5.0★ FSSAI National Certified",
    waterSafety: "Packaged Mineral Water & Clean In-house RO",
    openKitchen: "Clean glass-partitioned live sweet workshop",
    freshBatchTime: "7:30 AM – 11:00 AM",
    demystifier: "Honeycomb flour disc steeped in saffron-sugar syrup topped with creamy malai.",
    vernacularCard: "भैया, 2 ताज़ा पनीर घेवर और 1 प्याज़ कचौरी पैक कर दीजिए। शुद्ध घी वाला ही दीजिएगा।"
  },
  {
    id: "indore-prashant",
    city: "Indore",
    name: "Prashant Post Office Poha",
    loc: "Jail Road, Near Post Office",
    est: "Est. 1949 (75+ Years)",
    heroDish: "Steamed Usal Poha with Jeeravan & Sev",
    dietary: ["Pure Veg", "Vegan"],
    allergens: ["Peanuts", "Mustard Seeds"],
    spiceLevel: "Tangy & Mild 🍋",
    fssaiRating: "4.5★ Clean Street Food Hub",
    waterSafety: "100% Certified RO Filtered Water",
    openKitchen: "Steaming live right in front of customers",
    freshBatchTime: "6:30 AM – 10:30 AM",
    demystifier: "Light steamed flattened rice seasoned with fennel & turmeric, topped with zesty Jeeravan spice.",
    vernacularCard: "भैया, 1 प्लेट पोहा बनाइए। जीरावन मसाला थोड़ा कम डालिए।"
  },
  {
    id: "lucknow-tunday",
    city: "Lucknow",
    name: "Tunday Kababi",
    loc: "Phool Wali Gali, Chowk",
    est: "Est. 1905 (120+ Years)",
    heroDish: "Original Galouti Kebab with Mughlai Paratha",
    dietary: ["Halal", "Non-veg"],
    allergens: ["Nuts", "Dairy"],
    spiceLevel: "Medium Aromatic 🌶️🌶️",
    fssaiRating: "4.5★ FSSAI Certified",
    waterSafety: "Sealed Packaged Drinking Water Only",
    openKitchen: "Live charcoal griddle grilling",
    freshBatchTime: "1:00 PM – 4:00 PM & 6:30 PM – 11:30 PM",
    demystifier: "Silky, melt-in-mouth minced meat kebabs marinated in 160 traditional herbs.",
    vernacularCard: "भैया, 1 प्लेट गलौटी कबाब और उल्टे तवे का पराठा दीजिए।"
  }
];

export const foodTrails = [
  {
    id: "delhi-trail",
    city: "Delhi",
    title: "Chandni Chowk 1-Hour Heritage Food Trail",
    duration: "60 mins · 4 stops · 850m walk",
    safetyNote: "Crowded heritage street. Keep belongings close & drink sealed water.",
    stops: [
      { step: "1", name: "Old Famous Jalebi Wala", dish: "Giant crisp hot jalebis fried in desi ghee" },
      { step: "2", name: "Pt. Gaya Prasad Paranthe", dish: "Heritage stuffed paratha tasting" },
      { step: "3", name: "Natraj Dahi Bhalla Corner", dish: "Lentil dumplings in sweetened cool yogurt" },
      { step: "4", name: "Karim's Jama Masjid", dish: "Signature Mughlai kebab wrap" }
    ]
  },
  {
    id: "indore-trail",
    city: "Indore",
    title: "Sarafa Bazaar Midnight Street Food Trail",
    duration: "75 mins · 4 stops · Safe Well-Lit Market",
    safetyNote: "Active night market from 8 PM to 2 AM. 100% vegetarian & safe.",
    stops: [
      { step: "1", name: "Joshi Dahi Vada", dish: "Flying Dahi Vada with 5 secret spices" },
      { step: "2", name: "Sanwariya Bhutte Ka Kees", dish: "Grated spiced sweet corn cooked in milk" },
      { step: "3", name: "Garadu Fry Stall", dish: "Crispy fried yam tossed in sour-tangy chaat masala" },
      { step: "4", name: "Agrawal Jaleba", dish: "Mega Jaleba with thick reduced saffron rabri" }
    ]
  }
];

// --- 11. GI-Tag & Crafts Data ---
export const craftData = [
  {
    id: "jaipur-bluepottery",
    city: "Jaipur",
    state: "Rajasthan",
    name: "Jaipur Blue Pottery Artisan Cluster",
    item: "GI-Tagged Blue Pottery & Ceramic Decor",
    type: "Verified Artisan Co-operative Cluster",
    address: "Kot Jewar & Sanganer Artisan Belt, Jaipur",
    distance: "2.8 km",
    verified: true,
    middlemanBypassed: true,
    govtAssurance: "Rajasthan Small Industries Corp. (Rajasthali) Certified",
    authenticPriceRange: "₹450 – ₹3,500 (Depending on hand-glazing detail)",
    fakePriceWarning: "⚠️ Fake Plaster-of-Paris / Machine Ceramic sold at ₹100 – ₹250 (Chips easily and non-authentic).",
    liveDemo: "Live pottery wheel spinning & quartz-glass glazing workshops available."
  },
  {
    id: "varanasi-silk",
    city: "Varanasi",
    state: "Uttar Pradesh",
    name: "Bunkar Seva Kendra & Handloom Society",
    item: "GI-Certified Pure Banarasi Silk Saree",
    type: "Weaver Co-operative Society",
    address: "Pili Kothi & Madanpura Weaver Belt, Varanasi",
    distance: "1.5 km",
    verified: true,
    middlemanBypassed: true,
    govtAssurance: "UP Handlooms & Silk Mark India Verified",
    authenticPriceRange: "₹8,500 – ₹45,000 (Pure Katan Silk with Silver Zari)",
    fakePriceWarning: "⚠️ Fake Chinese Polyester Silk sold at ₹1,500 – ₹3,000 (Lacks Silk Mark hallmark).",
    liveDemo: "Live Jacquard pit-loom hand-weaving demonstration on-site."
  },
  {
    id: "delhi-cottage",
    city: "Delhi",
    state: "Delhi",
    name: "Central Cottage Industries Emporium",
    item: "Multi-State GI Crafts (Pashmina, Brass, Sandalwood)",
    type: "Government-Run Central Emporium",
    address: "Janpath, Connaught Place, New Delhi",
    distance: "0.9 km",
    verified: true,
    middlemanBypassed: true,
    govtAssurance: "Ministry of Textiles, Govt. of India Fixed-Price Assurance",
    authenticPriceRange: "₹800 – ₹60,000 (100% Fixed Rate, Zero Bargaining needed)",
    fakePriceWarning: "⚠️ Private commission shops charge 3x-4x margin using tourist driver touts.",
    liveDemo: "Weekly master artisan demonstrations at Central Atrium."
  },
  {
    id: "kashmir-pashmina",
    city: "Srinagar",
    state: "Jammu & Kashmir",
    name: "Kashmir Arts Cooperative Society",
    item: "100% Pure Hand-spun Pashmina & Kani Shawls",
    type: "Verified Artisan Co-operative Cluster",
    address: "Old Heritage City, Downtown Srinagar",
    distance: "3.2 km",
    verified: true,
    middlemanBypassed: true,
    govtAssurance: "Craft Development Institute (CDI) GI-Registered",
    authenticPriceRange: "₹9,500 – ₹35,000 (Pure Changthangi Goat Wool)",
    fakePriceWarning: "⚠️ Fake Acrylic/Viscose blend shawls sold at ₹800 – ₹2,000 (Fails the burn & ring test).",
    liveDemo: "Microscopic fiber purity test and spinning wheel demo."
  },
  {
    id: "chennai-kanchi",
    city: "Chennai",
    state: "Tamil Nadu",
    name: "Kanchipuram Silk Weavers Co-operative",
    item: "GI-Tagged Temple Border Kanchipuram Silk",
    type: "Weaver Co-operative Cluster",
    address: "Gandhi Road / Kanchipuram Belt, Tamil Nadu",
    distance: "—",
    verified: true,
    middlemanBypassed: true,
    govtAssurance: "Co-optex Tamil Nadu Government Verified",
    authenticPriceRange: "₹7,000 – ₹55,000 (Pure Mulberry Silk & Gold/Silver Zari)",
    fakePriceWarning: "⚠️ Art-silk / Synthetic powerloom copies sold at ₹1,200 – ₹2,500.",
    liveDemo: "Three-shuttle interlocking weave (Korvai technique) demonstration."
  }
];

export const craftTrails = [
  {
    id: "jaipur-craft-trail",
    city: "Jaipur",
    title: "Sanganer Block Print & Blue Pottery Trail",
    duration: "90 mins · 3 artisan stops · 1.2 km walking",
    highlight: "Walk right into block-carving and natural dye workshops.",
    steps: [
      { step: "1", name: "Traditional Block Carvers Alley", desc: "Watch wooden blocks carved with teak wood tools (20 mins)" },
      { step: "2", name: "Natural Vegetable Dye Station", desc: "Live fabric dipping in indigo and turmeric vats (30 mins)" },
      { step: "3", name: "Kot Jewar Master Potter Studio", desc: "Hands-on blue pottery wheel throwing and glazing (40 mins)" }
    ]
  },
  {
    id: "varanasi-loom-trail",
    city: "Varanasi",
    title: "Madanpura Heritage Handloom Weavers Trail",
    duration: "75 mins · 3 stops · Safe heritage alleyways",
    highlight: "Sound of hand-operated shuttle looms echoing through heritage alleys.",
    steps: [
      { step: "1", name: "Silk Thread Spinning & Dye House", desc: "Raw mulberry silk skeins being dyed in natural colors (20 mins)" },
      { step: "2", name: "Naksha Punch-Card Designer House", desc: "Traditional graph design creation for sarees (25 mins)" },
      { step: "3", name: "Master Bunkar Pit-Loom Studio", desc: "Live intricate saree border weaving with pure zari (30 mins)" }
    ]
  }
];

export const shippingRadar = [
  {
    provider: "India Post International EMS (Speed Post)",
    type: "Official Government Postal Service",
    loc: "Main GPO Counters (Available in every major city)",
    bestFor: "Fragile pottery, handicrafts, sarees & souvenirs",
    rates: "₹850 - ₹1,400 per kg (Global tracking + customs clearance support)",
    packingService: "Custom wooden-crate & bubble packaging counters on-site"
  },
  {
    provider: "DHL / FedEx Authorized Art & Export Counter",
    type: "Express Air Freight & Doorstep Delivery",
    loc: "Major Airport Logistics & City Commercial Hubs",
    bestFor: "Heavy carpets, wooden furniture, metal brass statues",
    rates: "₹2,200 - ₹3,800 per kg (3-5 day expedited international delivery)",
    packingService: "Industrial anti-shock crating & full marine transit insurance"
  }
];

// --- 12. Transit Hubs & Micro-Itineraries ---
export const transitStartingPoints = [
  { id: "NDLS", name: "New Delhi Railway Station (NDLS)", type: "Station" },
  { id: "DEL-T3", name: "IGI Airport Terminal 3 (DEL)", type: "Airport" },
  { id: "CP", name: "Connaught Place (Central Hub)", type: "City Center" },
  { id: "JP-RLY", name: "Jaipur Junction Railway Station", type: "Station" }
];

export const microItineraryData = {
  triad: {
    2: {
      title: "2-Hour Quick Triad Loop",
      effectiveTime: "1 hr 20 min (+ 40 min return safety buffer)",
      weatherAdvice: "☀️ High Noon: Air-conditioned and shaded stops prioritized.",
      stops: [
        {
          id: "t2-1",
          type: "Primary Landmark",
          name: "Agrasen ki Baoli (Heritage Stepwell)",
          timeSpent: "35 mins",
          queueTime: "0-5 min queue",
          openStatus: "🟢 Open (Closes 6:00 PM)",
          climateTag: "Shaded cool stone depths",
          transitToNext: "🚶 Walk 400m to Janpath / ₹30 E-rickshaw (5 mins)",
          legFare: "₹30 – ₹40"
        },
        {
          id: "t2-2",
          type: "Iconic Culinary Spot",
          name: "Depaul's Janpath",
          timeSpent: "20 mins",
          queueTime: "Quick counter pickup",
          openStatus: "🟢 Open",
          climateTag: "Chilled Hazelnut Cold Coffee & Paneer Roll",
          transitToNext: "🚶 Walk 2 mins into CCIE building",
          legFare: "₹0 (Walking)"
        },
        {
          id: "t2-3",
          type: "Authentic GI Souvenir",
          name: "Central Cottage Industries Emporium",
          timeSpent: "25 mins",
          queueTime: "Fast billing counter",
          openStatus: "🟢 Open (Air Conditioned)",
          climateTag: "100% Indoor AC browsing",
          transitToNext: "🚕 Return: Yellow Line Metro / 10-min Cab to Station",
          legFare: "₹50 Metro / ₹120 Auto"
        }
      ]
    },
    4: {
      title: "4-Hour Heritage & Food Triad",
      effectiveTime: "3 hrs (+ 1 hr return & boarding buffer)",
      weatherAdvice: "🌤️ Moderate: Optimized linear straight-line route.",
      stops: [
        {
          id: "t4-1",
          type: "Primary Landmark",
          name: "Humayun's Tomb (UNESCO Heritage)",
          timeSpent: "65 mins",
          queueTime: "10 min queue (Online QR available)",
          openStatus: "🟢 Open till Sunset",
          climateTag: "Open garden monuments & shaded corridors",
          transitToNext: "🛺 Auto via Mathura Road to Jama Masjid (15 mins)",
          legFare: "₹90 – ₹110"
        },
        {
          id: "t4-2",
          type: "Iconic Culinary Spot",
          name: "Karim's / Pt. Gaya Prasad Paratha",
          timeSpent: "45 mins",
          queueTime: "15 min peak rush table wait",
          openStatus: "🟢 Fresh Batch Active",
          climateTag: "Indoor heritage dining",
          transitToNext: "🚶 8-min walk through Dariba Kalan to Dilli Haat / Red Fort craft stalls",
          legFare: "₹0 (Walking)"
        },
        {
          id: "t4-3",
          type: "Authentic GI Souvenir",
          name: "Dariba Kalan Silver & Ittar Market",
          timeSpent: "40 mins",
          queueTime: "Open street browsing",
          openStatus: "🟢 Verified Artisan Lane",
          climateTag: "Shaded traditional bazaar",
          transitToNext: "🚇 Violet/Yellow Metro line directly to Airport Express / Station",
          legFare: "₹60 Metro"
        }
      ]
    },
    6: {
      title: "6-Hour Comprehensive City Triad",
      effectiveTime: "4.5 hrs (+ 1.5 hr heavy traffic safety buffer)",
      weatherAdvice: "🌤️ Full Explorer: Includes museum & artisan center.",
      stops: [
        {
          id: "t6-1",
          type: "Primary Landmark",
          name: "Red Fort Complex & Museum",
          timeSpent: "100 mins",
          queueTime: "15 min security scan queue",
          openStatus: "🟢 Open (Closed on Mondays)",
          climateTag: "Mixed outdoor lawns and indoor AC galleries",
          transitToNext: "🛺 Battery E-rickshaw to Chandni Chowk (8 mins)",
          legFare: "₹40"
        },
        {
          id: "t6-2",
          type: "Iconic Culinary Spot",
          name: "Old Famous Jalebi Wala & Chaat Corner",
          timeSpent: "45 mins",
          queueTime: "5 min live frying wait",
          openStatus: "🟢 Hot Batch Ready",
          climateTag: "Heritage street-food tasting",
          transitToNext: "🚇 Yellow Line Metro from Chandni Chowk to INA (22 mins)",
          legFare: "₹40 Metro"
        },
        {
          id: "t6-3",
          type: "Authentic GI Souvenir",
          name: "Dilli Haat Crafts & Weaver Stalls",
          timeSpent: "75 mins",
          queueTime: "Quick ticket booth",
          openStatus: "🟢 Verified State GI Pavilions",
          climateTag: "Open-air cultural village with shaded huts",
          transitToNext: "🚖 Pre-paid taxi / Airport Express line for flight/train",
          legFare: "₹180 Cab / ₹60 Metro"
        }
      ]
    }
  },
  foodie: {
    3: {
      title: "The Express Foodie Walk (3-Hour Layover)",
      effectiveTime: "2 hrs 15 mins (+ 45 min buffer)",
      weatherAdvice: "🍲 Best experienced in morning (8-11 AM) or evening (5-8 PM).",
      stops: [
        {
          id: "f3-1",
          type: "Iconic Breakfast",
          name: "Shyam Sweets (Bedmi Poori & Nagori Halwa)",
          timeSpent: "35 mins",
          queueTime: "10 min token wait",
          openStatus: "🟢 Fresh Morning Batch",
          climateTag: "Crispy fenugreek-spiced lentil pooris",
          transitToNext: "🚶 5-min walk down Kinari Bazaar",
          legFare: "₹0"
        },
        {
          id: "f3-2",
          type: "Heritage Street Bite",
          name: "Natraj Dahi Bhalla Corner",
          timeSpent: "20 mins",
          queueTime: "Fast moving counter",
          openStatus: "🟢 Open",
          climateTag: "Chilled yogurt dumplings & tamarind dip",
          transitToNext: "🚶 3-min walk towards Jama Masjid gate",
          legFare: "₹0"
        },
        {
          id: "f3-3",
          type: "Signature Mughlai Wrap",
          name: "Qureshi Kebab Corner",
          timeSpent: "30 mins",
          queueTime: "8 min live charcoal grill wait",
          openStatus: "🟢 Open",
          climateTag: "Hot juicy seekh kebabs on roomali roti",
          transitToNext: "🚇 Direct Metro connection to Terminal/Station",
          legFare: "₹50"
        }
      ]
    }
  },
  craft: {
    2: {
      title: "The Artisan & Craft Hunt (2-Hour Quick Tour)",
      effectiveTime: "1 hr 30 mins (+ 30 min buffer)",
      weatherAdvice: "🧵 100% Fixed-Price government co-operatives.",
      stops: [
        {
          id: "c2-1",
          type: "Government Emporium",
          name: "State Handloom Bhavans (Janpath Row)",
          timeSpent: "40 mins",
          queueTime: "No lines",
          openStatus: "🟢 Open (10 AM - 7 PM)",
          climateTag: "Indoor air-conditioned showroom",
          transitToNext: "🚶 Walk 200m across the street",
          legFare: "₹0"
        },
        {
          id: "c2-2",
          type: "Master Weaver Center",
          name: "Bunkar Vikas Kendra Gallery",
          timeSpent: "35 mins",
          queueTime: "Open demo room",
          openStatus: "🟢 Live Looms Active",
          climateTag: "Direct weaver interaction & Silk Mark check",
          transitToNext: "🚖 10-min return ride to Hub",
          legFare: "₹80 Auto"
        }
      ]
    }
  }
};

// --- 13. Smart Transit, Bargain & Anti-Scam Data ---
export const rateCards = {
  auto: { base: 18, privateMarkup: 1.5 },
  taxi: { base: 24, privateMarkup: 1.8 },
  ecab: { base: 22, privateMarkup: 1.2 }
};

export const bargainCategories = [
  { item: "Handmade Leather Mojari/Bags", quoted: "₹1200 - ₹2000", fair: "₹400 - ₹600", rule: "Offer 30% to 40% of their first quote." },
  { item: "Unbranded Souvenirs & Magnets", quoted: "₹300 - ₹500", fair: "₹100 - ₹150", rule: "Offer 30% of the quote." },
  { item: "Pashmina (Street Vendors)", quoted: "₹2000+", fair: "₹0 (Fake)", rule: "Never buy Pashmina on the street. Use GI-Radar." }
];

export const scamPlaybook = [
  { title: "The 'Monument is Closed' Scam", desc: "Drivers claim the main gate is closed for prayers/lunch to divert you to a commission-based shop.", redFlag: "Taking unexpected detours." },
  { title: "Fake Gemstone Export Scam", desc: "Agents promise huge returns on shipping gems abroad. You pay upfront, they disappear.", redFlag: "Too good to be true investment pitches." },
  { title: "Forced Tilak/Prasad Scam", desc: "Someone forcefully applies a dot on your forehead at a temple and demands a huge 'donation' (Dakshina).", redFlag: "Unsolicited physical contact." }
];

export const driverTranslationCards = [
  { intent: "meter", text: "भैया, मीटर से चलिए या ₹[FARE] लीजिए जो उचित सरकारी दर है।" },
  { intent: "no-detour", text: "भैया, सीधे गंतव्य पर चलिए। किसी दुकान या बाज़ार में रुकने की आवश्यकता नहीं है।" }
];

// --- 14. Language & Translation Matrix ---
export const translationLanguages = [
  "English", "Spanish", "French", "German", "Japanese", "Russian",
  "Hindi (हिंदी)", "Tamil (தமிழ்)", "Telugu (తెలుగు)", "Bengali (বাংলা)", "Marathi (मराठी)"
];

export const categorizedPhrases = {
  transport: [
    { text: "Please go by the meter.", hi: "मीटर से चलिए।" },
    { text: "Go straight.", hi: "सीधे चलिए।" },
    { text: "How far is the station?", hi: "स्टेशन कितनी दूर है?" }
  ],
  food: [
    { text: "Please make it less spicy.", hi: "कम तीखा बनाइए।" },
    { text: "Is this pure vegetarian?", hi: "शुद्ध शाकाहारी खाना है?" },
    { text: "Is the water bottle sealed?", hi: "पानी बोतल सीलबंद है?" }
  ],
  emergency: [
    { text: "I need a doctor immediately.", hi: "मुझे डॉक्टर की जरूरत है।" },
    { text: "Where is the nearest police station?", hi: "नजदीकी पुलिस स्टेशन कहां है?" }
  ]
};

export const commonPhrases = [
  "Where is the nearest station?",
  "How much does this cost?",
  "I need a doctor",
  "Please call the police"
];