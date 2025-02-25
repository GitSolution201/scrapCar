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

      <Text style={styles.optionSubText}>(6 months at $3.99/mo. Save 20%)</Text>

      <TouchableOpacity
        style={[
          styles.optionSelected,
          {marginTop: wp * 0.07, borderColor: Colors.black, borderWidth: 0.5},
        ]}>
        <Text style={[styles.optionText, {color: Colors.black}]}>
          29.88$ / Year
        </Text>
      </TouchableOpacity>
      <Text style={styles.optionSubText}>
        (12 months at $2.49/mo. Save 20%)
      </Text>

      <Text style={styles.trialText}>
        Try <Text style={styles.boldText}>3 days free</Text>, then $8 per month
      </Text>
      <Text style={styles.trialSubText}>Auto renewable & Cancel anytime</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Free Trial</Text>
        <Switch  value={isTrialEnabled} onValueChange={setIsTrialEnabled} />
      </View>

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
  },
  headerTitleStyle: {
    flexDirection: 'row',
    marginBottom: hp * 0.02,
    alignItems: 'center',
    marginTop: hp * 0.03,
  },
  iconBack: {
    width: wp * 0.08,
    height: hp * 0.04,
    resizeMode: 'contain',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: wp * 0.05,
  },
  backButton: {
    // marginRight: wp * 0.02x,
  },
  headerTitle: {
    fontSize: wp * 0.06,
    color: Colors.black,
  },
  subHeader: {
    fontSize: wp * 0.05,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.primary,
    marginTop: hp * 0.02,
  },
  description: {
    fontSize: wp * 0.04,
    color: Colors.dummyText,
    textAlign: 'center',
    marginVertical: hp * 0.02,
  },
  option: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    marginTop: hp * 0.015,
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: Colors.primary,
  },
  optionSubText: {
    fontSize: wp * 0.035,
    marginTop: wp * 0.06,
    textAlign:'center',
    color: Colors.textGray,
  },
  trialText: {
    fontSize: wp * 0.04,
    marginTop: hp * 0.03,
    textAlign:'center',
    color: Colors.black,
  },
  trialSubText: {
    textAlign:'center',
    fontSize: wp * 0.035,
    color: Colors.footerGray,
  },
  boldText: {
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
