import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  Modal,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Colors from '../../Helper/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest} from '../../redux/slices/carListingsSlice';
import {hp, wp} from '../../Helper/Responsive';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Banner from '../../Components/Banner';
import {Fonts} from '../../Helper/Fonts';
import {toggleFavoriteRequest} from '../../redux/slices/favouriteSlice';
import {RequestLocationPermission} from '../../Helper/Permisions';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-simple-toast';
import {getDistance} from 'geolib'; // Import geolib for distance calculation
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {updateViewCountRequest} from '../../redux/slices/viewCount';
import {axiosHeader} from '../../Services/apiHeader';
import api from '../../redux/api';
import Slider from '@react-native-community/slider';

// Local images
const localImages = {
  car1: require('../../assets/car.png'),
  car2: require('../../assets/car2.png'),
};

const Listings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.auth?.token);
  const subscriptionData = useSelector(
    state => state?.subscription?.subscriptionData,
  );
  // const {loading, error, carListings} = useSelector((state: any) => state.carListings);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [carListings, setCarListings] = useState([]); // Data state
  const {favoriteItems} = useSelector((state: any) => state?.favourite);
  const [activeFilters, setActiveFilters] = useState(['Scrap', 'Salvage']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [distance, setDistance] = useState(5); // Distance in kilometers

  const [adress, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const locationOptions = [
    '5 miles',
    '10 miles',
    '20 miles',
    '25 miles',
    '50 miles',
  ];

  // useEffect(() => {
  //   if (isFocused) {
  //     dispatch(getUserRequest(token));
  //   }
  // }, [isFocused]);

  // Fetch carListings when the screen is focused
  useEffect(() => {
    if (isFocused) {
      fetchCarListings();
    }
  }, [isFocused]);
  useEffect(() => {
    getLocation();
  }, []);
  const fetchCarListings = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error('Token not found');
      }

      console.log('Token:', token);

      const response = await api.get('/car/get-all-listing', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCarListings(response.data);
    } catch (err) {
      if (err.response) {
        // Server response with error status (4xx, 5xx)
        console.log('API Error Response:', err.response.data);
        console.log('Status Code:', err.response.status);
        console.log('Headers:', err.response.headers);
        setError(err.response.data?.message || 'Something went wrong!');
      } else if (err.request) {
        // No response from server (Network error)
        console.log('API Request Error:', err.request);
        setError(
          'No response from server. Please check your internet connection.',
        );
      } else {
        // Other errors
        console.log('API Unexpected Error:', err.message);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //   const fetchCarListings = async () => {
  //     setLoading(true); // Set loading to true
  //     setError(null); // Reset error state

  //     try {
  //       if (!token) {
  //         throw new Error('Token not found');
  //       }
  // console.log(token)
  //       const response = await api.get('/car/get-all-listing', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       setCarListings(response.data); // Store carListings in state
  //     } catch (err) {
  //       console.log('API Error:', err);
  //       setError(err.message || 'Failed to fetch car listings'); // Set error message
  //     } finally {
  //       setLoading(false); // Set loading to false
  //     }
  //   };
  const getLocation = async () => {
    const hasLocationPermission = await RequestLocationPermission();
    if (hasLocationPermission === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setCurrentLocation({latitude, longitude});

  //       fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
  //           position?.coords.latitude
  //         },${
  //           position?.coords.longitude
  //         }&key=${'AIzaSyC9PCVumxPB8jcTCo15qDfq2aRLto7Eivs'}`,
  //         {
  //           method: 'get',
  //           headers: {
  //             Accept: 'application/json',
  //           },
  //         },
  //       )
  //         .then(res => res.json())
  //         .then(res => {
  //           const {formatted_address} = res?.results[0];
  //           const {lat, lng} = res?.results[0]?.geometry?.location;
  //           setAddress({
  //             streetName: formatted_address,
  //             latitude: lat,
  //             longitude: lng,
  //           });
  //           setLocation({
  //             evevtLocation: formatted_address,
  //             eventLat: lat,
  //             eventLng: lng,
  //           });
  //           // animateToRegion({
  //           //   latitude: lat,
  //           //   longitude: lng,
  //           //   latitudeDelta: 0.02305,
  //           //   longitudeDelta: 0.010525,
  //           // });
  //           // Toast.show(ToastMessages.locationFetch, Toast.SHORT, {
  //           //   backgroundColor: Colors.green,
  //           // });
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     },
  //     error => {
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };
  const handleFilterPress = filter => {
    if (filter === 'Saved') {
      navigation.navigate('Savage');
    } else {
      setActiveFilters(prevFilters =>
        prevFilters.includes(filter)
          ? prevFilters.filter(f => f !== filter)
          : [...prevFilters, filter],
      );
    }
  };

  const handleLocationSelect = location => {
    setSelectedLocation(location);
    setIsLocationModalVisible(false);
  };

  const resetFilter = () => {
    setSelectedLocation(null); // Reset the selected location filter
    setIsLocationModalVisible(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 'N/A';

    // Calculate distance in meters using geolib
    const distanceInMeters = getDistance(
      {latitude: lat1, longitude: lon1},
      {latitude: lat2, longitude: lon2},
    );

    // Convert meters to miles (1 meter = 0.000621371 miles)
    const distanceInMiles = (distanceInMeters * 0.000621371).toFixed(1); // Convert to miles and round to 1 decimal place

    return `${distanceInMiles} mi`; // Return distance in miles
  };

  const filteredData = carListings?.filter(item => {
    // Filter by active filters
    const filterMatch =
      (activeFilters.includes('Scrap') && item.tag === 'scrap') ||
      (activeFilters.includes('Salvage') && item.tag === 'salvage');
    // Filter by search query (postcode or location name)
    const searchMatch = item?.fullAddress
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter by distance if a location is selected
    let distanceMatch = true;
    if (
      selectedLocation &&
      currentLocation.latitude &&
      currentLocation.longitude &&
      item.latitude &&
      item.longitude
    ) {
      const distanceInMeters = getDistance(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        },
        {latitude: item.latitude, longitude: item.longitude},
      );

      const distanceInMiles = distanceInMeters * 0.000621371; // Convert meters to miles

      // Extract the numeric value from the selected location (e.g., "5 miles" -> 5)
      const selectedDistance = parseFloat(selectedLocation);

      // Ensure selectedDistance is a valid number
      // if (!isNaN(selectedDistance)) {
      distanceMatch = distanceInMiles <= selectedDistance;
    }
    // }

    return filterMatch && searchMatch && distanceMatch;
  });

  const noDataFound = filteredData?.length === 0;
  const sortedData = filteredData?.sort((a, b) => {
    const dateA = new Date(a.date_added);
    const dateB = new Date(b.date_added);
    return dateB - dateA;
  });

  const handleToggleFavorite = (item: any, isFavorite: boolean) => {
    dispatch(toggleFavoriteRequest({carId: item?._id, token}));
    if (isFavorite) {
      Toast.show(`${item.make} removed from Favorites`);
    } else {
      Toast.show(`${item.make} added to Favorites`);
    }
  };
  const handleCarDetailsNavigation = car => {
    dispatch(updateViewCountRequest({carId: car._id, token}));
    navigation.navigate('CarDeatils', {car});
  };
  const renderItem = ({item, index}) => {
    const isFavorite = favoriteItems?.includes(item._id);
    const getTimeAgo = dateString => {
      const dateAdded = new Date(dateString);
      const now = new Date();
      const diffInMs = now - dateAdded;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      return `${diffInDays} days ago`;
    };

    const timeAgo = getTimeAgo(item.date_added);
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      item.latitude,
      item.longitude,
    );

    return (
      <View style={styles.listingCardContainer}>
        <TouchableOpacity
          onPress={() => {
            if (item.isSold) {
              Alert.alert('Car Sold', 'This car has already been sold.', [
                {text: 'OK'},
              ]);
            } else {
              handleCarDetailsNavigation(item);
            }
          }}
          style={styles.listingCard}>
          {/* Heart icon - conditionally shown */}
          {!item.isSold && (
            <TouchableWithoutFeedback
              style={styles.heartIconContainer}
              onPress={() => handleToggleFavorite(item, isFavorite)}>
              <Image
                source={
                  isFavorite
                    ? require('../../assets/heart.png')
                    : require('../../assets/simpleHeart.png')
                }
                style={styles.heartIcon}
                tintColor={Colors?.black}
              />
            </TouchableWithoutFeedback>
          )}

          {/* Show SOLD text if car is sold */}
          {item.isSold && <Text style={styles.soldText}>SOLD</Text>}

          {/* Image - only shown if not sold */}
          {!item.isSold && (
            <Image
              source={{uri: item?.displayImage}}
              style={styles.carImage}
              resizeMode="contain"
            />
          )}

          {/* Details container - always visible but with reduced opacity if sold */}
          <View
            style={[styles.detailsContainer, item.isSold && {opacity: 0.5}]}>
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
            ].map(([label, value], index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.label}>{label}</Text>
                <Text
                  style={styles.value}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {value?.toString().toUpperCase() || 'N/A'}
                </Text>
              </View>
            ))}

            <View style={styles.footer}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../assets/pin.png')}
                  style={[styles.icon, item.isSold && {opacity: 0.5}]}
                />
                <Text
                  style={[styles.footerText, item.isSold && {opacity: 0.5}]}>
                  {distance}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../assets/timer.png')}
                  style={[styles.icon, item.isSold && {opacity: 0.5}]}
                />
                <Text
                  style={[styles.footerText, item.isSold && {opacity: 0.5}]}>
                  {timeAgo}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../assets/eye.png')}
                  style={[styles.icon, item.isSold && {opacity: 0.5}]}
                />
                <Text
                  style={[styles.footerText, item.isSold && {opacity: 0.5}]}>
                  {item?.views?.length}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading Listings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  const handleSliderComplete = () => {
    console.log('object');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Banner navigation={navigation} />

      {/* <TouchableOpacity onPress={() => setIsLocationModalVisible(true)}>
          <Image
            source={require('../../assets/location.png')}
            style={styles.locationIcon}
          />
        </TouchableOpacity> */}
      {/* </View> */}
      <View style={styles.locationContainer}>
        <View style={styles.sliderContainer} pointerEvents="box-none">
          <Text style={styles.distanceText}>
            {/* {kilometersToMiles(distance).toFixed(0)} miles */}
            10 miles
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={80}
            step={1}
            value={distance}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="gray"
            thumbTintColor="blue"
            onSlidingComplete={handleSliderComplete}
          />
        </View>
        {/* <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search by location..."
            placeholderTextColor={Colors.textGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View> */}
        <TouchableOpacity onPress={() => setIsLocationModalVisible(true)}>
          <Image
            source={require('../../assets/location.png')}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isLocationModalVisible}
        onRequestClose={() => setIsLocationModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsLocationModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.distanceByFilter}>Distance by filter</Text>
            {locationOptions.map((location, index) => (
              <TouchableOpacity
                key={location}
                style={[
                  styles.locationOption,
                  index === locationOptions.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
                onPress={() => handleLocationSelect(location)}>
                <Text style={styles.locationText}>{location}</Text>
                {selectedLocation === location && (
                  <Image
                    source={require('../../assets/tic.png')}
                    style={styles.tickIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
            {/* Reset Filter Button */}
            <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
              <Text style={styles.resetButtonText}>Reset Filter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.filterContainer}>
        {['Scrap', 'Salvage', 'Saved'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilters.includes(filter) && styles.filterButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => handleFilterPress(filter)}>
            <Text
              style={[
                styles.filterText,
                activeFilters.includes(filter) && styles.filterTextActive,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Show error message if no carListings is found */}
      {noDataFound ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            No carListings found for the selected filters.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

// Styles remain the same...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2),
    ...Platform.select({
      android: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
      },
      ios: {
        margin: 20, // Apply margin to all sides for iOS
      },
    }),
    backgroundColor: Colors.gray,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp(1),
    fontSize: wp(4),
    color: Colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: wp(4),
    color: Colors.textGray,
  },
  icon: {
    width: wp(4),
    resizeMode: 'contain',
    height: wp(4),
    tintColor: Colors.black,
  },
  header: {
    marginVertical: wp(2),
  },

  searchMainContianer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(10),
    paddingHorizontal: wp(4),
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    shadowOffset: {width: 0, height: hp(0.5)},
    elevation: 3,
    width: wp(80),
    height: hp(6),
    alignSelf: 'flex-start',
    marginTop: wp(4),
  },
  searchIcon: {
    width: wp(3.5),
    height: wp(3.5),
    marginRight: wp(1),
    tintColor: Colors.textGray,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(-3),
    marginTop: hp(2),
  },

  locationIcon: {
    width: wp(8),
    height: wp(8),
    tintColor: Colors.footerGray,
    resizeMode: 'contain',
  },
  searchBar: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: hp(2),
    color: Colors.black,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: hp(2),
  },
  filterButton: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    marginHorizontal: wp(2),
    backgroundColor: Colors.lightGray,
    borderRadius: wp(10),
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontFamily: Fonts.regular,
    color: Colors.textGray,
    fontSize: wp(3),
  },
  filterTextActive: {
    color: Colors.white,
  },
  resetButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: 10,
  },
  resetButtonText: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
  list: {
    paddingBottom: hp(2.5),
    marginTop: hp(2.5),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
  },
  noDataText: {
    fontSize: wp(4),
    color: Colors.red,
    fontFamily: Fonts.regular,
  },
  //render item
  listingCardContainer: {
    marginTop: hp(1.5),
    marginBottom: hp(3.5),
    position: 'relative',
  },
  purchasedContainer: {
    position: 'absolute',
    top: hp(15),
    left: wp(2),
    right: wp(2),
    zIndex: 2,
    backgroundColor: Colors.white,
    paddingVertical: hp(6.8),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  purchasedText: {
    color: Colors.black,
    fontSize: wp(4),
    fontFamily: Fonts.bold,
    letterSpacing: 1,
  },
  listingCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 0.2,
    marginTop: hp(1.5),
    marginBottom: hp(3.5),
    paddingTop: hp(3.5),
    paddingHorizontal: wp(3.5),
    paddingBottom: hp(2),
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    shadowOffset: {width: 0, height: hp(0.5)},
    elevation: 3,
    overflow: 'hidden',
  },
  listingCardBlurred: {
    opacity: 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  blurredContent: {
    opacity: 0.7,
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
    fontFamily: Fonts.regular,
    color: Colors.darkGray,
    minWidth: wp(30),
    textAlign: 'right',
    paddingRight: wp(3),
  },
  value: {
    fontSize: wp(4),
    color: Colors.darkGray,
    fontFamily: Fonts.semiBold,
    width: '65%',
  },
  heartIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },
  carImage: {
    position: 'absolute',
    top: -hp(5),
    right: wp(2),
    width: '50%',
    height: '50%',
    zIndex: 1,
    resizeMode: 'contain',
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
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    textAlign: 'center',
    fontFamily: Fonts.regular,
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
  //Slider
  sliderContainer: {
    width: wp(82),

    borderRadius: 10,
    borderColor: Colors?.gray,
    borderWidth: 1,
    marginBottom: hp(1),
  },
  slider: {
    width: '100%',
    height: 15,
  },
  distanceText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: 'blue',
    textAlign: 'center',
  },
  //Modal
  modalOverlay: {
    marginRight: hp(7),
    marginTop: hp(15),
    alignSelf: 'flex-end',
  },
  distanceByFilter: {
    textAlign: 'center',
    borderBottomWidth: 0.3,
    borderColor: Colors.darkGray,
    color: Colors.primary,
    width: '90%',
    fontFamily: Fonts.semiBold,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    width: '50%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    fontFamily: Fonts.medium,
  },
  tickIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.primary,
  },

  soldText: {
    color: '#FF3B30',
    fontSize: wp(4.5),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    fontFamily: Fonts.bold,
  },
});

export default Listings;
