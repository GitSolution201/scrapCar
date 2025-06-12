import {Image, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {wp} from '../../Helper/Responsive';
import {useSelector} from 'react-redux';
import {navigationRef} from '../../navigationRef';
import {CommonActions} from '@react-navigation/native';
import Sound from 'react-native-sound';

const Splash = () => {
  const token = useSelector((state: any) => state.auth.token);
  const splashSoundRef = useRef<Sound | null>(null); // useRef to persist sound instance

  useEffect(() => {
    Sound.setCategory('Playback');

    // Preload sound immediately on mount
    splashSoundRef.current = new Sound(
      require('../../../assets/sounds/insta_startup.mp3'),
      error => {
        if (error) {
          console.log('Sound loading failed', error);
          navigate();
          return;
        }

        // Immediately play after load
        splashSoundRef.current?.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }

          navigate();
        });
      },
    );

    return () => {
      splashSoundRef.current?.release();
    };
  }, [token]);

  const navigate = () => {
    if (navigationRef.isReady()) {
      const targetScreen = token ? 'MainStack' : 'AuthStack';

      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: targetScreen}],
        }),
      );
    }
  };

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
