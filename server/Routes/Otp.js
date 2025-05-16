const express = require('express');
const router = express.Router();
const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const UserRequest = require('../models/UserRequest');

// Generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = generateOtp();
  try {
    await Otp.deleteMany({ email }); // Remove previous OTPs for this email
    await new Otp({ email, otp }).save();

    // Configure nodemailer (use your SMTP credentials)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    });

    res.json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP', error: err });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

  try {
    const record = await Otp.findOne({ email, otp });
    if (!record) return res.json({ success: false });
    // Mark as verified instead of deleting
    record.verified = true;
    await record.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed', error: err });
  }
});

// Store user data after OTP verification
router.post('/store-user', async (req, res) => {
  const { email, name, additionalData } = req.body;
  if (!email || !name) return res.status(400).json({ message: 'Email and name are required' });

  try {
    // Check if OTP is verified for this email
    const otpRecord = await Otp.findOne({ email, verified: true });
    if (!otpRecord) return res.status(403).json({ message: 'Email not verified' });

    // Save user data (you can expand this as needed)
    const User = require('../models/EmailRequest');
    const saved = await new User({ email, name, ...additionalData }).save();
    res.status(201).json({ message: 'User data saved', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save user data', error: err });
  }
});

// Store user request after all steps
router.post('/store-user-request', async (req, res) => {
  const { email, name, state, requestFor, requestType } = req.body;
  if (!email || !state || !requestFor || !requestType) return res.status(400).json({ message: 'Missing required fields' });

  try {
    // Check if email is verified
    const otpRecord = await Otp.findOne({ email, verified: true });
    if (!otpRecord) return res.status(403).json({ message: 'Email not verified' });

    // Generate unique 8-digit requestId starting with year
    const year = new Date().getFullYear().toString().slice(-2); // e.g., '25'
    const random = Math.floor(100000 + Math.random() * 900000); // 6 random digits
    const requestId = `${year}${random}`; // e.g., '25123456'

    // Save user request
    const saved = await new UserRequest({
      email,
      emailVerified: true,
      name,
      state,
      requestFor,
      requestType,
      requestId
    }).save();
    res.status(201).json({ message: 'User request saved', requestId, data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save user request', error: err });
  }
});

module.exports = router;
