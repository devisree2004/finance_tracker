const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*', // Or set your frontend origin here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ Mongo Error:', err));

const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware'); // ✅

app.use('/api/auth', authRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes); // ✅ protected
const budgetRoutes = require('./routes/budget');
app.use('/api/budget', budgetRoutes);


app.get('/', (req, res) => {
  res.send('🚀 Finance Tracker Backend is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
