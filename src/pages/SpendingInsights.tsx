import { Progress } from "../ui/progress";
import { Card } from "../ui/card";

interface SpendingInsightsProps {
  categoryBudgets: Record<string, number>;
  actualSpending: Record<string, number>;
}
 function SpendingInsights({
  categoryBudgets,
  actualSpending,
}: SpendingInsightsProps) {
  const insights = Object.keys(categoryBudgets).map((category) => {
    const budget = categoryBudgets[category] || 0;
    const spent = actualSpending[category] || 0;
    const percentUsed = budget === 0 ? 0 : Math.min((spent / budget) * 100, 100);
    const status =
      spent > budget
        ? "Overspent"
        : spent === budget
        ? "On Budget"
        : "Under Budget";

    return {
      category,
      budget,
      spent,
      percentUsed,
      status,
      difference: spent - budget,
    };
  });

  const mostOverspent = insights
    .filter((i) => i.difference > 0)
    .sort((a, b) => b.difference - a.difference)[0];

  return (
    <div className="space-y-6">
      {mostOverspent && (
        <Card className="p-4 bg-red-50 border-l-4 border-red-500">
          <p className="font-semibold text-red-700">
            You overspent the most in <span className="font-bold">{mostOverspent.category}</span> by ₹{mostOverspent.difference}
          </p>
        </Card>
      )}

      {insights.map((insight) => (
        <Card key={insight.category} className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{insight.category}</h3>
            <span
              className={
                insight.status === "Overspent"
                  ? "text-red-600"
                  : insight.status === "Under Budget"
                  ? "text-green-600"
                  : "text-yellow-600"
              }
            >
              {insight.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Spent ₹{insight.spent} / Budget ₹{insight.budget}
          </p>
          <Progress value={insight.percentUsed} />
        </Card>
      ))}
    </div>
  );
}
export default SpendingInsights;