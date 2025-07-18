// src/lib/budget.ts
export async function getCategoryBudgets() {
  const res = await fetch('http://localhost:5000/api/budget', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch budgets', await res.text());
    throw new Error('Failed to fetch budgets');
  }

  const data = await res.json();
  return data.categoryBudgets;
}

export async function setCategoryBudgets(categoryBudgets: Record<string, number>) {
  const res = await fetch('http://localhost:5000/api/budget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ categoryBudgets }),
  });

  if (!res.ok) {
    console.error('Failed to save budgets', await res.text());
    throw new Error('Failed to save budgets');
  }

  const data = await res.json();
  return data.categoryBudgets;
}
