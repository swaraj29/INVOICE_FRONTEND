import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

export const register = (email, password) =>
  axios.post(`${API_BASE_URL}/auth/register`, { email, password });

export const login = (email, password) =>
  axios.post(`${API_BASE_URL}/auth/login`, { email, password });
