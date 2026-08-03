/* 
 * Project: PetroFlex
 * File: server/src/models/FuelPrice.js
 * Setup: Stores live regional pricing. Updated via admin or automated feed.
 */
const mongoose = require('mongoose');

const fuelPriceSchema = new mongoose.Schema({
  region: { type: String, required: true },
  fuelType: { type: String, enum: ['91', '95', 'Diesel', 'LPG'], required: true },
  pricePerLiter: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('FuelPrice', fuelPriceSchema);
