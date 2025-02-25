
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Helper/Colors';
import { hp, wp } from '../Helper/Responsive';
import { Fonts } from '../Helper/Fonts';


const Banner = ({navigation}:{navigation:any}) => {
  return (
    <View style={styles.bannerContainer}>
      {/* Left Section: Text and Price */}
      <View style={styles.leftSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>$4.99/mo</Text>
          <Text style={styles.originalPrice}>$8.00/mo</Text>
        </View>
        <Text style={styles.additionalText}>Subscribe to Contact Customers</Text>
      </View>

      {/* Right Section: Button */}
      <TouchableOpacity style={styles.getNowButton}
        onPress={() => navigation.navigate('Subscriptions')}
      >
        <Text style={styles.getNowText}>Get Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    borderWidth:0.3,
    padding: wp(3),
    borderColor:Colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: wp(1),
    shadowOffset: { width: 0, height: hp(0.5) },
    elevation: 3,
    width: '100%',
  },
  leftSection: {
    flex: 1,
    marginRight: wp(2),
  },
  mainText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: hp(0.5),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  discountedPrice: {
    fontSize: wp(3.5),
    fontFamily:Fonts.semiBold,
    color: Colors.black,
    marginRight: wp(2),
  },
  originalPrice: {
    fontSize: wp(3),
    fontFamily:Fonts.regular,
    color: Colors.black,
    textDecorationLine: 'line-through',
  },
  additionalText: {
    fontFamily:Fonts.regular,
    fontSize: wp(3),
    color: Colors.black,
    opacity: 0.8,
  },
  getNowButton: {
    backgroundColor: Colors.white,
    borderRadius: wp(2),borderWidth:0.3,
    borderColor:Colors.primary,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  getNowText: {
    fontSize: wp(3.5),
    fontFamily:Fonts.bold,
    color: Colors.primary,
    textAlign: 'center',
  },
});

export default Banner;