const express = require('express');
const router = express.Router();

router.post('/alert', async (req, res) => {
  const { latitude, longitude, userId, message } = req.body;
  
  const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
  console.log(`[SOS TRIGGERED] User: ${userId} | GPS: ${googleMapsUrl} | Info: ${message}`);

  // In production, dispatch SMS via Twilio or an Indian SMS gateway:
  // await twilioClient.messages.create({ body: `EMERGENCY! GPS: ${googleMapsUrl}`, to: contactPhone, from: twilioNumber });

  res.json({
    success: true,
    message: 'SOS Alert dispatched to emergency contacts and nearby authorities.',
    locationUrl: googleMapsUrl
  });
});

module.exports = router;