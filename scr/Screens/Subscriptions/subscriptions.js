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
  PlatformPayButton,
  isPlatformPaySupported,
  PlatformPay,
  isGooglePaySupported,
  confirmPlatformPayPayment,
  confirmPayment,
} from '@stripe/stripe-react-native';

import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {checkSubscriptionRequest} from '../../redux/slices/subcriptionsSlice';

const {width: wp, height: hp} = Dimensions.get('window');

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    {key: 'scrap', title: 'Scrap'},
    {key: 'salvage', title: 'Salvage'},
  ];
  const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();
  const [email, setEmail] = useState('tayyabjamil999@gmail.com');
  const [publishableKey, setPublishedKey] = useState('');
  const [urlScheme, setUrlScheme] = useState('');
  const [isPlatformPayAvailable, setIsPlatformPayAvailable] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [subscriptionSelected, setSubscriptionSelected] = useState('');
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  //
  const [products, setProducts] = useState([
    {
      id: 'price_1R15A1DnmorUxCln7W0DslGy',
      name: 'Salvage Monthly',
      price: 180,
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
      price: 180,
      type: 'scrap',
    },
    {
      id: 'price_1R57CnDnmorUxClnS97UhVMT',
      name: 'Scrap Weekly',
      price: 50,
      type: 'scrap',
    },
    {
      id: 'price_1R9a2eDnmorUxCln8q94c9Xg',
      name: 'Corporate Monthly Scrap',
      price: 300,
      type: 'corporate',
    },
    {
      id: 'price_1R9a3xDnmorUxClnuwyFYx1B',
      name: 'Corporate Monthly Salvage',
      price: 300,
      type: 'corporate',
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
    const initializeApplePay = async () => {
      if (Platform.OS === 'ios') {
        try {
          const supported = await isPlatformPaySupported();
          setIsApplePaySupported(supported);
        } catch (error) {
          console.log('Apple Pay support check error:', error);
          setIsApplePaySupported(false);
        }
      }
    };

    initializeApplePay();
  }, [isPlatformPaySupported]);

  useEffect(() => {
    const checkPlatformPaySupport = async () => {
      // Add a small delay for Android
      if (Platform.OS === 'android') {
        // Wait for component to mount properly
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      try {
        if (Platform.OS === 'android') {
          const isSupported = await isPlatformPaySupported({
            provider: 'google_pay',
            googlePay: {
              environment: 'test',
              merchantCountryCode: 'GB',
            },
          });
          console.log('Google Pay support:', isSupported);
          setIsPlatformPayAvailable(isSupported);
        }
      } catch (error) {
        console.log('Platform pay support check error:', error);
        setIsPlatformPayAvailable(false);
      }
    };

    // For Android, we'll run this after a short delay
    if (Platform.OS === 'android') {
      const timer = setTimeout(() => {
        checkPlatformPaySupport();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      checkPlatformPaySupport();
    }
  }, []);

  const handlePlatformPay = async () => {
    try {
      if (!subscriptionSelected) {
        Alert.alert('Error', 'Please select a subscription plan first');
        return;
      }

      const amount =
        products.find(p => p.id === subscriptionSelected)?.price || 0;

      const response = await axios.post(
        'https://scrape4you.onrender.com/stripe/create-customer-and-subscription',
        {
          email: email,
          priceId: subscriptionSelected,
        },
      );

      if (response.data?.clientSecret) {
        const paymentMethod = {
          provider: 'google_pay',
          googlePay: {
            testEnv: true,
            amount: amount * 100,
            currencyCode: 'GBP',
            merchantCountryCode: 'GB',
            merchantName: 'Car Scrap',
            billingAddressRequired: true,
            emailRequired: true,
          },
        };

        console.log('Attempting payment with:', paymentMethod);

        const {error} = await confirmPlatformPayPayment(
          response.data.clientSecret,
          paymentMethod,
        );

        if (error) {
          console.log('Payment error:', error);
          Alert.alert('Error', 'Payment failed. Please try again.');
        } else {
          Alert.alert(
            'Congratulations! 🎉',
            'Your subscription has been successfully activated. Welcome to our premium services. You now have access to all features.',
            [
              {
                text: 'Continue',
                onPress: () => navigation.goBack(),
              },
            ],
            { cancelable: false }
          );
        }
      }
    } catch (error) {
      console.log('Payment error:', error);
      Alert.alert('Error', 'Payment failed. Please try again.');
    }
  };

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
  const openPaymentSheet = async () => {
    // see below

    try {
      const response = await axios.post(
        'https://scrape4you.onrender.com/stripe/create-customer-and-subscription',
        {
          email: email, // user's email
          priceId: subscriptionSelected, // selected price ID from state
        },
      );
      const {paymentIntent, ephemeralKey, customer} =
        await fetchPaymentSheetParams();
      // Successful response (status 2xx)
      console.log('====================================');
      console.log(paymentIntent, customer, ephemeralKey);
      console.log('====================================');
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'merchant.com.carscrap',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: 'https://scrape4you.onrender.com',
        allowsDelayedPaymentMethods: true,

        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
      });
      const {error: paymentError} = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Error', paymentError.message);
      } else {
        console.log('sec====================================');
        console.log(response.data.clientSecret);
        console.log('====================================');
        await confirmPayment(response.data.clientSecret, {
          paymentMethodType: 'Card', // Explicitly specify card payment
          billingDetails: {
            email: email, // Customer email
          },
        })
          .then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            Alert.alert(
              'Congratulations! 🎉',
              'Your subscription has been successfully activated. Welcome to our premium services. You now have access to all features.',
              [
                {
                  text: 'Continue',
                  onPress: () => navigation.goBack(),
                },
              ],
              { cancelable: false }
            );
          })
          .catch(err => {
            console.log('err====================================');
            console.log(err);
            console.log('====================================');
          });
      }
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
  const renderScene = ({route}) => {
    const sharedProps = {
      products: products,
      selectedSubscription: subscriptionSelected,
      onSelectSubscription: subscription => {
        setSubscriptionSelected(subscription);
      },
    };
    switch (route.key) {
      case 'scrap':
        return <ScrapRoute {...sharedProps} />;
      case 'salvage':
        return <SalvageRoute {...sharedProps} />;
      default:
        return null;
    }
  };
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
                amount: '180', // Pence for GBP
                paymentType: PlatformPay.PaymentType.Immediate,
              },
            ],
            currencyCode: 'GBP',
            merchantCountryCode: 'US',
          },
        },
      );

      navigation.goBack();
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

  const renderPaymentButton = () => {
    if (!isPlatformPayAvailable) return null;

    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={[
            styles.googlePayButton,
            !subscriptionSelected && {opacity: 0.7},
          ]}
          onPress={handlePlatformPay}>
          <Text style={styles.googlePayText}>Pay with Google Pay</Text>
        </TouchableOpacity>
      );
    }

    return (
      <PlatformPayButton
        onPress={handlePlatformPay}
        type={PlatformPay.ButtonType.Pay}
        appearance={PlatformPay.ButtonStyle.Black}
        borderRadius={25}
        style={styles.paymentButton}
      />
    );
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.com.carscrap">
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
        {subscriptionSelected !== '' ? (
          <View style={styles.paymentButtonsContainer}>
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

            {renderPaymentButton()}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={openPaymentSheet}>
              <Text style={styles.continueText}>Pay By Card</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.paymentButtonsContainer}>
            {isApplePaySupported && (
              <PlatformPayButton
                onPress={() => Alert.alert('Please Select Any Subscription')}
                type={PlatformPay.ButtonType.Order}
                appearance={PlatformPay.ButtonStyle.Black}
                borderRadius={25}
                style={{
                  width: '100%',
                  height: 50,
                }}
              />
            )}

            {renderPaymentButton()}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => Alert.alert('Please Select Any Subscription')}>
              <Text style={styles.continueText}>Pay By Card</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </StripeProvider>
  );
};

const SalvageRoute = ({
  products,
  onSelectSubscription,
  selectedSubscription,
}) => {
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
              onSelectSubscription('price_1R57DZDnmorUxClnRG48rfKZ')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R57DZDnmorUxClnRG48rfKZ' &&
                styles.optionFocused,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>50 GBP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              onSelectSubscription('price_1R15A1DnmorUxCln7W0DslGy')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R15A1DnmorUxCln7W0DslGy' &&
                styles.optionFocused,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>180 GBP</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add Corporate Box */}
        <View style={[styles.tabContainer, { 
          justifyContent: 'center',
          marginHorizontal: wp * 0.05
        }]}>
          <TouchableOpacity
            onPress={() =>
              onSelectSubscription('price_1R9a3xDnmorUxClnuwyFYx1B')
            }
            style={[
              styles.corporateBox,
              selectedSubscription === 'price_1R9a3xDnmorUxClnuwyFYx1B' &&
                styles.optionFocused,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Corporate Monthly</Text>
            <Text style={styles.sharingText}>Business Subscription</Text>
            <Text style={styles.optionSubText}>300 GBP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// ScrapRoute Component
const ScrapRoute = ({products, onSelectSubscription, selectedSubscription}) => {

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
              onSelectSubscription('price_1R57CnDnmorUxClnS97UhVMT')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R57CnDnmorUxClnS97UhVMT' &&
                styles.optionFocused,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>50 GBP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              onSelectSubscription('price_1R573DDnmorUxClnp4X4Imki')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R573DDnmorUxClnp4X4Imki' &&
                styles.optionFocused,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.sharingText}>Individual Subscription</Text>
            <Text style={styles.optionSubText}>180 GBP</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add Corporate Box */}
        <View style={[styles.tabContainer, { 
          justifyContent: 'center',
          marginHorizontal: wp * 0.05
        }]}>
          <TouchableOpacity
            onPress={() =>
              onSelectSubscription('price_1R9a2eDnmorUxCln8q94c9Xg')
            }
            style={[
              styles.corporateBox,
              selectedSubscription === 'price_1R9a2eDnmorUxCln8q94c9Xg' &&
                styles.optionFocused,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Corporate Monthly</Text>
            <Text style={styles.sharingText}>Business Subscription</Text>
            <Text style={styles.optionSubText}>300 GBP</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: wp * 0.03,
    height: hp / 4.5,
    padding: 10,
  },
  optionFocused: {
    backgroundColor: Colors.primary + '20',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  optionImage: {
    width: '18%',
    height: '18%',
  },
  optionText: {
    marginTop: wp * 0.01,
    fontSize: wp * 0.045,
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
    marginTop: wp * 0.01,
    fontSize: wp * 0.045,
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
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
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
  paymentButtonsContainer: {
    padding: 20,
    width: '100%',
  },
  paymentButton: {
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  googlePayButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  googlePayText: {
    color: '#FFFFFF',
    fontSize: wp * 0.045,
    fontFamily: Fonts.bold,
  },
  corporateBox: {
    width: wp - (wp * 0.1), // Full width minus padding
    height: hp / 4.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp * 0.03,
    padding: 10,
  },
});

export default SubscriptionScreen;
