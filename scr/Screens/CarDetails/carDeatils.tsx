import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp, wp} from '../../Helper/Responsive';
import Colors from '../../Helper/Colors';

const defaultImage = require('../../assets/car.png');

const Details = ({route, navigation}: {route: any; navigation: any}) => {

  const {car} = route.params; // Receive car details
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View></View>
      </View>

      {/* Car Image */}
      <Image source={defaultImage} style={styles.carImage} />
      {/* Car Info */}

      <View style={styles.detailsContainer}>
        <Text style={styles.carTitle}>
          {car.model || 'Model Not Available'}
        </Text>
        <Text style={styles.scrapText}>{car.tag || 'Unknown'}</Text>

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
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{car.weight || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Engine Size:</Text>
          <Text style={styles.value}>
            {car.engineCapacity ? `${car.engineCapacity} cc` : 'N/A'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Transmission:</Text>
          <Text style={styles.value}>{car.transmission || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Problem:</Text>
          <Text style={styles.value}>
            {car.problem || 'No issues reported'}
          </Text>
        </View>
      </View>

      {/* Contact Seller */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact Seller Via</Text>
        <View style={styles.contactIcons}>
          <View>
            <TouchableOpacity style={[styles.contactButton, styles.callButton]}>
              <Image
                source={require('../../assets/telephone.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.contactText}>Call</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.contactButton, styles.whatsappButton]}>
              <Image
                source={require('../../assets/whatsapp.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.contactText}>WhatsApp</Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.contactButton, styles.textButton]}>
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
    marginTop: hp(4),
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
    height: hp(25),
    resizeMode: 'contain',
    marginBottom: hp(2),
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    padding: wp(5),
    borderRadius: wp(3),
    marginBottom: hp(3),
  },
  carTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  scrapText: {
    textAlign: 'center',
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: hp(2),
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
  contactText: {
    marginTop: hp(1),
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: Colors.darkGray,
    textAlign: 'center',
  },
});

export default Details;
