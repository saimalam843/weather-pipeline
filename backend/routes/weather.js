const express = require('express');
const router = express.Router();
const { collectAndSave } = require('../services/weatherService');

// GET /api/weather?city=Islamabad
router.get('/', async (req, res) => {
  try {
    const city = req.query.city || 'Islamabad';
    const record = await collectAndSave(city);
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

module.exports = router;
