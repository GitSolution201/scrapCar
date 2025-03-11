import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  Image,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Colors from '../../Helper/Colors';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../Helper/Fonts';
import SubcriptionsHeader from '../../Components/HomeHeader';

const {width: wp, height: hp} = Dimensions.get('window');

// SalvageRoute Component
const SalvageRoute = () => (
  <View style={styles.tabContent}>
    <Text style={styles.subHeader}>Salvage Monthly Subscription:</Text>
    <Text style={styles.description}>
      Find salvaged cars at competitive prices.{' '}
    </Text>
    <Text style={styles.description}>
      Connect with sellers offload vehicles.
    </Text>
    <Text style={styles.description}>
      Expand your inventory with unique opportunities.
    </Text>
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.optionSelected}>
        <Image
          source={require('../../assets/loyalty.png')}
          style={styles.optionImage}
          resizeMode="contain"
        />
        <Text style={styles.optionText}>1 Month</Text>
        <Text style={styles.sharingText}>Family sharing included</Text>
        <Text style={styles.optionSubText}>4.99$</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.continueButton}>
      <Text style={styles.continueText}>Continue</Text>
    </TouchableOpacity>
  </View>
);

// ScrapRoute Component
const ScrapRoute = () => (
  <View style={styles.tabContent}>
    <Text style={styles.subHeader}>Scrap Monthly Subscription:</Text>
    <Text style={styles.description}>
      Access a curated list of car sellers.
    </Text>

    <Text style={styles.description}> Get real-time updates on vehicles.</Text>
    <Text style={styles.description}>
      Contact sellers directly to negotiate and close deals.
    </Text>
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.optionSelected}>
        <Image
          source={require('../../assets/loyalty.png')}
          style={styles.optionImage}
          resizeMode="contain"
        />
        <Text style={styles.optionText}>1 Month</Text>
        <Text style={styles.sharingText}>Family sharing included</Text>
        <Text style={styles.optionSubText}>4.99$</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.continueButton}>
      <Text style={styles.continueText}>Continue</Text>
    </TouchableOpacity>
  </View>
);

// Scene Map for TabView
const renderScene = SceneMap({
  salvage: SalvageRoute,
  scrap: ScrapRoute,
});

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    {key: 'salvage', title: 'Salvage'},
    {key: 'scrap', title: 'Scrap'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SubcriptionsHeader
        navigation={navigation}
        centerContent="Subscriptions"
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={styles.tabView}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            activeColor={Colors.primary}
            inactiveColor={Colors.textGray}
            pressColor={Colors.primary}
          />
        )}
      />
    </SafeAreaView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    margin: Platform.OS === 'ios' ? 20 : 5,
  },
  tabContent: {
    paddingHorizontal: wp * 0.05,
    paddingTop: hp * 0.03,
  },
  subHeader: {
    fontSize: wp * 0.05,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
    color: Colors.primary,
    paddingBottom: wp * 0.03,
  },
  description: {
    fontSize: wp * 0.04,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: Colors.footerGray,
    marginTop: 10,
  },
  tabContainer: {
    marginTop: wp * 0.05,
  },
  optionSelected: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp * 0.05,
    height: hp / 3,
  },
  optionImage: {
    width: '20%',
    height: '20%',
  },
  optionText: {
    marginTop: wp * 0.02,
    fontSize: wp * 0.05,
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  sharingText: {
    marginTop: wp * 0.01,
    fontSize: wp * 0.03,
    fontFamily: Fonts.regular,
    color: Colors.footerGray,
  },
  optionSubText: {
    marginTop: wp * 0.02,
    fontSize: wp * 0.05,
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  tabView: {
    flex: 1,
    marginTop: hp * 0.02,
  },
  tabBar: {
    backgroundColor: Colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  tabIndicator: {
    backgroundColor: Colors.primary,
    height: 3,
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
