import React, {useEffect} from 'react';
import {Image, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Screens/Login/login';
import Register from './Screens/Register/register';
import Profile from './Screens/Profile/profile';
import Notifications from './Screens/Notifications/notifications';
import MapListings from './Screens/MapListings/mapListings';
import CarListings from './Screens/carListings/carListings';
import CarDeatils from './Screens/CarDetails/carDeatils';
import Dashboard from './Screens/Dashboard/dashboard';
import SubscriptionScreen from './Screens/Subscriptions/subscriptions';
import {useDispatch, useSelector} from 'react-redux';
import Savage from './Screens/Savage/Savage';
import {axiosHeader} from './Services/apiHeader';
import {fetchUserRequest} from './redux/slices/userDetail';
import {checkSubscriptionRequest} from './redux/slices/subcriptionsSlice';
import DeviceInfo from 'react-native-device-info';
import {logout} from './redux/slices/authSlice';
import forgotPassword from './Screens/ForgotPassword/forgotPassword';
import getOTP from './Screens/GetOTP/getOTP';
import resetPassword from './Screens/ResetPassword/resetPassword';
import quoteMessages from './Screens/QuoteMessage/quoteMessages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Load Images from Assets */
const icons = {
  CarListings: require('./assets/home.png'),
  MapListings: require('./assets/placeholder.png'),
  Dashboard: require('./assets/dashboard.png'),
  Profile: require('./assets/user.png'),
};

/* Auth Stack */
const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="forgotPassword" component={forgotPassword} />
    <Stack.Screen name="getOTP" component={getOTP} />
    <Stack.Screen name="resetPassword" component={resetPassword} />
  </Stack.Navigator>
);

/* Main Tabs */
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused}) => {
        // Get the respective image based on route name
        const icon = icons[route.name];
        return (
          <Image
            source={icon}
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? '#007BFF' : '#888',
            }}
            resizeMode="contain"
          />
        );
      },
      tabBarActiveTintColor: '#007BFF',
      tabBarInactiveTintColor: '#888',
    })}>
    <Tab.Screen name="CarListings" component={CarListings} />
    <Tab.Screen name="MapListings" component={MapListings} />
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

/* Main Stack */
const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="CarDeatils" component={CarDeatils} />
    <Stack.Screen name="Subscriptions" component={SubscriptionScreen} />
    <Stack.Screen name="Savage" component={Savage} />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen name="QuoteMessages" component={quoteMessages} />
  </Stack.Navigator>
);

/* App Navigation */
const AppNavigation = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state?.user);
  const {deviceId} = useSelector(state => state?.auth);

  // Check device ID and active devices
  useEffect(() => {
    const checkActiveDevice = async () => {
      try {
        // Get current device ID based on platform
        const currentDeviceId =
          Platform.OS === 'android'
            ? await DeviceInfo.getAndroidId()
            : await DeviceInfo.getUniqueId();
        if (userData?.active_devices && currentDeviceId) {
          // Check if current device ID exists in active devices
          const isDeviceActive =
            userData.active_devices.includes(currentDeviceId);

          // If device is not in active devices, logout user
          if (!isDeviceActive) {
            console.log('Device not authorized, logging out...');

            dispatch(logout());
          }
        }
      } catch (error) {
        console.error('Device check error:', error);
      }
    };

    if (userData && token) {
      checkActiveDevice();
    }
  }, [userData, token]);

  // Existing useEffect for subscription check
  useEffect(() => {
    if (token) {
      axiosHeader(token);
      dispatch(fetchUserRequest(token));
      if (userData?.email) {
        dispatch(checkSubscriptionRequest({email: userData.email}));
      }
    }
  }, [token]);

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
