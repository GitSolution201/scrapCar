// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Modal,
//   Platform,
// } from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import Colors from '../../Helper/Colors';
// import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import Slider from '@react-native-community/slider';
// import {hp, wp} from '../../Helper/Responsive';

// const MapListings = () => {
//   const navigation = useNavigation();
//   const [selectedCar, setSelectedCar] = useState(null);
//   const {data} = useSelector((state: any) => state.carListings);
//   const [distance, setDistance] = useState(5);

//   const closeModal = () => {
//     setSelectedCar(null); // Close the modal
//   };

//   const handleModalContentPress = () => {
//     // Navigate to CarDetails when modal content is pressed
//     navigation.navigate('CarDeatils', {car: selectedCar});
//     setSelectedCar(null); // Close the modal
//   };

//   const [region, setRegion] = useState({
//     latitude: 51.451696,
//     longitude: 0.190079,
//     latitudeDelta: 0.05,
//     longitudeDelta: 0.05,
//   });

//   return (
//     <View style={styles.container}>
//       {/* Map Section */}
//       <View style={styles.sliderContainer} pointerEvents="box-none">
//         <Text style={styles.label}>Distance</Text>
//         <Text style={styles.distanceText}>{distance}km</Text>
//         <Slider
//           style={styles.slider}
//           minimumValue={1}
//           maximumValue={50}
//           step={1}
//           value={distance}
//           minimumTrackTintColor="blue"
//           maximumTrackTintColor="gray"
//           thumbTintColor="blue"
//         />
//       </View>

//       <View style={styles.mapContainer}>
//         <MapView
//           style={styles.map}
//         region={region}>
//           {data?.map((car: any, index: any) => {
//             console.log('@@data', car);
//             return (
//               <Marker
//                 key={car.uniqueId}
//                 coordinate={{
//                   latitude: parseFloat(car.latitude),
//                   longitude: parseFloat(car.longitude),
//                 }}
//                 title={`${car.make} ${car.model}`}
//                 description={
//                   car.problem ? `Issue: ${car.problem}` : 'No issues reported'
//                 }
//                 onPress={() => setSelectedCar(car)}
//               />
//             );
//           })}
//         </MapView>
//       </View>

//       {/* Bottom Modal */}
//       <Modal visible={!!selectedCar} animationType="slide" transparent>
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={closeModal}>
//           <TouchableOpacity
//             style={styles.modalContent}
//             activeOpacity={1}
//             onPress={handleModalContentPress}>
//             {/* Blue Header */}
//             <View style={styles.header}>
//               <Text
//                 style={styles.headerTitleStyle}
//                 numberOfLines={3}
//                 ellipsizeMode="tail">
//                 {selectedCar?.make} {selectedCar?.model}{' '}
//                 {selectedCar?.yearOfManufacture}
//               </Text>

//               <TouchableOpacity
//                 style={styles.crossContainer}
//                 onPress={() => setSelectedCar(false)}>
//                 <Image
//                   source={require('../../assets/cross.png')}
//                   tintColor={Colors.white}
//                   resizeMode="contain"
//                   style={{width: wp(4.5), height: wp(4.5)}}
//                 />
//               </TouchableOpacity>

//               <Image
//                 source={require('../../assets/landcruser.png')}
//                 style={styles.carImage}
//               />
//             </View>

//             {/* Features Section */}
//             <View>
//               <Text style={[styles.headerTitle, styles.headerFeatureText]}>
//                 View Listings
//               </Text>

//               <View style={styles.featuresContainer}>
//                 <View style={styles.featureCard}>
//                   <Image
//                     source={require('../../assets/Fuel.png')}
//                     style={styles.icon}
//                     tintColor={Colors.primary}
//                     resizeMode="contain"
//                   />
//                   <Text style={styles.featureTitle}>Fuel Type</Text>
//                   <Text style={styles.featureSubText}>
//                     {selectedCar?.fuelType}
//                   </Text>
//                 </View>
//                 <View style={styles.featureCard}>
//                   <Image
//                     source={require('../../assets/Accelator.png')}
//                     style={styles.icon}
//                     resizeMode="contain"
//                   />
//                   <Text style={styles.featureTitle}>Engine</Text>
//                   <Text style={styles.featureSubText}>
//                     {selectedCar?.engineCapacity} cc
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   sliderContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     right: 20,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 10,
//     elevation: 3,
//     opacity: 0.8,
//     zIndex: 1,
//   },
//   label: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   distanceText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'blue',
//     textAlign: 'center',
//   },
//   slider: {
//     width: '100%',
//     height: 20,
//   },
//   mapContainer: {flex: 1},
//   map: {width: '100%', height: '100%'},

//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     // backgroundColor: 'rgba(0, 0, 0, 0.13)', // Semi-transparent background
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginVertical: hp(0.5),
//     marginRight: 10,
//   },
//   modalContent: {
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     overflow: 'hidden',
//     paddingBottom: 20,
//   },
//   // Header Section
//   header: {
//     backgroundColor: '#007BFF',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   headerTitle: {
//     fontSize: 20,
//     paddingBottom: hp(2),
//     marginBottom: hp(1),
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   headerTitleStyle: {
//     fontSize: 20,
//     paddingRight: hp(3),
//     fontWeight: 'bold',
//     width: wp(50),
//     color: '#FFF',
//   },
//   headerFeatureText: {
//     color: Colors.primary,
//     padding: 20,
//   },
//   headerSubText: {
//     fontSize: 16,
//     color: '#E0E0E0',
//   },
//   carImage: {
//     width: 150,
//     height: 100,
//     resizeMode: 'contain',
//     position: 'absolute',
//     bottom: -30,
//     right: 20,
//   },

//   // Features Section
//   featuresContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     margin: 10,
//   },
//   featureCard: {
//     borderColor: 'grey',
//     borderWidth: 0.5,
//     borderRadius: 10,
//     padding: 10,
//     width: '45%',
//     ...(Platform.OS === 'android'
//       ? {elevation: 0}
//       : {
//           shadowColor: '#000',
//           shadowOpacity: 0.1,
//           shadowOffset: {width: 0, height: 2},
//           shadowRadius: 4,
//         }),
//   },
//   featureIcon: {
//     fontSize: 28,
//     color: '#007BFF',
//     marginBottom: 8,
//   },
//   featureTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   featureSubText: {
//     fontSize: 12,
//     color: '#555',
//   },
//   crossContainer: {
//     width: wp(6),
//     height: wp(6),
//     borderRadius: wp(4),
//     backgroundColor: Colors.footerGray,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//   },
// });

// export default MapListings;

import React, { useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Platform,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Colors from '../../Helper/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import {hp, wp} from '../../Helper/Responsive';

const MapListings = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const {data} = useSelector((state: any) => state.carListings);
  const [distance, setDistance] = useState(5); // Distance in kilometers

  const closeModal = () => {
    setSelectedCar(null); // Close the modal
  };

  const handleModalContentPress = () => {
    // Navigate to CarDetails when modal content is pressed
    navigation.navigate('CarDeatils', {car: selectedCar});
    setSelectedCar(null); // Close the modal
  };

  const [region, setRegion] = useState({
    latitude: 51.451696,
    longitude: 0.190079,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Convert kilometers to miles
  const kilometersToMiles = km => {
    return km * 0.621371;
  };

  // Update the map region based on the distance
  const updateRegion = distance => {
    const delta = distance / 50; // Adjust the delta based on distance
    setRegion({
      ...region,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  };

  // Handle slider value change
  const handleSliderComplete = value => {
    setDistance(value);
    updateRegion(value);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {paddingTop: Platform.OS === 'ios' ? hp(2) : 0},
      ]}>
      {/* Map Section */}
      <View style={styles.sliderContainer} pointerEvents="box-none">
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.distanceText}>
          {kilometersToMiles(distance).toFixed(2)} miles
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={distance}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="gray"
          thumbTintColor="blue"
          onSlidingComplete={handleSliderComplete} // Use onSlidingComplete instead of onValueChange
          // onValueChange={handleSliderChange}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region}>
          {data?.map((car: any, index: any) => {
            return (
              <Marker
                key={car.uniqueId}
                coordinate={{
                  latitude: parseFloat(car.latitude),
                  longitude: parseFloat(car.longitude),
                }}
                title={`${car.make} ${car.model}`}
                description={
                  car.problem ? `Issue: ${car.problem}` : 'No issues reported'
                }
                onPress={() => setSelectedCar(car)}
              />
            );
          })}
        </MapView>
      </View>

      {/* Bottom Modal */}
      <Modal visible={!!selectedCar} animationType="slide" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}>
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={handleModalContentPress}>
            {/* Blue Header */}
            <View style={styles.header}>
              <Text
                style={styles.headerTitleStyle}
                numberOfLines={3}
                ellipsizeMode="tail">
                {selectedCar?.make} {selectedCar?.model}{' '}
                {selectedCar?.yearOfManufacture}
              </Text>

              <TouchableOpacity
                style={styles.crossContainer}
                onPress={() => setSelectedCar(false)}>
                <Image
                  source={require('../../assets/cross.png')}
                  tintColor={Colors.white}
                  resizeMode="contain"
                  style={{width: wp(4.5), height: wp(4.5)}}
                />
              </TouchableOpacity>

              <Image
                source={require('../../assets/landcruser.png')}
                style={styles.carImage}
              />
            </View>

            {/* Features Section */}
            <View>
              <Text style={[styles.headerTitle, styles.headerFeatureText]}>
                View Listings
              </Text>

              <View style={styles.featuresContainer}>
                <View style={styles.featureCard}>
                  <Image
                    source={require('../../assets/Fuel.png')}
                    style={styles.icon}
                    tintColor={Colors.primary}
                    resizeMode="contain"
                  />
                  <Text style={styles.featureTitle}>Fuel Type</Text>
                  <Text style={styles.featureSubText}>
                    {selectedCar?.fuelType}
                  </Text>
                </View>
                <View style={styles.featureCard}>
                  <Image
                    source={require('../../assets/Accelator.png')}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <Text style={styles.featureTitle}>Engine</Text>
                  <Text style={styles.featureSubText}>
                    {selectedCar?.engineCapacity} cc
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  sliderContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    opacity: 0.8,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 20,
  },
  mapContainer: {flex: 1},
  map: {width: '100%', height: '100%'},

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.13)', // Semi-transparent background
  },
  icon: {
    width: 30,
    height: 30,
    marginVertical: hp(0.5),
    marginRight: 10,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  // Header Section
  header: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    paddingBottom: hp(2),
    marginBottom: hp(1),
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerTitleStyle: {
    fontSize: 20,
    paddingRight: hp(3),
    fontWeight: 'bold',
    width: wp(50),
    color: '#FFF',
  },
  headerFeatureText: {
    color: Colors.primary,
    padding: 20,
  },
  headerSubText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  carImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -30,
    right: 20,
  },

  // Features Section
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  featureCard: {
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    width: '45%',
    ...(Platform.OS === 'android'
      ? {elevation: 0}
      : {
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 4,
        }),
  },
  featureIcon: {
    fontSize: 28,
    color: '#007BFF',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  featureSubText: {
    fontSize: 12,
    color: '#555',
  },
  crossContainer: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(4),
    backgroundColor: Colors.footerGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export default MapListings;
