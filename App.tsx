import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './scr/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './scr/redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';
import {publishedKey, urlScheme} from './scr/Helper/keys';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StripeProvider
            publishableKey={
              'pk_test_51GzlwoDnmorUxClnVwbcYYl2Rznbzs3lCgndN0UPNRH0pa2EvBXALWwN5IQPQrkHXeatoHd9HXPi7oqyjMWThwaw00mTrrQr55'
            }
            // merchantIdentifier="merchant.com.carscrape.rniap"
            // urlScheme={urlScheme}
          >
            <AppNavigation style={{flex: 1, padding: 20}} />
          </StripeProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
