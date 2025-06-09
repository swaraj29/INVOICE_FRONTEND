import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

export const createInvoice = (data, token) =>
  axios.post(`${API_BASE_URL}/invoices`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getInvoices = (token) =>
  axios.get(`${API_BASE_URL}/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const downloadInvoice = async (id, token) => {
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${API_BASE_URL}/invoices/${id}/download`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/pdf'
      },
      responseType: 'blob'
    });

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response;
  } catch (error) {
    console.error('Download error:', {
      status: error.response?.status,
      message: error.message
    });
    throw error;
  }
};

const token = localStorage.getItem('token');
console.log('Token:', token); // Should not be null/undefined
const response = await getInvoices(token);
