const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { text, sourceLang = 'en', targetLang = 'hi' } = req.body;
  try {
    // Quick, free translation proxy using public translation engine
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const translatedText = response.data[0].map(item => item[0]).join('');
    res.json({ original: text, translated: translatedText, targetLang });
  } catch (error) {
    res.status(500).json({ message: 'Translation service unavailable' });
  }
});

module.exports = router;