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
  const response = await api.post('/auth/login', userData);
  if (response.data?.message == 'Login successful') {
    return response.data;
  }
};

// Register API
export const register = async userData => {
  const response = await api.post('/auth/register', userData);
  if (response.data?.message == 'Registration Successful') {
    return response.data;
  }
};
// get All Car Listing
export const getUser = async token => {
  const response = await api.get('/car/get-all-listing', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response?.data;
};
export default api;
