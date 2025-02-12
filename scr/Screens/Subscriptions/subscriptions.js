import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SubscriptionScreen = ({navigation}: {navigation: any}) => {
  const [activeSubscription, setActiveSubscription] = useState(null); // To track the active subscription

  const handleSubscriptionPress = type => {
    setActiveSubscription(type);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/arrow.png')}
        style={styles.iconBack}
      />

      <Text style={styles.title}>Subscription</Text>
      <Text style={styles.heading}>Upgrade to Pro</Text>
      <Text style={styles.description}>
        Get access to exclusive features tailored for Scrap and Salvage
        services.
      </Text>

      {/* Subscription 1: Scrap */}
      <TouchableOpacity
        style={[
          styles.subscriptionCard,
          activeSubscription === 'Scrap' && styles.activeCard,
        ]}
        onPress={() => handleSubscriptionPress('Scrap')}>
        <Text style={styles.subscriptionTitle}>Scrap</Text>
        <Text style={styles.subscriptionDescription}>
          Best for analyzing and managing scrap materials effectively. Save time
          and maximize profits.
        </Text>
        <Text style={styles.subscriptionPrice}>$9.99 / month</Text>
        {activeSubscription === 'Scrap' && (
          <Text style={styles.activeText}>Active Subscription</Text>
        )}
      </TouchableOpacity>

      {/* Subscription 2: Salvage */}
      <TouchableOpacity
        style={[
          styles.subscriptionCard,
          activeSubscription === 'Salvage' && styles.activeCard,
        ]}
        onPress={() => handleSubscriptionPress('Salvage')}>
        <Text style={styles.subscriptionTitle}>Salvage</Text>
        <Text style={styles.subscriptionDescription}>
          Perfect for recovering valuable materials and optimizing salvage
          operations.
        </Text>
        <Text style={styles.subscriptionPrice}>$14.99 / month</Text>
        {activeSubscription === 'Salvage' && (
          <Text style={styles.activeText}>Active Subscription</Text>
        )}
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 50,
  },
  iconBack: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  subscriptionCard: {
    backgroundColor: '#d3d3d3', // Light grey by default
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  activeCard: {
    backgroundColor: '#007BFF', // Blue for active subscription
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subscriptionDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  subscriptionPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activeText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SubscriptionScreen;
