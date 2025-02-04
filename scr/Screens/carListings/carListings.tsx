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
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest} from '../../redux/slices/carListingsSlice';
import Colors from '../../Helper/Colors';
import { hp, wp } from '../../Helper/Responsive';

const defaultImage = require('../../assets/car.png');

const Listings = ({navigation}:{navigation:any}) => {
  const dispatch = useDispatch();
  const {loginResponse} = useSelector((state:any) => state.auth);
  const {loading, error, data} = useSelector((state:any) => state.carListings);
  const [activeFilter, setActiveFilter] = useState('Scrape');
  useEffect(() => {
    if (loginResponse?.token) {
      dispatch(getUserRequest(loginResponse?.token));
    }
  }, [loginResponse]);

  const renderItem = ({item}:{item:any}) => {
    // If a field is missing, provide a default value
    const title = item.model || 'Model Not Available';
    const registration = item.registrationNumber || 'Unknown Registration';
    const year = item.yearOfManufacture || 'Year Not Available';
    const weight = item.weight || 'Weight Not Provided';
    const engineCode = item.engineCode || 'N/A';
    const engineSize = item.engineCapacity
      ? `${item.engineCapacity} cc`
      : 'Engine Size Not Available';
    const transmission = item.transmission || 'Transmission Not Specified';
    const distance = item.distance || 'Distance Not Available';
    const views = item.views || '0';
    const problem = item.problem || 'No issues reported';
    const image = defaultImage;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CarDeatils', { car: item })}
        style={styles.listingCard}>
        <Image source={image} style={styles.carImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.carTitle}>{title}</Text>
          <Text style={styles.details}>
            Registration: {registration} | Year: {year}
          </Text>
          <Text style={styles.details}>
            Weight: {weight} | Engine Code: {engineCode}
          </Text>
          <Text style={styles.details}>Engine Size: {engineSize}</Text>
          <Text style={styles.details}>Transmission: {transmission}</Text>
          <Text style={styles.details}>Problem: {problem}</Text>
          <View style={styles.footer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/compass.png')}
                style={styles.icon}
              />
              <Text style={styles.footerText}>{distance}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/user2.png')}
                style={styles.icon}
              />
              <Text style={styles.footerText}>{views} Views</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listings</Text>
      </View>
      <View style={styles.filterContainer}>
        {['Scrape', 'Salvage', 'Both'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}
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
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : error ? (
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      ) : (
        <FlatList
          data={data?.filter(
            (item:any) =>
              item.tag === activeFilter.toLowerCase() ||
              activeFilter === 'Both',
          )}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5), 
    paddingTop: hp(2), 
    backgroundColor: Colors.gray, 
  },
  icon: {
    width: wp(5), 
    height: wp(5), 
    marginRight: wp(2), 
  },
  header: {
    marginBottom: hp(2), 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(5), 
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: wp(6), 
    fontWeight: 'bold',
    color: Colors.darkGray, 
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2), 
  },
  filterButton: {
    flex: 1,
    marginHorizontal: wp(1),
    paddingVertical: hp(1), 
    backgroundColor: Colors.lightGray,
    borderRadius: wp(2),
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary, 
  },
  filterText: {
    color: Colors.textGray, 
    fontSize: wp(4.5), 
  },
  filterTextActive: {
    color: Colors.white, 
  },
  listingCard: {
    backgroundColor: Colors.white, 
    borderRadius: wp(4), 
    marginTop: hp(3), 
    marginBottom: hp(5), 
    padding: wp(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: '100%',
    height: hp(25),
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: wp(2),
  },
  carTitle: {
    fontSize: wp(5), 
    fontWeight: 'bold',
    marginBottom: hp(1), 
    color: Colors.darkGray,
  },
  details: {
    fontSize: wp(3.5), 
    color: Colors.textGray, 
    marginBottom: hp(1), 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  footerText: {
    fontSize: wp(3.5),
    color: Colors.footerGray,
  },
});


export default Listings;
