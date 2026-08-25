const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// Get places by category and/or location
router.get('/', async (req, res) => {
  try {
    const { category, city, lat, lng, maxDistance = 10000 } = req.query;
    let query = {};

    if (category && category !== 'all') query.category = category;
    if (city) query.city = new RegExp(city, 'i');

    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      };
    }

    const places = await Place.find(query);
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;