/* 
 * Project: PetroFlex
 * File: server/src/models/FuelCard.js
 * Setup: Corporate fuel cards with AES-256-GCM encrypted tokens.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.AES_SECRET || 'pdp-aes-secret-key-32bytes!!'; // 32 bytes for AES-256

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), content: encrypted };
}

function decrypt({ iv, content }) {
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const fuelCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardNumber: { type: String, unique: true, required: true },
  balance: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'frozen'], default: 'active' },
  encryptedToken: { iv: String, content: String }
}, { timestamps: true });

fuelCardSchema.methods.encryptBalance = function(newBalance) {
  const tokenData = encrypt(String(newBalance));
  this.encryptedToken = tokenData;
};

fuelCardSchema.methods.getDecryptedBalance = function() {
  return decrypt(this.encryptedToken);
};

module.exports = mongoose.model('FuelCard', fuelCardSchema);
