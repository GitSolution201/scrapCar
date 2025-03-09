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
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Colors from '../../Helper/Colors';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../Helper/Fonts';

const { width: wp, height: hp } = Dimensions.get('window');

// Define the SalvageRoute component
const SalvageRoute = () => (
  <View style={styles.tabContent}>
    <TouchableOpacity style={styles.optionSelected}>
      <Text style={styles.optionText}>4.99$ / month</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.optionSelected,
        { marginTop: wp * 0.07, borderColor: Colors.black, borderWidth: 0.5 },
      ]}>
      <Text style={[styles.optionText, { color: Colors.black }]}>
        23.99$ / 6 months
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.optionSelected,
        { marginTop: wp * 0.07, borderColor: Colors.black, borderWidth: 0.5 },
      ]}>
      <Text style={[styles.optionText, { color: Colors.black }]}>
        29.88$ / Year
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.continueButton}>
      <Text style={styles.continueText}>Continue</Text>
    </TouchableOpacity>
  </View>
);

// Define the ScrapRoute component
const ScrapRoute = () => (
  <View style={styles.tabContent}>
    <TouchableOpacity style={styles.optionSelected}>
      <Text style={styles.optionText}>4.99$ / month</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.optionSelected,
        { marginTop: wp * 0.07, borderColor: Colors.black, borderWidth: 0.5 },
      ]}>
      <Text style={[styles.optionText, { color: Colors.black }]}>
        23.99$ / 6 months
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.optionSelected,
        { marginTop: wp * 0.07, borderColor: Colors.black, borderWidth: 0.5 },
      ]}>
      <Text style={[styles.optionText, { color: Colors.black }]}>
        29.88$ / Year
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.continueButton}>
      <Text style={styles.continueText}>Continue</Text>
    </TouchableOpacity>
  </View>
);

// Map the scenes for the TabView
const renderScene = SceneMap({
  salvage: SalvageRoute,
  scrap: ScrapRoute,
});

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'salvage', title: 'Salvage' },
    { key: 'scrap', title: 'Scrap' },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? '2%' : 0 },
      ]}>
      <Header navigation={navigation} />

      {/* Add the TabView component */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={styles.tabView}
      
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            activeColor={Colors.primary}
            inactiveColor={Colors.textGray}
            pressColor={Colors.primary} 
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    paddingHorizontal: wp * 0.05,
    margin: Platform.OS === 'ios' ? 20 : 5,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: wp * 0.05,
    paddingTop: hp * 0.02,
  },
  tabView: {
    flex: 1,
    marginTop: hp * 0.02,
  },
  tabBar: {
    backgroundColor: Colors.white, // Default tab bar background color
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  tabIndicator: {
    backgroundColor: Colors.primary, // Indicator color
    height: 3,
  },
  tabLabel: {
    fontSize: wp * 0.04,
    fontFamily: Fonts.semiBold,
    textTransform: 'capitalize',
  },
  
  optionSelected: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    alignItems: 'center',
    marginTop: hp * 0.03,
  },
  optionText: {
    fontSize: wp * 0.04,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
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