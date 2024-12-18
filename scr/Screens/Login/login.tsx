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

const Login = ({navigation}: {navigation: any}) => {
  const handleLogin = () => {
    navigation.replace('MainTabs'); // Ensure MainTabs is part of the registered navigation
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpeg')} // Path to your background image
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your Account</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to log in
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9E9E9E"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#9E9E9E"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={goToRegister}>
          <Text>
            Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
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
    marginBottom: 20,
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
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Login;
