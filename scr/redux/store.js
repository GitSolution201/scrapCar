import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import carListingsReducer from './slices/carListingsSlice';
import authSaga from './sagas/authSaga';
import userSaga from './sagas/carListingsSaga';

const sagaMiddleware = createSagaMiddleware();

// ✅ Redux Persist Configuration (For all reducers)
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'carListings'], // ✨ List all reducers you want to persist
};

// ✅ Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  carListings: carListingsReducer,
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

export {store, persistor};
