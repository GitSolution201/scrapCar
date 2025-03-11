import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../redux/slices/authSlice';
import Colors from '../../Helper/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import {axiosHeader} from '../../Services/apiHeader';
import {Fonts} from '../../Helper/Fonts';

const Login = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const {loading, loginResponse, token} = useSelector(
    (state: any) => state.auth,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const [apiError, setApiError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  useEffect(() => {
    if (loginResponse) {
      setApiError('');
      if (loginResponse.success) {
        axiosHeader(token);
        Toast.show(loginResponse?.message, Toast.LONG); // Display the message for a long duration
        navigation.repalce('MainTabs');
      } else if (loginResponse?.error) {
        setApiError(loginResponse?.error);
      }
    }
  }, [loginResponse]);
  const validateForm = () => {
    let errors = {};
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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setApiError('');
      dispatch(loginRequest({email, password}));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpeg')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../../assets/logo.png')} // Path to your logo
          style={styles.logo}
        />

        <Text style={styles.title}>Sign in to your Account</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to log in
        </Text>

        <Text style={styles.hidingColor}>Email Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setApiError(''); // Clear error when user starts typing
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9E9E9E"
        />
        {formErrors.email && (
          <Text style={styles.errorText}>{formErrors.email}</Text>
        )}

        <Text style={styles.hidingColor}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setApiError(''); // Clear error when user starts typing
            }}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#9E9E9E"
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}>
            <Image
              source={
                isPasswordVisible
                  ? require('../../assets/visible.png')
                  : require('../../assets/NotVisible.png')
              }
              style={{
                width: isPasswordVisible ? wp(6) : wp(5),
                height: isPasswordVisible ? wp(6) : wp(5),
              }}
              tintColor={Colors.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {formErrors.password && (
          <Text style={styles.errorText}>{formErrors.password}</Text>
        )}
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
    width: wp(90),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#333',
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: wp(8),
    fontFamily: Fonts.bold,
    marginBottom: hp(2),
    color: '#007BFF',
  },
  hidingColor: {
    color: '#000000AB',
    paddingBottom: hp(1),
    fontFamily: Fonts.semiBold,
  },
  subtitle: {
    fontSize: wp(4),
    color: '#757575',
    textAlign: 'center',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    fontFamily: Fonts.semiBold,
    backgroundColor: '#FFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: wp(2),
    backgroundColor: '#FFF',
    marginBottom: wp(3),
  },

  passwordInput: {
    flex: 1, // Ensures the input takes full width and text doesn't overlap the icon
    height: hp(6),
    fontSize: wp(4),
    paddingLeft: hp(2),
    paddingRight: wp(10), // Reserves space for the eye icon
    color: '#000',
  },

  eyeIcon: {
    marginRight: hp(1.5),
  },

  button: {
    backgroundColor: '#007BFF',
    padding: hp(2),
    marginTop: hp(5),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp(4),
    fontFamily: Fonts.bold,
  },
  link: {
    marginTop: hp(2),
    alignItems: 'center',
  },
  linkText: {
    color: '#6C7278',
    fontFamily: Fonts.bold,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  linkBold: {
    color: '#007BFF',
    fontFamily: Fonts.bold,
  },
  errorText: {
    color: 'red',
    fontSize: wp(3),
    marginBottom: hp(1),
  },
  apiErrorText: {
    color: 'red',
    fontSize: wp(3.5),
    marginBottom: hp(2),
  },
});

export default Login;
