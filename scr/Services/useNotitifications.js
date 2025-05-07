import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, Alert} from 'react-native';

const useNotifications = () => {
  // 1. Request permissions (iOS + Android 13+)
  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();

      console.log('====================================');
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('iOS Notification Permissions Granted');
        await messaging().registerDeviceForRemoteMessages();
        // 3. Get APNs token (for debugging)
        const apnsToken = await messaging().getAPNSToken();
        console.log('APNs Token:', apnsToken);
        // 4. For Simulator Testing (optional)
        if (__DEV__) {
          messaging().setAPNSToken(apnsToken, 'sandbox');
          console.log('apn====================================');
          console.log(apnsToken);
          Alert.alert('apn', apnsToken);
          console.log('====================================');
        }
      }
    } else if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  // 2. Get FCM Token (for targeting messages)
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();

      console.log('token====================================');
      console.log(token);
      console.log('====================================');
      await fetch('https://your-nest-backend.com/notification/register-token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token}),
      });

      // Optional: Handle messages when app is in foreground
      messaging().onMessage(async remoteMessage => {
        console.log('FCM Foreground Message:', remoteMessage.notification);
      });

      console.log('FCM response:--------', await response.json());
      return token;
    } catch (error) {
      console.error('FCM Token Error:------------', error);
      return null;
    }
  };

  // 3. Unified notification handler
  const setupNotifications = () => {
    // Foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'New Message',
        remoteMessage.notification?.body,
      );
      console.log('Foreground Notification:----------', remoteMessage);
    });

    // Background/Quit state messages (iOS/Android)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Notification:------------', remoteMessage);
    });

    // Notification opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from notification:', remoteMessage);
          // Navigate to a screen if needed
        }
      });

    // Notification opened in background
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('Notification clicked:', remoteMessage);
        // Navigate to a screen if needed
      },
    );

    // Cleanup
    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  };

  // Initialize everything
  useEffect(() => {
    requestPermissions();
    getFCMToken();
    const cleanup = setupNotifications();
    return cleanup;
  }, []);

  // Optional: Expose token getter if needed elsewhere
  return {getFCMToken};
};

export default useNotifications;
