import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './scr/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './scr/redux/store';
import useNotifications from './scr/Services/useNotitifications';
import {initializeApp, getApp, getApps} from '@react-native-firebase/app';

export default function App() {
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyBeePc_ecfZ2jbKFNtPQMBF2B3OYhGggrQ',
  //   authDomain: 'YOUR_AUTH_DOMAIN',
  //   projectId: 'scrapcar-bf8b0',
  //   storageBucket: 'YOUR_STORAGE_BUCKET',
  //   messagingSenderId: '460048555297',
  //   databaseURL: '',
  //   appId: '1:460048555297:ios:70a3610c9c8003ad943260',
  //   measurementId: 'YOUR_MEASUREMENT_ID', // Optional
  // };
  // console.log(getApps().length);

  // // Initialize Firebase
  // if (!getApps().length) {
  //   initializeApp(firebaseConfig)
  //     .then(res => {
  //       console.log('====================================');
  //       console.log(res);
  //       console.log('====================================');
  //     })
  //     .catch(err => {
  //       console.log('err====================================');
  //       console.log(err);
  //       console.log('====================================');
  //     });
  // } else {
  useNotifications(); // Use existing app if already initialized
  // }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* <StripeProvider
            publishableKey={publishedKey}
            merchantIdentifier="merchant.com.carscrape.rnida"
            // urlScheme={urlScheme}
            > */}
          <AppNavigation />
          {/* </StripeProvider> */}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
