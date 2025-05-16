const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  email: String,
  name: String,
  requestInfo: Boolean,
  correctInfo: Boolean,
  deleteInfo: Boolean,
  optOut: Boolean,
  limitSPI: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PrivacyRequest', requestSchema);
