const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API routes (must be before the catch-all)
// const emailRoutes = require('./Routes/Email');
// app.use('/api/email', emailRoutes);

// const otpRoutes = require('./Routes/Otp');
// app.use('/api', otpRoutes);

// Default route
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// Serve static files from the React build folder
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// The catch-all handler: for any request that doesn't match an API route, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));