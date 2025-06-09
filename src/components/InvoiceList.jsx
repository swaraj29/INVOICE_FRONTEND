import React, { useState } from 'react';

const InvoiceList = ({ invoices, onDownload }) => {
  const [expandedInvoice, setExpandedInvoice] = useState(null);

  if (!invoices?.length) return <p className="text-center">No invoices found.</p>;

  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    return !isNaN(num) ? `$${num.toFixed(2)}` : '$0.00';
  };

  const calculateTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice._id} className="bg-white shadow rounded-lg overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            onClick={() => setExpandedInvoice(expandedInvoice === invoice._id ? null : invoice._id)}
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Client: {invoice.clientName || 'Unknown Client'}
              </h3>
              <p className="text-sm text-gray-500">
                Invoice ID: {invoice._id}
              </p>
              <p className="text-sm text-gray-500">
                Created: {formatDate(invoice.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {formatAmount(calculateTotal(invoice.items))}
              </p>
              <p className="text-sm text-gray-500">
                Status: {invoice.status || 'Processing'}
              </p>
            </div>
          </div>

          {expandedInvoice === invoice._id && invoice.items && (
            <div className="border-t border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoice.items.map((item, index) => (
                      <tr key={item._id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatAmount(item.price)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                        {formatAmount(calculateTotal(invoice.items))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(invoice._id);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
