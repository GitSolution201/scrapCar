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
         onPress={() => navigation.navigate('CarDeatils', { car: item })}
         style={styles.listingCard}>
         {/* Heart Icon (Top-right corner) */}
         <TouchableOpacity
           style={styles.heartIconContainer}
           onPress={() => console.log('Heart pressed for item:', item)}>
           <Image
             source={require('../assets/simpleHeart.png')} 
             style={styles.heartIcon}
           />
         </TouchableOpacity>
     
         {/* Car Image */}
         <Image
           source={getLocalImage(itemIndex)}
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
             <View style={{ alignItems: 'center' }}>
               <Image
                 source={require('../assets/pin.png')}
                 style={styles.icon}
               />
               <Text style={styles.footerText}>
                 {item?.distance ? item?.distance : '20.9 mi.'}
               </Text>
             </View>
             <View style={{ alignItems: 'center' }}>
               <Image
                 source={require('../assets/timer.png')}
                 style={styles.icon}
               />
               <Text style={styles.footerText}>{item.views} 50 minutes ago</Text>
             </View>
             <View style={{ alignItems: 'center' }}>
               <Image
                 source={require('../assets/eye.png')}
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
  listingCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 0.2,
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
    color: Colors.darkGray,
    minWidth: wp(30),
    textAlign: 'right',
    paddingRight: wp(3),
  },
  value: {
    fontSize: wp(4),
    color: Colors.darkGray,
    fontWeight: 'bold',
    width: '65%',
  },
  heartIcon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: Colors.black,
  },
  carImage: {
    position: 'absolute',
    top: wp(-30),
    right: -10,
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
    color: Colors.white,
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
    marginTop: wp(2),
    fontSize: wp(3),
    color: Colors.black,
  },
  icon: {
    width: wp(4),
    resizeMode: 'contain',
    height: wp(4),
    tintColor: Colors.black,
  },
});
