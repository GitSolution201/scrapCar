import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../Helper/Colors';
import {hp, wp} from '../Helper/Responsive';

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Listings</Text>
      <Image
        source={require('../assets/dp.jpeg')}
        style={styles.profileImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: hp(5),
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  profileImage: {
    width: wp(10),
    height: hp(5),
    borderRadius: wp(10),
    borderWidth: wp(0.5),
    borderColor: Colors.primary,
  },
});
