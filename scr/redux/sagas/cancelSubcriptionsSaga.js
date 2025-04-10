import { takeLatest, put, call } from 'redux-saga/effects';

import { cancelSubscription } from '../api/subscriptionApi';
import { cancelSubscriptionFailure, cancelSubscriptionRequest, cancelSubscriptionSuccess } from '../slices/canceleSubcriptionsSlice';

function* handleCancelSubscription(action) {
  try {
    const { subscriptionId, token } = action.payload;
    console.log('@SUBCRIOTION ID',subscriptionId)
    const response = yield call(cancelSubscription, subscriptionId, token);
    console.log('@RESPONSE', response);
    yield put(cancelSubscriptionSuccess(response.data));
  } catch (error) {
    console.log('Error canceling subscription:', error);
    yield put(cancelSubscriptionFailure(error.message));
  }
}

export default function* cancelSubscriptionSaga() {
  yield takeLatest(cancelSubscriptionRequest.type, handleCancelSubscription);
}
