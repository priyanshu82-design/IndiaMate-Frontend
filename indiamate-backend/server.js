const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json());


connectDB();



// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/itineraries', require('./routes/itineraryRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/translate', require('./routes/translateRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));