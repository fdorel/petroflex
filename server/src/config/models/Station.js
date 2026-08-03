/* 
 * Project: PetroFlex
 * File: server/src/models/Station.js
 * Setup: Geographic data for stations & depots. Coordinates used for map rendering.
 */
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: { lat: Number, lng: Number, required: true },
  type: { type: String, enum: ['station', 'depot'], default: 'station' },
  contact: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Station', stationSchema);
