import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Colors from '../../Helper/Colors';

const Register = ({navigation}: {navigation: any}) => {
  return (
    <ImageBackground
      source={require('../../assets/background.jpeg')} // Replace with your actual background image path
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create an account to continue!</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCapitalize="words"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCapitalize="words"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#9E9E9E"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.link}>
          <Text>
            Already have an account? <Text style={styles.linkText}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency over background
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 30,
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
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Register;
