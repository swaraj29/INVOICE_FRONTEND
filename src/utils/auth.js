import axios from 'axios';

export const TOKEN_KEY = 'invoice_auth_token';

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  // Set token in axios defaults when retrieved
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
  return token;
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    // Set token in axios defaults when stored
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    removeToken();
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  // Remove token from axios defaults when cleared
  delete axios.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Add axios interceptor to handle auth globally
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add axios interceptor to handle 403s globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      console.log('Auth error intercepted:', error.response.status);
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
