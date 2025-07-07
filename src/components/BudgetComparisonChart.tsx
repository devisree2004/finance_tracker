import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-[400px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="category" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
              color: 'white'
            }}
          />
          <Legend 
            wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }}
          />
          <Bar 
            dataKey="budget" 
            fill="url(#budgetGradient)" 
            name="Budget" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="actual" 
            fill="url(#actualGradient)" 
            name="Actual Spending" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}