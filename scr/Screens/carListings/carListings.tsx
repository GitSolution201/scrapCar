
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
  const [activeFilters, setActiveFilters] = useState(['Scrape']);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserRequest(token));
    }, [dispatch, token]),
  );

  const getLocalImage = (index: any) => {
    const imageKeys = Object.keys(localImages);
    return localImages[imageKeys[index % imageKeys.length]];
  };

  const handleFilterPress = (filter: any) => {
    if (filter === 'Savage') {
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

  // Filter data based on active filters and search query
  const filteredData = data?.filter((item: any) => {
    // Filter by active filters
    const filterMatch =
      (activeFilters.includes('Scrape') && item.tag === 'scrape') ||
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
      <Image
        source={getLocalImage(index)}
        style={styles.carImage}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.carTitle}>
          {item.make} {item.model} ({item.yearOfManufacture})
        </Text>
        <Text style={styles.details}>
          Registration: {item.registrationNumber}
        </Text>
        <Text style={styles.details}>Postcode: {item.postcode}</Text>
        <Text style={styles.details}>
          Engine Capacity: {item.engineCapacity} cc
        </Text>
        <Text style={styles.details}>Fuel Type: {item.fuelType}</Text>
        <Text style={styles.details}>Problem: {item.problem}</Text>
        <View style={styles.footer}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/compass.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{item.distance}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/user2.png')}
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listings</Text>
        <View style={styles.bannerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Subscriptions')}>
            <Text style={styles.bannerText}>
              Subscribe to Contact Customers
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        {['Scrape', 'Salvage', 'Savage'].map(filter => (
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
      <View style={styles.searchContainer}>
        <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by postcode or location..."
          placeholderTextColor={Colors.textGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Listings */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    backgroundColor: Colors.white,
  },
  bannerContainer: {
    backgroundColor: Colors.primary,
    padding: wp(2),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  bannerText: {
    color: Colors.white,
    fontSize: wp(3.5),
    fontWeight: 'bold',
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
    color: Colors.black,
  },
  icon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(2.5),
  },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    shadowOffset: { width: 0, height: hp(0.5) },
    elevation: 3,
    width: wp(75),
    height: hp(6),
    alignSelf: 'flex-start',
  },
  searchIcon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(1),
    tintColor: Colors.textGray,
  },
  searchBar: {
    flex: 1,
    fontSize: hp(2),
    color: Colors.black,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2.5),
  },
  filterButton: {
    flex: 1,
    marginHorizontal: wp(1),
    paddingVertical: hp(1.5),
    backgroundColor: Colors.lightGray,
    borderRadius: wp(2),
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.textGray,
    fontSize: wp(4),
  },
  filterTextActive: {
    color: Colors.white,
  },
  list: {
    paddingBottom: hp(2.5),
    marginTop: hp(2.5),
  },
  listingCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth:0.2,
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
  // carImage: {
  //   position: 'absolute',
  //   top: hp(-8),
  //   right: wp(-2.5),
  //   width: wp(70),
  //   height: hp(35),
  // },
  carImage: {
    position: 'absolute',
    top: -60,
    right: -10,
    width: '70%',
    height: '70%',
  },
  detailsContainer: {
    padding: wp(2.5),
  },
  carTitle: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
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
    fontSize: wp(3.5),
    color: Colors.footerGray,
  },
});

export default Listings;
