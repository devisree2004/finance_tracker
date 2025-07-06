const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// POST new transaction
router.post('/', async (req, res) => {
  console.log("📥 Request received to /api/transactions"); // Add this

  try {
    console.log("📦 Body:", req.body); // Add this

    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.json({ message: 'Transaction saved!' });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: 'Failed to save transaction' });
  }
});



module.exports = router;
