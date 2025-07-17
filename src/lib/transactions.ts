export const getTransactions = async () => {
  const token = localStorage.getItem('token');
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
  const token = localStorage.getItem('token');
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
