import axios from 'axios';

// Set up the base Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace this with your actual API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API
export const login = async credentials => {
  try {
    // const response = await api.post('/login', credentials);
    // return response.data;
    console.log('Login ---------------------');
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

// Register API
export const register = async userData => {
  try {
    // const response = await api.post('/register', userData);
    // return response.data;
    console.log('Register ---------------------');
  } catch (error) {
    throw error.response?.data || 'Register failed';
  }
};

export default api;
