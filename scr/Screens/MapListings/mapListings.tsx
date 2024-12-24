import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Colors from '../../Helper/Colors';

const MapListings = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const openModal = () => {
    setSelectedCar({
      title: 'Fortuner GR',
      price: '$548',
      fuel: 'Common Rail Fuel Injection',
      acceleration: '0-100km/h 11s',
      image: require('../../assets/landcruser.png'),
    });
  };

  const closeModal = () => setSelectedCar(null);

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
            onPress={openModal}
          />
        </MapView>
      </View>

      {/* Bottom Modal */}
      <Modal visible={!!selectedCar} animationType="slide" transparent>
        <TouchableOpacity onPress={closeModal} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Blue Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{selectedCar?.title}</Text>
              <Text style={styles.headerSubText}>
                Quoted Price: {selectedCar?.price}
              </Text>
              <Image source={selectedCar?.image} style={styles.carImage} />
            </View>

            {/* Features Section */}
            <View>
              <Text
                style={[
                  styles.headerTitle,
                  {color: Colors.primary, padding: 20},
                ]}>
                Features
              </Text>

              <View style={styles.featuresContainer}>
                <View style={styles.featureCard}>
                  <Image
                    source={require('../../assets/diesel.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.featureTitle}>Diesel</Text>
                  <Text style={styles.featureSubText}>{selectedCar?.fuel}</Text>
                </View>
                <View style={styles.featureCard}>
                  <Image
                    source={require('../../assets/speedometer1.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.featureTitle}>Acceleration</Text>
                  <Text style={styles.featureSubText}>
                    {selectedCar?.acceleration}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mapContainer: {flex: 1},
  map: {width: '100%', height: '100%'},

  // Modal Styles
  modalOverlay: {
    // Removed background color completely
    flex: 1,
    justifyContent: 'flex-end',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  // Header Section
  header: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  carImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -30,
    right: 20,
  },

  // Features Section
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  featureCard: {
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,

    padding: 10,
    width: '45%',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  featureIcon: {
    fontSize: 28,
    color: '#007BFF',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  featureSubText: {
    fontSize: 12,
    color: '#555',
  },

  // Close Button
  closeButton: {
    backgroundColor: '#FF5A5F',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapListings;
