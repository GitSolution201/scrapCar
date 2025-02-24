// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Colors from '../Helper/Colors';
// import { hp, wp } from '../Helper/Responsive';

// const Banner = () => {
//   return (
//     <View style={styles.bannerContainer}>
//       {/* Left Section: Text and Price */}
//       <View style={styles.leftSection}>
//         <View style={styles.priceContainer}>
//           <Text style={styles.discountedPrice}>Only at $44.99</Text>
//           <Text style={styles.originalPrice}>$53.39</Text>
//         </View>
//         <Text style={styles.savingsText}>$15 Savings</Text>
//       </View>

//       {/* Right Section: Button and Additional Text */}
//       <View style={styles.rightSection}>
//         <TouchableOpacity style={styles.getNowButton}>
//           <Text style={styles.getNowText}>Get Now</Text>
//         </TouchableOpacity>
//         <Text style={styles.additionalText}>Subscribe to Contact Customers</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bannerContainer: {
//     flexDirection: 'row', // Horizontal layout
//     backgroundColor: Colors.primary,
//     borderRadius: wp(4),
//     padding: wp(3),
//     alignItems: 'center',
//     justifyContent: 'space-between', // Space between left and right sections
//     shadowColor: Colors.black,
//     shadowOpacity: 0.2,
//     shadowRadius: wp(2),
//     shadowOffset: { width: 0, height: hp(1) },
//     elevation: 5,
//   },
//   leftSection: {
//     flex: 1, // Takes up available space
//     marginRight: wp(2), // Space between left and right sections
//   },
//   mainText: {
//     fontSize: wp(4.5),
//     fontWeight: 'bold',
//     color: Colors.white,
//     marginBottom: hp(0.5),
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp(0.5),
//   },
//   discountedPrice: {
//     fontSize: wp(4),
//     fontWeight: 'bold',
//     color: Colors.white,
//     marginRight: wp(2),
//   },
//   originalPrice: {
//     fontSize: wp(3.5),
//     color: Colors.lightGray,
//     textDecorationLine: 'line-through',
//   },
//   savingsText: {
//     fontSize: wp(3.5),
//     color: Colors.white,
//   },
//   rightSection: {
//     alignItems: 'flex-end', // Align button and text to the right
//   },
//   getNowButton: {
//     backgroundColor: Colors.white,
//     borderRadius: wp(2),
//     paddingVertical: hp(1),
//     paddingHorizontal: wp(5),
//     marginBottom: hp(0.5),
//   },
//   getNowText: {
//     fontSize: wp(4),
//     fontWeight: 'bold',
//     color: Colors.primary,
//     textAlign: 'center',
//   },
//   additionalText: {
//     fontSize: wp(3.5),
//     color: Colors.white,
//     textAlign: 'right',
//   },
// });

// export default Banner;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Helper/Colors';
import { hp, wp } from '../Helper/Responsive';


const Banner = ({navigation}:{navigation:any}) => {
  return (
    <View style={styles.bannerContainer}>
      {/* Left Section: Text and Price */}
      <View style={styles.leftSection}>
        <Text style={styles.mainText}>Upgrade to Pro</Text>
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
    backgroundColor: Colors.primary,
    borderRadius: wp(3),
    padding: wp(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: wp(1),
    shadowOffset: { width: 0, height: hp(0.5) },
    elevation: 3,
    width: '100%',
    // marginTop: hp(2),
  },
  leftSection: {
    flex: 1,
    marginRight: wp(2),
  },
  mainText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: hp(0.5),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  discountedPrice: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: Colors.white,
    marginRight: wp(2),
  },
  originalPrice: {
    fontSize: wp(3),
    color: Colors.lightGray,
    textDecorationLine: 'line-through',
  },
  additionalText: {
    fontSize: wp(3),
    color: Colors.white,
    opacity: 0.8, // Slightly transparent for subtlety
  },
  getNowButton: {
    backgroundColor: Colors.white,
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  getNowText: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
});

export default Banner;