/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import messaging, {getMessaging} from '@react-native-firebase/messaging';

AppRegistry.registerComponent(appName, () => App);
getMessaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage);
});
