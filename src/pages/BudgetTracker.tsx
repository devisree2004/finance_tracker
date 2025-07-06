import { Card } from '../ui/card';
import { useState } from 'react';
import { BudgetComparisonChart } from './BudgetComparisionChart';
import SpendingInsights from './SpendingInsights';
import { CategoryBudgetsForm } from './CategoryBudgetsForm';
import { Transaction } from '../App';

interface BudgetTrackerProps {
  transactions: Transaction[];
}

export function BudgetTracker({
  transactions,
}: BudgetTrackerProps) {
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
    <div className="min-h-screen bg-background p-4">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-6 text-2xl font-semibold">Set Category Budgets</h2>
          <CategoryBudgetsForm
            categoryBudgets={categoryBudgets}
            setCategoryBudgets={setCategoryBudgets}
          />
        </Card>

        <Card className="p-6">
          <h2 className="mb-6 text-2xl font-semibold">Budget vs Actual</h2>
          <BudgetComparisonChart
            categoryBudgets={categoryBudgets}
            actualSpending={actualSpending}  
          />
        </Card>
      </div>

      <Card className="p-6 mt-10">
        <h2 className="mb-6 text-2xl font-semibold">Spending Insights</h2>
        <SpendingInsights
          categoryBudgets={categoryBudgets}
          actualSpending={actualSpending}  
        />
      </Card>
    </div>
  );
}
