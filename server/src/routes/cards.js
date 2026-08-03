/* 
 * Project: PetroFlex
 * File: server/src/routes/cards.js
 * Setup: Corporate fuel card management with AES encryption & freeze logic.
 */
const express = require('express');
const router = express.Router();
const FuelCard = require('../models/FuelCard');

router.get('/:id', async (req, res) => {
  try {
    const card = await FuelCard.findById(req.params.id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json({ ...card.toObject(), decryptedBalance: card.getDecryptedBalance() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/freeze/:id', async (req, res) => {
  try {
    const card = await FuelCard.findByIdAndUpdate(req.params.id, { status: 'frozen' }, { new: true });
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
