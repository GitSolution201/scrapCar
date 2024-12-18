import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons'; // For icons

const Dashboard = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Dashboard Items */}
      <TouchableOpacity style={styles.card}>
        <Ionicons name="bar-chart" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Analytics</Text>
          <Text style={styles.cardSubtitle}>
            Call History and relevant stats
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Messages</Text>
          <Text style={styles.cardSubtitle}>
            Contact Support or view messages
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Ionicons name="notifications" size={24} color="#007BFF" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>User Announcements</Text>
          <Text style={styles.cardSubtitle}>Latest News from app</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  cardContent: {
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default Dashboard;
