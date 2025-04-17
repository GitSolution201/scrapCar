import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {hp, wp} from '../../Helper/Responsive';
import Colors from '../../Helper/Colors';
import {Fonts} from '../../Helper/Fonts';

const initialNotifications = [
  {
    id: '1',
    title: 'New Contact',
    description: 'Viewed your contact information',
    time: '0 minutes ago',
  },
  {
    id: '2',
    title: 'New Contact',
    description: 'Viewed your contact information',
    time: '0 minutes ago',
  },
  {
    id: '3',
    title: 'New Contact',
    description: 'Viewed your contact information',
    time: '0 minutes ago',
  },
  {
    id: '4',
    title: 'New Contact',
    description: 'Viewed your contact information',
    time: '0 minutes ago',
  },
  {
    id: '5',
    title: 'New Contact',
    description: 'Viewed your contact information',
    time: '0 minutes ago',
  },
];

const Notifications = () => {
  const [data, setData] = useState(initialNotifications);

  const handleClearAll = () => {
    setData([]);
  };

  const renderItem = ({item}) => (
    <View style={styles.notificationCard}>
      <Image
        source={require('../../assets/profile.png')} // Replace with your image
        style={styles.avatar}
      />
      <View style={styles.notificationText}>
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  headerTitle: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#333',
  },

  list: {
    paddingBottom: hp(2),
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    padding: wp(4),
    borderRadius: wp(2),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },

  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(3),
    resizeMode: 'contain',
  },

  notificationText: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },

  title: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },

  description: {
    fontSize: wp(3.4),
    color: '#666',
    lineHeight: hp(2.5),
  },

  time: {
    fontSize: wp(3.2),
    color: '#999',
    marginLeft: wp(2),
  },
  deleteButton: {
    width: wp(8),
    height: wp(8),
    backgroundColor: '#E0E0E0',
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: wp(4),
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: hp(10),
    fontSize: wp(4),
    color: '#999',
  },
});

export default Notifications;
