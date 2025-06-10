import {Image, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {wp} from '../../Helper/Responsive';
import {useSelector} from 'react-redux';
import {navigationRef} from '../../navigationRef';
import {CommonActions} from '@react-navigation/native';
import Sound from 'react-native-sound';

const Splash = () => {
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    // Allow playback
    Sound.setCategory('Playback');

    const splashSound = new Sound(
      require('../../../assets/sounds/insta_startup.mp3'),
      error => {
        if (error) {
          console.log('Sound loading failed', error);
          return;
        }

        // Play the sound
        splashSound.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }

          // Navigate after playback
          if (navigationRef.isReady()) {
            const targetScreen = token ? 'MainStack' : 'AuthStack';

            navigationRef.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: targetScreen}],
              }),
            );
          }
        });
      },
    );

    // Cleanup
    return () => {
      splashSound.release();
    };
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
