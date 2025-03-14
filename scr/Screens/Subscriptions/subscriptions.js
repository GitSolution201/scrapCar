import React, {useState, useEffect} from 'react';
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
  Modal,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Colors from '../../Helper/Colors';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../Helper/Fonts';
import SubcriptionsHeader from '../../Components/HomeHeader';
import {
  StripeProvider,
  CardField,
  useStripe,
} from '@stripe/stripe-react-native';
import {useSelector} from 'react-redux';
import {publishedKey} from '../../Helper/keys';

const {width: wp, height: hp} = Dimensions.get('window');

// SalvageRoute Component
const SalvageRoute = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [cardDetails, setCardDetails] = React.useState(null);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState('');
  const [publishableKey, setPublishedKey] = useState('');
  const [merchantIdentifier, setMerchantIdentifier] = useState('');
  const [urlScheme, setUrlScheme] = useState('');

  // const {
  //   loading: userLoading,
  //   userData,
  //   error: userError,
  // } = useSelector((state: any) => state.user);
  // useEffect(() => {
  //   if (userData) {
  //     setEmail(userData.email);
  //   }
  // }, [userData]);
  // console.log(userData);
  const getPublishedKeys = async () => {
    const response = await fetch(
      `https://scrape4you.onrender.com/stripe/keys`,
      {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const {publishedKey, merchantIdentifie, urlScheme} = await response.json();
    console.log('--------------------------', publishedKey);
    setPublishedKey(publishedKey);
    setMerchantIdentifier(merchantIdentifie);
    setUrlScheme(urlScheme);
  };

  useEffect(() => {
    getPublishedKeys();
  }, []);
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `https://scrape4you.onrender.com/stripe/payment/sheet`,
      {
        method: 'POST',
        body: {
          email: 'tayyab@gmail.com',
        },

        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
    });
  };
  const openPaymentSheet = async () => {
    // see below
    const {error} = await presentPaymentSheet();
    console.log(JSON.stringify(error, null, 4));

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={merchantIdentifier}
      urlScheme={urlScheme}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          {/* <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        /> */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => openPaymentSheet()}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Bottom Sheet */}
        <Modal
          visible={showBottomSheet}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowBottomSheet(false)}>
          <View style={styles.bottomSheetOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.bottomSheetContainer}>
              <View style={styles.bottomSheetHeader}>
                <Text style={styles.bottomSheetTitle}>Enter Card Details</Text>
                <TouchableOpacity onPress={() => setShowBottomSheet(false)}>
                  <Text style={styles.bottomSheetClose}>Close</Text>
                </TouchableOpacity>
              </View>
              <CardField
                postalCodeEnabled={true}
                placeholders={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: '#E9E9E9',
                  textColor: '#000000',
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 20,
                }}
                onCardChange={cardDetails => {
                  setCardDetails(cardDetails);
                }}
              />
              {/* <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity> */}
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </ScrollView>
    </StripeProvider>
  );
};

// ScrapRoute Component
const ScrapRoute = () => {
  const {confirmPayment} = useStripe();
  const [cardDetails, setCardDetails] = React.useState(null);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);

  // const handlePayment = async () => {
  //   if (!cardDetails?.complete) {
  //     alert('Please enter complete card details');
  //     return;
  //   }

  //   try {
  //     // Step 1: Create Payment Intent on Backend
  //     const response = await fetch(
  //       'https://your-backend-url.com/create-payment-intent',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           amount: 499, // Amount in cents (4.99$)
  //           currency: 'usd',
  //         }),
  //       },
  //     );

  //     const {clientSecret} = await response.json();

  //     // Step 2: Confirm Payment on Frontend
  //     const {error, paymentIntent} = await confirmPayment(clientSecret, {
  //       paymentMethodType: 'Card',
  //     });

  //     if (error) {
  //       alert(`Payment failed: ${error.message}`);
  //     } else if (paymentIntent) {
  //       alert('Payment Successful!');
  //       setShowBottomSheet(false); // Close bottom sheet after successful payment
  //     }
  //   } catch (error) {
  //     console.log('Error during payment:', error);
  //     alert('Payment Failed! Try Again');
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.tabContent}>
        <Text style={styles.subHeader}>Scrap Monthly Subscription:</Text>
        <Text style={styles.description}>
          Access a curated list of car sellers.
        </Text>
        <Text style={styles.description}>
          {' '}
          Get real-time updates on vehicles.
        </Text>
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
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => setShowBottomSheet(true)}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Bottom Sheet */}
      <Modal
        visible={showBottomSheet}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBottomSheet(false)}>
        <View style={styles.bottomSheetOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Enter Card Details</Text>
              <TouchableOpacity onPress={() => setShowBottomSheet(false)}>
                <Text style={styles.bottomSheetClose}>Close</Text>
              </TouchableOpacity>
            </View>
            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#E9E9E9',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 20,
              }}
              onCardChange={cardDetails => {
                setCardDetails(cardDetails);
              }}
            />
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </ScrollView>
  );
};

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
    <StripeProvider
      publishableKey="pk_test_51OZ9CNH4pKZw8NygKt1JrptxV9ZKSOfQInCzhuX6wvSjhL7qd4bRHVCE7XUDj5aCk2GlUBRcesKZTNcOjWIDm6ac00MENXwqtg" // Replace with your publishable key
    >
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
    </StripeProvider>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
    // margin: Platform.OS === 'ios' ? 20 : 5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp * 0.03,
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
    backgroundColor: Colors.gray,
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
  // Bottom Sheet Styles
  bottomSheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: wp * 0.05,
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  bottomSheetClose: {
    fontSize: wp * 0.04,
    fontFamily: Fonts.regular,
    color: Colors.primary,
  },
  payButton: {
    width: '100%',
    padding: hp * 0.02,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: hp * 0.03,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: wp * 0.045,
    fontFamily: Fonts.bold,
  },
});

export default SubscriptionScreen;
