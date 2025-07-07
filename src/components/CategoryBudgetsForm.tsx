import { motion } from 'framer-motion';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

interface CategoryBudgetsFormProps {
  categoryBudgets: Record<string, number>;
  setCategoryBudgets: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export function CategoryBudgetsForm({ categoryBudgets, setCategoryBudgets }: CategoryBudgetsFormProps) {
  const handleChange = (category: string, value: string) => {
    const newBudget = { ...categoryBudgets, [category]: parseFloat(value) || 0 };
    setCategoryBudgets(newBudget);
  };

  const categoryIcons: Record<string, string> = {
    Food: '🍽️',
    Transport: '🚗',
    Rent: '🏠',
    Shopping: '🛍️',
    Health: '⚕️',
    Entertainment: '🎬',
    Other: '📝',
  };

  return (
    <div className="space-y-6">
      {Object.keys(categoryBudgets).map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <Label 
            htmlFor={category} 
            className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2"
          >
            <span className="text-lg">{categoryIcons[category]}</span>
            {category}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 font-medium">
              ₹
            </span>
            <Input
              type="number"
              id={category}
              value={categoryBudgets[category]}
              onChange={(e) => handleChange(category, e.target.value)}
              className="pl-8 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300 hover:bg-white/8"
              placeholder="0.00"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}