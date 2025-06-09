import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import Dashboard from './containers/DashboardPage';
import CreateInvoice from './containers/CreateInvoicePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { getToken, setToken as setAuthToken, removeToken, isAuthenticated as checkAuth } from './utils/auth';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const handleSetToken = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="flex-1">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage setToken={handleSetToken} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <RegisterPage />
                )
              }
            />
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <CreateInvoice token={getToken()} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Dashboard token={getToken()} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
