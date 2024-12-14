import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const MapListings = () => {
  return (
    <View style={styles.container}>
      {/* Header */}

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../assets/map.png')}
          style={styles.mapImage}
        />
      </View>

      {/* Feature Section */}
      <View style={styles.featureContainerBlue}>
        <Image
          source={require('../../assets/landcruser.png')}
          style={styles.carImage}
        />

        <Text style={styles.featureTitle}>Fortuner GR</Text>
        <Text style={styles.featurePrice}>Quoted Price: $548</Text>
      </View>

      <View style={styles.featureContainer}>
        {/* Car Image */}
        <View style={styles.featureDetails}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚙️</Text>
            <Text style={styles.featureText}>Diesel</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Acceleration: 0-100km/h 11s</Text>
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>📍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    flex: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featureContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  featureContainerBlue: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },

  carImage: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    top: -50,
    right: 20,
    zIndex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  featurePrice: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  featureDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  footerText: {
    fontSize: 24,
    color: '#007BFF',
  },
});

export default MapListings;
