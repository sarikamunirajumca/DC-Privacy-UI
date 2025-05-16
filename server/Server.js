const express = require('express');
const mongoose = require('mongoose');
const Request = require("./models/Request");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection with Enhanced Error Handling
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/privacyPortal", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);  // Exit if the database connection fails
});

// Route to Create a New Request
app.post('/api/request', async (req, res) => {
  try {
    const { name, email, requestType } = req.body;
    
    // Input Validation
    if (!name || !email || !requestType) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Create a new request in the database
    const newRequest = new Request({ name, email, requestType });
    await newRequest.save();

    console.log("✅ New request saved:", newRequest);
    res.status(201).json({ message: "Request created successfully", data: newRequest });
  } catch (err) {
    console.error("❌ Error in /api/request:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register OTP Routes
const otpRoutes = require('./Routes/Otp');
app.use('/api', otpRoutes);


app.get('/check', (req, res) => {
  res.send('API is running');
});
// Handling Invalid Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


// Starting the Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
