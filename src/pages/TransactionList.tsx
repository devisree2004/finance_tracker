import { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Calendar, Tag, FileText, DollarSign } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import { TransactionForm } from './TransactionForm';
import type { Transaction } from '../App';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleFormSubmit = (data: Omit<Transaction, 'id'>) => {
    if (editing) {
      onEdit({ ...data, id: editing.id });
      setEditing(null);
    }
  };

  const confirmDelete = () => {
    if (deletingId) {
      onDelete(deletingId);
      setDeletingId(null);
    }
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

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-white/90 mb-2">No transactions yet</h3>
        <p className="text-white/60">Add your first transaction to get started!</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-white/80 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </div>
              </TableHead>
              <TableHead className="text-white/80 font-medium">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                </div>
              </TableHead>
              <TableHead className="text-white/80 font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description
                </div>
              </TableHead>
              <TableHead className="text-right text-white/80 font-medium">
                <div className="flex items-center justify-end gap-2">
                  <DollarSign className="h-4 w-4" />
                  Amount
                </div>
              </TableHead>
              <TableHead className="text-right text-white/80 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {transactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <TableCell className="text-white/80">
                    {format(tx.date, 'PPP')}
                  </TableCell>
                  <TableCell className="text-white/80">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoryIcons[tx.category]}</span>
                      {tx.category}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/80 max-w-xs truncate">
                    {tx.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${
                      (tx as any).type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {(tx as any).type === 'income' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditing(tx)}
                          className="bg-blue-500/20 border-blue-400/30 text-blue-300 hover:bg-blue-500/30 transition-all duration-200"
                        >
                          <Edit2 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeletingId(tx.id)}
                          className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 transition-all duration-200"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </motion.div>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <Edit2 className="h-5 w-5" />
              Edit Transaction
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <TransactionForm
              transaction={editing}
              onSubmit={handleFormSubmit}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border-red-400/30 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-300 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action will permanently delete the transaction and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}