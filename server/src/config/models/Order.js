/* 
 * Project: PetroFlex
 * File: server/src/models/Order.js
 * Setup: Bulk commercial orders with delivery tracking status.
 */
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ fuelType: String, quantity: Number }],
  status: { type: String, enum: ['pending', 'dispatched', 'in_transit', 'delivered'], default: 'pending' },
  deliveryTracking: { lat: Number, lng: Number, lastUpdate: Date },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
