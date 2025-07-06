import axios from 'axios';
import { Transaction } from '../App';

const API_BASE = 'http://localhost:5000/api';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await axios.get<Transaction[]>(`${API_BASE}/transactions`);
  return res.data;
};

export const addTransaction = async (tx: Omit<Transaction, 'id'>) => {
  const res = await axios.post(`${API_BASE}/transactions`, tx);
  return res.data;
};
