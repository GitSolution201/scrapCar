// import React, { useState } from 'react';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import AppNavigation from './scr/Navigation';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {store, persistor} from './scr/redux/store';
// import useNotifications from './scr/Services/useNotitifications';
// import {initializeApp, getApp, getApps} from '@react-native-firebase/app';
// import { getMessaging } from '@react-native-firebase/messaging';

// export default function App() {
//   const [notificationData, setNotificationData] = useState<{
//     title: string;
//     body: string;
//     onPress: () => void;
//   } | null>(null);
//   const unsubscribeForeground = getMessaging().onMessage(async remoteMessage => {
//     console.log('Foreground Notification:', remoteMessage);

//     setNotificationData({
//       title: remoteMessage.notification?.title || 'Notification',
//       body: remoteMessage.notification?.body || '',
//       onPress: () => handleNotificationClick(remoteMessage),
//     });
//   });
//   // const firebaseConfig = {
//   //   apiKey: 'AIzaSyBeePc_ecfZ2jbKFNtPQMBF2B3OYhGggrQ',
//   //   authDomain: 'YOUR_AUTH_DOMAIN',
//   //   projectId: 'scrapcar-bf8b0',
//   //   storageBucket: 'YOUR_STORAGE_BUCKET',
//   //   messagingSenderId: '460048555297',
//   //   databaseURL: '',
//   //   appId: '1:460048555297:ios:70a3610c9c8003ad943260',
//   //   measurementId: 'YOUR_MEASUREMENT_ID', // Optional
//   // };
//   // console.log(getApps().length);

//   // // Initialize Firebase
//   // if (!getApps().length) {
//   //   initializeApp(firebaseConfig)
//   //     .then(res => {
//   //       console.log('====================================');
//   //       console.log(res);
//   //       console.log('====================================');
//   //     })
//   //     .catch(err => {
//   //       console.log('err====================================');
//   //       console.log(err);
//   //       console.log('====================================');
//   //     });
//   // } else {
//   useNotifications(); // Use existing app if already initialized
//   // }
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <GestureHandlerRootView style={{flex: 1}}>
//           {/* <StripeProvider
//             publishableKey={publishedKey}
//             merchantIdentifier="merchant.com.carscrape.rnida"
//             // urlScheme={urlScheme}
//             > */}
//           <AppNavigation />
//           {/* </StripeProvider> */}
//         </GestureHandlerRootView>
//       </PersistGate>
//     </Provider>
//   );
// }
import React, {useState, useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './scr/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './scr/redux/store';
import useNotifications from './scr/Services/useNotitifications';
import {getMessaging} from '@react-native-firebase/messaging';
import ForegroundNotification from './scr/Components/ForgroundNotification';
import {navigationRef} from './scr/navigationRef';

export default function App() {
  const [notificationData, setNotificationData] = useState<{
    title: string;
    body: string;
    onPress: () => void;
  } | null>(null);

  useEffect(() => {
    let unsubscribeFn = () => {};

    const fetchTokenAndSetupListener = async () => {
      const token = await getMessaging().getToken();
      console.log('KKKK', token);

      const unsubscribe = getMessaging().onMessage(async remoteMessage => {
        console.log('Foreground Notification:', remoteMessage);

        setNotificationData({
          title: remoteMessage.notification?.title || 'Notification',
          body: remoteMessage.notification?.body || '',
          onPress: () => {
            const id = remoteMessage?.data?.id;
            if (navigationRef.isReady() && id) {
              navigationRef.navigate('MainStack', {
                screen: 'CarListings',
              });
            }
            setNotificationData(null);
          },
        });
      });

      // Assign to outer variable for cleanup
      unsubscribeFn = unsubscribe;
    };

    fetchTokenAndSetupListener();

    return () => {
      unsubscribeFn?.();
    };
  }, []);

  useNotifications();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          {notificationData && (
            <ForegroundNotification
              title={notificationData.title}
              message={notificationData.body}
              onPress={notificationData.onPress}
              onClose={() => setNotificationData(null)}
            />
          )}
          <AppNavigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
