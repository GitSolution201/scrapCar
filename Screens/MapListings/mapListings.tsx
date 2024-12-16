import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapListings = () => {
  return (
    <View style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title="Fortuner GR"
            description="Current Location"
          />
          <Marker
            coordinate={{latitude: 37.79025, longitude: -122.4424}}
            title="S 500 Sedan"
            description="Quoted Price: $548"
          />
        </MapView>
      </View>

      {/* Card Section */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Fortuner GR</Text>
        <Text style={styles.cardPrice}>Quoted Price: $548</Text>
        <Image
          source={require('../../assets/landcruser.png')}
          style={styles.carImage}
        />

        {/* Features */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚙️</Text>
            <Text style={styles.featureText}>Diesel</Text>
            <Text style={styles.featureSubtext}>
              Common Rail Fuel Injection
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Acceleration</Text>
            <Text style={styles.featureSubtext}>0-100km/h 11s</Text>
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mapContainer: {
    flex: 1,
    marginBottom: -30, // Pull map behind the card slightly
  },
  map: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    position: 'relative',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    color: '#777',
    marginVertical: 5,
  },
  carImage: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    top: -30,
    right: 20,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 24,
    color: '#007BFF',
  },
  featureText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  featureSubtext: {
    fontSize: 12,
    color: '#777',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 3,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonActive: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  footerIcon: {
    fontSize: 24,
    color: '#007BFF',
  },
  footerText: {
    fontSize: 12,
    color: '#333',
  },
});

export default MapListings;
