import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Colors from '../../Helper/Colors';

const listingsData = [
  {
    id: '1',
    title: 'S 500 Sedan',
    price: '$548',
    registration: 'DN63WPZ',
    postCode: 'S63',
    weight: '1320 KG',
    engineCode: 'M472D20C',
    engineSize: '1995',
    transmission: 'MANUAL 6 Gears',
    distance: '107 mi',
    views: '8',
    image: require('../../assets/car.png'),
  },
  {
    id: '2',
    title: 'GLA 250 SUV',
    price: '$548',
    registration: 'DN63WPZ',
    postCode: 'S63',
    weight: '1320 KG',
    engineCode: 'M472D20C',
    engineSize: '1995',
    transmission: 'MANUAL 6 Gears',
    distance: '107 mi',
    views: '8',
    image: require('../../assets/car2.png'),
  },
  {
    id: '1',
    title: 'S 500 Sedan',
    price: '$548',
    registration: 'DN63WPZ',
    postCode: 'S63',
    weight: '1320 KG',
    engineCode: 'M472D20C',
    engineSize: '1995',
    transmission: 'MANUAL 6 Gears',
    distance: '107 mi',
    views: '8',
    image: require('../../assets/car.png'),
  },
  {
    id: '2',
    title: 'GLA 250 SUV',
    price: '$548',
    registration: 'DN63WPZ',
    postCode: 'S63',
    weight: '1320 KG',
    engineCode: 'M472D20C',
    engineSize: '1995',
    transmission: 'MANUAL 6 Gears',
    distance: '107 mi',
    views: '8',
    image: require('../../assets/car2.png'),
  },
];
const Listings = ({navigation}: {navigation: any}) => {
  const [activeFilter, setActiveFilter] = useState('Scrap'); // State for active button
  const [activeSort, setActiveSort] = useState(false); // State for sorting

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDeatils')}
      style={styles.listingCard}>
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.carTitle}>{item.title}</Text>
        <Text style={styles.details}>
          Registration: {item.registration} | Post Code: {item.postCode}
        </Text>
        <Text style={styles.details}>
          Weight: {item.weight} | Engine Code: {item.engineCode}
        </Text>
        <Text style={styles.details}>Engine Size: {item.engineSize}</Text>
        <Text style={styles.details}>Transmission: {item.transmission}</Text>
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listings</Text>
        <Text style={{paddingTop: 10}}>Subscribe to Contact Customers</Text>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {['Scrap', 'Salvage', 'Both'].map(filter => (
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
        data={listingsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
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
    top: -80,
    right: -50,
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 10,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
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
