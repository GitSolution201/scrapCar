import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Helper/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest} from '../../redux/slices/carListingsSlice';
import {hp, wp} from '../../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';

// Local images
const localImages = {
  car1: require('../../assets/car.png'),
  car2: require('../../assets/car2.png'),
};

const Listings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth?.token);
  const {loading, error, data} = useSelector((state: any) => state.carListings);
  const [activeFilter, setActiveFilter] = useState('Scrape'); // State for active button
  const [activeSort, setActiveSort] = useState(false); // State for sorting

  useEffect(() => {
    if (token) {
      dispatch(getUserRequest(token));
    }
  }, [token]);

  const sortedData = activeSort
    ? [...data].sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
    : data;

  const getLocalImage = index => {
    const imageKeys = Object.keys(localImages);
    return localImages[imageKeys[index % imageKeys.length]];
  };

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
        <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')}>
          <Text style={{paddingTop: hp(1)}}>
            Subscribe to Contact Customers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {['Scrape', 'Salvage', 'Both'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => setActiveFilter(filter)}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sorting */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            {flexDirection: 'row'},
            styles.sortButton,
            activeSort === true && styles.sortButtonActive,
          ]}
          onPress={() => setActiveSort(!activeSort)}>
          <Text
            style={[
              styles.sortText,
              activeSort === false && styles.sortTextActive,
            ]}>
            Newest to oldest
          </Text>
        </TouchableOpacity>
      </View>

      {/* Listings */}
      <FlatList
        data={sortedData.filter(
          (item: any) =>
            item.tag === activeFilter.toLowerCase() || activeFilter === 'Both',
        )}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    color: '#555',
    fontSize: 16,
  },
  filterTextActive: {
    color: '#FFF',
  },
  sortContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  sortButton: {
    paddingHorizontal: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 4,
  },
  sortButtonActive: {
    backgroundColor: '#007BFF',
  },
  sortText: {
    fontSize: 14,
  },
  sortTextActive: {},
  list: {
    paddingBottom: 20,
    marginTop: 20,
  },
  listingCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  carImage: {
    position: 'absolute',
    top: -70,
    right: -10,
    width: '70%',
    height: '70%',
  },
  detailsContainer: {
    padding: 10,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingVertical: hp(2),
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#757575',
  },
});

export default Listings;
