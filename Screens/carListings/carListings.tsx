import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

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
    image: require('../../assets/car.png'),
  },
];

const Listings = ({navigation}: {navigation: any}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDeatils')}
      style={styles.listingCard}>
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.carTitle}>{item.title}</Text>
        <Text style={styles.price}>Quoted Price: {item.price}</Text>
        <Text style={styles.details}>
          Registration: {item.registration} | Post Code: {item.postCode}
        </Text>
        <Text style={styles.details}>
          Weight: {item.weight} | Engine Code: {item.engineCode}
        </Text>
        <Text style={styles.details}>Engine Size: {item.engineSize}</Text>
        <Text style={styles.details}>Transmission: {item.transmission}</Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{item.distance}</Text>
          <Text style={styles.footerText}>{item.views} Views</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listings</Text>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButtonActive}>
          <Text style={styles.filterTextActive}>Scrap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Salvage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Both</Text>
        </TouchableOpacity>
      </View>

      {/* Sorting */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Filter: Newest to oldest</Text>
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
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: {
    color: '#555',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFF',
    fontSize: 14,
  },
  sortContainer: {
    marginBottom: 10,
  },
  sortText: {
    fontSize: 14,
    color: '#555',
  },
  list: {
    paddingBottom: 20,
  },
  listingCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  carImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
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
    fontSize: 12,
    color: '#757575',
  },
});

export default Listings;
