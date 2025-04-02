import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerRequest,
  resetRegisterResponse,
} from '../../redux/slices/authSlice';
import CountryPicker from 'react-native-country-picker-modal';
import Colors from '../../Helper/Colors';
import {wp} from '../../Helper/Responsive';
import {Fonts} from '../../Helper/Fonts';
import Header from '../../Components/Header';

const Register = ({navigation}: {navigation: any}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('GB'); // Default country code
  const [callingCode, setCallingCode] = useState('44'); // Default calling code
  const [visible, setVisible] = useState(false); // Modal visibility state

  const [errorMessage, setErrorMessages] = useState<any>({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    passwordError: '',
  });

  const dispatch = useDispatch();
  const {loading, registerResponse} = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (registerResponse) {
      if (registerResponse.success) {
        Alert.alert('Success', registerResponse.message, [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetRegisterResponse());
              navigation.navigate('Login');
            },
          },
        ]);
      } else if (registerResponse.error) {
        Alert.alert('Error', registerResponse.error);
      }
    }
  }, [registerResponse]);

  const handleRegister = () => {
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName) {
      setErrorMessages((prev: any) => ({
        ...prev,
        firstNameError: 'Please enter your name',
      }));
    } else if (!lastName) {
      setErrorMessages((prev: any) => ({
        ...prev,
        lastNameError: 'Please enter your last name',
      }));
    } else if (!email) {
      setErrorMessages((prev: any) => ({
        ...prev,
        emailError: 'Please enter your email',
      }));
    } else if (!Regex.test(email)) {
      setErrorMessages((prev: any) => ({
        ...prev,
        emailError: 'Please enter a valid email',
      }));
    } else if (!phone) {
      setErrorMessages((prev: any) => ({
        ...prev,
        phoneError: 'Please enter your phone number',
      }));
    } else if (!password) {
      setErrorMessages((prev: any) => ({
        ...prev,
        passwordError: 'Please enter your password',
      }));
    }else if (password.length < 6) {
      setErrorMessages((prev: any) => ({
        ...prev,
        passwordError: 'Password must be at least 6 characters',
      }));
    } else {
      apiCall();
    }
  };
  const apiCall = () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password,
    };
    dispatch(registerRequest(userData));
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpeg')}
      style={styles.background}
      resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Header navigation={navigation} />
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.icon}
              />
            </TouchableOpacity> */}
            <View style={styles.form}>
              <Text style={styles.title}>Register</Text>
              <Text style={styles.subtitle}>
                Create an account to continue!
              </Text>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={text => {
                  setErrorMessages((prevState: any) => ({
                    ...prevState,
                    firstNameError: null,
                  }));
                  setFirstName(text);
                }}
                autoCapitalize="words"
                placeholderTextColor="#9E9E9E"
              />
              {errorMessage.firstNameError && (
                <Text style={styles.errorText}>
                  {errorMessage.firstNameError}
                </Text>
              )}
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => {
                  setErrorMessages((prevState: any) => ({
                    ...prevState,
                    lastNameError: null,
                  }));
                  setLastName(text);
                }}
                autoCapitalize="words"
                placeholderTextColor="#9E9E9E"
              />
              {errorMessage.lastNameError && (
                <Text style={styles.errorText}>
                  {errorMessage.lastNameError}
                </Text>
              )}
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={text => {
                  setErrorMessages((prevState: any) => ({
                    ...prevState,
                    emailError: null,
                  }));
                  setEmail(text);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9E9E9E"
              />
              {errorMessage.emailError && (
                <Text style={styles.errorText}>{errorMessage.emailError}</Text>
              )}
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneContainer}>
                <TouchableOpacity
                  onPress={() => setVisible(true)}
                  style={styles.countryPicker}>
                  <CountryPicker
                    withFilter
                    withFlag
                    withCallingCode
                    withModal
                    withAlphaFilter
                    countryCode={countryCode}
                    onSelect={country => {
                      setCountryCode(country.cca2);
                      setCallingCode(country.callingCode[0]);
                    }}
                    visible={visible}
                    onClose={() => setVisible(false)}
                  />
                  <Text style={styles.callingCode}>+{callingCode}</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={text => {
                    setErrorMessages((prevState: any) => ({
                      ...prevState,
                      phoneError: null,
                    }));
                    setPhone(text);
                  }}
                  keyboardType="phone-pad"
                  placeholderTextColor="#9E9E9E"
                />
              </View>
              {errorMessage.phoneError && (
                <Text style={styles.errorText}>{errorMessage.phoneError}</Text>
              )}
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  value={password}
                  onChangeText={text => {
                    setErrorMessages((prevState: any) => ({
                      ...prevState,
                      passwordError: null,
                    }));
                    setPassword(text);
                  }}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#9E9E9E"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={
                      showPassword
                        ? require('../../assets/visible.png')
                        : require('../../assets/NotVisible.png')
                    }
                    style={{
                      width: showPassword ? wp(6) : wp(5),
                      height: showPassword ? wp(6) : wp(5),
                    }}
                    tintColor={Colors.eyeIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              {errorMessage.passwordError && (
                <Text style={styles.errorText}>
                  {errorMessage.passwordError}
                </Text>
              )}
              {/* Register Button */}
              <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleRegister}
                disabled={loading}>
                <Text style={styles.buttonText}>
                  {loading ? 'Please wait...' : 'Register'}
                </Text>
              </TouchableOpacity>
              {/* Login Redirect */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.link}>
                <Text style={styles.linkText}>
                  Already have an account?{' '}
                  <Text style={styles.linkBold}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.bold,
    color: '#0062FF',
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#6C7278',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 5,
    fontFamily: Fonts.semiBold,
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
  icon: {
    width: 40,
    height: 40,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#0062FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#6C7278',
  },
  linkBold: {
    fontFamily: Fonts.bold,
    color: '#0062FF',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    marginBottom: 5,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  callingCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneInput: {
    flex: 1,
    borderLeftWidth: 0.3,
    padding: 10,
    height: 50,
    borderColor: '#E0E0E0',
  },
});

export default Register;
