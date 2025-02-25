import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  SafeAreaView,
  Platform,
} from 'react-native';
import {hp, wp} from '../../Helper/Responsive';
import Colors from '../../Helper/Colors';
import Header from '../../Components/Header';
import Banner from '../../Components/Banner';
import { Fonts } from '../../Helper/Fonts';

const defaultCarImage = require('../../assets/car2.png');

const Details = ({route, navigation}: {route: any; navigation: any}) => {
  const {car} = route.params;

  const handleCall = (phoneNumber: any) =>
    Linking.openURL(`tel:${phoneNumber}`);
  const handleTextMessage = (phoneNumber: any) =>
    Linking.openURL(`sms:${phoneNumber}`);
  const handleWhatsApp = (phoneNumber: any) =>
    Linking.openURL(`https://wa.me/${phoneNumber}`);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={[
          styles.container,
          {paddingTop: Platform.OS === 'ios' ? hp(2) : 0},
        ]}>
        <Header navigation={navigation} />
        <View style={styles.detailsContainer}>
          <Image
            source={
              car?.carImage && car?.carImage !== 'N/A'
                ? {uri: car?.carImage}
                : defaultCarImage
            }
            style={styles.carImage}
            resizeMode={'contain'}
          />
          <View style={styles.carTagContainer}>
            <Text style={styles.scrapText}>{car.tag || 'Unknown'}</Text>
          </View>
          <Text style={styles.carTitle}>
            {car.make || 'Model Not Available'}
          </Text>

          {[
            ['Registration:', car.registrationNumber],
            ['Year:', car.yearOfManufacture],
            ['PostCode:', car.postcode],
            ['Colors:', car.color],
            ['Model:', car.model],
            ['Fuel Type:', car.fuelType],
            ['Problem:', car.problem],
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
          <Banner navigation={navigation} />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Seller Via</Text>
          <View style={styles.contactIcons}>
            {[
              ['Call', require('../../assets/apple.png'), handleCall],
              [
                'WhatsApp',
                require('../../assets/whatsapp.png'),
                handleWhatsApp,
              ],
              ['Text', require('../../assets/messages.png'), handleTextMessage],
            ].map(([text, icon, action], index) => (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    styles.contactButton,
                    styles[`${text.toLowerCase()}Button`],
                  ]}
                  onPress={() => action('+' + car?.phoneNumber)}>
                  <Image source={icon} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.contactText}>{text}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: Colors.gray,
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    padding: wp(5),
    borderRadius: wp(3),
    marginVertical: hp(2),
  },
  carImage: {
    width: '100%',
    height: hp(20),
    marginTop: hp(2),
  },
  carTitle: {
    fontSize: wp(6),
    fontFamily:Fonts.bold,
    color: Colors.primary,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  carTagContainer: {
    backgroundColor: Colors.gradientEnd,
    borderRadius: wp(10),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  scrapText: {
    textTransform: 'capitalize',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    textAlign: 'center',
    fontFamily:Fonts.regular,
    color: Colors.primary,
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
    fontFamily:Fonts.semiBold,
    color: Colors.darkGray,
    width: '65%',
  },
  contactContainer: {
    backgroundColor: Colors.white,
    padding: wp(5),
    borderRadius: wp(3),
    marginBottom: hp(7),
  },
  contactTitle: {
    fontSize: wp(5),
    fontFamily:Fonts.bold,
    color: Colors.darkGray,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: wp(12),
    height: wp(12),
    resizeMode: 'contain',
  },
  contactText: {
    marginTop: hp(1),
    fontSize: wp(3.5),
    fontFamily:Fonts.regular,    
    color: Colors.black,
    textAlign: 'center',
  },
});

export default Details;
