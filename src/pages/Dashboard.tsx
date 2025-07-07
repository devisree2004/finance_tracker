import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, PieChart, TrendingUp, Calendar } from 'lucide-react';

function Dashboard() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Financial Dashboard
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Comprehensive insights into your financial health and spending patterns
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Analytics Overview</CardTitle>
              <BarChart className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-lg text-white/90">Coming Soon</div>
              <p className="text-sm text-white/60 mt-2">
                Detailed spending analytics and trends
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Category Breakdown</CardTitle>
              <PieChart className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-lg text-white/90">Coming Soon</div>
              <p className="text-sm text-white/60 mt-2">
                Visual breakdown of spending by category
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Forecasting</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-lg text-white/90">Coming Soon</div>
              <p className="text-sm text-white/60 mt-2">
                AI-powered spending predictions
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;