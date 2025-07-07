import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import Nav from "./pages/Nav";
import { Category } from './categories';
import Dashboard from './pages/Dashboard';
import { BudgetTracker } from './pages/BudgetTracker';
import { Toaster } from 'react-hot-toast';

export type Transaction = {
  id: string;
  amount: number;
  date: Date;
  description: string;
  category: Category;
  type: 'income' | 'expense';
};

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <Toaster 
          position="top-center" 
          toastOptions={{ 
            duration: 3000,
            style: {
              background: 'rgba(17, 24, 39, 0.9)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
            }
          }} 
        />
        <Nav />
        <Routes>
          <Route path="/" element={<Home transactions={transactions} setTransactions={setTransactions} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<BudgetTracker transactions={transactions} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;