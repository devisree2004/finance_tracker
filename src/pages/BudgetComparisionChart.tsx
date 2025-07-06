import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BudgetComparisonChartProps {
  categoryBudgets: Record<string, number>;
  actualSpending: Record<string, number>;
}

export function BudgetComparisonChart({ categoryBudgets, actualSpending }: BudgetComparisonChartProps) {
  const data = Object.keys(categoryBudgets).map((category) => ({
    category,
    budget: categoryBudgets[category],
    actual: actualSpending[category] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
        <Bar dataKey="actual" fill="#8884d8" name="Actual Spending" />
      </BarChart>
    </ResponsiveContainer>
  );
}
