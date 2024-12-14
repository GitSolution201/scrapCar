import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Details = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>

      {/* Car Image */}
      <Image source={require('../../assets/car.png')} style={styles.carImage} />

      {/* Car Info */}
      <View style={styles.detailsContainer}>
        <Text style={styles.carTitle}>S 500 Sedan</Text>
        <Text style={styles.scrapText}>Scrap</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Registration:</Text>
          <Text style={styles.value}>DN63WPZ</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Post Code:</Text>
          <Text style={styles.value}>S63</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>1320 KG</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Engine Code:</Text>
          <Text style={styles.value}>M472D20C</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Year of the car:</Text>
          <Text style={styles.value}>1995</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Transmission:</Text>
          <Text style={styles.value}>MANUAL 6 Gears</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Quoted Price:</Text>
          <Text style={styles.value}>$548</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Color:</Text>
          <Text style={styles.value}>Black</Text>
        </View>
      </View>

      {/* Contact Seller */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact Seller Via</Text>
        <View style={styles.contactIcons}>
          <TouchableOpacity style={styles.contactButton}>
            <Icon name="call" size={20} color="#FFF" />
            <Text style={styles.contactText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Icon name="logo-whatsapp" size={20} color="#FFF" />
            <Text style={styles.contactText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Icon name="chatbubbles" size={20} color="#FFF" />
            <Text style={styles.contactText}>Text</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 24,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  carImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  carTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrapText: {
    textAlign: 'center',
    color: '#007BFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  contactContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: 80,
  },
  contactText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 12,
  },
});

export default Details;
