import {Image, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {wp} from '../../Helper/Responsive';
import {useSelector} from 'react-redux';
import {navigationRef} from '../../navigationRef';
import {CommonActions} from '@react-navigation/native';

const Splash = () => {
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (navigationRef.isReady()) {
        const targetScreen = token ? 'MainStack' : 'AuthStack';

        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: targetScreen}],
          }),
        );
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/splashLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: wp(80),
    height: wp(80),
    resizeMode: 'contain',
  },
});
