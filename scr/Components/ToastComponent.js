import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Linking,
} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {hp, wp} from '../Constant/Responsive';
import {Colors} from '../Constant/Colors';

export const ToastComponent = ({
  title,
  body,
  chat_id,
  hotel_id,
  follower_id,
  event_id,
  chat_image,
}) => {
  // const domain = Config.domain;
  // const HandleToastNotification = title => {
  //   if (event_id) {
  //     Linking.openURL(`groovesocial://EventDetails/${event_id}`);
  //   } else if (title == 'Congratulations!') {
  //     openInbox();
  //   } else if (title == 'Follow Request Accepted!') {
  //     Linking.openURL(`groovesocial://UsersProfile/${follower_id}`);
  //   } else if (hotel_id) {
  //     Linking.openURL(`groovesocial://HotelDetails/${hotel_id}`);
  //   } else if (chat_id) {
  //     const image = encodeURIComponent(chat_image);
  //     Linking.openURL(`groovesocial://Chat/${chat_id}/${title}/${image}`);
  //   } else {
  //     Linking.openURL(`groovesocial://notification`);
  //     console.log('Foreground Notification');
  //   }
  // };
  return (
    <TouchableWithoutFeedback onPress={() => HandleToastNotification(title)}>
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOutUp}
        style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('../assets/logo.png')}
          style={styles.img}
        />
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.body}>
            {body}
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    top: hp(7),
    ...Platform.select({
      android: {
        top: hp(5),
      },
    }),
    backgroundColor: Colors.green,
    width: wp(90),
    position: 'absolute',
    borderRadius: wp(3),
    padding: wp(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#005050',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    elevation: wp(2),
    alignSelf: 'center',
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.semiBold,
    marginLeft: wp(3),
    fontSize: FontSize.M,
    width: wp(70),
  },
  body: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    marginLeft: wp(3),
    fontSize: FontSize.XS,
    width: wp(70),
  },
  img: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(4),
    backgroundColor: Colors.white,
  },
});
