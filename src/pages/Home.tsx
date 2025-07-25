import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { MonthlyExpensesChart } from './MonthlyExpensesChart';
import { Transaction } from '../App';
import toast from 'react-hot-toast';
import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from '../lib/transactions';

interface HomeProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

function Home({ transactions, setTransactions }: HomeProps) {
  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch transactions from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        toast.error('Failed to load your data');
      }
    };
    fetchData();
  }, [setTransactions]);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // ✅ Add transaction and update list
  const handleAddTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const saved = await addTransaction(transaction);
      setTransactions(prev => [saved, ...prev]);
      setShowForm(false);
      toast.success(`${transaction.type === 'income' ? 'Income' : 'Expense'} added!`);
    } catch (err) {
      console.error('Error saving transaction:', err);
      toast.error('Failed to save transaction');
    }
  };

  // ✅ Delete transaction from backend
  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      toast.success('Transaction deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  // ✅ Edit transaction in backend
  const handleEditTransaction = async (id: string, updatedData: Omit<Transaction, 'id'>) => {
    try {
      const updated = await updateTransaction(id, updatedData);
      setTransactions(prev => prev.map(t => t.id === id ? updated : t));
      toast.success('Transaction updated');
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Personal Finance Tracker
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Take control of your finances with beautiful insights and smart tracking
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Income */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 backdrop-blur-xl">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">₹{totalIncome.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Expenses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 backdrop-blur-xl">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">₹{totalExpenses.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Balance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Card className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-500/10 to-blue-600/5 border-blue-500/20' : 'from-orange-500/10 to-orange-600/5 border-orange-500/20'} backdrop-blur-xl`}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-black">Balance</CardTitle>
              <DollarSign className={`h-4 w-4 ${balance >= 0 ? 'text-blue-400' : 'text-orange-400'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>₹{balance.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Transaction Button */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex justify-center mb-8">
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
          <Plus className="mr-2 h-5 w-5" />
          Add Transaction
        </Button>
      </motion.div>

      {/* Transaction Form Modal */}
      {showForm && <TransactionForm onSubmit={handleAddTransaction} onCancel={() => setShowForm(false)} />}

      {/* Charts and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-400" />
                Monthly Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyExpensesChart transactions={transactions} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList
                transactions={transactions.slice(0, 5)}
                onDelete={handleDeleteTransaction}
                onEdit={(updated) => handleEditTransaction(updated.id, updated)}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
