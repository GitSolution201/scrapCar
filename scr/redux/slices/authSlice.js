import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false, // Loading state for both login and register
  user: null, // User data after successful login or register
  error: null, // Error for both login and register
  registerResponse: null, // Response for register
  loginResponse: null, // Response for login
  token: null, // Token after successful login
  deviceId: null, // Add deviceId to state if needed
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login Actions
    loginRequest: (state) => {
      state.loading = true;
      state.loginResponse = null;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.access_token; // Save token
      state.user = action.payload.user; // Save user data
      state.deviceId = action.payload.deviceId; // Store deviceId if returned from API
      state.loginResponse = {
        success: true,
        message: action.payload.message,
      };
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Save error message
      state.loginResponse = { success: false, error: action.payload };
    },

    // Register Actions
    registerRequest: (state) => {
      state.loading = true;
      state.registerResponse = null;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.registerResponse = {
        success: true,
        message: action.payload.message,
        user: action.payload.user, // Save user data
      };
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.registerResponse = {
        success: false,
        error: action.payload,
      };
    },

    // Logout Action
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.loginResponse = null;
      state.registerResponse = null;
      state.error = null;
    },

    // Reset Register Response
    resetRegisterResponse: (state) => {
      state.registerResponse = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  resetRegisterResponse,
} = authSlice.actions;

export default authSlice.reducer;