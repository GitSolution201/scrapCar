import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getQuoteRequest, resetQuote} from '../../redux/slices/qouteDataSlice';
import {hp, wp} from '../../Helper/Responsive';
import Colors from '../../Helper/Colors';
import {Fonts} from '../../Helper/Fonts';
import {useNavigation} from '@react-navigation/native';
import api from '../../redux/api';

const QuoteMessages = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {quotes, loading, error} = useSelector(
    (state: any) => state?.quoteData,
  );
  const {token} = useSelector((state: any) => state.auth);
  const {userData} = useSelector((state: any) => state.user);
  const [apiError, setApiError] = useState(null);
  const [carListings, setCarListings] = useState([]);

  useEffect(() => {
    dispatch(getQuoteRequest({userId: userData?.userId, token}));
    fetchCarListings();
    return () => dispatch(resetQuote());
  }, [userData]);

  const fetchCarListings = async () => {
    try {
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await api.get('/car/get-all-listing', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setCarListings(response.data);

      // Match quotes with car listings and log displayImage
      quotes.forEach(quote => {
        const matchedListing = response.data.find(
          listing => listing._id === quote.listingId,
        );
        if (matchedListing) {
          console.log('Matched displayImage:', matchedListing.displayImage);
        }
      });
    } catch (err) {
      if (err.response) {
        console.log('API Error Response:', err.response.data);
        console.log('Status Code:', err.response.status);
        setApiError(err.response.data?.message || 'Something went wrong!');
      } else if (err.request) {
        console.log('API Request Error:', err.request);
        setApiError(
          'No response from server. Please check your internet connection.',
        );
      } else {
        console.log('API Unexpected Error:', err.message);
        setApiError(err.message);
      }
    }
  };

  const getDisplayImage = listingId => {
    const matchedListing = carListings.find(
      listing => listing._id === listingId,
    );
    return matchedListing?.displayImage;
  };

  // const renderQuoteItem = ({item}) => (
  //   <View style={styles.cardContainer}>
  //     {/* Car Display Image at the top */}
  //     {getDisplayImage(item.listingId) && (
  //       <Image
  //         source={{uri: getDisplayImage(item.listingId)}}
  //         style={styles.displayImage}
  //         resizeMode="contain"
  //       />
  //     )}

  //     {/* Quote Content */}
  //     <View style={styles.quoteContent}>
  //       <View style={styles.quoteHeader}>
  //         <Image
  //           source={require('../../assets/profile.png')}
  //           style={styles.profileImage}
  //         />
  //         <View style={styles.quoteInfo}>
  //           <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
  //           <Text style={styles.date}>
  //             {new Date(item.createdAt).toLocaleDateString('en-GB', {
  //               day: 'numeric',
  //               month: 'short',
  //               year: 'numeric',
  //               hour: '2-digit',
  //               minute: '2-digit',
  //             })}
  //           </Text>
  //         </View>
  //       </View>

  //       <View style={styles.messageBubble}>
  //         <Text style={styles.messageText}>{item.message}</Text>
  //       </View>
  //     </View>
  //   </View>
  // );
  const renderQuoteItem = ({item}) => (
    <View style={styles.cardContainer}>
      <Image
        source={{uri: getDisplayImage(item.listingId)}}
        style={styles.displayImage}
        resizeMode="contain"
      />

      <View style={styles.quoteDetails}>
        <View style={styles.rowBetween}>
          <Image
            source={require('../../assets/profile.png')}
            style={styles.profileImage}
          />
          <View style={{flex: 1, marginLeft: wp(3)}}>
            <Text style={styles.amount}>£{item.amount.toLocaleString()}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText} numberOfLines={3}>
            {item.message}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) return <Text style={styles.loadingText}>Loading quotes...</Text>;
  if (error || apiError)
    return <Text style={styles.errorText}>Error: {error || apiError}</Text>;

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
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
        <Text style={styles.screenTitle}>Agent Quotes</Text>
      </View> */}
      <View style={styles.header}>
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

        <View style={styles.titleWrapper}>
          <Text style={styles.screenTitle}>Agent Quotes</Text>
        </View>

        {/* Dummy View to balance space with back button */}
        <View style={styles.backButton} />
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    marginVertical: wp(3),
  },
  backButton: {
    marginRight: wp(3),
  },
  iconBack: {
    width: wp(5),
    height: wp(5),
    resizeMode: 'contain',
  },
  screenTitle: {
    fontSize: wp(5),
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  listContainer: {
    paddingBottom: hp(4),
  },
  // cardContainer: {
  //   backgroundColor: Colors.white,
  //   borderRadius: wp(3),
  //   marginBottom: hp(2.5),
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 4},
  //   shadowOpacity: 0.08,
  //   shadowRadius: 6,
  //   elevation: 4,
  //   overflow: 'hidden',
  //   borderWidth: 0.5,
  //   borderColor: '#f0f0f0',
  // },

  // displayImage: {
  //   width: '100%',
  //   height: hp(18),
  //   borderTopLeftRadius: wp(3),
  //   borderTopRightRadius: wp(3),
  //   backgroundColor: Colors.lightGray,
  // },

  // quoteContent: {
  //   padding: wp(4),
  //   backgroundColor: Colors.white,
  // },

  // quoteHeader: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: hp(1),
  // },

  // profileImage: {
  //   width: wp(10),
  //   height: wp(10),
  //   borderRadius: wp(5),
  //   marginRight: wp(3),
  // },

  // quoteInfo: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },

  // amount: {
  //   fontSize: wp(4.2),
  //   fontFamily: Fonts.bold,
  //   color: Colors.primary,
  // },

  // date: {
  //   fontSize: wp(3.3),
  //   fontFamily: Fonts.medium,
  //   color: Colors.textGray,
  //   marginTop: hp(0.3),
  // },

  // messageBubble: {
  //   marginTop: hp(1.5),
  //   backgroundColor: '#f7f7f7',
  //   borderRadius: wp(2),
  //   padding: wp(3),
  //   borderWidth: 0.5,
  //   borderColor: '#e0e0e0',
  // },

  // messageText: {
  //   fontSize: wp(3.8),
  //   fontFamily: Fonts.regular,
  //   color: Colors.black,
  //   lineHeight: hp(2.6),
  // },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(3),
    marginBottom: hp(2.5),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#eaeaea',
  },

  displayImage: {
    width: '100%',
    height: hp(18),
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    backgroundColor: Colors.lightGray,
  },

  quoteDetails: {
    padding: wp(4),
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },

  profileImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#ddd',
  },

  amount: {
    fontSize: wp(4.3),
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  date: {
    fontSize: wp(3.2),
    fontFamily: Fonts.medium,
    color: '#888',
    marginTop: hp(0.5),
  },

  messageContainer: {
    marginTop: hp(1),
    backgroundColor: '#f9f9f9',
    borderRadius: wp(2),
    padding: wp(3),
    borderWidth: 0.6,
    borderColor: '#efefef',
  },

  messageText: {
    fontSize: wp(3.8),
    fontFamily: Fonts.regular,
    color: Colors.black,
    lineHeight: hp(2.6),
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
