/* 
 * Project: PetroFlex
 * File: server/src/routes/inventory.js
 * Setup: Real-time tank levels. Emits alerts when < 20%.
 */
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

router.get('/', async (req, res) => {
  try {
    const inventories = await Inventory.find().populate('stationId', 'name address type').sort({ lastUpdated: -1 });
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { stationId, tankLevel } = req.body;
    let inv = await Inventory.findOne({ stationId });
    if (!inv) inv = new Inventory({ stationId, tankLevel });
    else inv.tankLevel = tankLevel;
    inv.lastUpdated = Date.now();
    await inv.save();

    // Emit low-level alert
    if (tankLevel < 20 && global.io) {
      global.io.emit('inventory-alert', { stationId, tankLevel, message: '⚠️ Low fuel level!' });
    }
    res.json(inv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
