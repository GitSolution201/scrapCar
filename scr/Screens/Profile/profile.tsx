import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {logout} from '../../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import Colors from '../../Helper/Colors';
import {hp, wp} from '../../Helper/Responsive';

const Profile = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  // navigation.navigate('FlowNavigation', {
  //   screen: 'DrawerNavigation',
  //   params: {
  //     screen: 'BottomNavigation',
  //     params: {
  //       screen: 'Profile',
  //     },
  //   },
  // })
  const handleLogout = () => {
    setModalVisible(false);
    dispatch(logout());
    navigation.navigate('Login')
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }],
    // });
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerTitleStyle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={
            styles.headerTitle}>Profile</Text>
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
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
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
              <Pressable style={styles.button} onPress={()=>handleLogout()}>
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
  color: {
    color: 'red',
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
});

export default Profile;
