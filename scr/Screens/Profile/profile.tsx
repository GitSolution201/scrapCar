import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/slices/authSlice';
import {fetchUserRequest} from '../../redux/slices/userDetail';
import {
  updateProfileRequest,
  resetProfileUpdateState,
} from '../../redux/slices/userProfileUpdateSlice';
import Colors from '../../Helper/Colors';
import {hp, wp} from '../../Helper/Responsive';
import Toast from 'react-native-simple-toast'; // Import the toast package
import CountryPicker from 'react-native-country-picker-modal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../Components/Header';

const Profile = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const token = useSelector((state: any) => state.auth?.token);
  const {
    loading: userLoading,
    userData,
    error: userError,
  } = useSelector((state: any) => state.user);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message,
  } = useSelector((state: any) => state.profileUpdate);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [countryCode, setCountryCode] = useState('GB'); // Default country code
  const [callingCode, setCallingCode] = useState('44'); // Default calling code
  const [visible, setVisible] = useState(false); // Modal visibility state
  useEffect(() => {
    if (isFocused) {
      dispatch(fetchUserRequest(token)); // جب بھی اسکرین فوکس میں آئے، یوزر ڈیٹا کو ریفریش کرے گا۔
    }
    setErrors({}); // ایررز کو صاف کرنے کے لیے
  }, [isFocused]);
  useEffect(() => {
    if (userData) {
      setFirstName(userData.first_name || '');
      setLastName(userData.last_name || '');
      setEmail(userData.email || '');
      setPhoneNumber(userData.phone_number || '');
    }
  }, [userData]);

  useEffect(() => {
    if (updateSuccess && message) {
      Toast.show(message, Toast.LONG); // Display the message for a long duration

      // Reset the profile update state after a successful update
      dispatch(resetProfileUpdateState());
      // Optionally, refetch user details to reflect the updated data
      dispatch(fetchUserRequest(token));
    }
  }, [updateSuccess, token]);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Reset error for a specific field when the user starts typing
  const handleInputChange = (field, value) => {
    setErrors(prevErrors => ({...prevErrors, [field]: null})); // Reset error for the field
    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
      };
      dispatch(updateProfileRequest({token, updatedData})); // Dispatch the update action
    }
  };

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(logout());
    navigation.navigate('Login');
  };

  if (userLoading || updateLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (userError || updateError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {userError || updateError}</Text>
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={[
          styles.container,
          {paddingTop: Platform.OS === 'ios' ? hp(2) : 0},
        ]}>
        <Header navigation={navigation} />
        <View style={styles.profileSection}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../../assets/user(2).png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Text style={styles.editIconText}>✎</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.hidingColor}>First Name</Text>

          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="First Name"
            value={firstName}
            onChangeText={value => handleInputChange('firstName', value)}
            placeholderTextColor="#9E9E9E"
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
          <Text style={styles.hidingColor}>Last Name</Text>

          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={value => handleInputChange('lastName', value)}
            placeholderTextColor="#9E9E9E"
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
          <Text style={styles.hidingColor}>Email Address</Text>

          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email Address"
            value={email}
            onChangeText={value => handleInputChange('email', value)}
            keyboardType="email-address"
            placeholderTextColor="#9E9E9E"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <Text style={styles.hidingColor}>Phone Number</Text>
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
              value={phoneNumber}
              onChangeText={value => handleInputChange('phoneNumber', value)}
              keyboardType="phone-pad"
              placeholderTextColor="#9E9E9E"
            />
          </View>
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
          {/* <TextInput
          style={[styles.input, errors.phoneNumber && styles.inputError]}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={value => handleInputChange('phoneNumber', value)}
          keyboardType="phone-pad"
          placeholderTextColor="#9E9E9E"
        /> */}
          {/* {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )} */}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.changePassword}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity> */}
        </View>

        {/* Save Button */}

        <TouchableOpacity
          style={styles.logout}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        {/* Logout Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTopText}>
                {userData?.first_name + ' ' + userData?.last_name}
              </Text>
              <Text style={styles.modalText}>
                Are you sure you want to log out ?
              </Text>
              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.logoutButton]}
                  onPress={handleLogout}>
                  <Text style={[styles.buttonText, styles.logoutButtonText]}>
                    Log out
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    backgroundColor: Colors.white,
  },
  headerTitleStyle: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    marginTop: hp(3),
  },
  iconBack: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  header: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: wp(5),
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderWidth: 0.4,
    borderRadius: 60,
  },
  profileImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    backgroundColor: Colors.primary,
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: wp(3),
    borderRadius: 8,
    marginTop: wp(4),
    alignItems: 'center',
  },
  logout: {
    backgroundColor: Colors.white,
    padding: wp(3),
    borderRadius: 8,
    borderWidth: 0.3,
    marginVertical: wp(1),
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTopText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 15,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderRightWidth: 1,
    borderColor: '#D3D3D3',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  logoutButton: {
    backgroundColor: 'white',
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidingColor: {
    color: '#000000AB',
    paddingBottom: hp(1),
  },
});

export default Profile;
