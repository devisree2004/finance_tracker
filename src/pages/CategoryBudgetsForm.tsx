interface CategoryBudgetsFormProps {
    categoryBudgets: Record<string, number>;
    setCategoryBudgets: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  }
  
  export function CategoryBudgetsForm({ categoryBudgets, setCategoryBudgets }: CategoryBudgetsFormProps) {
    const handleChange = (category: string, value: string) => {
      const newBudget = { ...categoryBudgets, [category]: parseFloat(value) };
      setCategoryBudgets(newBudget);
    };
  
    return (
      <div>
        {Object.keys(categoryBudgets).map((category) => (
          <div key={category} className="mb-4">
            <label htmlFor={category} className="block text-sm font-medium">{category}</label>
            <input
              type="number"
              id={category}
              value={categoryBudgets[category]}
              onChange={(e) => handleChange(category, e.target.value)}
              className="mt-1 p-2 border rounded"
            />
          </div>
        ))}
      </div>
    );
  }
  