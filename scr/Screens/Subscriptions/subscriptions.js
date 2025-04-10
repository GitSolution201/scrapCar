import React, {useState, useEffect, useCallback} from 'react';
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
  ActivityIndicator,
} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Colors from '../../Helper/Colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import {cancelSubscriptionRequest} from '../../redux/slices/canceleSubcriptionsSlice';

const {width: wp, height: hp} = Dimensions.get('window');
const api = axios.create({
  baseURL: 'https://scrape4you.onrender.com', // Replace this with your actual API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const token = useSelector((state: any) => state.auth?.token);

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
  const [selectedActiveSubscription, setSelectedActiveSubscription] =
    useState(false);
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
  const {hasSubscription, subscriptions = []} = useSelector(
    state => state?.subscription?.subscriptionData || {},
  );
  const {cancelSuccess, cancelLoading} = useSelector(
    state => state?.cancelSubscription,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
    }
  }, [userData]);

  useEffect(() => {
    initializePaymentMethods();
  }, []);

  useEffect(() => {
    if (userData?.email) {
      dispatch(checkSubscriptionRequest({email: userData.email}));
    }
  }, [userData?.email, cancelSuccess]);

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
      if (!subscriptionSelected || subscriptionSelected === '') {
        Alert.alert('Error', 'Please select a subscription plan first');
        return;
      }

      if (selectedActiveSubscription) {
        Alert.alert('Error', 'This subscription is already active');
        return;
      }

      console.log('@subcription', subscriptionSelected?.price);
      console.log('@prodcut', products);

      const amount =
        products.find(p => p.id === subscriptionSelected)?.price || 0;
      const response = await axios.post(
        'https://scrape4you.onrender.com/stripe/create-customer-and-subscription',
        {
          email: email,
          priceId: subscriptionSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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
                onPress: () => {
                  dispatch(checkSubscriptionRequest({email: userData.email})),
                    navigation.goBack();
                },
              },
            ],
            {cancelable: false},
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
    try {
      if (!subscriptionSelected || subscriptionSelected === '') {
        Alert.alert('Error', 'Please select a subscription plan first');
        return;
      }

      if (selectedActiveSubscription) {
        Alert.alert('Error', 'This subscription is already active');
        return;
      }

      setLoading(true);

      // Step 1: Create the subscription intent
      const response = await axios.post(
        'https://scrape4you.onrender.com/stripe/create-customer-and-subscription',
        {
          email: email,
          priceId: subscriptionSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Step 2: Initialize payment sheet with the returned client secret
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'merchant.com.carscrap',
        customerId: response.data.customerId,
        customerEphemeralKeySecret: response.data.ephemeralKey,
        paymentIntentClientSecret: response.data.clientSecret,
        returnURL: 'https://scrape4you.onrender.com',
        allowsDelayedPaymentMethods: true,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      // Step 3: Present the payment sheet
      const {error: paymentError} = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Error', paymentError.message);
        return;
      }

      // Payment was successful
      Alert.alert(
        'Congratulations! 🎉',
        'Your subscription has been successfully activated. Welcome to our premium services. You now have access to all features.',
        [
          {
            text: 'Continue',
            onPress: () => {
              dispatch(checkSubscriptionRequest({email: userData.email})),
                navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const renderScene = ({route}) => {
    const sharedProps = {
      products: products,
      selectedSubscription: subscriptionSelected,
      onSelectSubscription: subscription => {
        setSubscriptionSelected(subscription);
      },
      currentIndex: index,
      setSelectedActiveSubscription: setSelectedActiveSubscription,
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
      if (selectedActiveSubscription) {
        Alert.alert('Error', 'This subscription is already active');
        return;
      }
      const response = await axios.post(
        'https://scrape4you.onrender.com/stripe/create-customer-and-subscription',
        {
          email: email,
          priceId: subscriptionSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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

  const getSelectedPlanName = () => {
    const selectedProduct = products.find(p => p.id === subscriptionSelected);
    return selectedProduct ? selectedProduct.name : '';
  };
  const cancelSubscription = async subscriptionId => {
    if (!token) {
      Alert.alert('Error', 'Authentication required. Please login again.');
      return;
    }
    dispatch(cancelSubscriptionRequest({subscriptionId, token}));
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
        {subscriptionSelected && subscriptionSelected !== '' ? (
          <>
            {selectedActiveSubscription ? (
              // Show only cancel button if an active subscription is selected
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    Alert.alert(
                      'Cancel Subscription',
                      'Are you sure you want to cancel your subscription?',
                      [
                        {
                          text: 'No',
                          style: 'cancel',
                        },
                        {
                          text: 'Yes, Cancel',
                          onPress: async () => {
                            try {
                              // Find the active subscription ID
                              const activeSubscription = subscriptions.find(
                                sub => sub.plan.id === subscriptionSelected,
                              );
                              if (!activeSubscription) {
                                Alert.alert(
                                  'Error',
                                  'Could not find active subscription',
                                );
                                return;
                              }

                              await cancelSubscription(
                                activeSubscription?.subscriptionId,
                              );

                              // Refresh subscription data
                              dispatch(
                                checkSubscriptionRequest({
                                  email: userData.email,
                                }),
                              );

                              // Reset selection states
                              setSubscriptionSelected('');
                              setSelectedActiveSubscription(false);

                              Alert.alert(
                                'Success',
                                'Subscription cancelled successfully!',
                              );
                            } catch (error) {
                              console.error(
                                'Error cancelling subscription:',
                                error,
                              );
                              Alert.alert(
                                'Error',
                                'Failed to cancel subscription. Please try again.',
                              );
                            }
                          },
                        },
                      ],
                    );
                  }}>
                  {cancelLoading ? (
                    <ActivityIndicator color="#FF3B30" />
                  ) : (
                    <Text style={styles.deleteButtonText}>
                      Cancel Subscription
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              // Show payment buttons only if selected subscription is not active
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
            )}
          </>
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
                  opacity: 0.5,
                }}
                disabled={true}
              />
            )}
            {isPlatformPayAvailable && (
              <TouchableOpacity
                style={[styles.googlePayButton, {opacity: 0.5}]}
                onPress={() => Alert.alert('Please Select Any Subscription')}
                disabled={true}>
                <Text style={styles.googlePayText}>Pay with Google Pay</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.continueButton, {opacity: 0.5}]}
              onPress={() => Alert.alert('Please Select Any Subscription')}
              disabled={true}>
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
  currentIndex,
  setSelectedActiveSubscription,
}) => {
  const {subscriptions = []} = useSelector(
    state => state?.subscription?.subscriptionData || {},
  );
  const subscriptionIds = [
    'price_1R57DZDnmorUxClnRG48rfKZ',
    'price_1R15A1DnmorUxCln7W0DslGy',
    'price_1R9a3xDnmorUxClnuwyFYx1B',
  ];

  useFocusEffect(
    useCallback(() => {
      const activeId = isSubscriptionActive(subscriptionIds);

      if (activeId) {
        setSelectedActiveSubscription(true);
        onSelectSubscription(activeId);
      } else {
        setSelectedActiveSubscription(false);
        console.log('No active subscriptions found');
      }

      // Cleanup function (optional)
      return () => {
        // Reset states if needed when screen loses focus
        // setSelectedActiveSubscription(false);
      };
    }, []), // Add dependencies if these are used: setSelectedActiveSubscription, onSelectSubscription
  );
  const isSubscriptionActive = subscriptionIds => {
    // Convert single ID to array for consistent handling
    const ids = Array.isArray(subscriptionIds)
      ? subscriptionIds
      : [subscriptionIds];

    const activeSubscription = subscriptions.find(sub => {
      // Check if subscription is active
      if (sub.status !== 'active') return false;

      // Check if this subscription's plan ID matches any of the provided IDs
      return ids.includes(sub.plan.id);
    });

    return activeSubscription ? activeSubscription.plan.id : false;
  };
  const handleSubscriptionSelect = subscriptionId => {
    // First check if this subscription is already active
    const isActive = isSubscriptionActive(subscriptionId);

    if (isActive) {
      // If subscription is active, just select it to show cancel button
      setSelectedActiveSubscription(true);
      onSelectSubscription(subscriptionId);
      return;
    }

    // If not active, allow normal selection for purchase
    setSelectedActiveSubscription(false);
    onSelectSubscription(subscriptionId);
  };

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
              handleSubscriptionSelect('price_1R57DZDnmorUxClnRG48rfKZ')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R57DZDnmorUxClnRG48rfKZ'
                ? styles.optionFocused
                : styles.optionDisabled,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.sharingText}>
              price_1R57DZDnmorUxClnRG48rfKZ
            </Text>
            <Text style={styles.optionSubText}>50 GBP</Text>
            {isSubscriptionActive('price_1R57DZDnmorUxClnRG48rfKZ') && (
              <View style={styles.activeOverlay}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSubscriptionSelect('price_1R15A1DnmorUxCln7W0DslGy')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R15A1DnmorUxCln7W0DslGy'
                ? styles.optionFocused
                : styles.optionDisabled,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.sharingText}>
              price_1R15A1DnmorUxCln7W0DslGy
            </Text>
            <Text style={styles.optionSubText}>180 GBP</Text>
            {isSubscriptionActive('price_1R15A1DnmorUxCln7W0DslGy') && (
              <View style={styles.activeOverlay}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Add Corporate Box */}
        <View
          style={[
            styles.tabContainer,
            {
              justifyContent: 'center',
              marginHorizontal: wp * 0.05,
            },
          ]}>
          <TouchableOpacity
            onPress={() =>
              handleSubscriptionSelect('price_1R9a3xDnmorUxClnuwyFYx1B')
            }
            style={[
              styles.corporateBox,
              selectedSubscription === 'price_1R9a3xDnmorUxClnuwyFYx1B'
                ? styles.optionFocused
                : styles.optionDisabled,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Corporate Monthly</Text>
            <Text style={styles.sharingText}>
              price_1R9a3xDnmorUxClnuwyFYx1B
            </Text>
            <Text style={styles.optionSubText}>300 GBP</Text>
            {isSubscriptionActive('price_1R9a3xDnmorUxClnuwyFYx1B') && (
              <View style={styles.activeOverlay}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// ScrapRoute Component
const ScrapRoute = ({
  products,
  onSelectSubscription,
  selectedSubscription,
  currentIndex,
  setSelectedActiveSubscription,
}) => {
  const {subscriptions = []} = useSelector(
    state => state?.subscription?.subscriptionData || {},
  );
  const subscriptionIds = [
    'price_1R57CnDnmorUxClnS97UhVMT',
    'price_1R9a2eDnmorUxCln8q94c9Xg',
    'price_1R573DDnmorUxClnp4X4Imki',
  ];

  useFocusEffect(
    useCallback(() => {
      const activeId = isSubscriptionActive(subscriptionIds);

      if (activeId) {
        setSelectedActiveSubscription(true);
        onSelectSubscription(activeId);
      } else {
        setSelectedActiveSubscription(false);
        console.log('No active subscriptions found');
      }

      // Cleanup function (optional)
      return () => {
        // Reset states if needed when screen loses focus
        // setSelectedActiveSubscription(false);
      };
    }, []), // Add dependencies if these are used: setSelectedActiveSubscription, onSelectSubscription
  );
  const isSubscriptionActive = async subscriptionIds => {
    // Convert single ID to array for consistent handling
    const ids = Array.isArray(subscriptionIds)
      ? subscriptionIds
      : [subscriptionIds];

    const activeSubscription = await subscriptions.find(sub => {
      // Check if subscription is active
      if (sub.status !== 'active') return false;

      // Check if this subscription's plan ID matches any of the provided IDs
      return ids.includes(sub.plan.id);
    });

    return activeSubscription ? activeSubscription.plan.id : false;
  };
  const handleSubscriptionSelect = subscriptionId => {
    // First check if this subscription is already active
    const isActive = isSubscriptionActive(subscriptionId);

    if (isActive) {
      // If subscription is active, just select it to show cancel button
      setSelectedActiveSubscription(true);
      onSelectSubscription(subscriptionId);
      return;
    }

    // If not active, allow normal selection for purchase
    setSelectedActiveSubscription(false);
    onSelectSubscription(subscriptionId);
  };

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
              handleSubscriptionSelect('price_1R57CnDnmorUxClnS97UhVMT')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R57CnDnmorUxClnS97UhVMT'
                ? styles.optionFocused
                : styles.optionDisabled,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.sharingText}>
              price_1R57CnDnmorUxClnS97UhVMT
            </Text>
            <Text style={styles.optionSubText}>50 GBP</Text>
            {isSubscriptionActive('price_1R57CnDnmorUxClnS97UhVMT') && (
              <View style={styles.activeOverlay}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSubscriptionSelect('price_1R573DDnmorUxClnp4X4Imki')
            }
            style={[
              styles.optionSelected,
              selectedSubscription === 'price_1R573DDnmorUxClnp4X4Imki'
                ? styles.optionFocused
                : styles.optionDisabled,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.sharingText}>
              price_1R573DDnmorUxClnp4X4Imki
            </Text>
            <Text style={styles.optionSubText}>180 GBP</Text>
            {isSubscriptionActive('price_1R573DDnmorUxClnp4X4Imki') && (
              <View style={styles.activeOverlay}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Add Corporate Box */}
        <View
          style={[
            styles.tabContainer,
            {
              justifyContent: 'center',
              marginHorizontal: wp * 0.05,
            },
          ]}>
          <TouchableOpacity
            onPress={() =>
              handleSubscriptionSelect('price_1R9a2eDnmorUxCln8q94c9Xg')
            }
            style={[
              styles.corporateBox,
              selectedSubscription === 'price_1R9a2eDnmorUxCln8q94c9Xg'
                ? styles.optionFocused
                : styles.optionDisabled,
            ]}>
            <Image
              source={require('../../assets/loyalty.png')}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Corporate Monthly</Text>
            <Text style={styles.sharingText}>
              price_1R9a2eDnmorUxCln8q94c9Xg
            </Text>
            <Text style={styles.optionSubText}>300 GBP</Text>

            {isSubscriptionActive('price_1R9a2eDnmorUxCln8q94c9Xg') && (
              <View style={styles.activeOverlay}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            )}
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
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp * 0.03,
    height: hp / 4.5,
    padding: 10,
    position: 'relative',
  },
  optionFocused: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  optionDisabled: {
    backgroundColor: Colors?.white,
    opacity: 1,
    borderWidth: 0,
  },
  optionImage: {
    width: '18%',
    height: '18%',
  },
  optionText: {
    marginTop: wp * 0.01,
    fontSize: wp * 0.035,
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
    fontSize: wp * 0.035,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    width: wp - wp * 0.1,
    height: hp / 4.5,
    borderRadius: 10,

    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp * 0.03,
    padding: 10,
    position: 'relative',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp * 0.05,
    marginVertical: hp * 0.02,
    marginBottom: hp * 0.01,
  },

  deleteButton: {
    width: '100%',
    paddingVertical: hp * 0.015,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: wp * 0.038,
    fontFamily: Fonts.semiBold,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: wp * 0.038,
    fontFamily: Fonts.semiBold,
  },
  activeOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 0,
  },

  activeText: {
    color: Colors.primary,
    fontSize: wp * 0.03,
    fontFamily: Fonts.bold,
    backgroundColor: 'transparent',
    padding: 0,
  },
});

export default SubscriptionScreen;
