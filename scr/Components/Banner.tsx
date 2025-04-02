import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../Helper/Colors';
import {hp, wp} from '../Helper/Responsive';
import {Fonts} from '../Helper/Fonts';
import {checkSubscriptionRequest} from '../redux/slices/subcriptionsSlice';

const Banner = ({navigation}: {navigation: any}) => {
  const {hasSubscription, subscriptions = []} = useSelector(
    (state: any) => state?.subscription?.subscriptionData || {}
  );
  
  const {userData} = useSelector((state: any) => state.user);

  const [subscription, setSubscription] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkSubscriptionRequest({email: userData?.email}));
    setSubscription(hasSubscription);
  }, [hasSubscription]);

  // Get active subscription details
  const activeSubscription = subscriptions.find(sub => sub.status === 'active');
  const subscriptionName = activeSubscription?.plan?.name || 'Premium Plan';
  const subscriptionPrice = activeSubscription?.plan?.price || 50;
  const subscriptionInterval = activeSubscription?.plan?.interval || 'week';

  return (
    <View style={styles.bannerContainer}>
      {/* Left Section: Text and Price */}
      <View style={styles.leftSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>
            {subscription 
              ? `Subscribed: ${subscriptionName} (£${subscriptionPrice}/${subscriptionInterval})`
              : '£50/week'}
          </Text>
          {!subscription && <Text style={styles.originalPrice}>£50/week</Text>}
        </View>
        <Text style={styles.additionalText}>
          {subscription
            ? `Renews on ${new Date(activeSubscription?.currentPeriodEnd).toLocaleDateString()}`
            : 'Subscribe to Contact Customers'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.getNowButton}
        onPress={() => navigation.navigate('Subscriptions')}>
        <Text style={styles.getNowText}>
          {subscription ? 'Manage' : 'Get Now'}
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
    padding: wp(3),
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
  leftSection: {
    flex: 1,
    marginRight: wp(2),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: Fonts.regular,
    color: Colors.black,
    textDecorationLine: 'line-through',
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
});

export default Banner;