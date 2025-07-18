// src/categories.ts

// 🧾 Expense Categories
export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Rent'
  | 'Shopping'
  | 'Health'
  | 'Entertainment'
  | 'Other';

export const expenseCategories: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Rent',
  'Shopping',
  'Health',
  'Entertainment',
  'Other',
];

// 💰 Income Categories
export type IncomeCategory =
  | 'Salary'
  | 'Freelancing'
  | 'Investments'
  | 'Gifts'
  | 'Business'
  | 'Other';

export const incomeCategories: IncomeCategory[] = [
  'Salary',
  'Freelancing',
  'Investments',
  'Gifts',
  'Business',
  'Other',
];

// 🎨 Combined type for general use if needed
export type Category = ExpenseCategory | IncomeCategory;

// 🌈 Colors
export const categoryColors: Record<ExpenseCategory | IncomeCategory, string> = {
  // Expense Colors
  Food: '#ef4444',
  Transport: '#3b82f6',
  Rent: '#8b5cf6',
  Shopping: '#f59e0b',
  Health: '#10b981',
  Entertainment: '#ec4899',
  // Income Colors
  Salary: '#22c55e',
  Freelancing: '#06b6d4',
  Investments: '#0ea5e9',
  Gifts: '#a855f7',
  Business: '#eab308',
  // Shared
  Other: '#6b7280',
};

// 🎭 Icons
export const categoryIcons: Record<ExpenseCategory | IncomeCategory, string> = {
  // Expense Icons
  Food: '🍽️',
  Transport: '🚗',
  Rent: '🏠',
  Shopping: '🛍️',
  Health: '⚕️',
  Entertainment: '🎬',
  // Income Icons
  Salary: '💼',
  Freelancing: '🧑‍💻',
  Investments: '📈',
  Gifts: '🎁',
  Business: '🏢',
  // Shared
  Other: '📝',
};
