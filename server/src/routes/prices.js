/* 
 * Project: PetroFlex
 * File: server/src/routes/prices.js
 * Setup: REST endpoints for live fuel pricing. Emits WebSocket updates on change.
 */
const express = require('express');
const router = express.Router();
const FuelPrice = require('../models/FuelPrice');

router.get('/', async (req, res) => {
  const { region } = req.query;
  try {
    const prices = await FuelPrice.find(region ? { region } : {}).sort({ updatedAt: -1 });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const price = new FuelPrice(req.body);
    await price.save();
    // Emit live update via socket.io (attached to app later)
    if (global.io) global.io.emit('price-update', price);
    res.status(201).json(price);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
