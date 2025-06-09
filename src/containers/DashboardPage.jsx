import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateInvoiceForm from '../components/CreateInvoiceForm';
import InvoiceList from '../components/InvoiceList';
import { getInvoices, downloadInvoice } from '../api/invoice';

const DashboardPage = ({ token, logout }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchInvoices = async () => {
      if (!token) {
        setInvoices([]);
        setIsLoading(false);
        navigate('/login');
        return;
      }

      try {
        const response = await getInvoices();
        
        if (!isMounted) return;

        let processedInvoices = [];
        if (Array.isArray(response.data)) {
          processedInvoices = response.data;
        } else if (response.data && Array.isArray(response.data.invoices)) {
          processedInvoices = response.data.invoices;
        }
        
        processedInvoices = processedInvoices.map(inv => ({
          _id: inv._id || inv.id || 'N/A',
          clientName: inv.clientName || 'Unknown Client',
          createdAt: inv.createdAt || '',
          items: inv.items || [],
          status: inv.status || 'Processing'
        }));
        
        setInvoices(processedInvoices);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
        if (isMounted) {
          if (err.response?.status === 401 || err.response?.status === 403) {
            setInvoices([]);
            logout?.();
            navigate('/login');
          } else {
            setError('Failed to load invoices. Please try again.');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchInvoices();

    return () => {
      isMounted = false;
    };
  }, [token, logout, navigate]);

  const handleDownload = async (id) => {
    if (!token) {
      alert('Please login to download invoices');
      navigate('/login');
      return;
    }

    // Log token status for debugging
    console.log('Download requested with token present:', !!token);
    
    let url;
    try {
      const response = await downloadInvoice(id, token);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Log successful response
      console.log('Download response received:', {
        status: response.status,
        contentType: response.headers?.['content-type'],
        dataSize: response.data.size
      });

      // Create blob with proper PDF MIME type
      const blob = new Blob([response.data], { 
        type: response.headers?.['content-type'] || 'application/pdf'
      });
      
      // Create URL and trigger download
      url = window.URL.createObjectURL(blob);
      
      // Create and click link
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = `invoice_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Download error:', {
        message: error.message,
        status: error.response?.status,
        responseType: error.response?.headers?.['content-type']
      });
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        const errorMessage = error.response.status === 401 
          ? 'Your session is invalid. Please login again.' 
          : 'Your session has expired. Please login again.';
        
        alert(errorMessage);
        console.log('Logging out due to auth error');
        logout?.();
        navigate('/login');
        return;
      }
      
      if (error.response?.status === 404) {
        alert('Invoice not found.');
      } else if (error.response?.status === 500) {
        alert('Server error while generating PDF. Please try again later.');
      } else if (error.request) {
        alert('Network error. Please check your connection.');
      } else {
        alert(error.message || 'Failed to download invoice. Please try again.');
      }
    } finally {
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    }
  };

  const handleLogout = () => {
    setInvoices([]);
    logout?.();
  };

  const calculateTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Manage your invoices and create new ones with ease.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Invoice</h2>
            <CreateInvoiceForm 
              token={token}
              onInvoiceCreated={(newInvoice) => setInvoices(prev => [newInvoice, ...prev])} 
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Invoices</h2>
            {!invoices?.length
              ? <p className="text-center">No invoices found.</p>
              : <InvoiceList invoices={invoices} onDownload={handleDownload} />
            }
          </div>
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
