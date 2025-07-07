export type Category = 'Food' | 'Transport' | 'Rent' | 'Shopping' | 'Health' | 'Entertainment' | 'Other';

export const categories: Category[] = ['Food', 'Transport', 'Rent', 'Shopping', 'Health', 'Entertainment', 'Other'];

export const categoryColors: Record<Category, string> = {
  Food: '#ef4444',
  Transport: '#3b82f6',
  Rent: '#8b5cf6',
  Shopping: '#f59e0b',
  Health: '#10b981',
  Entertainment: '#ec4899',
  Other: '#6b7280',
};

export const categoryIcons: Record<Category, string> = {
  Food: '🍽️',
  Transport: '🚗',
  Rent: '🏠',
  Shopping: '🛍️',
  Health: '⚕️',
  Entertainment: '🎬',
  Other: '📝',
};