// store.js
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import userDetail from './slices/userDetail';
import carListingsReducer from './slices/carListingsSlice';
import userProfileUpdateReducer from './slices/userProfileUpdateSlice';
import favoritesReducer from './slices/favouriteSlice';
import favListingsReducer from './slices/favouriteListingSlice';
import subscriptionReducer from './slices/subcriptionsSlice';
import cancelSubscriptionReducer from './slices/canceleSubcriptionsSlice';

import cancelSubscriptionSaga from './sagas/cancelSubcriptionsSaga';

import viewCountReducer from './slices/viewCount'; // Import the new slice
import authSaga from './sagas/authSaga';
import userSaga from './sagas/carListingsSaga';
import userDetailSaga from './sagas/userDetailSaga';
import userProfileUpdateSage from './sagas/userProfileUpdateSage';
import favouriteSaga from './sagas/favouriteSaga';
import favListingsSaga from './sagas/favListingsSaga';
import viewCountSaga from './sagas/viewCountSaga'; // Import the new saga
import subscriptionSaga from './sagas/subcriptionsSaga';
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'carListings',
    'user',
    'profileUpdate',
    'favourite',
    'favListings',
    'viewCount',
    'subscription',
    'cancelSubscription',
  ], // Add the new slice to the whitelist
};

const rootReducer = combineReducers({
  auth: authReducer,
  carListings: carListingsReducer,
  user: userDetail,
  profileUpdate: userProfileUpdateReducer,
  favourite: favoritesReducer,
  favListings: favListingsReducer,
  viewCount: viewCountReducer, // Add the new slice
  subscription: subscriptionReducer, // Add the new reducer
  cancelSubscription: cancelSubscriptionReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

const persistor = persistStore(store);

sagaMiddleware.run(authSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(userDetailSaga);
sagaMiddleware.run(userProfileUpdateSage);
sagaMiddleware.run(favouriteSaga);
sagaMiddleware.run(favListingsSaga);
sagaMiddleware.run(viewCountSaga); // Run the new saga
sagaMiddleware.run(subscriptionSaga); // Run the new saga
sagaMiddleware.run(cancelSubscriptionSaga);

export {store, persistor};
