// import React, {useState, useEffect} from 'react';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import AppNavigation from './scr/Navigation';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {store, persistor} from './scr/redux/store';
// import useNotifications from './scr/Services/useNotitifications';
// import {getMessaging} from '@react-native-firebase/messaging';
// import ForegroundNotification from './scr/Components/ForgroundNotification';
// import {navigationRef} from './scr/navigationRef';

// export default function App() {
//   const [notificationData, setNotificationData] = useState<{
//     title: string;
//     body: string;
//     onPress: () => void;
//   } | null>(null);

//   useEffect(() => {
//     let unsubscribeFn = () => {};

//     const fetchTokenAndSetupListener = async () => {
//       const token = await getMessaging().getToken();
//       console.log('KKKK', token);

//       const unsubscribe = getMessaging().onMessage(async remoteMessage => {
//         console.log('Foreground Notification:', remoteMessage);

//         setNotificationData({
//           title: remoteMessage.notification?.title || 'Notification',
//           body: remoteMessage.notification?.body || '',
//           onPress: () => {
//             const id = remoteMessage?.data?.id;
//             if (navigationRef.isReady() && id) {
//               navigationRef.navigate('MainStack', {
//                 screen: 'CarListings',
//               });
//             }
//             setNotificationData(null);
//           },
//         });
//       });

//       // Assign to outer variable for cleanup
//       unsubscribeFn = unsubscribe;
//     };

//     fetchTokenAndSetupListener();

//     return () => {
//       unsubscribeFn?.();
//     };
//   }, []);

//   useNotifications();

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <GestureHandlerRootView style={{flex: 1}}>
//           {notificationData && (
//             <ForegroundNotification
//               title={notificationData.title}
//               message={notificationData.body}
//               onPress={notificationData.onPress}
//               onClose={() => setNotificationData(null)}
//             />
//           )}
//           <AppNavigation />
//         </GestureHandlerRootView>
//       </PersistGate>
//     </Provider>
//   );
// }
import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './scr/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './scr/redux/store';
import useNotifications from './scr/Services/useNotitifications';
import {getMessaging} from '@react-native-firebase/messaging';
import ForegroundNotification from './scr/Components/ForgroundNotification';
import {navigationRef} from './scr/navigationRef';
import Sound from 'react-native-sound';

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

        // 🔊 Play custom sound manually
        const soundFile =
          Platform.OS === 'ios' ? 'notif_sound' : 'notif_sound.mp3';

        const notifSound = new Sound(soundFile, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log('❌ Sound load error:', error);
            return;
          }
          notifSound.play(success => {
            if (!success) {
              console.log('❌ Sound play failed');
            }
          });
        });

        // Show banner or UI notification
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
