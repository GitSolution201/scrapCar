import {takeLatest, put, call} from 'redux-saga/effects';
import {login, register} from '../api'; // Import the APIs
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from '../slices/authSlice'; // Import actions from authSlice

// Worker saga for login
function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload); // Call the login API
    yield put(loginSuccess(response)); // Dispatch success action with API response
  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed')); // Dispatch failure action
  }
}

// Worker saga for register
function* handleRegister(action) {
  try {
    const response = yield call(register, action.payload);
    yield put(registerSuccess(response));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin); // Watch for login actions
  yield takeLatest(registerRequest.type, handleRegister); // Watch for register actions
}
