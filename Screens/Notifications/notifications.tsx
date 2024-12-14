import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const notifications = [
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
  const renderItem = ({item}) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  notificationText: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#757575',
  },
  deleteButton: {
    width: 30,
    height: 30,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Notifications;
