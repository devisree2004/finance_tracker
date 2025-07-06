import { Link, useLocation } from "react-router-dom";
import { BarChart } from "lucide-react";

 function Nav() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Budget Tracker", path: "/budget" },
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <BarChart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Finance Tracker</h1>
      </div>
      <div className="space-x-6">
        {navItems.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className={`text-base font-medium hover:text-primary ${
              pathname === path ? "text-primary" : "text-gray-500"
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
export default Nav;