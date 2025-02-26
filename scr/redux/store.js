import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import userDetail from './slices/userDetail';
import carListingsReducer from './slices/carListingsSlice';
import userProfileUpdateReducer from './slices/userProfileUpdateSlice';
import favoritesReducer from './slices/favouriteSlice';
import authSaga from './sagas/authSaga';
import userSaga from './sagas/carListingsSaga';
import userDetailSaga from './sagas/userDetailSaga';
import userProfileUpdateSage from './sagas/userProfileUpdateSage';
import favouriteSaga from './sagas/favouriteSaga';

const sagaMiddleware = createSagaMiddleware();

// ✅ Redux Persist Configuration (For all reducers)
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'carListings', 'user', 'profileUpdate', 'favourite'], // ✨ List all reducers you want to persist
};

// ✅ Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  carListings: carListingsReducer,
  user: userDetail,
  profileUpdate: userProfileUpdateReducer,
  favourite: favoritesReducer, // Add the new favorites reducer
});

// ✅ Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // 🔥 Required for redux-persist
    }).concat(sagaMiddleware),
});

// ✅ Persistor
const persistor = persistStore(store);

// ✅ Run sagas
sagaMiddleware.run(authSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(userDetailSaga);
sagaMiddleware.run(userProfileUpdateSage);
sagaMiddleware.run(favouriteSaga);

export {store, persistor};
