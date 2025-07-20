import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Categories", path: "/categories" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-700">
            Blogify
          </Link>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-purple-700 underline"
                      : "text-gray-600 hover:text-purple-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block text-sm font-medium ${
                  isActive
                    ? "text-purple-700 underline"
                    : "text-gray-700 hover:text-purple-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
