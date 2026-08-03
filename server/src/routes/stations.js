/* 
 * Project: PetroFlex
 * File: server/src/routes/stations.js
 * Setup: Returns station/depot locations for map rendering.
 */
const express = require('express');
const router = express.Router();
const Station = require('../models/Station');

router.get('/', async (req, res) => {
  try {
    const stations = await Station.find().select('-__v');
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
