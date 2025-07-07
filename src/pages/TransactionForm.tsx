import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, DollarSign, FileText, Tag, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { categories } from '../categories'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover'
import { Calendar } from '../components/ui/calendar'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components/ui/select'
import type { Transaction } from '../App'

const formSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.date(),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(categories),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Type is required' }),
  }),
})

type FormData = z.infer<typeof formSchema>

interface TransactionFormProps {
  transaction?: Omit<Transaction, 'id'>
  onSubmit: (data: Omit<Transaction, 'id'>) => void
}

export function TransactionForm({ transaction, onSubmit }: TransactionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: transaction?.amount || 0,
      date: transaction?.date || new Date(),
      description: transaction?.description || '',
      category: transaction?.category || categories[0],
      type: transaction?.type || 'expense',
    },
  })

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Type Selection */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Transaction Type
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 focus:border-purple-400/50 transition-all duration-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-gray-900/95 backdrop-blur-xl border-white/20 max-h-60 overflow-auto'>
                    <SelectItem value="income" className='text-green-400 hover:bg-green-500/20 cursor-pointer transition-all'>
                      💰 Income
                    </SelectItem>
                    <SelectItem value="expense" className='text-red-400 hover:bg-red-500/20 cursor-pointer transition-all'>
                      💸 Expense
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Amount
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 font-medium">
                      ₹
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={field.value || ''}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      className="pl-8 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white/90 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal bg-white/5 border-white/20 text-white hover:bg-white/10 focus:border-purple-400/50 transition-all duration-300',
                          !field.value && 'text-white/40'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900/95 backdrop-blur-xl border-white/20" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => date && field.onChange(date)}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 focus:border-purple-400/50 transition-all duration-300">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='bg-gray-900/95 backdrop-blur-xl border-white/20 max-h-60 overflow-auto'>
                    {categories.map((cat) => (
                      <SelectItem 
                        key={cat} 
                        value={cat} 
                        className='text-white hover:bg-white/10 cursor-pointer transition-all flex items-center gap-2'
                      >
                        <span className="flex items-center gap-2">
                          {categoryIcons[cat]} {cat}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter description"
                    value={field.value}
                    onChange={field.onChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-purple-400/50 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              {transaction ? 'Update' : 'Add'} Transaction
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}