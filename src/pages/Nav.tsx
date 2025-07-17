import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart, Wallet, TrendingUp, PieChart, LogOut } from "lucide-react";
import { motion } from "framer-motion";

function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: Wallet },
    { name: "Dashboard", path: "/dashboard", icon: PieChart },
    { name: "Budget Tracker", path: "/budget", icon: TrendingUp },
  ];

  const isLoggedIn = !!sessionStorage.getItem('token');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* 🔰 Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <BarChart className="h-8 w-8 text-emerald-400" />
              <div className="absolute inset-0 h-8 w-8 bg-emerald-400 rounded-full blur-lg opacity-30"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Finance Tracker
            </h1>
          </motion.div>

          {/* ✅ Nav Links + Logout */}
          <div className="flex space-x-1 items-center">
            {isLoggedIn &&
              navItems.map(({ name, path, icon: Icon }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={path}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      pathname === path
                        ? "text-white bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/30"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{name}</span>
                    {pathname === path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg border border-emerald-400/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

            {/* 🔒 Logout button shown only when logged in */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 flex items-center space-x-2 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Nav;
