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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast'; // Import the toast package

const Profile = ({navigation}) => {
  const token = useSelector(state => state.auth?.token);
  const {
    loading: userLoading,
    userData,
    error: userError,
  } = useSelector(state => state.user);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    message,
  } = useSelector(state => state.profileUpdate);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState( '');
  const [email, setEmail] = useState( '');
  const [phoneNumber, setPhoneNumber] = useState( '');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (token) {
      dispatch(fetchUserRequest(token)); // Fetch user details when the component mounts
    }
    setErrors({});  // Clear all errors when the component mounts
  }, [token]);
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
        firstName,
        lastName,
        email,
        phoneNumber,
      };
      dispatch(updateProfileRequest({token, updatedData})); // Dispatch the update action
    }
  };

  const handleLogout = () => {
    setModalVisible(false);
    // dispatch(logout());
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitleStyle}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrow.png')}
            style={styles.iconBack}
          />
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
          style={[styles.input, errors.firstName && styles.inputError]}
          placeholder="First Name"
          value={firstName}
          onChangeText={value => handleInputChange('firstName', value)}
          placeholderTextColor="#9E9E9E"
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}

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

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email Address"
          value={email}
          onChangeText={value => handleInputChange('email', value)}
          keyboardType="email-address"
          placeholderTextColor="#9E9E9E"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.phoneNumber && styles.inputError]}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={value => handleInputChange('phoneNumber', value)}
          keyboardType="phone-pad"
          placeholderTextColor="#9E9E9E"
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )}

        <TouchableOpacity
          style={styles.logout}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changePassword}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={[styles.saveButton]} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    marginTop: hp(5),
  },
  iconBack: {
    width: 40,
    height: 40,
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
  inputError: {
    borderColor: 'red', // Highlight input field with error
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  changePassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  logout: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  changePasswordText: {
    fontSize: 14,
    color: '#007BFF',
  },
  logoutText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc', // Disabled button color
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
    padding: hp(3),
    borderRadius: wp(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
  },
  cancelButton: {
    backgroundColor: Colors.footerGray,
  },
  buttonText: {
    color: 'white',
    fontSize: wp(4),
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
});

export default Profile;
