import { Card } from '../components/ui/card';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BudgetComparisonChart } from '../components/BudgetComparisonChart';
import SpendingInsights from '../components/SpendingInsights';
import { CategoryBudgetsForm } from '../components/CategoryBudgetsForm';
import { Transaction } from '../App';
import { getCategoryBudgets, setCategoryBudgets } from '../lib/budget';
import toast from 'react-hot-toast';

interface BudgetTrackerProps {
  transactions: Transaction[];
}

const defaultBudgets: Record<string, number> = {
  Food: 200,
  Transport: 100,
  Rent: 600,
  Shopping: 150,
  Health: 100,
  Entertainment: 100,
  Other: 50,
};

export function BudgetTracker({ transactions }: BudgetTrackerProps) {
  const [categoryBudgets, setCategoryBudgetsState] = useState<Record<string, number>>(defaultBudgets);
  const [loading, setLoading] = useState(true);

  // 🔄 Load budgets from backend
  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const saved = await getCategoryBudgets();
        if (saved && Object.keys(saved).length > 0) {
          setCategoryBudgetsState(saved);
        } else {
          // Optionally: Save default if none exists
          await setCategoryBudgets(defaultBudgets);
        }
      } catch (err) {
        toast.error("❌ Failed to load budgets");
      } finally {
        setLoading(false);
      }
    };

    loadBudgets();
  }, []);

  // 💾 Save on changes
  const handleBudgetChange = async (newBudgets: Record<string, number>) => {
    setCategoryBudgetsState(newBudgets);
    try {
      await setCategoryBudgets(newBudgets);
      toast.success("✅ Budget saved!");
    } catch (err) {
      toast.error("❌ Failed to save budgets");
    }
  };

  const actualSpending = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  if (loading) return <p className="text-white text-center mt-10">Loading budgets...</p>;

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
            className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-400 bg-clip-text text-transparent mb-2"
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
                setCategoryBudgets={handleBudgetChange}
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
