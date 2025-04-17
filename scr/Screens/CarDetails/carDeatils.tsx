import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {hp, wp} from '../../Helper/Responsive';
import Colors from '../../Helper/Colors';
import Header from '../../Components/Header';
import Banner from '../../Components/Banner';
import {Fonts} from '../../Helper/Fonts';
import {useSelector} from 'react-redux';
import WebView from 'react-native-webview';

const defaultCarImage = require('../../assets/car2.png');

const Details = ({route, navigation}: {route: any; navigation: any}) => {
  const {car} = route.params;
  const {hasSubscription} = useSelector(
    state => state?.subscription?.subscriptionData,
  );
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');

  const handleCall = (phoneNumber: any) => {
    if (!hasSubscription) {
      showSubscriptionAlert();
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleTextMessage = (phoneNumber: any) => {
    if (!hasSubscription) {
      showSubscriptionAlert();
      return;
    }
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber: any) => {
    if (!hasSubscription) {
      showSubscriptionAlert();
      return;
    }
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  const handleMotHistory = () => {
    if (!hasSubscription) {
      showSubscriptionAlert();
      return;
    }
    setWebViewUrl(
      `https://www.check-mot.service.gov.uk/results?registration=${car?.registrationNumber}`,
    );
    setShowWebView(true);
  };

  const showSubscriptionAlert = () => {
    Alert.alert(
      'Premium Feature 🔒',
      'To access MOT history and contact details, please upgrade to our premium subscription. Enjoy unlimited access to all features!',
      [
        {
          text: 'Maybe Later',
          style: 'cancel',
        },
        {
          text: 'Subscribe Now',
          onPress: () => navigation.navigate('Subscriptions'),
          style: 'default',
        },
      ],
      {cancelable: true},
    );
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={[
          styles.container,
          {paddingTop: Platform.OS === 'ios' ? hp(2) : 0},
        ]}>
        <Header navigation={navigation} />
        <View style={styles.detailsContainer}>
          <Image
            source={
              car?.displayImage && car?.displayImage !== 'N/A'
                ? {uri: car?.displayImage}
                : defaultCarImage
            }
            style={styles.carImage}
            resizeMode={'contain'}
          />
          <View style={styles.carTagContainer}>
            <Text style={styles.scrapText}>{car.tag || 'Unknown'}</Text>
          </View>
          <Text style={styles.carTitle}>
            {car.make || 'Model Not Available'}
          </Text>

          {[
            ['Registration:', car.registrationNumber],
            ['Year:', car.yearOfManufacture],
            ['Postcode:', car.postcode],
            ['Colour:', car.color],
            ['Model:', car.model],
            ['Fuel Type:', car.fuelType],
          ].map(([label, value], index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">
                {value?.toString().toUpperCase() || 'N/A'}
              </Text>
            </View>
          ))}
          <View style={styles.motContainer}>
            <Image
              source={require('../../assets/Union.png')}
              style={styles.motImage}
            />
            <View style={styles.textContainer}>
              <View style={styles.rowText}>
                <Text style={styles.title}>MOT Status: {car?.motStatus}</Text>
                <TouchableOpacity
                  style={styles.motHistoryButton}
                  onPress={() => handleMotHistory()}>
                  <Text style={styles.motHistoryText}>MOT history</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.expiry}>
                Expiry: {formatDate(car?.date_added)}
              </Text>
            </View>
          </View>
          <Banner navigation={navigation} />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Seller Via</Text>
          <View style={styles.contactIcons}>
            {[
              ['Call', require('../../assets/apple.png'), handleCall],
              [
                'WhatsApp',
                require('../../assets/whatsapp.png'),
                handleWhatsApp,
              ],
              ['Text', require('../../assets/messages.png'), handleTextMessage],
            ].map(([text, icon, action], index) => {
              const isSold = car?.isSold;
              const opacityStyle = {opacity: isSold ? 0.3 : 1};

              return (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      styles.contactButton,
                      styles[`${text.toLowerCase()}Button`],
                      opacityStyle,
                    ]}
                    onPress={() => {
                      if (!isSold) {
                        action('+' + car?.phoneNumber);
                      }
                    }}
                    activeOpacity={isSold ? 1 : 0.7}
                    disabled={isSold}>
                    <Image source={icon} style={[styles.icon, opacityStyle]} />
                  </TouchableOpacity>
                  <Text style={[styles.contactText, opacityStyle]}>{text}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact Seller Via</Text>
          <View style={styles.contactIcons}>
            {[
              ['Call', require('../../assets/apple.png'), handleCall],
              [
                'WhatsApp',
                require('../../assets/whatsapp.png'),
                handleWhatsApp,
              ],
              ['Text', require('../../assets/messages.png'), handleTextMessage],
            ].map(([text, icon, action], index) => (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    styles.contactButton,
                    styles[`${text.toLowerCase()}Button`],
                  ]}
                  onPress={() => action('+' + car?.phoneNumber)}>
                  <Image source={icon} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.contactText}>{text}</Text>
              </View>
            ))}
          </View>
        </View> */}
        <View style={styles.messageBox}>
          <TextInput
            placeholder="Write your message..."
            style={styles.textArea}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => console.log('Message sent')}>
            <Text style={styles.sendButtonText}>Send a Quote</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={showWebView}
          animationType="slide"
          onRequestClose={() => setShowWebView(false)}>
          <SafeAreaView style={styles.webViewContainer}>
            <View
              style={[
                styles.webViewHeader,
                Platform.OS === 'ios' && styles.webViewHeaderIOS,
              ]}>
              <TouchableOpacity
                onPress={() => setShowWebView(false)}
                style={[
                  styles.closeButton,
                  Platform.OS === 'ios' && styles.closeButtonIOS,
                ]}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <WebView
              source={{uri: webViewUrl}}
              style={styles.webView}
              startInLoadingState={true}
              onError={syntheticEvent => {
                console.error('WebView error:', syntheticEvent.nativeEvent);
              }}
            />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    margin: Platform.OS === 'ios' ? 20 : 5,
    backgroundColor: Colors.gray,
  },
  detailsContainer: {
    backgroundColor: Colors.white,
    padding: wp(5),
    borderRadius: wp(3),
    marginVertical: hp(2),
  },
  carImage: {
    width: '100%',
    height: hp(20),
    marginTop: hp(2),
  },
  carTitle: {
    fontSize: wp(6),
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  carTagContainer: {
    backgroundColor: Colors.gradientEnd,
    borderRadius: wp(10),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  scrapText: {
    textTransform: 'capitalize',
    paddingHorizontal: wp(3),
    paddingVertical: wp(1.5),
    textAlign: 'center',
    fontFamily: Fonts.regular,
    color: Colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: hp(1),
  },
  label: {
    fontSize: wp(4),
    fontFamily: Fonts.regular,
    color: Colors.darkGray,
    minWidth: wp(30),
    textAlign: 'right',
    paddingRight: wp(3),
  },
  value: {
    fontSize: wp(4),
    fontFamily: Fonts.semiBold,
    color: Colors.darkGray,
    width: '65%',
  },
  motContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(2),
    width: wp(80),
  },
  motImage: {
    width: wp(6),
    height: wp(6),
    // tintColor: '#3A5179',
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginLeft: wp(2),
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: wp(3.5),
    fontFamily: Fonts.semiBold,
    color: '#3b4d6c',
    flex: 1,
  },
  viewText: {
    fontFamily: Fonts.semiBold,
    fontSize: wp(3.2),
    color: '#3b4d6c',
    marginLeft: wp(2),
  },
  expiry: {
    fontSize: wp(3),
    fontFamily: Fonts.regular,
    color: '#3b4d6c',
  },

  contactContainer: {
    backgroundColor: Colors.white,
    padding: wp(5),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },
  contactTitle: {
    fontSize: wp(5),
    fontFamily: Fonts.bold,
    color: Colors.darkGray,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contactButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: wp(12),
    height: wp(12),
    resizeMode: 'contain',
  },
  contactText: {
    marginTop: hp(1),
    fontSize: wp(3.5),
    fontFamily: Fonts.regular,
    color: Colors.black,
    textAlign: 'center',
  },
  motHistoryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(5),
    marginLeft: wp(2),
  },
  motHistoryText: {
    color: Colors.white,
    fontSize: wp(3),
    fontFamily: Fonts.semiBold,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  webViewHeader: {
    padding: wp(4),
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  webViewHeaderIOS: {
    paddingTop: hp(2),
  },
  closeButton: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
  },
  closeButtonIOS: {
    paddingVertical: wp(3),
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: wp(4),
    fontFamily: Fonts.semiBold,
  },
  webView: {
    flex: 1,
  },
  messageBox: {
    backgroundColor: Colors.white,

    padding: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },

  messageLabel: {
    fontSize: wp(4.5),
    fontFamily: Fonts.semiBold,
    color: Colors.darkGray,
    marginBottom: hp(1),
  },

  textArea: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: wp(3),
    padding: wp(3),
    fontSize: wp(4),
    fontFamily: Fonts.regular,
    color: Colors.black,
    height: hp(15),
    backgroundColor: '#f9f9f9',
  },

  sendButton: {
    marginTop: hp(2),
    backgroundColor: Colors.primary,
    paddingVertical: hp(1.5),
    borderRadius: wp(5),
    alignItems: 'center',
  },

  sendButtonText: {
    color: Colors.white,
    fontSize: wp(4),
    fontFamily: Fonts.bold,
  },
});

export default Details;
