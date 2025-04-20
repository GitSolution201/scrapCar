import {takeLatest, put, call} from 'redux-saga/effects';
import {
  getQuoteRequest, // Updated imports
  getQuoteSuccess,
  getQuoteFailure,
} from '../slices/qouteDataSlice';
import {getQuotesAPI} from '../api';

function* handleGetQuote(action) {
  // Changed function name
  try {
    const {userId, token} = action.payload;
    const quotes = yield call(getQuotesAPI, userId, token);
    yield put(getQuoteSuccess(quotes));
  } catch (error) {
    yield put(getQuoteFailure(error.message));
  }
}

export default function* quoteSaga() {
  yield takeLatest(getQuoteRequest.type, handleGetQuote); // Updated action
}
