import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import Colors from '../../Helper/Colors';
import Header from '../../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../Helper/Fonts';

const {width: wp, height: hp} = Dimensions.get('window');

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const [isTrialEnabled, setIsTrialEnabled] = useState(true);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {paddingTop: Platform.OS === 'ios' ? '2%' : 0},
      ]}>
      <Header navigation={navigation} />

      <Text style={styles.subHeader}>Upgrade to Pro</Text>
      <Text style={styles.description}>
        Quickly analyze images, accurately classify visual elements, and easily
        train models, Anytime, Anywhere
      </Text>

      <TouchableOpacity style={styles.optionSelected}>
        <Text style={styles.optionText}>4.99$ / month</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionSelected,
          {marginTop: wp * 0.07, borderColor: Colors.black, borderWidth: 0.5},
        ]}>
        <Text style={[styles.optionText, {color: Colors.black}]}>
          23.99$ / 6 months
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionSelected,
          {marginTop: wp * 0.07, borderColor: Colors.black, borderWidth: 0.5},
        ]}>
        <Text style={[styles.optionText, {color: Colors.black}]}>
          29.88$ / Year
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingHorizontal: wp * 0.05,
    margin: 20,
  },

  subHeader: {
    fontSize: wp * 0.05,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    color: Colors.primary,
    marginTop: hp * 0.02,
  },
  description: {
    fontSize: wp * 0.04,
    fontFamily: Fonts.regular,
    color: Colors.dummyText,
    textAlign: 'center',
    marginVertical: hp * 0.02,
  },

  optionSelected: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    alignItems: 'center',
    marginTop: hp * 0.015,
  },
  optionText: {
    fontSize: wp * 0.04,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  optionSubText: {
    fontSize: wp * 0.035,
    marginTop: wp * 0.06,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: Colors.textGray,
  },
  trialText: {
    fontSize: wp * 0.04,
    marginTop: hp * 0.03,
    textAlign: 'center',
    color: Colors.black,
  },
  trialSubText: {
    textAlign: 'center',
    fontSize: wp * 0.035,
    color: Colors.footerGray,
  },
  boldText: {
    fontFamily: Fonts.bold,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: hp * 0.02,
    borderRadius: 10,
    marginVertical: hp * 0.02,
  },
  switchLabel: {
    fontSize: wp * 0.04,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  continueButton: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: hp * 0.03,
  },
  continueText: {
    color: Colors.white,
    fontSize: wp * 0.045,
    fontFamily: Fonts.bold,
  },
});

export default SubscriptionScreen;
