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
} from 'react-native';
import Colors from '../../Helper/Colors'; // Import Colors
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest} from '../../redux/slices/carListingsSlice';
import {hp, wp} from '../../Helper/Responsive'; // Import wp and hp
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Banner from '../../Components/Banner';
import { Fonts } from '../../Helper/Fonts';

// Local images
const localImages = {
  car1: require('../../assets/car.png'),
  car2: require('../../assets/car2.png'),
};

const Listings = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth?.token);
  const {loading, error, data} = useSelector((state: any) => state.carListings);
  const [activeFilters, setActiveFilters] = useState(['Scrap']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  const locationOptions = ['5 km', '10 km', '20 km', '25 km'];
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await dispatch(getUserRequest(token));
      };
      fetchData();
    }, [token]),
  );

  const getLocalImage = (index: any) => {
    const imageKeys = Object.keys(localImages);
    return localImages[imageKeys[index % imageKeys.length]];
  };

  const handleFilterPress = (filter: any) => {
    if (filter === 'Saved') {
      navigation.navigate('Savage');
    } else {
      let updatedFilters = [...activeFilters];
      if (updatedFilters.includes(filter)) {
        updatedFilters = updatedFilters.filter(f => f !== filter);
      } else {
        updatedFilters.push(filter);
      }
      setActiveFilters(updatedFilters);
    }
  };

  const handleLocationSelect = location => {
    setSelectedLocation(location);
    setIsLocationModalVisible(false); // Close the modal after selection
  };
  // Filter data based on active filters and search query
  const filteredData = data?.filter((item: any) => {
    // Filter by active filters
    const filterMatch =
      (activeFilters.includes('Scrap') && item.tag === 'scrap') ||
      (activeFilters.includes('Salvage') && item.tag === 'salvage');

    // Filter by search query (postcode or location name)
    const searchMatch =
      item.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationName?.toLowerCase().includes(searchQuery.toLowerCase());

    return filterMatch && searchMatch;
  });
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDeatils', {car: item})}
      style={styles.listingCard}>
      {/* Heart Icon (Top-right corner) */}
      <TouchableOpacity
        style={styles.heartIconContainer}
        onPress={() => console.log('Heart pressed for item:', item)}>
        <Image
          source={require('../../assets/simpleHeart.png')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>

      {/* Car Image */}
      <Image
        source={getLocalImage(index)}
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
          ['PostCode:', item.postcode],
          ['Colors:', item.color],
          ['Model:', item.model],
          ['Fuel Type:', item.fuelType],
          ['Problem:', item.problem],
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
            <Image
              source={require('../../assets/pin.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>
              {item?.distance ? item?.distance : '20.9 mi.'}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/timer.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{item.views} 50 minutes ago</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/eye.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{item.views} Views</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
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

  return (
    <SafeAreaView
      style={
        styles.container
       
     }>
      <Banner navigation={navigation} />
      <View style={styles.searchMainContianer}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search by postcode or location..."
            placeholderTextColor={Colors.textGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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
      {/* Search Bar */}

      {/* Listings */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
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
    color: Colors.red,
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
  locationIcon: {
    tintColor: Colors.footerGray,
    width: wp(7),
    marginTop: wp(3),
    height: wp(7),
    resizeMode: 'contain',
  },
  searchBar: {
    flex: 1,
    fontFamily:Fonts.regular,
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
    fontFamily:Fonts.regular,
    color: Colors.textGray,
    fontSize: wp(3),
  },
  filterTextActive: {
    color: Colors.white,
  },
  list: {
    paddingBottom: hp(2.5),
    marginTop: hp(2.5),
  },
  //render item
  listingCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 0.2,
    marginTop: hp(1),
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
    fontFamily:Fonts.regular,
    color: Colors.darkGray,
    minWidth: wp(30),
    textAlign: 'right',
    paddingRight: wp(3),
  },
  value: {
    fontSize: wp(4),
    color: Colors.darkGray,
    fontFamily:Fonts.semiBold,
    width: '65%',
  },
  heartIcon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: Colors.black,
  },
  carImage: {
    position: 'absolute',
    top: -100,
    right: 5,
    width: '70%',
    height: '70%',
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
    fontFamily:Fonts.regular,
    color: Colors.white,
  },
  carTitle: {
    fontSize: wp(4.5),
    fontFamily:Fonts.bold,
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
    fontFamily:Fonts.regular,
    fontSize: wp(3),
    color: Colors.black,
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
    marginHorizontal:10,
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
    fontFamily:Fonts.medium,
  },
  tickIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: Colors.primary,
  },
});

export default Listings;
