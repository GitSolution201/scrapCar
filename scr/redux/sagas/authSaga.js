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
    // Only call attemptLogin if this is NOT a confirmed attempt
    if (!action.payload.isConfirmed) {
      const attemptResponse = yield call(attemptLogin, action.payload);

      if (attemptResponse.requires_confirmation) {
        yield put(loginSuccess(attemptResponse));
        return; // Exit early since we're showing confirmation modal
      }
    }

    // Proceed with normal login (either no confirmation needed or this is a confirmed attempt)
    const loginResponse = yield call(login, action.payload);
    console.log('@LOGIN RESPONCE', loginResponse);
    yield put(loginSuccess(loginResponse));
    yield put(checkSubscriptionRequest({email: action.payload.email}));
  } catch (error) {
    console.log('@error in saga in login', error);
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
