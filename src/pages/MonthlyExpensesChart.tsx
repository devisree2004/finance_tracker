import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { format, parse } from 'date-fns';
import { TrendingUp } from 'lucide-react';
import type { Transaction } from '../App';

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
}

export function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const monthlyData = useMemo(() => {
    const totals: Record<string, number> = {};

    for (const tx of transactions) {
      const month = format(tx.date, 'MMM yyyy');
      totals[month] = (totals[month] || 0) + tx.amount;
    }

    return Object.entries(totals)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => {
        const dateA = parse(a.month, 'MMM yyyy', new Date());
        const dateB = parse(b.month, 'MMM yyyy', new Date());
        return dateA.getTime() - dateB.getTime();
      });
  }, [transactions]);

  if (monthlyData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-[300px] items-center justify-center"
      >
        <div className="text-center">
          <TrendingUp className="h-12 w-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/60">No expense data to display</p>
          <p className="text-white/40 text-sm">Add some transactions to see trends</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
              color: 'white'
            }}
            formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Amount']}
            labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8b5cf6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}