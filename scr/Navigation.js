import React from 'react';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
  <Tab.Navigator screenOptions={{headerShown: false}}>
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
    <Tab.Screen name="CarDeatils" component={CarDeatils} />
  </Stack.Navigator>
);

/* App Navigation */
const AppNavigation = () => {
  const isAuthenticated = false; // Replace with your actual authentication logic

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
