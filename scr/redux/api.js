import axios from 'axios';
import {getCallingCode} from 'react-native-country-picker-modal';
import DeviceInfo from 'react-native-device-info';
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
    const response = await api.post(
      '/auth/login',
      JSON.stringify({
        email: userData.email,
        password: userData.password,
        deviceId: userData.deviceId, // Include deviceId in the request
      }),
    );
    if (response.data?.message === 'Login successful') {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Login failed');
    }
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
// Register API
export const register = async userData => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data?.message === 'Registration Successful') {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Registration failed');
    }
  } catch (error) {
    console.log('REGISTER API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
// get All Car Listing
// Get All Car Listing
export const getUser = async token => {
  const deviceId = await DeviceInfo.getUniqueId();
  try {
    const response = await api.get('/car/get-all-listing', {
      headers: {
        Authorization: `Bearer ${token}`,
        'device-id': deviceId,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Return the data
  } catch (error) {
    console.log('Get User Error:', error.response?.data || error.message); // Log the error
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user data',
    ); // Throw a meaningful error
  }
};
//Get Fav Listings
export const getFavListings = async token => {
  const deviceId = await DeviceInfo.getUniqueId();
  try {
    const response = await api.get('/auth/list-all-saved', {
      headers: {
        Authorization: `Bearer ${token}`,
        'device-id': deviceId,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the data
  } catch (error) {
    console.log('Get User Error:', error.response?.data || error.message); // Log the error
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user data',
    ); // Throw a meaningful error
  }
};
// Get User Details

export const fetchUserDetails = async token => {
  const deviceId = await DeviceInfo.getUniqueId();
  try {
    const response = await api.get('/auth/get-user-details', {
      headers: {
        Authorization: `Bearer ${token}`,
        'device-id': deviceId,
      },
    });
    return response.data; // Return the data
  } catch (error) {
    console.log(
      'Fetch User Details Error:',
      error.response?.data || error.message,
    ); // Log the error
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user details',
    ); // Throw a meaningful error
  }
};
//User Profile Update
export const updateUserProfile = async (token, updatedData) => {
  const deviceId = await DeviceInfo.getUniqueId();
  try {
    const response = await api.put('/auth/update-user-profile', updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'device-id': deviceId,
      },
    });
    return response.data; // Return the data
  } catch (error) {
    console.log(
      'Update User Profile Error:',
      error.response?.data || error.message,
    ); // Log the error
    throw new Error(
      error.response?.data?.message || 'Failed to update user profile',
    ); // Throw a meaningful error
  }
};
//Add to favourite
export const addToSaved = async (carId, token) => {
  const deviceId = await DeviceInfo.getUniqueId();
  try {
    const response = await api.post(
      `/auth/add-to-saved/${carId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'device-id': deviceId,
        },
      },
    );
    return response.data; // Return the response from the server
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to toggle favorite',
    );
  }
};
//Update View count
export const updateViewCount = async (carId, token) => {
  const deviceId = await DeviceInfo.getUniqueId();
  try {
    const response = await api.post(
      `/car/${carId}/view`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'device-id': deviceId,
        },
      },
    );
    return response.data; // Return the response from the server
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to update view count',
    );
  }
};

export const checkSubscription = async email => {
  try {
    const response = await api.post('/stripe/check-subscription', {
      email: email,
    });
    console.log('====================================latest');
    console.log(response.data?.subscriptions);
    console.log('====================================');
    if (response.data) {
      return response.data;
    }
    return;
    // throw new Error(response.data?.message || 'Subscription check failed');
  } catch (error) {
    console.log(
      'Check Subscription Error:',
      error.response?.data || error.message,
    );
    // throw new Error(
    //   error.response?.data?.message || 'Failed to check subscription status',
    // );
    return;
  }
};

export const cancelSubscription = async (subscriptionId, token) => {
  try {
    const response = await api.post(
      '/stripe/cancel-subscription',
      {subscriptionID: subscriptionId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(
      'Cancel Subscription Error:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to cancel subscription',
    );
  }
};

export default api;
