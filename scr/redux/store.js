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
import authSaga from './sagas/authSaga';
import userSaga from './sagas/carListingsSaga';
import userDetailSaga from './sagas/userDetailSaga';
import userProfileUpdateSage from './sagas/userProfileUpdateSage';
import favouriteSaga from './sagas/favouriteSaga';
import favListingsSaga from './sagas/favListingsSaga';


const sagaMiddleware = createSagaMiddleware();

// ✅ Redux Persist Configuration (For all reducers)
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'carListings', 'user', 'profileUpdate', 'favourite','favListings'], // ✨ List all reducers you want to persist
};

// ✅ Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  carListings: carListingsReducer,
  user: userDetail,
  profileUpdate: userProfileUpdateReducer,
  favourite: favoritesReducer, // Add the new favorites reducer
  favListings:favListingsReducer
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
sagaMiddleware.run(favListingsSaga);

export {store, persistor};
