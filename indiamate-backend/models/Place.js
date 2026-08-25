const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['food', 'crafts', 'medical', 'attraction'], 
    required: true 
  },
  description: String,
  address: String,
  city: String,
  rating: { type: Number, default: 4.5 },
  priceEstimate: String,
  contactNumber: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  tags: [String]
});

placeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', placeSchema);