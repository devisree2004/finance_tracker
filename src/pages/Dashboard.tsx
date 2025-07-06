import { useEffect, useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../ui/card';
import { Transaction } from '../App';
import { format } from 'date-fns';
import { fetchTransactions } from '../lib/api'; // ✅ use your custom backend

const COLORS = [
  '#dc143c',
  '#1abc9c',
  '#f39c12',
  '#8e44ad',
  '#e74c3c',
  '#3498db',
  '#2ecc71',
];

function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(
          data.map((tx) => ({
            ...tx,
            date: new Date(tx.date),
          }))
        );
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    load();
  }, []);

  const total = useMemo(
    () => transactions.reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

  const breakdown = useMemo(() => {
    const map = new Map<string, number>();
    transactions.forEach((tx) => {
      map.set(tx.category, (map.get(tx.category) || 0) + tx.amount);
    });
    return Array.from(map.entries()).map(([category, value]) => ({
      name: category,
      value,
    }));
  }, [transactions]);

  const mostRecent = useMemo(() => {
    return [...transactions].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    )[0];
  }, [transactions]);

  return (
    <div className="grid gap-6 md:grid-cols-2 mt-10 p-4">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p className="text-lg">Total Expenses: ₹{total.toFixed(2)}</p>
        <p className="text-lg">
          Top Category:{' '}
          {breakdown.length > 0 ? breakdown[0].name : 'N/A'} (₹
          {breakdown.length > 0 ? breakdown[0].value.toFixed(2) : '0'})
        </p>
        {mostRecent && (
          <div className="mt-4">
            <h3 className="font-semibold">Most Recent Transaction</h3>
            <p>{mostRecent.description}</p>
            <p>₹{mostRecent.amount.toFixed(2)}</p>
            <p>{format(mostRecent.date, 'PPP')}</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Category-wise Expenses</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={breakdown}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {breakdown.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

export default Dashboard;
