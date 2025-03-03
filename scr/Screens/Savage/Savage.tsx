import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../Helper/Colors';
import {wp} from '../../Helper/Responsive';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CarList from '../../Components/CarList';
import Header from '../../Components/Header';
import {getFavListingsRequest} from '../../redux/slices/favouriteListingSlice';

const Savage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.auth?.token);
  const {loading, error, data} = useSelector((state: any) => state.favListings);
  useEffect(() => {
    if (isFocused) {
      dispatch(getFavListingsRequest(token));
    }
  }, [isFocused]);
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading Listings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <CarList item={item} itemIndex={index} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

export default Savage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    backgroundColor: '#F5F5F5',
    margin: Platform.OS === 'ios' ? 20 : 5,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
