import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ setToken }) => {
  return (
    <main className="flex items-center justify-center p-4">
      <LoginForm setToken={setToken} />
    </main>
  );
};

export default LoginPage;
