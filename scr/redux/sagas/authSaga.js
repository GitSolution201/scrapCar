import {takeLatest, put, call} from 'redux-saga/effects';
import {attemptLogin, login, register} from '../api'; // Import the APIs
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from '../slices/authSlice'; // Import actions from authSlice
import {checkSubscriptionRequest} from '../slices/subcriptionsSlice';

// Worker saga for login
function* handleLogin(action) {
  try {
    // First call attemptLogin
    const attemptResponse = yield call(attemptLogin, action.payload);

    // If it requires confirmation, dispatch success with that info
    if (attemptResponse.requires_confirmation) {
      yield put(loginSuccess(attemptResponse));
    } else {
      // Otherwise proceed with normal login
      const loginResponse = yield call(login, action.payload);
      yield put(loginSuccess(loginResponse));
      yield put(checkSubscriptionRequest({email: action.payload.email}));
    }
  } catch (error) {
    console.log('@error in saga', error);
    yield put(
      loginFailure(
        error.response?.data?.message || error.message || 'Login failed',
      ),
    );
  }
}

// Worker saga for register
function* handleRegister(action) {
  try {
    const response = yield call(register, action.payload);
    yield put(registerSuccess(response));
  } catch (error) {
    console.log('@EERRR', error);
    yield put(registerFailure(error.message || 'Registration failed'));
  }
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin); // Watch for login actions
  yield takeLatest(registerRequest.type, handleRegister); // Watch for register actions
}
