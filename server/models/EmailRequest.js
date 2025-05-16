// This file is being renamed to EmailRequest.js to fix case sensitivity issues.
// Please use 'EmailRequest.js' (capital R) for all imports.

const mongoose = require('mongoose');

const EmailRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailRequest', EmailRequestSchema);
