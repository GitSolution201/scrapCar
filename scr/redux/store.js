import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './slices/authSlice';
import carListingsReducer from './slices/carListingsSlice'; // Import the carListings reducer
import authSaga from './sagas/authSaga';
import userSaga from './sagas/carListingsSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    carListings: carListingsReducer, // Add the carListings reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Include the saga middleware
});

sagaMiddleware.run(authSaga); // Run the authSaga
sagaMiddleware.run(userSaga); // Run the userSaga

export default store;
