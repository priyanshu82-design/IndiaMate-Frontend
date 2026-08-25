const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  city: { type: String, required: true },
  days: [{
    dayNumber: Number,
    activities: [{
      time: String,
      placeName: String,
      costEstimate: Number,
      notes: String
    }]
  }],
  totalEstimatedCost: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);