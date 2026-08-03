/* 
 * Project: PetroFlex
 * File: server/src/models/Inventory.js
 * Setup: Tracks tank levels per station. Triggers alerts when < 20%.
 */
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  tankLevel: { type: Number, min: 0, max: 100, required: true }, // Percentage
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
