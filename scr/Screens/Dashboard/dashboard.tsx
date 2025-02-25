import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Helper/Colors';
import { Fonts } from '../../Helper/Fonts';

const Dashboard = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>

        {/* Dashboard Items */}
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/pie-chart.png')}
            style={styles.icon}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Analytics</Text>
            <Text style={styles.cardSubtitle}>
              Call History and relevant stats
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/messenger.png')}
            style={styles.icon}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Messages</Text>
            <Text style={styles.cardSubtitle}>
              Contact Support or view messages
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/bell.png')}
            style={styles.icon}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>User Announcements</Text>
            <Text style={styles.cardSubtitle}>Latest News from app</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Savage')}>
          <Image
            source={require('../../assets/favourite.png')}
            style={styles.icon}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Saved</Text>
            <Text style={styles.cardSubtitle}>View your favourite items</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Subscriptions')}>
          <Image
            source={require('../../assets/loyalty.png')}
            style={styles.loyalty}
          />

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Subcriptions</Text>
            <Text style={styles.cardSubtitle}>
              Subscribe to Contact Customers
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'), 
    paddingTop: Platform.OS === 'ios' ? hp('2%') : hp('5%'),
  },

  icon: {
    width: wp('5%'), 
    height: hp('2.5%'), 
  },
  loyalty: {
    width: wp('6%'),
    height: hp('3.5%'),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp('3%'), 
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3, 
  },
  cardContent: {
    marginLeft: wp('4%'), 
  },
  cardTitle: {
    fontSize: wp('4.5%'), 
  fontFamily:Fonts.bold,
    color: Colors.darkGray,
  },
  cardSubtitle: {
  fontFamily:Fonts.regular,
  fontSize: wp('3.5%'), 
    color: Colors.textGray, // Platform-specific padding
    marginTop: hp('0.5%'), 
  },
});

export default Dashboard;
