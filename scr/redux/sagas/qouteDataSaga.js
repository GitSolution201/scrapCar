import {takeLatest, put, call} from 'redux-saga/effects';
import {getQuoteAPI} from '../api/quoteApi';
import {
  getQuoteRequest,
  getQuoteSuccess,
  getQuoteFailure,
} from '../slices/qouteDataSlice';

function* handleGetQuote(action) {
  try {
    const {userId, token} = action.payload;
    const quotes = yield call(getQuoteAPI, userId, token);
    yield put(getQuoteSuccess(quotes));
  } catch (error) {
    yield put(getQuoteFailure(error.message));
  }
}

export default function* getQuoteSaga() {
  yield takeLatest(getQuoteRequest.type, handleGetQuote);
}
