const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const samplePlaces = [
  {
    name: "Chandni Chowk Food Street",
    category: "food",
    description: "Famous for Parathas, Jalebi, and street chaat.",
    address: "Old Delhi",
    city: "Delhi",
    rating: 4.8,
    priceEstimate: "₹200 - ₹500",
    location: { type: "Point", coordinates: [77.2300, 28.6506] },
    tags: ["street-food", "vegetarian"]
  },
  {
    name: "Dilli Haat Crafts Market",
    category: "crafts",
    description: "Traditional handicrafts, handlooms, and souvenirs from all Indian states.",
    address: "INA, New Delhi",
    city: "Delhi",
    rating: 4.6,
    priceEstimate: "₹300 - ₹2000",
    location: { type: "Point", coordinates: [77.2075, 28.5733] },
    tags: ["handicraft", "shopping"]
  },
  {
    name: "AIIMS Hospital Emergency",
    category: "medical",
    description: "24/7 Apex Trauma and Emergency Medical Center.",
    address: "Ansari Nagar, New Delhi",
    city: "Delhi",
    contactNumber: "+91-11-26588500",
    location: { type: "Point", coordinates: [77.2100, 28.5672] },
    tags: ["hospital", "emergency"]
  },
  {
    name: "Red Fort (Lal Qila)",
    category: "attraction",
    description: "Historic Mughal fortress built in red sandstone.",
    address: "Netaji Subhash Marg, Lal Qila",
    city: "Delhi",
    rating: 4.7,
    location: { type: "Point", coordinates: [77.2410, 28.6562] },
    tags: ["monument", "history"]
  }
];

const seedData = async () => {
  try {
    await Place.deleteMany();
    await Place.insertMany(samplePlaces);
    console.log("Database seeded successfully with initial places!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();