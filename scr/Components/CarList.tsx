import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Colors from '../Helper/Colors'
import { hp, wp } from '../Helper/Responsive'
const defaultImage = require('../assets/car.png');

export default function CarList({item}:{item:any}) {
 const navigation=   useNavigation()
  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('CarDeatils', {car: item})}
        style={styles.listingCard}>
        <Image
          source={{uri: item.carImage}}
          style={styles.carImage}
          onError={() => defaultImage}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.carTitle}>{item.make || 'Unknown Make'}</Text>
          <Text style={styles.details}>
            Registration: {item.registrationNumber || 'N/A'}
          </Text>
          <Text style={styles.details}>Postcode: {item.postcode || 'N/A'}</Text>
          <Text style={styles.details}>Color: {item.color || 'N/A'}</Text>
          <Text style={styles.details}>Model: {item.model || 'N/A'}</Text>
          <Text style={styles.details}>
            Fuel Type: {item.fuelType || 'N/A'}
          </Text>
        </View>
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    listingCard: {
        backgroundColor: Colors.white,
        borderRadius: wp(4),
        marginBottom: hp(2),
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
        borderRadius: wp(2),
      },
      detailsContainer: {
        padding: wp(2)
      },
      carTitle: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: hp(1),
      },
      details: {
        fontSize: wp(3.5), 
        color: Colors.textGray, 
        marginBottom: hp(1)
      },
})