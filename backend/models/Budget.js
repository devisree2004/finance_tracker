// models/Budget.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, unique: true },
  categoryBudgets: { type: Object, default: {} },
});

module.exports = mongoose.model('Budget', budgetSchema);
