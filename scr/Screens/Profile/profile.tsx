import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const Profile = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitleStyle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/dp.jpeg')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Text style={styles.editIconText}>✎</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          defaultValue="Lois"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          defaultValue="Becket"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          defaultValue="Loisbecket@gmail.com"
          keyboardType="email-address"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          defaultValue="+ (454) 726-0592"
          keyboardType="phone-pad"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#9E9E9E"
        />
        <TouchableOpacity style={styles.changePassword}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerTitleStyle: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 50,
  },

  header: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 24,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#333',
  },
  changePassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  changePasswordText: {
    fontSize: 14,
    color: '#007BFF',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
