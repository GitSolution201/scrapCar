// Create a new file subscriptionSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  subscriptionData: null,
  error: null,
  response: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    checkSubscriptionRequest: state => {
      state.loading = true;
      state.response = null;
      state.error = null;
    },
    checkSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.subscriptionData = action.payload;
      state.response = {
        success: true,
        message: action.payload.message,
      };
    },
    checkSubscriptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.response = {
        success: false,
        error: action.payload,
      };
    },
    resetSubscriptionResponse: state => {
      state.response = null;
    },
  },
});

export const {
  checkSubscriptionRequest,
  checkSubscriptionSuccess,
  checkSubscriptionFailure,
  resetSubscriptionResponse,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
