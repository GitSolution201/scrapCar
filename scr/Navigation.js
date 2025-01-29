import React from 'react';
import {Image} from 'react-native';
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
import { useSelector } from 'react-redux';

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
    <Stack.Screen name="MainTabs" component={MainStack} />
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
  </Stack.Navigator>
);

/* App Navigation */
const AppNavigation = () => {
  const { loginResponse } = useSelector((state: any) => state.auth);
  const isAuthenticated = loginResponse?.message=='Login successful'; 
  // const isAuthenticated = false; // Replace with your actual authentication logic

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
