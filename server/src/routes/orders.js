/* 
 * Project: PetroFlex
 * File: server/src/routes/orders.js
 * Setup: Bulk order placement & fleet tracking simulation.
 */
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const orderId = `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const order = new Order({ ...req.body, orderId });
    await order.save();
    if (global.io) global.io.emit('order-update', order);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/tracking/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
