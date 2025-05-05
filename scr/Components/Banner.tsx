import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../Helper/Colors';
import {hp, wp} from '../Helper/Responsive';
import {Fonts} from '../Helper/Fonts';
import {checkSubscriptionRequest} from '../redux/slices/subcriptionsSlice';

const Banner = ({navigation}: {navigation: any}) => {
  const {hasSubscription, subscriptions = []} = useSelector(
    (state: any) => state?.subscription?.subscriptionData || {},
  );
  const loading = useSelector((state: any) => state?.subscription?.loading);
  const {userData} = useSelector((state: any) => state.user);

  const [subscription, setSubscription] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.email) {
      dispatch(checkSubscriptionRequest({email: userData?.email}));
    }
    setSubscription(hasSubscription);
  }, [userData?.email, hasSubscription]);

  // Get active subscription details
  const activeSubscription = subscriptions.find(sub => sub.status === 'active');
  const subscriptionName =
    activeSubscription?.plan?.name === 'Unknown Plan'
      ? 'Corporate Plan'
      : activeSubscription?.plan?.name || 'Premium Plan';
  const subscriptionPrice = activeSubscription?.plan?.price || 300;
  const subscriptionInterval =
    activeSubscription?.plan?.interval === 'N/A'
      ? 'monthly'
      : activeSubscription?.plan?.interval || 'week';

  return (
    <View style={styles.bannerContainer}>
      {/* Left Section: Text and Price OR Loader */}
      <View style={styles.leftSection}>
        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.loadingText}>
              Loading subscription details...
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.priceContainer}>
              <Text style={styles.discountedPrice}>
                {subscription
                  ? `${subscriptionName} (£${
                      subscriptionPrice === 170 ? 180 : subscriptionPrice
                    }/${subscriptionInterval})`
                  : 'Start from £50/week'}
              </Text>
              {!subscription && (
                <Text style={styles.originalPrice}>£180/Monthly</Text>
              )}
            </View>
            <Text style={styles.additionalText}>
              {subscription
                ? `Renews on ${new Date(
                    activeSubscription?.currentPeriodEnd,
                  ).toLocaleDateString()}`
                : 'Subscribe to Contact Customers'}
            </Text>
          </>
        )}
      </View>

      {/* Right Section: Button always rendered to maintain width */}
      <TouchableOpacity
        style={styles.getNowButton}
        onPress={() => navigation.navigate('Subscriptions')}
        disabled={loading}>
        <Text style={styles.getNowText}>
          {loading ? '...' : subscription ? 'Manage' : 'Get Now'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    borderWidth: 0.3,
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: wp(1),
    shadowOffset: {width: 0, height: hp(0.5)},
    elevation: 3,
    width: '100%',
  },
  loadingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftSection: {
    flex: 1,
    marginRight: wp(2),
  },
  priceContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: hp(0.5),
  },
  discountedPrice: {
    fontSize: wp(3.5),
    fontFamily: Fonts.semiBold,
    color: Colors.black,
    marginRight: wp(2),
  },
  originalPrice: {
    fontSize: wp(3),
    fontFamily: Fonts.semiBold,
    color: Colors.black,
  },
  additionalText: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    color: Colors.black,
    opacity: 0.8,
  },
  getNowButton: {
    borderRadius: wp(2),
    borderColor: Colors.primary,
    borderWidth: 0.3,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  getNowText: {
    fontSize: wp(3.5),
    fontFamily: Fonts.bold,
    color: Colors.primary,
    textAlign: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp(10),
    padding: wp(4),
  },
  loadingText: {
    color: Colors.primary,
    fontSize: wp(3.5),
    marginLeft: hp(1),
    fontFamily: Fonts.regular,
  },
});

export default Banner;
