import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp, wp} from '../../Helper/Responsive';
import Colors from '../../Helper/Colors';

const detaultCarImage = require('../../assets/car2.png');

const Details = ({route, navigation}: {route: any; navigation: any}) => {
  const {car} = route.params;

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleTextMessage = (phoneNumber: string) => {
    Linking.openURL(`sms:${phoneNumber}`);
  };
  const handleWhatsApp = (phoneNumber: string) => {
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrow.png')}
            style={styles.iconBack}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View></View>
      </View>

      <View style={styles.detailsContainer}>
        <Image
          source={car?.carImage ? {uri: car?.carImage} : detaultCarImage}
          style={styles.carImage}
          resizeMode={'contain'}
        />
        <View style={styles.carTagContainer}>
          <Text style={styles.scrapText}>{car.tag || 'Unknown'}</Text>
        </View>
        <Text style={styles.carTitle}>{car.make || 'Model Not Available'}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Registration:</Text>
          <Text style={styles.value}>
            {car.registrationNumber || 'Unknown'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{car.yearOfManufacture || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>PostCode:</Text>
          <Text style={styles.value}>{car.postcode || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Colors:</Text>
          <Text style={styles.value}>{car.color ? `${car.color}` : 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{car.model ? `${car.model}` : 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Fuel Type:</Text>
          <Text style={styles.value}>
            {car.fuelType ? `${car.fuelType}` : 'N/A'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Problem:</Text>
          <Text style={styles.value}>
            {car.problem ? `${car.problem}` : 'N/A'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>
            {car.phoneNumber ? `+${car.phoneNumber}` : 'N/A'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>MOT Status:</Text>
          <Text style={styles.value}>{car.motStatus || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>MOT Expiry:</Text>
          <Text style={styles.value}>
            {car.motExpiryDate || 'No issues reported'}
          </Text>
        </View>
      </View>

      {/* Contact Seller */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact Seller Via</Text>
        <View style={styles.contactIcons}>
          <View>
            <TouchableOpacity
              style={[styles.contactButton, styles.callButton]}
              onPress={() => handleCall('+' + car?.phoneNumber)}>
              <Image
                source={require('../../assets/telephone.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.contactText}>Call</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.contactButton, styles.whatsappButton]}
              onPress={() => handleWhatsApp('+' + car?.phoneNumber)}>
              <Image
                source={require('../../assets/whatsapp.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.contactText}>WhatsApp</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.contactButton, styles.textButton]}
              onPress={() => handleTextMessage('+' + car?.phoneNumber)}>
              <Image
                source={require('../../assets/messenger.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.contactText}>Text</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: Colors.gray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    alignItems: 'center',
  },
  backButton: {
    padding: wp(2),
  },
  headerTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  carImage: {
    width: '100%',
    height: hp(20),
    marginTop: hp(2),
  },

  detailsContainer: {
    backgroundColor: Colors.white,
    padding: wp(5),
    borderRadius: wp(3),
    marginVertical: hp(3),
  },
  carTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  carTagContainer: {
    backgroundColor: Colors.gradientEnd,
    borderRadius: wp(10),
    paddingHorizontal: wp(2),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  scrapText: {
    textTransform: 'capitalize', // 👈 First letter will be capitalized
    padding: hp(1),
    textAlign: 'center',
    color: Colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  label: {
    fontSize: wp(4),
    color: Colors.darkGray,
  },
  value: {
    fontSize: wp(4),
    color: Colors.darkGray,
  },
  contactContainer: {
    backgroundColor: Colors.white,
    padding: wp(5),
    borderRadius: wp(3),
    marginBottom: hp(7),
  },
  contactTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    borderRadius: wp(10),
    padding: wp(2),
    alignItems: 'center',
    width: wp(15),
    height: wp(15),
    justifyContent: 'center',
  },
  callButton: {
    backgroundColor: Colors.callButton,
  },
  whatsappButton: {
    backgroundColor: Colors.whatsappButton,
  },
  textButton: {
    backgroundColor: Colors.textButton,
  },
  icon: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain',
  },
  iconBack: {
    width: 40,
    height: 40,
  },
  contactText: {
    marginTop: hp(1),
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: Colors.darkGray,
    textAlign: 'center',
  },
});

export default Details;
