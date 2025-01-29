import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  error: null,
  registerResponse: null,
  loginResponse: null,
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
      state.loginResponse = {
        success: true,
        message: action.payload.message,
        token: action.payload.access_token
      };
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.loginResponse = {
        success: false,
        error: action.payload
      };
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
        user: action.payload.user
      };
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.registerResponse = {
        success: false,
        error: action.payload
      };
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
} = authSlice.actions;

export default authSlice.reducer;
