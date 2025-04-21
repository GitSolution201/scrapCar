import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getQuoteRequest, resetQuote} from '../../redux/slices/qouteDataSlice';
import {hp, wp} from '../../Helper/Responsive';
import Colors from '../../Helper/Colors';
import {Fonts} from '../../Helper/Fonts';
import {useNavigation} from '@react-navigation/native';

const QuoteMessages = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {quotes, loading, error} = useSelector(
    (state: any) => state?.quoteData,
  );
  const {token} = useSelector((state: any) => state.auth);
  const {userData} = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(getQuoteRequest({userId: userData?.userId, token}));

    return () => dispatch(resetQuote());
  }, [userData]);

  const renderQuoteItem = ({item}) => (
    <View style={styles.quoteContainer}>
      <View style={styles.quoteHeader}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileImage}
        />
        <View style={styles.quoteInfo}>
          <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
          <Text style={styles.date}>
            {new Date(item.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );

  if (loading) return <Text style={styles.loadingText}>Loading quotes...</Text>;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.4}>
          <Image
            source={require('../../assets/left-arrow.png')}
            style={styles.iconBack}
            tintColor={Colors?.backIconColor}
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.screenTitle}>Quotes</Text> */}
      <FlatList
        data={quotes}
        renderItem={renderQuoteItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No quotes received yet</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(4),
  },
  backButton: {
    marginRight: wp(1),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(7),
  },

  iconBack: {
    width: wp(5),
    height: wp(5),
    resizeMode: 'contain',
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  screenTitle: {
    fontSize: wp(5),
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginVertical: hp(5),
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: hp(4),
  },
  quoteContainer: {
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    marginBottom: hp(2),
    borderWidth: 0.2,
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    marginRight: wp(3),
  },
  quoteInfo: {
    flex: 1,
  },
  amount: {
    fontSize: wp(4.5),
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  date: {
    fontSize: wp(3.2),
    fontFamily: Fonts.regular,
    color: Colors.textGray,
    marginTop: hp(0.5),
  },
  messageBubble: {
    backgroundColor: Colors.lightGray,
    borderRadius: wp(2),
    padding: wp(3.5),
  },
  messageText: {
    fontSize: wp(4),
    fontFamily: Fonts.regular,
    color: Colors.black,
    lineHeight: hp(2.8),
  },
  loadingText: {
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: wp(4),
    color: Colors.textGray,
  },
  errorText: {
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: wp(4),
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: hp(5),
    fontSize: wp(4),
    color: Colors.textGray,
  },
});

export default QuoteMessages;
