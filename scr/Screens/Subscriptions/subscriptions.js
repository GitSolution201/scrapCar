// // // import React, {useState} from 'react';
// // // import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

// // // const SubscriptionScreen = ({navigation}: {navigation: any}) => {
// // //   const [activeSubscription, setActiveSubscription] = useState(null); // To track the active subscription

// // //   const handleSubscriptionPress = type => {
// // //     setActiveSubscription(type);
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <TouchableOpacity onPress={() => navigation.goBack()}>
// // //         <Image
// // //           source={require('../../assets/arrow.png')}
// // //           style={styles.iconBack}
// // //         />
// // //       </TouchableOpacity>

// // //       <Text style={styles.title}>Subscription</Text>
// // //       <Text style={styles.heading}>Upgrade to Pro</Text>
// // //       <Text style={styles.description}>
// // //         Get access to exclusive features tailored for Scrap and Salvage
// // //         services.
// // //       </Text>

// // //       {/* Subscription 1: Scrap */}
// // //       <TouchableOpacity
// // //         style={[
// // //           styles.subscriptionCard,
// // //           activeSubscription === 'Scrap' && styles.activeCard,
// // //         ]}
// // //         onPress={() => handleSubscriptionPress('Scrap')}>
// // //         <Text style={styles.subscriptionTitle}>Scrap</Text>
// // //         <Text style={styles.subscriptionDescription}>
// // //           Best for analyzing and managing scrap materials effectively. Save time
// // //           and maximize profits.
// // //         </Text>
// // //         <Text style={styles.subscriptionPrice}>$9.99 / month</Text>
// // //         {activeSubscription === 'Scrap' && (
// // //           <Text style={styles.activeText}>Active Subscription</Text>
// // //         )}
// // //       </TouchableOpacity>

// // //       {/* Subscription 2: Salvage */}
// // //       <TouchableOpacity
// // //         style={[
// // //           styles.subscriptionCard,
// // //           activeSubscription === 'Salvage' && styles.activeCard,
// // //         ]}
// // //         onPress={() => handleSubscriptionPress('Salvage')}>
// // //         <Text style={styles.subscriptionTitle}>Salvage</Text>
// // //         <Text style={styles.subscriptionDescription}>
// // //           Perfect for recovering valuable materials and optimizing salvage
// // //           operations.
// // //         </Text>
// // //         <Text style={styles.subscriptionPrice}>$14.99 / month</Text>
// // //         {activeSubscription === 'Salvage' && (
// // //           <Text style={styles.activeText}>Active Subscription</Text>
// // //         )}
// // //       </TouchableOpacity>

// // //       {/* Continue Button */}
// // //       <TouchableOpacity
// // //         onPress={() => navigation.goBack()}
// // //         style={styles.continueButton}>
// // //         <Text style={styles.continueText}>Purchase</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#f5f5f5',
// // //     padding: 20,
// // //     marginTop: 50,
// // //   },
// // //   iconBack: {
// // //     width: 40,
// // //     height: 40,
// // //   },
// // //   title: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     marginBottom: 10,
// // //     color: '#333',
// // //   },
// // //   heading: {
// // //     fontSize: 20,
// // //     fontWeight: '600',
// // //     marginVertical: 10,
// // //     color: '#555',
// // //   },
// // //   description: {
// // //     fontSize: 14,
// // //     color: '#777',
// // //     marginBottom: 20,
// // //   },
// // //   subscriptionCard: {
// // //     backgroundColor: '#d3d3d3', // Light grey by default
// // //     padding: 15,
// // //     borderRadius: 10,
// // //     marginBottom: 15,
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 5,
// // //     elevation: 3,
// // //   },
// // //   activeCard: {
// // //     backgroundColor: '#007BFF', // Blue for active subscription
// // //   },
// // //   subscriptionTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     marginBottom: 5,
// // //     color: '#333',
// // //   },
// // //   subscriptionDescription: {
// // //     fontSize: 14,
// // //     color: '#555',
// // //     marginBottom: 10,
// // //   },
// // //   subscriptionPrice: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     color: '#333',
// // //   },
// // //   activeText: {
// // //     marginTop: 10,
// // //     fontSize: 14,
// // //     fontWeight: '600',
// // //     color: '#fff',
// // //   },
// // //   continueButton: {
// // //     backgroundColor: '#007BFF',
// // //     paddingVertical: 15,
// // //     borderRadius: 10,
// // //     alignItems: 'center',
// // //   },
// // //   continueText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //   },
// // // });

// // // export default SubscriptionScreen;
// // import {useNavigation} from '@react-navigation/native';
// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   Switch,
// //   StyleSheet,
// //   Image,
// // } from 'react-native';
// // import Colors from '../../Helper/Colors';
// // import {hp, wp} from '../../Helper/Responsive';

// // const SubscriptionScreen = () => {
// //   const navigation = useNavigation();
// //   const [isTrialEnabled, setIsTrialEnabled] = useState(true);

// //   return (
// //     <View style={styles.container}>
// //       {/* <Text style={styles.header}>Subscription</Text> */}
// //       <View style={styles.headerTitleStyle}>
// //         <TouchableOpacity
// //           style={styles.backButton}
// //           onPress={() => navigation.goBack()}>
// //           <Image
// //             source={require('../../assets/arrow.png')}
// //             style={styles.iconBack}
// //             tintColor={Colors.backIconColor}
// //           />
// //         </TouchableOpacity>
// //         <View style={styles.header}>
// //           <Text style={styles.headerTitle}>Listings</Text>
// //         </View>
// //       </View>
// //       <Text style={styles.subHeader}>Upgrade to Pro</Text>
// //       <Text style={styles.description}>
// //         Quickly analyze images, accurately classify visual elements, and easily
// //         train models, Anytime, Anywhere
// //       </Text>

// //       <TouchableOpacity style={styles.optionSelected}>
// //         <Text style={styles.optionText}>4.99$ / month</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={styles.option}>
// //         <Text style={styles.optionText}>23.99$ / 6 months</Text>
// //         <Text style={styles.optionSubText}>
// //           (6 months at $3.99/mo. Save 20%)
// //         </Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={styles.option}>
// //         <Text style={styles.optionText}>29.88$ / Year</Text>
// //         <Text style={styles.optionSubText}>
// //           (12 months at $2.49/mo. Save 20%)
// //         </Text>
// //       </TouchableOpacity>

// //       <Text style={styles.trialText}>
// //         Try <Text style={styles.boldText}>3 days free</Text>, then $8 per month
// //       </Text>
// //       <Text style={styles.trialSubText}>Auto renewable & Cancel anytime</Text>

// //       <View style={styles.switchContainer}>
// //         <Text style={styles.switchLabel}>Enable Free Trial</Text>
// //         <Switch value={isTrialEnabled} onValueChange={setIsTrialEnabled} />
// //       </View>

// //       <TouchableOpacity style={styles.continueButton}>
// //         <Text style={styles.continueText}>Continue</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8F9FC',
// //     padding: 20,
// //     alignItems: 'center',
// //   },
// //   headerTitleStyle: {
// //     flexDirection: 'row',
// //     marginBottom: 20,
// //     alignItems: 'center',
// //     marginTop: hp(3),
// //   },
// //   iconBack: {
// //     width: 30,
// //     height: 30,
// //     resizeMode: 'contain',
// //   },

// //   header: {
// //     alignItems: 'center',
// //     textAlign: 'center',
// //     justifyContent: 'center',
// //     flex: 1,
// //     marginRight: wp(5),
// //   },
// //   backButton: {
// //     marginRight: 10,
// //   },
// //   backText: {
// //     fontSize: 24,
// //     color: '#007BFF',
// //   },
// //   headerTitle: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   subHeader: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#3F51B5',
// //     marginTop: 10,
// //   },
// //   description: {
// //     fontSize: 14,
// //     color: 'gray',
// //     textAlign: 'center',
// //     marginVertical: 10,
// //   },
// //   option: {
// //     width: '100%',
// //     padding: 15,
// //     borderRadius: 10,
// //     backgroundColor: '#EDEFF5',
// //     marginTop: 10,
// //     alignItems: 'center',
// //   },
// //   optionSelected: {
// //     width: '100%',
// //     padding: 15,
// //     borderRadius: 10,
// //     borderWidth: 2,
// //     borderColor: '#3F51B5',
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   optionText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   optionSubText: {
// //     fontSize: 12,
// //     color: 'gray',
// //   },
// //   trialText: {
// //     fontSize: 14,
// //     marginTop: 20,
// //   },
// //   trialSubText: {
// //     fontSize: 12,
// //     color: 'gray',
// //   },
// //   boldText: {
// //     fontWeight: 'bold',
// //   },
// //   switchContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     width: '100%',
// //     alignItems: 'center',
// //     backgroundColor: '#FFFFFF',
// //     padding: 15,
// //     borderRadius: 10,
// //     marginVertical: 10,
// //   },
// //   switchLabel: {
// //     fontSize: 14,
// //   },
// //   continueButton: {
// //     width: '100%',
// //     padding: 15,
// //     borderRadius: 10,
// //     backgroundColor: '#3F51B5',
// //     alignItems: 'center',
// //     marginTop: 20,
// //   },
// //   continueText: {
// //     color: 'white',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default SubscriptionScreen;
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Switch,
//   StyleSheet,
//   Dimensions,
//   Image,
// } from 'react-native';
// import Colors from '../../Helper/Colors';

// const {width: wp, height: hp} = Dimensions.get('window');

// const SubscriptionScreen = () => {
//   const [isTrialEnabled, setIsTrialEnabled] = useState(true);

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.header}>Subscription</Text> */}
//       <View style={styles.headerTitleStyle}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}>
//           <Image
//             source={require('../../assets/arrow.png')}
//             style={styles.iconBack}
//             tintColor={Colors.backIconColor}
//           />
//         </TouchableOpacity>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Listings</Text>
//         </View>
//       </View>
//       <Text style={styles.subHeader}>Upgrade to Pro</Text>
//       <Text style={styles.description}>
//         Quickly analyze images, accurately classify visual elements, and easily
//         train models, Anytime, Anywhere
//       </Text>

//       <TouchableOpacity style={styles.optionSelected}>
//         <Text style={styles.optionText}>4.99$ / month</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.option}>
//         <Text style={styles.optionText}>23.99$ / 6 months</Text>
//         <Text style={styles.optionSubText}>
//           (6 months at $3.99/mo. Save 20%)
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.option}>
//         <Text style={styles.optionText}>29.88$ / Year</Text>
//         <Text style={styles.optionSubText}>
//           (12 months at $2.49/mo. Save 20%)
//         </Text>
//       </TouchableOpacity>

//       <Text style={styles.trialText}>
//         Try <Text style={styles.boldText}>3 days free</Text>, then $8 per month
//       </Text>
//       <Text style={styles.trialSubText}>Auto renewable & Cancel anytime</Text>

//       <View style={styles.switchContainer}>
//         <Text style={styles.switchLabel}>Enable Free Trial</Text>
//         <Switch value={isTrialEnabled} onValueChange={setIsTrialEnabled} />
//       </View>

//       <TouchableOpacity style={styles.continueButton}>
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.gray,
//     padding: wp * 0.05,
//     alignItems: 'center',
//   },
//   headerTitleStyle: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     alignItems: 'center',
//     marginTop: hp(3),
//   },
//   iconBack: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },

//   header: {
//     alignItems: 'center',
//     textAlign: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginRight: wp(5),
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   backText: {
//     fontSize: 24,
//     color: '#007BFF',
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   subHeader: {
//     fontSize: wp * 0.05,
//     fontWeight: 'bold',
//     color: Colors.primary,
//     marginTop: hp * 0.02,
//   },
//   description: {
//     fontSize: wp * 0.04,
//     color: Colors.textGray,
//     textAlign: 'center',
//     marginVertical: hp * 0.02,
//   },
//   option: {
//     width: '100%',
//     padding: hp * 0.02,
//     borderRadius: 10,
//     backgroundColor: Colors.lightGray,
//     marginTop: hp * 0.015,
//     alignItems: 'center',
//   },
//   optionSelected: {
//     width: '100%',
//     padding: hp * 0.02,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: Colors.primary,
//     alignItems: 'center',
//     marginTop: hp * 0.015,
//   },
//   optionText: {
//     fontSize: wp * 0.045,
//     fontWeight: 'bold',
//     color: Colors.darkGray,
//   },
//   optionSubText: {
//     fontSize: wp * 0.035,
//     color: Colors.textGray,
//   },
//   trialText: {
//     fontSize: wp * 0.04,
//     marginTop: hp * 0.03,
//     color: Colors.darkGray,
//   },
//   trialSubText: {
//     fontSize: wp * 0.035,
//     color: Colors.footerGray,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//     padding: hp * 0.02,
//     borderRadius: 10,
//     marginVertical: hp * 0.02,
//   },
//   switchLabel: {
//     fontSize: wp * 0.04,
//     color: Colors.darkGray,
//   },
//   continueButton: {
//     width: '100%',
//     padding: hp * 0.02,
//     borderRadius: 10,
//     backgroundColor: Colors.primary,
//     alignItems: 'center',
//     marginTop: hp * 0.03,
//   },
//   continueText: {
//     color: Colors.white,
//     fontSize: wp * 0.045,
//     fontWeight: 'bold',
//   },
// });

// export default SubscriptionScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Colors from '../../Helper/Colors';

const {width: wp, height: hp} = Dimensions.get('window');

const SubscriptionScreen = () => {
  const [isTrialEnabled, setIsTrialEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleStyle}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrow.png')}
            style={styles.iconBack}
            tintColor={Colors.backIconColor}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Subscription</Text>
        </View>
      </View>
      <Text style={styles.subHeader}>Upgrade to Pro</Text>
      <Text style={styles.description}>
        Quickly analyze images, accurately classify visual elements, and easily
        train models, Anytime, Anywhere
      </Text>

      <TouchableOpacity style={styles.optionSelected}>
        <Text style={styles.optionText}>4.99$ / month</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>23.99$ / 6 months</Text>
        <Text style={styles.optionSubText}>
          (6 months at $3.99/mo. Save 20%)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>29.88$ / Year</Text>
        <Text style={styles.optionSubText}>
          (12 months at $2.49/mo. Save 20%)
        </Text>
      </TouchableOpacity>

      <Text style={styles.trialText}>
        Try <Text style={styles.boldText}>3 days free</Text>, then $8 per month
      </Text>
      <Text style={styles.trialSubText}>Auto renewable & Cancel anytime</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Free Trial</Text>
        <Switch value={isTrialEnabled} onValueChange={setIsTrialEnabled} />
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingHorizontal: wp * 0.05,
    alignItems: 'center',
  },
  headerTitleStyle: {
    flexDirection: 'row',
    marginBottom: hp * 0.02,
    alignItems: 'center',
    marginTop: hp * 0.03,
  },
  iconBack: {
    width: wp * 0.08,
    height: hp * 0.04,
    resizeMode: 'contain',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: wp * 0.05,
  },
  backButton: {
    // marginRight: wp * 0.02x,
  },
  headerTitle: {
    fontSize: wp * 0.06,
    color: Colors.black,
  },
  subHeader: {
    fontSize: wp * 0.05,
    fontWeight: '500',
    color: Colors.primary,
    marginTop: hp * 0.02,
  },
  description: {
    fontSize: wp * 0.04,
    color: Colors.dummyText,
    textAlign: 'center',
    marginVertical: hp * 0.02,
  },
  option: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    marginTop: hp * 0.015,
    alignItems: 'center',
  },
  optionSelected: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    marginTop: hp * 0.015,
  },
  optionText: {
    fontSize: wp * 0.045,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  optionSubText: {
    fontSize: wp * 0.035,
    color: Colors.textGray,
  },
  trialText: {
    fontSize: wp * 0.04,
    marginTop: hp * 0.03,
    color: Colors.darkGray,
  },
  trialSubText: {
    fontSize: wp * 0.035,
    color: Colors.footerGray,
  },
  boldText: {
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: hp * 0.02,
    borderRadius: 10,
    marginVertical: hp * 0.02,
  },
  switchLabel: {
    fontSize: wp * 0.04,
    color: Colors.darkGray,
  },
  continueButton: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: hp * 0.03,
  },
  continueText: {
    color: Colors.white,
    fontSize: wp * 0.045,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
