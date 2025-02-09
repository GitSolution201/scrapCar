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
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import {hp, wp} from '../../Helper/Responsive';

const MapListings = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const {data} = useSelector((state: any) => state.carListings);
  const [distance, setDistance] = useState(5);
  const closeModal = () => {
    navigation.navigate('CarDeatils', {car: selectedCar});
    setSelectedCar(null);
  };

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <View style={styles.sliderContainer} pointerEvents="box-none">
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.distanceText}>{distance}km</Text>

        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={distance}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="gray"
          thumbTintColor="blue"
          onValueChange={value => {
            setDistance(value);
          }}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.451696,
            longitude: 0.190079,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {data?.map((car, index) => {
            const offset = index * 0.0003;

            return (
              <Marker
                key={car.uniqueId}
                coordinate={{
                  latitude: parseFloat(car.latitude) + offset,
                  longitude: parseFloat(car.longitude) + offset,
                }}
                title={`${car.make} ${car.model}`}
                description={
                  car.problem ? `Issue: ${car.problem}` : 'No issues reported'
                }
                onPress={() => setSelectedCar(car)}
              />
            );
          })}
          {/* {data?.map((car, index) => {

            const offset = index * 0.0003; 
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(car?.latitude)+offset,
                longitude: parseFloat(car?.longitude)+offset,
              }}
              title={`${car?.make} ${car?.model} (${car?.yearOfManufacture})`}
              description={car?.problem ? `Issue: ${car?.problem}` : "No issues reported"}
              onPress={() => setSelectedCar(car)}
            />
          })} */}

          {/* {data?.map((car, index) =>*
(          (<Marker
            coordinate={{latitude: 51.451696, longitude: 0.190079}}
            title="Fortuner GR"
            description="Current Location"
            onPress={openModal}
          />)} */}
        </MapView>
      </View>

      {/* Bottom Modal */}
      <Modal visible={!!selectedCar} animationType="slide" transparent>
        <TouchableOpacity onPress={closeModal} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Blue Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setSelectedCar(false)}>
                <Image
                  source={require('../../assets/cross.png')}
                  style={styles.croosImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {selectedCar?.make} {selectedCar?.model}{' '}
                {selectedCar?.yearOfManufacture}
              </Text>
              {/* <Text style={styles.headerSubText}>
                Quoted Price: {selectedCar?.price || 'N/A'}
              </Text> */}
              <Image
                source={{uri: selectedCar?.carImage}}
                style={styles.carImage}
              />
            </View>

            {/* Features Section */}
            <View>
              <Text
                style={[
                  styles.headerTitle,
                 styles.headerFeatureText
                ]}>
                Features
              </Text>

              <View style={styles.featuresContainer}>
                <View style={styles.featureCard}>
                  <Image
                    source={require('../../assets/diesel.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.featureTitle}>Fuel Type</Text>
                  <Text style={styles.featureSubText}>
                    {selectedCar?.fuelType}
                  </Text>
                </View>
                <View style={styles.featureCard}>
                  <Image
                    source={require('../../assets/speedometer1.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.featureTitle}>Engine</Text>
                  <Text style={styles.featureSubText}>
                    {selectedCar?.engineCapacity} cc
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
  sliderContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    opacity: 0.8,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 20,
  },
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
    paddingBottom: hp(2),
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerFeatureText: {
    color: Colors.primary,
    padding: 20,
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
    borderWidth: 0.2,
    borderRadius: 15,
    padding: 10,
    width: '45%',
    elevation: 3,
    shadowColor: '#000',
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
  },croosImage:{
    width: wp(10),
    height: hp(3),
    alignSelf: 'flex-end',
  }
});

export default MapListings;
