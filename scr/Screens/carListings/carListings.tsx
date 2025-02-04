// import React, {useEffect, useState} from 'react';
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

// const listingsData = [
//   {
//     id: '1',
//     title: 'S 500 Sedan',
//     price: '$548',
//     registration: 'DN63WPZ',
//     postCode: 'S63',
//     weight: '1320 KG',
//     engineCode: 'M472D20C',
//     engineSize: '1995',
//     transmission: 'MANUAL 6 Gears',
//     distance: '107 mi',
//     views: '8',
//     image: require('../../assets/car.png'),
//   },
//   {
//     id: '2',
//     title: 'GLA 250 SUV',
//     price: '$548',
//     registration: 'DN63WPZ',
//     postCode: 'S63',
//     weight: '1320 KG',
//     engineCode: 'M472D20C',
//     engineSize: '1995',
//     transmission: 'MANUAL 6 Gears',
//     distance: '107 mi',
//     views: '8',
//     image: require('../../assets/car2.png'),
//   },
//   {
//     id: '1',
//     title: 'S 500 Sedan',
//     price: '$548',
//     registration: 'DN63WPZ',
//     postCode: 'S63',
//     weight: '1320 KG',
//     engineCode: 'M472D20C',
//     engineSize: '1995',
//     transmission: 'MANUAL 6 Gears',
//     distance: '107 mi',
//     views: '8',
//     image: require('../../assets/car.png'),
//   },
//   {
//     id: '2',
//     title: 'GLA 250 SUV',
//     price: '$548',
//     registration: 'DN63WPZ',
//     postCode: 'S63',
//     weight: '1320 KG',
//     engineCode: 'M472D20C',
//     engineSize: '1995',
//     transmission: 'MANUAL 6 Gears',
//     distance: '107 mi',
//     views: '8',
//     image: require('../../assets/car2.png'),
//   },
// ];
// const Listings = ({navigation}: {navigation: any}) => {
//   const dispatch = useDispatch();
//   const { loginResponse} = useSelector((state: any) => state.auth);
//   const {loading,error,data} = useSelector((state: any) => state.carListings);
//   const [activeFilter, setActiveFilter] = useState('Scrap'); // State for active button
//   const [activeSort, setActiveSort] = useState(false); // State for sorting
//   useEffect(() => {
//     getUser();
//   }, [loginResponse]);
//   const getUser = () => {
//     if (loginResponse?.token) {
//       dispatch(getUserRequest(loginResponse?.token));
//     }
//   };
//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('CarDeatils')}
//       style={styles.listingCard}>
//       <Image source={item.image} style={styles.carImage} />
//       <View style={styles.detailsContainer}>
//         <Text style={styles.carTitle}>{item.title}</Text>
//         <Text style={styles.details}>
//           Registration: {item.registrationNumber} | Post Code: {item.yearOfManufacture}
//         </Text>
//         <Text style={styles.details}>
//           Weight: {item.weight} | Engine Code: {item.engineCode}
//         </Text>
//         <Text style={styles.details}>Engine Size: {item.engineSize}</Text>
//         <Text style={styles.details}>Transmission: {item.transmission}</Text>
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

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Listings</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')}>
//           <Text style={{paddingTop: 10}}>Subscribe to Contact Customers</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Filters */}
//       <View style={styles.filterContainer}>
//         {['Scrap', 'Salvage', 'Both'].map(filter => (
//           <TouchableOpacity
//             key={filter}
//             style={[
//               styles.filterButton,
//               activeFilter === filter && styles.filterButtonActive,
//             ]}
//             activeOpacity={0.7}
//             onPress={() => setActiveFilter(filter)}>
//             <Text
//               style={[
//                 styles.filterText,
//                 activeFilter === filter && styles.filterTextActive,
//               ]}>
//               {filter}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Sorting */}
//       <View style={styles.sortContainer}>
//         <TouchableOpacity
//           style={[
//             {flexDirection: 'row'},
//             styles.sortButton,

//             activeSort === true && styles.sortButtonActive,
//           ]}
//           onPress={() => setActiveSort(!activeSort)}>
//           <Text
//             style={[
//               styles.sortText,
//               activeSort === false && styles.sortTextActive,
//             ]}>
//             Newest to oldest
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Listings */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
//       ) : error ? (
//         <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
//       ) : (
//         <FlatList
//           data={data} // Use data fetched from the API
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.list}
//         />
//       )}
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
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   header: {
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 40,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
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
//   sortContainer: {
//     marginBottom: 20,
//     alignItems: 'flex-start',
//   },
//   sortButton: {
//     paddingHorizontal: 15,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 8,
//     padding: 4,
//   },

//   sortButtonActive: {
//     backgroundColor: '#007BFF',
//   },
//   sortText: {
//     fontSize: 14,
//   },
//   sortTextActive: {},
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
//     top: -80,
//     right: -50,
//     width: '90%',
//     height: '90%',
//     resizeMode: 'contain',
//   },
//   detailsContainer: {
//     padding: 10,
//   },
//   carTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: Colors.primary,
//   },
//   details: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
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
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest} from '../../redux/slices/carListingsSlice';
import Colors from '../../Helper/Colors';
import { hp, wp } from '../../Helper/Responsive';

const defaultImage = require('../../assets/car.png');

const Listings = ({navigation}:{navigation:any}) => {
  const dispatch = useDispatch();
  const {loginResponse} = useSelector(state => state.auth);
  const {loading, error, data} = useSelector(state => state.carListings);
  const [activeFilter, setActiveFilter] = useState('Scrape');
  useEffect(() => {
    if (loginResponse?.token) {
      dispatch(getUserRequest(loginResponse?.token));
    }
  }, [loginResponse]);

  const renderItem = ({item}:{item:any}) => {
    // If a field is missing, provide a default value
    const title = item.model || 'Model Not Available';
    const registration = item.registrationNumber || 'Unknown Registration';
    const year = item.yearOfManufacture || 'Year Not Available';
    const weight = item.weight || 'Weight Not Provided';
    const engineCode = item.engineCode || 'N/A';
    const engineSize = item.engineCapacity
      ? `${item.engineCapacity} cc`
      : 'Engine Size Not Available';
    const transmission = item.transmission || 'Transmission Not Specified';
    const distance = item.distance || 'Distance Not Available';
    const views = item.views || '0';
    const problem = item.problem || 'No issues reported';
    const image = defaultImage;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CarDeatils', { car: item })}
        style={styles.listingCard}>
        <Image source={image} style={styles.carImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.carTitle}>{title}</Text>
          <Text style={styles.details}>
            Registration: {registration} | Year: {year}
          </Text>
          <Text style={styles.details}>
            Weight: {weight} | Engine Code: {engineCode}
          </Text>
          <Text style={styles.details}>Engine Size: {engineSize}</Text>
          <Text style={styles.details}>Transmission: {transmission}</Text>
          <Text style={styles.details}>Problem: {problem}</Text>
          <View style={styles.footer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/compass.png')}
                style={styles.icon}
              />
              <Text style={styles.footerText}>{distance}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/user2.png')}
                style={styles.icon}
              />
              <Text style={styles.footerText}>{views} Views</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listings</Text>
      </View>
      <View style={styles.filterContainer}>
        {['Scrape', 'Salvage', 'Both'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter)}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : error ? (
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      ) : (
        <FlatList
          data={data?.filter(
            item =>
              item.tag === activeFilter.toLowerCase() ||
              activeFilter === 'Both',
          )}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5), 
    paddingTop: hp(2), 
    backgroundColor: Colors.gray, 
  },
  icon: {
    width: wp(5), 
    height: wp(5), 
    marginRight: wp(2), 
  },
  header: {
    marginBottom: hp(2), 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(5), 
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: wp(6), 
    fontWeight: 'bold',
    color: Colors.darkGray, 
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2), 
  },
  filterButton: {
    flex: 1,
    marginHorizontal: wp(1),
    paddingVertical: hp(1), 
    backgroundColor: Colors.lightGray,
    borderRadius: wp(2),
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary, 
  },
  filterText: {
    color: Colors.textGray, 
    fontSize: wp(4.5), 
  },
  filterTextActive: {
    color: Colors.white, 
  },
  listingCard: {
    backgroundColor: Colors.white, 
    borderRadius: wp(4), 
    marginTop: hp(3), 
    marginBottom: hp(5), 
    padding: wp(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: '100%',
    height: hp(25),
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: wp(2),
  },
  carTitle: {
    fontSize: wp(5), 
    fontWeight: 'bold',
    marginBottom: hp(1), 
    color: Colors.darkGray,
  },
  details: {
    fontSize: wp(3.5), 
    color: Colors.textGray, 
    marginBottom: hp(1), 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  footerText: {
    fontSize: wp(3.5),
    color: Colors.footerGray,
  },
});


export default Listings;
