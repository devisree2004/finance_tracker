// routes/budget.js
const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/authMiddleware');

// GET: fetch user's budgets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user.id });
    res.json({ categoryBudgets: budget?.categoryBudgets || {} });
  } catch (err) {
    console.error("Error fetching budget:", err);
    res.status(500).json({ message: "Failed to load budget" });
  }
});

// POST: create/update budgets
router.post('/', authMiddleware, async (req, res) => {
  const { categoryBudgets } = req.body;

  try {
    let budget = await Budget.findOne({ user: req.user.id });
    if (budget) {
      budget.categoryBudgets = categoryBudgets;
    } else {
      budget = new Budget({ user: req.user.id, categoryBudgets });
    }
    await budget.save();
    res.json({ message: "Budget saved", categoryBudgets });
  } catch (err) {
    console.error("Error saving budget:", err);
    res.status(500).json({ message: "Failed to save budget" });
  }
});

module.exports = router;
