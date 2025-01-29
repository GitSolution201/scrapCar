import axios from 'axios';
// https://scrape4you.onrender.com/auth/register
// Set up the base Axios instance
const api = axios.create({
  baseURL: 'https://scrape4you.onrender.com', // Replace this with your actual API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API
export const login = async userData => {
  try {
    const response = await api.post('/auth/login', userData);
    if (response.data?.message == 'Login successful') {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('Network error. Please try again.');
    }
  }
};

// Register API
export const register = async userData => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data?.message=='Registration Successful') {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('Network error. Please try again.');
    }
  }
};

export default api;
