import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Helper/Colors';
import {hp, wp} from '../Helper/Responsive';

const localImages = {
  car1: require('../assets/car.png'),
  car2: require('../assets/car2.png'),
};

export default function CarList({
  item,
  itemIndex,
}: {
  item: any;
  itemIndex: any;
}) {
  const navigation = useNavigation();
  const getLocalImage = (index: any) => {
    const imageKeys = Object.keys(localImages);
    return localImages[imageKeys[index % imageKeys.length]];
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDeatils', {car: item})}
      style={styles.listingCard}>
      <Image
        source={getLocalImage(itemIndex)}
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
              source={require('../assets/compass.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{item.distance}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../assets/user2.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{item.views} Views</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
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
    top: -60,
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
