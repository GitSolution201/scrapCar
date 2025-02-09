import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  error: null,
  registerResponse: null,
  loginResponse: null,
  token: null, // ✅ Token stored in Redux only
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.loginResponse = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.access_token; // ✅ Save token in Redux state
      state.loginResponse = {
        success: true,
        message: action.payload.message,
      };
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.token = null; // ✅ Ensure token is removed on failure
      state.loginResponse = {
        success: false,
        error: action.payload,
      };
    },
    logout: state => {
      state.loading = false;
      state.user = null;
      state.token = null; // ✅ Clear token on logout
      state.loginResponse = null;
      state.registerResponse = null;
    },
    registerRequest: state => {
      state.loading = true;
      state.registerResponse = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.registerResponse = {
        success: true,
        message: action.payload.message,
        user: action.payload.user,
      };
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.registerResponse = {
        success: false,
        error: action.payload,
      };
    },
    resetRegisterResponse: state => {
      state.registerResponse = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
  resetRegisterResponse,
} = authSlice.actions;

export default authSlice.reducer; // ✅ Persist removed
