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
  ApplePayButton,
  usePlatformPay,
  GooglePayButton,
  PlatformPayButton,
  isPlatformPaySupported,
  PlatformPay,
  presentApplePay,
  isGooglePaySupported,
  confirmPlatformPayPayment,
  confirmPaymentSheetPayment,
} from '@stripe/stripe-react-native';

import {useSelector} from 'react-redux';
import axios from 'axios';

const {width: wp, height: hp} = Dimensions.get('window');

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    {key: 'salvage', title: 'Salvage'},
    {key: 'scrap', title: 'Scrap'},
  ];
  const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();
  const [email, setEmail] = useState('tayyabjamil999@gmail.com');
  const [publishableKey, setPublishedKey] = useState('');
  const [urlScheme, setUrlScheme] = useState('');
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [subscriptionSelected, setSubscriptionSelected] = useState('');

  const [products, setProducts] = useState([
    {
      id: 'price_1R15A1DnmorUxCln7W0DslGy',
      name: 'Salvage Monthly',
      price: 170,
      type: 'salvage',
    },
    {
      id: 'price_1R57DZDnmorUxClnRG48rfKZ',
      name: 'Salvage Weekly',
      price: 50,
      type: 'salvage',
    },
    {
      id: 'price_1R573DDnmorUxClnp4X4Imki',
      name: 'Scrap Monthly',
      price: 170,
      type: 'scrap',
    },
    {
      id: 'price_1R57CnDnmorUxClnS97UhVMT',
      name: 'Scrap Weekly',
      price: 50,
      type: 'scrap',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [merchantIdentifier, setMerchantIdentifier] = useState('');

  const {
    loading: userLoading,
    userData,
    error: userError,
  } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
    }
  }, [userData]);

  const initGooglePay = async () => {
    const {error} = await initGooglePay({
      testEnv: true, // Set to false for production
      merchantName: 'Your Merchant Name',
      countryCode: 'US', // Replace with your country code
    });
  };
  const handleGooglePay = async () => {
    const {error} = await presentGooglePay({
      amount: 499, // Amount in cents (4.99$)
      currencyCode: 'USD', // Replace with your currency
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Google Pay successful');
    }
  };

  useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({googlePay: {testEnv: true}}))) {
        Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, []);
  useEffect(() => {
    initializePaymentMethods();
  }, []);

  const initializePaymentMethods = async () => {
    if (isApplePaySupported) {
      await initApplePay();
    }
    if (isGooglePaySupported) {
      await initGooglePay();
    }
  };
  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  const handleApplePay = async () => {
    try {
      const response = await axios.post(
        'https://scrape4you.onrender.com/stripe/create-customer-and-subscription',
        {
          email: email, // user's email
          priceId: subscriptionSelected, // selected price ID from state
        },
      );
      // Successful response (status 2xx)
      const {error, paymentIntent} = await confirmPlatformPayPayment(
        response.data.clientSecret,
        {
          applePay: {
            cartItems: [
              {
                label: 'Total',
                amount: '170', // Pence for GBP
                paymentType: PlatformPay.PaymentType.Immediate,
              },
            ],
            currencyCode: 'GBP',
            merchantCountryCode: 'US',
          },
        },
      );
      return response.data;
    } catch (error) {
      // Axios error handling
      if (error.response) {
        // Server responded with error status (4xx/5xx)
        console.error(
          'Server error:',
          error.response.status,
          error.response.data,
        );
        throw new Error(error.response.data.message || 'Subscription failed');
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.request);
        throw new Error('Network error - no server response');
      } else {
        // Setup error
        console.error('Request setup error:', error.message);
        throw new Error('Failed to create subscription request');
      }
    }
  };
  // };

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

    const {publishedKey, merchantIdentifier, urlScheme} = await response.json();
    setPublishedKey(publishedKey);
    setMerchantIdentifier(merchantIdentifier);
    setUrlScheme('https://scrape4you.onrender.com');
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://scrape4you.onrender.com/stripe/products',
        );

        // setProducts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
          email: email,
        },

        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const {paymentIntent, ephemeralKey, customer} = await response.json();
    setClientSecret(paymentIntent);
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
      returnURL: 'https://scrape4you.onrender.com',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
    });
  };
  const openPaymentSheet = async () => {
    // see below
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      try {
        const response = await axios.post(
          'https://scrape4you.onrender.com/stripe/create-customer-and-subscription',
          {
            email: email, // user's email
            priceId: subscriptionSelected, // selected price ID from state
          },
        );
        // Successful response (status 2xx)
        const {error, paymentIntent} = await confirmPaymentSheetPayment(
          clientSecret,
          {
            paymentMethodType: 'Card',
          },
        );
        return response.data;
      } catch (error) {
        // Axios error handling
        if (error.response) {
          // Server responded with error status (4xx/5xx)
          console.error(
            'Server error:',
            error.response.status,
            error.response.data,
          );
          throw new Error(error.response.data.message || 'Subscription failed');
        } else if (error.request) {
          // Request was made but no response received
          console.error('Network error:', error.request);
          throw new Error('Network error - no server response');
        } else {
          // Setup error
          console.error('Request setup error:', error.message);
          throw new Error('Failed to create subscription request');
        }
      }
    }
  };
  const renderScene = ({route}) => {
    const sharedProps = {
      products: products, // Pass the products state
      sharedData: 'Data available in all tabs',
      onSelectSubscription: subscription => {
        setSubscriptionSelected(subscription);
      },
    };
    switch (route.key) {
      case 'salvage':
        return <SalvageRoute {...sharedProps} />;
      case 'scrap':
        return <ScrapRoute {...sharedProps} />;
      default:
        return null;
    }
  }; // Stylesheet
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={'merchant.com.carscrap'}
      urlScheme={urlScheme}>
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
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 30,
          }}>
          {isApplePaySupported && (
            <PlatformPayButton
              onPress={handleApplePay}
              type={PlatformPay.ButtonType.Order}
              appearance={PlatformPay.ButtonStyle.Black}
              borderRadius={25}
              style={{
                width: '100%',
                height: 50,
              }}
            />
          )}

          {/* Google Pay Button */}
          {isGooglePaySupported && (
            <GooglePayButton
              onPress={handleGooglePay}
              type="plain"
              borderRadius={4}
              style={styles.googlePayButton}
            />
          )}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => openPaymentSheet()}>
            <Text style={styles.continueText}>Pay By Card</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
};

const SalvageRoute = ({products, onSelectSubscription}) => {
  return (
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
          <TouchableOpacity
            onPress={() =>
              onSelectSubscription('price_1R15A1DnmorUxCln7W0DslGy')
            }
            style={styles.optionSelected}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>170 GBP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionSelected}
            onPress={() =>
              onSelectSubscription('price_1R57DZDnmorUxClnRG48rfKZ')
            }>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>50 GBP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// ScrapRoute Component
const ScrapRoute = ({products, onSelectSubscription}) => {
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);

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
          <TouchableOpacity
            onPress={() =>
              onSelectSubscription('price_1R573DDnmorUxClnp4X4Imki')
            }
            style={styles.optionSelected}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>170 GBP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              onSelectSubscription('price_1R57CnDnmorUxClnS97UhVMT')
            }
            style={styles.optionSelected}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>50 GBP</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Bottom Sheet */}
      {/* <Modal
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
      </Modal> */}
    </ScrollView>
  );
};

// Scene Map for TabView

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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionSelected: {
    width: wp / 2.4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp * 0.05,
    height: hp / 4,
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
    padding: 13,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: hp * 0.03,
  },
  continueText: {
    color: Colors.black,
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
