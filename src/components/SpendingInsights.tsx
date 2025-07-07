import { motion } from "framer-motion";
import { Progress } from "../components/ui/progress";
import { Card } from "../components/ui/card";
import { AlertTriangle, TrendingUp, TrendingDown, CheckCircle } from "lucide-react";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Overspent":
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case "On Budget":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      default:
        return <TrendingDown className="h-5 w-5 text-blue-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Overspent":
        return "text-red-400";
      case "On Budget":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  };

  const getProgressColor = (percentUsed: number) => {
    if (percentUsed > 100) return "bg-red-500";
    if (percentUsed > 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {mostOverspent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <div>
                <p className="font-semibold text-red-300">
                  Biggest Overspend Alert!
                </p>
                <p className="text-white/80">
                  You overspent the most in <span className="font-bold text-red-300">{mostOverspent.category}</span> by ₹{mostOverspent.difference.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {insight.category}
                  {getStatusIcon(insight.status)}
                </h3>
                <span className={`font-medium ${getStatusColor(insight.status)}`}>
                  {insight.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Spent</span>
                  <span className="text-white font-medium">₹{insight.spent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Budget</span>
                  <span className="text-white font-medium">₹{insight.budget.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Progress</span>
                    <span className="text-white font-medium">{insight.percentUsed.toFixed(1)}%</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={Math.min(insight.percentUsed, 100)} 
                      className="h-3 bg-white/10"
                    />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(insight.percentUsed)}`}
                      style={{ width: `${Math.min(insight.percentUsed, 100)}%` }}
                    />
                    {insight.percentUsed > 100 && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {insight.difference !== 0 && (
                  <div className={`text-sm flex items-center gap-1 ${
                    insight.difference > 0 ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {insight.difference > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {insight.difference > 0 ? 'Over' : 'Under'} by ₹{Math.abs(insight.difference).toFixed(2)}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SpendingInsights;