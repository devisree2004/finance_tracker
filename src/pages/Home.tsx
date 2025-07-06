import { Card } from "../ui/card";
import { TransactionForm } from "../pages/TransactionForm";
import { TransactionList } from "../pages/TransactionList";
import { MonthlyExpensesChart } from "../pages/MonthlyExpensesChart";
import { Transaction } from "../App";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';
import {
  fetchTransactions as loadTransactions,
  addTransaction as createTransaction,
} from "../lib/api";

interface HomeProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

function Home({ transactions, setTransactions }: HomeProps) {
  // Fetch all transactions from backend
  const fetchTransactions = async () => {
    try {
      const data = await loadTransactions();
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to fetch transactions");
      console.error(error);
    }
  };

  // Add a new transaction using backend API
  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      await createTransaction(transaction);
      toast.success("Transaction added");
      fetchTransactions();
    } catch (error) {
      toast.error("Failed to add transaction");
      console.error(error);
    }
  };

  // Placeholder for future edit feature
  const editTransaction = async (transaction: Transaction) => {
    console.warn("Edit feature not implemented yet.");
  };

  // Placeholder for future delete feature
  const deleteTransaction = async (id: string) => {
    console.warn("Delete feature not implemented yet.");
  };

  // Load data on first render
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="mx-auto max-w-7xl mt-5 space-y-8 p-4 md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-6 text-2xl font-semibold">Add Transaction</h2>
          <TransactionForm onSubmit={addTransaction} />
        </Card>

        <Card className="p-6">
          <h2 className="mb-6 text-2xl font-semibold">Monthly Expenses</h2>
          <MonthlyExpensesChart transactions={transactions} />
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-6 text-2xl font-semibold">Transaction History</h2>
        <TransactionList
          transactions={transactions}
          onEdit={editTransaction}
          onDelete={deleteTransaction}
        />
      </Card>
    </div>
  );
}

export default Home;
