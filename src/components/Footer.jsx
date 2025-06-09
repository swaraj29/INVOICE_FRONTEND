import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-auto">
      <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} InvoiceApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
