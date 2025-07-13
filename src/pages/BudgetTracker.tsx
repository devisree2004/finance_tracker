import { Card } from '../components/ui/card';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BudgetComparisonChart } from '../components/BudgetComparisonChart';
import SpendingInsights from '../components/SpendingInsights';
import { CategoryBudgetsForm } from '../components/CategoryBudgetsForm';
import { Transaction } from '../App';

interface BudgetTrackerProps {
  transactions: Transaction[];
}

export function BudgetTracker({ transactions }: BudgetTrackerProps) {
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, number>>({
    Food: 200,
    Transport: 100,
    Rent: 600,
    Shopping: 150,
    Health: 100,
    Entertainment: 100,
    Other: 50,
  });

  const actualSpending = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (acc[category]) {
      acc[category] += transaction.amount;
    } else {
      acc[category] = transaction.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r  from-emerald-600 to-blue-400 bg-clip-text text-transparent mb-2"
          >
            Budget Tracker
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/70 text-lg"
          >
            Monitor your spending and stay within budget
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-500">
              <h2 className="mb-6 text-2xl font-semibold text-white flex items-center gap-2">
                💰 Set Category Budgets
              </h2>
              <CategoryBudgetsForm
                categoryBudgets={categoryBudgets}
                setCategoryBudgets={setCategoryBudgets}
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-500">
              <h2 className="mb-6 text-2xl font-semibold text-white flex items-center gap-2">
                📊 Budget vs Actual
              </h2>
              <BudgetComparisonChart
                categoryBudgets={categoryBudgets}
                actualSpending={actualSpending}  
              />
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-500">
            <h2 className="mb-6 text-2xl font-semibold text-white flex items-center gap-2">
              🔍 Spending Insights
            </h2>
            <SpendingInsights
              categoryBudgets={categoryBudgets}
              actualSpending={actualSpending}  
            />
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}