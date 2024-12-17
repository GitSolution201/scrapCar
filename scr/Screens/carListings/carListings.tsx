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

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDeatils')}
      style={styles.listingCard}>
      {/* Car Image Positioned */}
      <Image source={item.image} style={styles.carImage} />

      {/* Card Details */}
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

        {/* Footer */}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginBottom: 20,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 28, // Increased font size
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
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: {
    color: '#555',
    fontSize: 16, // Increased font size
  },
  filterTextActive: {
    color: '#FFF',
    fontSize: 16, // Increased font size
  },
  sortContainer: {
    marginBottom: 20,
  },
  sortText: {
    fontSize: 14,
    color: '#555',
  },
  list: {
    paddingBottom: 20,
    marginTop: 20,
  },
  listingCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 30, // Increased space between cards
    paddingTop: 30, // Extra padding at the top for the image
    paddingHorizontal: 15,
    paddingBottom: 15,
    overflow: 'visible', // Allow content to go outside the card
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3, // Android shadow
    position: 'relative',
  },
  carImage: {
    position: 'absolute', // Position image outside card
    top: -80, // Move image upwards (adjust as needed)
    right: -50, // Slightly align to the right
    width: '90%', // Increased width
    height: '90%', // Increased height
    resizeMode: 'contain', // Ensure the aspect ratio is maintained
  },
  detailsContainer: {
    padding: 10,
  },
  carTitle: {
    fontSize: 18, // Increased font size
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  details: {
    fontSize: 14, // Increased font size
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
