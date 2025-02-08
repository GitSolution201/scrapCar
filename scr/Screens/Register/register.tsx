// // import React, {useState, useEffect} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ImageBackground,
// //   Alert,
// // } from 'react-native';
// // import {useDispatch, useSelector} from 'react-redux';
// // import {registerRequest} from '../../redux/slices/authSlice';
// // import Colors from '../../Helper/Colors';

// // const Register = ({navigation}: {navigation: any}) => {
// //   const [firstName, setFirstName] = useState('');
// //   const [lastName, setLastName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [password, setPassword] = useState('');

// //   const dispatch = useDispatch();
// //   const {loading, registerResponse} = useSelector((state: any) => state.auth);

// //   useEffect(() => {
// //     if (registerResponse) {
// //       if (registerResponse.success) {
// //         Alert.alert('Success', registerResponse.message, [
// //           {
// //             text: 'OK',
// //             onPress: () => navigation.navigate('Login')
// //           }
// //         ]);
// //       } else if (registerResponse.error) {
// //         Alert.alert('Error', registerResponse.error);
// //       }
// //     }
// //   }, [registerResponse]);

// //   const validateForm = () => {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// //     if (!firstName || !lastName || !email || !phone || !password) {
// //       Alert.alert('Error', 'Please fill all the fields.');
// //       return false;
// //     } else if (password.length < 6) {
// //       Alert.alert('Error', 'Password must be at least 6 characters long.');
// //       return false;
// //     } else if (!emailRegex.test(email)) {
// //       Alert.alert('Error', 'Please enter a valid email address.');
// //       return false;
// //     }else {
// //       return true;
// //     }
// //   };

// //   const handleRegister = () => {
// //     if (!validateForm()) return;

// //     const userData = {
// //       first_name: firstName,
// //       last_name: lastName,
// //       email,
// //       phone,
// //       password,
// //     };
// //     dispatch(registerRequest(userData));
// //   };

// //   return (
// //     <ImageBackground
// //       source={require('../../assets/background.jpeg')}
// //       style={styles.background}
// //       resizeMode="contain">
// //       <View style={styles.container}>
// //         <Text style={styles.title}>Register</Text>
// //         <Text style={styles.subtitle}>Create an account to continue!</Text>
// //         <Text style={styles.hidingColor}>First Name</Text>

// //         <TextInput
// //           style={styles.input}
// //           placeholder="First Name"
// //           value={firstName}
// //           onChangeText={setFirstName}
// //           autoCapitalize="words"
// //           placeholderTextColor="#9E9E9E"
// //         />
// //         <Text style={styles.hidingColor}>Last Name</Text>

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Last Name"
// //           value={lastName}
// //           onChangeText={setLastName}
// //           autoCapitalize="words"
// //           placeholderTextColor="#9E9E9E"
// //         />
// //         <Text style={styles.hidingColor}>Email Address</Text>

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Email Address"
// //           value={email}
// //           onChangeText={setEmail}
// //           keyboardType="email-address"
// //           autoCapitalize="none"
// //           placeholderTextColor="#9E9E9E"
// //         />
// //         <Text style={styles.hidingColor}>Phone Number</Text>

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Phone Number"
// //           value={phone}
// //           onChangeText={setPhone}
// //           keyboardType="phone-pad"
// //           placeholderTextColor="#9E9E9E"
// //         />
// //         <Text style={styles.hidingColor}>Password</Text>

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //           placeholderTextColor="#9E9E9E"
// //         />

// //         <TouchableOpacity
// //           style={[styles.button, loading && styles.disabledButton]}
// //           onPress={handleRegister}
// //           disabled={loading}>
// //           <Text style={styles.buttonText}>
// //             {loading ? 'Please wait...' : 'Register'}
// //           </Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           onPress={() => navigation.navigate('Login')}
// //           style={styles.link}>
// //           <Text style={styles.linkText}>
// //             Already have an account? <Text style={styles.linkBold}>Log In</Text>
// //           </Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ImageBackground>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   background: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   container: {
// //     width: '100%',
// //     padding: 20,
// //     backgroundColor: 'rgba(255, 255, 255, 0.9)',
// //     borderRadius: 10,
// //     marginHorizontal: 20,
// //     elevation: 5,
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     color: Colors.primary,
// //   },
// //   hidingColor:{color:'#000000AB',paddingBottom:8},

// //   subtitle: {
// //     fontSize: 16,
// //     color: '#757575',
// //     fontWeight:500,
// //     marginBottom: 30,
// //   },
// //   input: {
// //     height: 50,
// //     borderWidth: 1,
// //     borderColor: '#E0E0E0',
// //     borderRadius: 8,
// //     padding: 10,
// //     marginBottom: 15,
// //     backgroundColor: '#FFF',
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   button: {
// //     backgroundColor: '#007BFF',
// //     padding: 15,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginTop: 20,
// //   },
// //   buttonText: {
// //     color: '#FFF',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   link: {
// //     marginTop: 20,
// //     alignItems: 'center',
// //   },
// //   linkText: {
// //     color: '#007BFF',
// //   },
// //   linkBold: {
// //     fontWeight: 'bold',
// //   },
// //   disabledButton: {
// //     backgroundColor: '#cccccc',
// //   },
// // });

// // export default Register;
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Alert,
//   KeyboardAvoidingView,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {registerRequest} from '../../redux/slices/authSlice';
// import Colors from '../../Helper/Colors';

// const Register = ({navigation}: {navigation: any}) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();
//   const {loading, registerResponse} = useSelector((state: any) => state.auth);

//   useEffect(() => {
//     if (registerResponse) {
//       if (registerResponse.success) {
//         Alert.alert('Success', registerResponse.message, [
//           { text: 'OK', onPress: () => navigation.navigate('Login') }
//         ]);
//       } else if (registerResponse.error) {
//         Alert.alert('Error', registerResponse.error);
//       }
//     }
//   }, [registerResponse]);

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!firstName || !lastName || !email || !phone || !password) {
//       Alert.alert('Error', 'Please fill all the fields.');
//       return false;
//     } else if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long.');
//       return false;
//     } else if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Please enter a valid email address.');
//       return false;
//     }
//     return true;
//   };

//   const handleRegister = () => {
//     if (!validateForm()) return;

//     const userData = { first_name: firstName, last_name: lastName, email, phone, password };
//     dispatch(registerRequest(userData));
//   };

//   return (
//     <ImageBackground source={require('../../assets/background.jpeg')} style={styles.background} resizeMode="cover">
//       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexContainer}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={styles.container}>
//               <Text style={styles.title}>Register</Text>
//               <Text style={styles.subtitle}>Create an account to continue!</Text>

//               <Text style={styles.hidingColor}>First Name</Text>
//               <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} autoCapitalize="words" placeholderTextColor="#9E9E9E" />

//               <Text style={styles.hidingColor}>Last Name</Text>
//               <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} autoCapitalize="words" placeholderTextColor="#9E9E9E" />

//               <Text style={styles.hidingColor}>Email Address</Text>
//               <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#9E9E9E" />

//               <Text style={styles.hidingColor}>Phone Number</Text>
//               <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor="#9E9E9E" />

//               <Text style={styles.hidingColor}>Password</Text>
//               <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#9E9E9E" />

//               <TouchableOpacity style={[styles.button, loading && styles.disabledButton]} onPress={handleRegister} disabled={loading}>
//                 <Text style={styles.buttonText}>{loading ? 'Please wait...' : 'Register'}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
//                 <Text style={styles.linkText}>Already have an account? <Text style={styles.linkBold}>Log In</Text></Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     height:'100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flexContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     // borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: Colors.primary,
//   },
//   hidingColor: {
//     color: '#000000AB',
//     paddingBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#757575',
//     fontWeight: '500',
//     marginBottom: 30,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: '#FFF',
//     fontSize: 16,
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#007BFF',
//   },
//   linkBold: {
//     fontWeight: 'bold',
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//   },
// });

// export default Register;
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerRequest, registerSuccess, resetRegisterResponse} from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker from 'react-native-country-picker-modal'; // Import Country Picker

const Register = ({navigation}: {navigation: any}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('US'); // Default country code
  const [callingCode, setCallingCode] = useState('1'); // Default calling code
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
      if (registerResponse.success ) {
        Alert.alert('Success', registerResponse.message, [
          {text: 'OK', onPress: () => {
            dispatch(resetRegisterResponse());
            navigation.navigate('Login')}},
        ]);
      } else if (registerResponse.error) {
        Alert.alert('Error', registerResponse.error);
      }
    }
  }, [registerResponse]);

  const handleRegister = () => {
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName) {
      setErrorMessages(prev => ({
        ...prev,
        firstNameError: 'Please enter your name',
      }));
    } else if (!lastName) {
      setErrorMessages(prev => ({
        ...prev,
        lastNameError: 'Please enter your last name',
      }));
    } else if (!email) {
      setErrorMessages(prev => ({
        ...prev,
        emailError: 'Please enter your email',
      }));
    } else if (!Regex.test(email)) {
      setErrorMessages(prev => ({
        ...prev,
        emailError: 'Please enter a valid email',
      }));
    } else if (!phone) {
      setErrorMessages(prev => ({
        ...prev,
        phoneError: 'Please enter your phone number',
      }));
    } else if (!password) {
      setErrorMessages(prev => ({
        ...prev,
        passwordError: 'Please enter your password',
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
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
                  setErrorMessages(prevState => ({
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
                  setErrorMessages(prevState => ({
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
                  setErrorMessages(prevState => ({
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
              <Text style={styles.label}>Phone Number</Text>{' '}
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
                    setErrorMessages(prevState => ({
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
                    setErrorMessages(prevState => ({
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
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#9E9E9E"
                    style={styles.eyeIcon}
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
    fontWeight: 'bold',
    color: '#0062FF',
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C7278',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 5,
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
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#6C7278',
  },
  linkBold: {
    fontWeight: 'bold',
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
