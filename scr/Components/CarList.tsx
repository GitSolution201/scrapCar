import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Helper/Colors';
import {hp, wp} from '../Helper/Responsive';
import {Fonts} from '../Helper/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavoriteRequest} from '../redux/slices/favouriteSlice';
import {RequestLocationPermission} from '../Helper/Permisions';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-simple-toast';
import {getFavListingsRequest} from '../redux/slices/favouriteListingSlice';

const localImages = {
  car1: require('../assets/car.png'),
  car2: require('../assets/car2.png'),
};

export default function CarList({
  item,
  itemIndex,
  onPress,
}: {
  item: any;
  itemIndex: any;
  onPress;
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {favoriteItems} = useSelector((state: any) => state?.favourite);
  const token = useSelector((state: any) => state.auth?.token);
  const isFavorite = favoriteItems.includes(item._id);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    const hasLocationPermission = await RequestLocationPermission();
    if (hasLocationPermission === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const getLocalImage = (index: any) => {
    const imageKeys = Object.keys(localImages);
    return localImages[imageKeys[index % imageKeys.length]];
  };
  const getTimeAgo = dateString => {
    const dateAdded = new Date(dateString);
    const now = new Date();
    const diffInMs = now - dateAdded;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const timeAgo = getTimeAgo(item.date_added);
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const latDiff = lat2 - lat1;
    const lonDiff = lon2 - lon1;
    const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 69;
    return distance.toFixed(1) + ' mi';
  };
  let distance = 'N/A';
  if (
    currentLocation.latitude &&
    currentLocation.longitude &&
    item.latitude &&
    item.longitude
  ) {
    distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      item.latitude,
      item.longitude,
    );
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDeatils', {car: item})}
      style={styles.listingCard}>
      {/* Heart Icon (Top-right corner) */}
      <TouchableOpacity style={styles.heartIconContainer} onPress={onPress}>
        <Image
          source={
            isFavorite
              ? require('../assets/heart.png')
              : require('../assets/simpleHeart.png')
          }
          style={styles.heartIcon}
          tintColor={Colors?.black}
        />
      </TouchableOpacity>
      {/* Car Image */}
      <Image
        // source={getLocalImage(itemIndex)}
        source={{uri: item?.displayImage}}
        style={styles.carImage}
        resizeMode="contain"
      />

      {/* Car Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.carTagContainer}>
          <Text style={styles.scrapText}>{item.tag || 'Unknown'}</Text>
        </View>
        <Text style={styles.carTitle}>
          {item.make} {item.model} ({item.yearOfManufacture})
        </Text>
        {[
          ['Registration:', item.registrationNumber],
          ['Year:', item.yearOfManufacture],
          ['Postcode:', item.postcode],
          ['Colour:', item.color],
          ['Model:', item.model],
          ['Fuel Type:', item.fuelType],
          // ['Phone:', car.phoneNumber ? `+${car.phoneNumber}` : 'N/A'],
          // ['MOT Status:', car.motStatus],
          // ['MOT Expiry:', car.motExpiryDate || 'No issues reported'],
        ].map(([label, value], index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
              {value?.toString().toUpperCase() || 'N/A'}
            </Text>
          </View>
        ))}
        {/* <Text style={styles.details}>
             Registration: {item.registrationNumber}
           </Text>
           <Text style={styles.details}>Postcode: {item.postcode}</Text>
           <Text style={styles.details}>
             Engine Capacity: {item.engineCapacity} cc
           </Text>
           <Text style={styles.details}>Fuel Type: {item.fuelType}</Text>
           <Text style={styles.details}>Problem: {item.problem}</Text>
      */}
        {/* Footer */}
        <View style={styles.footer}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../assets/pin.png')} style={styles.icon} />
            <Text style={styles.footerText}>{distance}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/timer.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{timeAgo}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../assets/eye.png')} style={styles.icon} />
            <Text style={styles.footerText}>{item?.views?.length}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  listingCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 0.2,
    marginTop: hp(5),
    marginBottom: hp(3.5),
    paddingTop: hp(3.5),
    paddingHorizontal: wp(3.5),
    paddingBottom: hp(2),
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    shadowOffset: {width: 0, height: hp(0.5)},
    elevation: 3,
  },
  heartIconContainer: {
    position: 'absolute',
    top: hp(2),
    left: wp(7),
    zIndex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: hp(1),
  },
  label: {
    fontSize: wp(4),
    color: Colors.darkGray,
    minWidth: wp(30),
    textAlign: 'right',
    paddingRight: wp(3),
  },
  value: {
    fontSize: wp(4),
    color: Colors.darkGray,
    fontFamily: Fonts.bold,
    width: '65%',
  },
  heartIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },
  carImage: {
    position: 'absolute',
    top: wp(-30),
    right: 0,
    width: '65%',
    height: '65%',
  },
  detailsContainer: {
    padding: wp(2.5),
  },
  carTagContainer: {
    backgroundColor: Colors.primary,
    borderRadius: wp(10),
    paddingHorizontal: wp(2),
    alignSelf: 'flex-start',
    marginTop: wp(3),
  },
  scrapText: {
    textTransform: 'capitalize',
    fontFamily: Fonts.regular,
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    textAlign: 'center',
    color: Colors.white,
  },
  carTitle: {
    fontSize: wp(4.5),
    fontFamily: Fonts.bold,
    color: Colors.primary,
    paddingVertical: hp(1),
  },
  details: {
    fontSize: wp(3.5),
    color: Colors.textGray,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  footerText: {
    marginTop: wp(2),
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    color: Colors.black,
  },
  icon: {
    width: wp(4),
    resizeMode: 'contain',
    height: wp(4),
    tintColor: Colors.black,
  },
});
