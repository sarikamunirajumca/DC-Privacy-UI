const express = require('express');
const router = express.Router();
const EmailRequest = require('../models/EmailRequest');

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const saved = await new EmailRequest({ email }).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
