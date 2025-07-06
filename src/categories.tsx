export const categories = [
    'Food',
    'Transport',
    'Rent',
    'Shopping',
    'Health',
    'Entertainment',
    'Other',
  ] as const;
  
  export type Category = typeof categories[number];
  