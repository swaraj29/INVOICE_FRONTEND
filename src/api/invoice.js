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

    localStorage.setItem('invoice_auth_token', response.data.token);

    return response;
  } catch (error) {
    console.error('Download error:', {
      status: error.response?.status,
      message: error.message
    });
    throw error;
  }
};
const token = localStorage.getItem('invoice_auth_token');
console.log('Token:', token);

async function fetchInvoices() {
  await getInvoices(token);
}
fetchInvoices();