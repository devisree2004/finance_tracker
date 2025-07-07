import type { Transaction } from '../App';

// Mock API functions - replace with real API calls
const STORAGE_KEY = 'finance-tracker-transactions';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchTransactions(): Promise<Transaction[]> {
  await delay(300);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  const transactions = JSON.parse(stored);
  return transactions.map((tx: any) => ({
    ...tx,
    date: new Date(tx.date)
  }));
}

export async function addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  await delay(300);
  
  const newTransaction: Transaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  
  const existing = await fetchTransactions();
  const updated = [...existing, newTransaction];
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map(tx => ({
    ...tx,
    date: tx.date.toISOString()
  }))));
  
  return newTransaction;
}

export async function updateTransaction(transaction: Transaction): Promise<Transaction> {
  await delay(300);
  
  const existing = await fetchTransactions();
  const updated = existing.map(tx => tx.id === transaction.id ? transaction : tx);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map(tx => ({
    ...tx,
    date: tx.date.toISOString()
  }))));
  
  return transaction;
}

export async function deleteTransaction(id: string): Promise<void> {
  await delay(300);
  
  const existing = await fetchTransactions();
  const updated = existing.filter(tx => tx.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map(tx => ({
    ...tx,
    date: tx.date.toISOString()
  }))));
}