import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import Colors from '../../Helper/Colors';

const Login = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { loading, loginResponse } = useSelector((state: any) => state.auth);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error state to store validation messages
  const [formErrors, setFormErrors] = useState<any>({
    email: '',
    password: ''
  });

  // State for API error message
  const [apiError, setApiError] = useState('');

  // State to toggle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle form validation
  const validateForm = () => {
    let errors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Update formErrors state
    setFormErrors(errors);

    // If there are errors, return false
    return Object.keys(errors).length === 0;
  };

  // Handle text change and validate
  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear the email error message whenever the text changes
    setFormErrors((prevErrors: any) => ({ ...prevErrors, email: '' }));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Clear the password error message whenever the text changes
    setFormErrors((prevErrors: any) => ({ ...prevErrors, password: '' }));
  };

  // Handle login action
  const handleLogin = () => {
    const isValid = validateForm();
    if (isValid) {
      const userData = { email, password };
      dispatch(loginRequest(userData));
    }
  };

  // Handle login response and error
  useEffect(() => {
    if (loginResponse) {
      if (loginResponse.success) {
        navigation.replace('MainTabs');
      } else if (loginResponse.error) {
        // Set API error message
        setApiError(loginResponse.error); // Store error in the state
      }
    }
  }, [loginResponse]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpeg')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your Account</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to log in
        </Text>
<Text style={{color:'#00000082',paddingBottom:8}}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={handleEmailChange} // Handle email change
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9E9E9E"
        />
        {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password addressPassword"
            value={password}
            onChangeText={handlePasswordChange} // Handle password change
            secureTextEntry={!isPasswordVisible} // Toggle password visibility
            placeholderTextColor="#9E9E9E"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'} // Toggle icon based on visibility
              size={20}
              color={isPasswordVisible ?Colors.darkGray:'#ACB5BB'}
            />
          </TouchableOpacity>
        </View>
        {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}

        {apiError && <Text style={styles.apiErrorText}>{apiError}</Text>} 

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Please wait...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>
            Don't have an account? <Text style={styles.linkBold}>Sign Up</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
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
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  linkBold: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  apiErrorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 15,
  },
});

export default Login;
