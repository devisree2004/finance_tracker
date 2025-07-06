import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { categories } from '../categories'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import { Calendar } from '../ui/calendar'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select'
import type { Transaction } from '../App'

// ✅ Extend the schema to include 'type'
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
      type: transaction?.type || 'expense', // ✅ Default to 'expense'
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  value={field.value}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full p-3 text-left font-normal text-black',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-black" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white shadow-lg bg-opacity-95" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => date && field.onChange(date)}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full text-black">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white shadow-lg max-h-60 overflow-auto bg-opacity-95'>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className='hover:bg-black/5 cursor-pointer text-black transition-all'>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />

        {/* Type (income/expense) */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full text-black">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='bg-white shadow-lg bg-opacity-95'>
                  <SelectItem value="income" className='text-black'>Income</SelectItem>
                  <SelectItem value="expense" className='text-black'>Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter description"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full">
          {transaction ? 'Update' : 'Add'} Transaction
        </Button>
      </form>
    </Form>
  )
}
