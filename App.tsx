import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './scr/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './scr/redux/store';
import {StripeProvider} from '@stripe/stripe-react-native';
import {publishedKey, urlScheme} from './scr/Helper/keys';
import {getMessaging} from '@react-native-firebase/messaging';
import {ToastComponent} from './scr/Components/ToastComponent';

export default function App() {
  const [toastNotification, setToastNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});

  useEffect(() => {
    const unsubscribe = getMessaging().onMessage(async remoteMessage => {
      console.log('@remote', remoteMessage);
      if (remoteMessage) {
        // setNotificationData({
        //   title: remoteMessage?.notification?.title,
        //   body: remoteMessage?.notification.body,
        //   chat_id: remoteMessage?.data?.chat_id,
        //   hotel_id: remoteMessage?.data?.hotel_id,
        //   follower_id: remoteMessage?.data?.follow_id,
        //   event_id: remoteMessage?.data?.event_id,
        //   chat_image: remoteMessage?.data?.image
        // });
        // setToastNotification(true);
      }
      setTimeout(() => {
        setToastNotification(false);
      }, 3000);
    });

    return unsubscribe;
  }, [notificationData]);
  console.log('@data', notificationData);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* <StripeProvider
            publishableKey={publishedKey}
            merchantIdentifier="merchant.com.carscrape.rnida"
            // urlScheme={urlScheme}
            > */}
          <AppNavigation style={{flex: 1, padding: 20}} />
          {/* {toastNotification && <ToastComponent {...notificationData} />} */}

          {/* </StripeProvider> */}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
