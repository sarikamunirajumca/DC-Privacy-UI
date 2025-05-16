const mongoose = require('mongoose');

const UserRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  name: String,
  state: String,
  requestFor: String, // myself or someone_else
  requestType: [String], // array of request types (e.g., ['requestInfo', 'deleteInfo'])
  createdAt: { type: Date, default: Date.now },
  requestId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('UserRequest', UserRequestSchema);