// src/lib/transactions.ts

export const getTransactions = async () => {
  const token = sessionStorage.getItem('token'); // 🔄 Changed from localStorage

  const res = await fetch('http://localhost:5000/api/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return res.json();
};

export const addTransaction = async (transactionData: {
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  date: string;
}) => {
  const token = sessionStorage.getItem('token'); // 🔄 Changed from localStorage

  const res = await fetch('http://localhost:5000/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionData),
  });

  if (!res.ok) {
    throw new Error('Failed to create transaction');
  }

  return res.json();
};
export async function updateTransaction(id: string, data: any) {
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update transaction');
  return res.json();
};

export async function deleteTransaction(id: string) {
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete transaction');
  return res.json();
};

