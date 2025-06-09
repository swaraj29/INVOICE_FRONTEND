import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={isAuthenticated ? "/" : "/login"} className="text-2xl font-bold">
          InvoiceApp
        </Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-blue-100">
                Dashboard
              </Link>
              <Link to="/create" className="hover:text-blue-100">
                Create Invoice
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-blue-100">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-100">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
