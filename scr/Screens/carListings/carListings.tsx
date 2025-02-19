// import React, {useCallback, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import Colors from '../../Helper/Colors';
// import {useDispatch, useSelector} from 'react-redux';
// import {getUserRequest} from '../../redux/slices/carListingsSlice';
// import {hp, wp} from '../../Helper/Responsive';
// import {
//   useFocusEffect,
//   useIsFocused,
//   useNavigation,
// } from '@react-navigation/native';

// // Local images
// const localImages = {
//   car1: require('../../assets/car.png'),
//   car2: require('../../assets/car2.png'),
// };

// const Listings = () => {
//   const isFocused = useIsFocused();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const token = useSelector((state: any) => state.auth?.token);
//   const {loading, error, data} = useSelector((state: any) => state.carListings);
//   const [activeFilters, setActiveFilters] = useState(['Scrape']);

//   // useEffect(() => {
//   //   if (isFocused) {
//   //     dispatch(getUserRequest(token));
//   //   }
//   // }, [isFocused]);
//   useFocusEffect(
//     useCallback(() => {
//       dispatch(getUserRequest(token));
//     }, [dispatch, token]),
//   );
//   const getLocalImage = (index: any) => {
//     const imageKeys = Object.keys(localImages);
//     return localImages[imageKeys[index % imageKeys.length]];
//   };

//   const handleFilterPress = (filter: any) => {
//     if (filter === 'Savage') {
//       // Navigate to the new screen for "Both" logic
//       navigation.navigate('Savage');
//     } else {
//       let updatedFilters = [...activeFilters];
//       if (updatedFilters.includes(filter)) {
//         // If the filter is already active, remove it
//         updatedFilters = updatedFilters.filter(f => f !== filter);
//       } else {
//         // If the filter is not active, add it
//         updatedFilters.push(filter);
//       }
//       setActiveFilters(updatedFilters);
//     }
//   };

//   const filteredData = data?.filter((item: any) => {
//     if (activeFilters.includes('Scrape') && activeFilters.includes('Salvage')) {
//       return item.tag === 'scrape' || item.tag === 'salvage';
//     } else if (activeFilters.includes('Scrape')) {
//       return item.tag === 'scrape';
//     } else if (activeFilters.includes('Salvage')) {
//       return item.tag === 'salvage';
//     }
//     return false;
//   });

//   const renderItem = ({item, index}) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('CarDeatils', {car: item})}
//       style={styles.listingCard}>
//       <Image
//         source={getLocalImage(index)}
//         style={styles.carImage}
//         resizeMode="contain"
//       />
//       <View style={styles.detailsContainer}>
//         <Text style={styles.carTitle}>
//           {item.make} {item.model} ({item.yearOfManufacture})
//         </Text>
//         <Text style={styles.details}>
//           Registration: {item.registrationNumber}
//         </Text>
//         <Text style={styles.details}>Postcode: {item.postcode}</Text>
//         <Text style={styles.details}>
//           Engine Capacity: {item.engineCapacity} cc
//         </Text>
//         <Text style={styles.details}>Fuel Type: {item.fuelType}</Text>
//         <Text style={styles.details}>Problem: {item.problem}</Text>
//         <View style={styles.footer}>
//           <View style={{flexDirection: 'row'}}>
//             <Image
//               source={require('../../assets/compass.png')}
//               style={styles.icon}
//             />
//             <Text style={styles.footerText}>{item.distance}</Text>
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <Image
//               source={require('../../assets/user2.png')}
//               style={styles.icon}
//             />
//             <Text style={styles.footerText}>{item.views} Views</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//         <Text style={styles.loadingText}>Loading Listings...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Listings</Text>
//         <View style={styles.bannerContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Subscriptions')}>
//             <Text style={styles.bannerText}>
//               Subscribe to Contact Customers
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Filters */}
//       <View style={styles.filterContainer}>
//         {['Scrape', 'Salvage', 'Savage'].map(filter => (
//           <TouchableOpacity
//             key={filter}
//             style={[
//               styles.filterButton,
//               activeFilters.includes(filter) && styles.filterButtonActive,
//             ]}
//             activeOpacity={0.7}
//             onPress={() => handleFilterPress(filter)}>
//             <Text
//               style={[
//                 styles.filterText,
//                 activeFilters.includes(filter) && styles.filterTextActive,
//               ]}>
//               {filter}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Listings */}
//       <FlatList
//         data={filteredData}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={item => item._id}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   bannerContainer: {
//     backgroundColor: '#007BFF',
//     padding: wp(2),
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   bannerText: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: Colors.primary,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   header: {
//     marginTop: hp(5),
//     marginBottom: hp(2),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     fontSize: wp(6),
//     fontWeight: 'bold',
//     color: Colors.darkGray,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   filterButton: {
//     flex: 1,
//     marginHorizontal: 5,
//     paddingVertical: 10,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   filterButtonActive: {
//     backgroundColor: '#007BFF',
//   },
//   filterText: {
//     color: '#555',
//     fontSize: 16,
//   },
//   filterTextActive: {
//     color: '#FFF',
//   },
//   list: {
//     paddingBottom: 20,
//     marginTop: 20,
//   },
//   listingCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 15,
//     marginTop: 20,
//     marginBottom: 30,
//     paddingTop: 30,
//     paddingHorizontal: 15,
//     paddingBottom: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: {width: 0, height: 2},
//     elevation: 3,
//   },
//   carImage: {
//     position: 'absolute',
//     top: -70,
//     right: -10,
//     width: '70%',
//     height: '70%',
//   },
//   detailsContainer: {
//     padding: 10,
//   },
//   carTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.primary,
//     paddingVertical: hp(2),
//   },
//   details: {
//     fontSize: 14,
//     color: '#555',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#757575',
//   },
// });

// export default Listings;
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Colors from '../../Helper/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest} from '../../redux/slices/carListingsSlice';
import {hp, wp} from '../../Helper/Responsive';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

// Local images
const localImages = {
  car1: require('../../assets/car.png'),
  car2: require('../../assets/car2.png'),
};

const Listings = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth?.token);
  const {loading, error, data} = useSelector((state: any) => state.carListings);
  const [activeFilters, setActiveFilters] = useState(['Scrape']);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserRequest(token));
    }, [dispatch, token]),
  );

  const getLocalImage = (index: any) => {
    const imageKeys = Object.keys(localImages);
    return localImages[imageKeys[index % imageKeys.length]];
  };

  const handleFilterPress = (filter: any) => {
    if (filter === 'Savage') {
      navigation.navigate('Savage');
    } else {
      let updatedFilters = [...activeFilters];
      if (updatedFilters.includes(filter)) {
        updatedFilters = updatedFilters.filter(f => f !== filter);
      } else {
        updatedFilters.push(filter);
      }
      setActiveFilters(updatedFilters);
    }
  };

  // Filter data based on active filters and search query
  const filteredData = data?.filter((item: any) => {
    // Filter by active filters
    const filterMatch =
      (activeFilters.includes('Scrape') && item.tag === 'scrape') ||
      (activeFilters.includes('Salvage') && item.tag === 'salvage');

    // Filter by search query (postcode or location name)
    const searchMatch =
      item.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationName?.toLowerCase().includes(searchQuery.toLowerCase());

    return filterMatch && searchMatch;
  });

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CarDeatils', {car: item})}
      style={styles.listingCard}>
      <Image
        source={getLocalImage(index)}
        style={styles.carImage}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.carTitle}>
          {item.make} {item.model} ({item.yearOfManufacture})
        </Text>
        <Text style={styles.details}>
          Registration: {item.registrationNumber}
        </Text>
        <Text style={styles.details}>Postcode: {item.postcode}</Text>
        <Text style={styles.details}>
          Engine Capacity: {item.engineCapacity} cc
        </Text>
        <Text style={styles.details}>Fuel Type: {item.fuelType}</Text>
        <Text style={styles.details}>Problem: {item.problem}</Text>
        <View style={styles.footer}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/compass.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{item.distance}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/user2.png')}
              style={styles.icon}
            />
            <Text style={styles.footerText}>{item.views} Views</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listings</Text>
        <View style={styles.bannerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Subscriptions')}>
            <Text style={styles.bannerText}>
              Subscribe to Contact Customers
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        {['Scrape', 'Salvage', 'Savage'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilters.includes(filter) && styles.filterButtonActive,
            ]}
            activeOpacity={0.7}
            onPress={() => handleFilterPress(filter)}>
            <Text
              style={[
                styles.filterText,
                activeFilters.includes(filter) && styles.filterTextActive,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by postcode or location..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filters */}

      {/* Listings */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F5F5F5',
  },
  bannerContainer: {
    backgroundColor: '#007BFF',
    padding: wp(2),
    borderRadius: 8,
    alignItems: 'center',
  },
  bannerText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  header: {
    marginTop: hp(5),
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  searchBar: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    color: '#555',
    fontSize: 16,
  },
  filterTextActive: {
    color: '#FFF',
  },
  list: {
    paddingBottom: 20,
    marginTop: 20,
  },
  listingCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  carImage: {
    position: 'absolute',
    top: -70,
    right: -10,
    width: '70%',
    height: '70%',
  },
  detailsContainer: {
    padding: 10,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    paddingVertical: hp(2),
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#757575',
  },
});

export default Listings;
