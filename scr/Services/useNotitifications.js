import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {Linking} from 'react-native';
import {DeepLinkingRoute} from '../Components/DeepLinkingRoute';
import {navigationRef} from '../navigationRef';

const useNotifications = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [apnsToken, setApnsToken] = useState(null);
  const [notification, setNotification] = useState(null);

  // 1. Request permissions and get tokens
  const requestPermissionsAndTokens = async () => {
    try {
      // iOS Permission
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log('User declined notification permissions');
          return false;
        }

        // Get APNs token (only works on real device)
        const apnsToken = await messaging().getAPNSToken();
        if (apnsToken) {
          setApnsToken(apnsToken);
          console.log('APNs Token:', apnsToken);
          if (__DEV__) {
            await messaging().setAPNSToken(apnsToken, 'sandbox');
          }
        }
      }
      // Android 13+ Permission
      else if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }

      // Get FCM Token
      const token = await getFCMToken();
      return token !== null;
    } catch (error) {
      console.log('Notification setup error:', error);
      return false;
    }
  };

  // 2. Get FCM Token
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log('FCM Token:', token);

      // Send to your backend
      await registerTokenWithBackend(token);

      return token;
    } catch (error) {
      console.log('FCM Token Error:', error);
      return null;
    }
  };

  const registerTokenWithBackend = async token => {
    // try {
    //   await fetch('https://your-nest-backend.com/notification/register-token', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({token}),
    //   });
    // } catch (error) {
    //   console.log('Failed to register token:', error);
    // }
  };

  // 3. Notification handlers
  const setupNotificationHandlers = () => {
    // Foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
      setNotification(remoteMessage);
      // showAlert(remoteMessage);
    });

    // Background/Quit state messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Notification:', remoteMessage);
      setNotification(remoteMessage);
    });

    // Notification opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from notification:', remoteMessage);
          setNotification(remoteMessage);
          handleNotificationClick(remoteMessage);
        }
      });

    // Notification opened in background
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('Notification clicked:', remoteMessage);
        setNotification(remoteMessage);
        handleNotificationClick(remoteMessage);
      },
    );

    // Token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
      setFcmToken(token);
      registerTokenWithBackend(token);
    });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
      unsubscribeTokenRefresh();
    };
  };

  const showAlert = remoteMessage => {
    Alert.alert(
      remoteMessage.notification?.title || 'New Notification',
      remoteMessage.notification?.body,
      [
        {
          text: 'OK',
          onPress: () => handleNotificationClick(remoteMessage),
        },
      ],
    );
  };

  const handleNotificationClick = remoteMessage => {
    console.log('Navigate based on:', remoteMessage.data);
    if (!remoteMessage?.data) return;

    const {id} = remoteMessage.data;
    // const url = DeepLinkingRoute(remoteMessage);

    // if (url === 'blockaccount') {
    //   return;
    // }

    if (navigationRef.isReady() && id) {
      navigationRef.navigate('MainStack', {
        screen: 'CarListings',
        params: {carId: id},
      });
    }
  };

  // Initialize everything
  useEffect(() => {
    const initializeNotifications = async () => {
      await requestPermissionsAndTokens();
      const cleanup = setupNotificationHandlers();
      return cleanup;
    };

    const cleanupPromise = initializeNotifications();
    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, []);

  return {
    fcmToken,
    apnsToken,
    notification,
    getFCMToken,
    requestPermissions: requestPermissionsAndTokens,
  };
};

export default useNotifications;
