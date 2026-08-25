const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, async (req, res) => {
    const itineraries = await Itinerary.find({ user: req.user._id });
    res.json(itineraries);
  })
  .post(protect, async (req, res) => {
    const { title, city, days, totalEstimatedCost } = req.body;
    const itinerary = new Itinerary({
      user: req.user._id,
      title,
      city,
      days,
      totalEstimatedCost
    });
    const saved = await itinerary.save();
    res.status(201).json(saved);
  });

router.delete('/:id', protect, async (req, res) => {
  await Itinerary.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Itinerary removed' });
});

module.exports = router;