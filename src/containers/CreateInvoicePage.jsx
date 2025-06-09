import React from 'react';
import CreateInvoiceForm from '../components/CreateInvoiceForm';
import Header from '../components/Header';

const CreateInvoicePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <CreateInvoiceForm />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
