const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

// 📝 Create a transaction for logged-in user
router.post('/', authMiddleware, async (req, res) => {
  const { type, category, amount, description, date } = req.body;

  try {
    const transaction = new Transaction({
      userId: req.user.id, // 🎯 user ID from token
      type,
      category,
      amount,
      description,
      date,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

// 📥 Get all transactions for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// ✏️ Update a transaction
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Transaction not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// 🗑️ Delete a transaction
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Transaction.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deleted) return res.status(404).json({ message: 'Transaction not found' });

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

module.exports = router;
