import React from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from "expo-crypto";
import { auth, fb } from '../../api/config';
import { useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/user';

const WelcomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();


    const loginWithApple = async () => {
        try {
            const csrf = Math.random().toString(36).substring(2, 15);
            const nonce = Math.random().toString(36).substring(2, 10);
            const hashedNonce = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256, nonce);
            const { identityToken } = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
                state: csrf,
                nonce: hashedNonce
            });

            const provider = new fb.auth.OAuthProvider("apple.com");

            const credential = provider.credential({
                idToken: identityToken,
                rawNonce: nonce // nonce value from above
            });

            const res = await auth.signInWithCredential(credential);

            const { uid, email, refreshToken, metadata } = res.user;

            dispatch(userActions.login(uid, email, refreshToken, metadata.lastSignInTime ? false : true))

        } catch (e) {
            if (e.code === 'ERR_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                console.log(e)
                Alert.alert('Error', 'Please try again later')
                // handle other errors
            }
        }
    }

    return (
        <ImageBackground
            style={{ ...styles.screen, paddingVertical: Math.max(insets.top, 16) }}
            source={require('../../assets/background.png')}
        >
            <View style={styles.top}>
                <View style={styles.logoContainer}>
                    <FontAwesome name="phone" size={wp('7%')} color={Colors.primary} />
                    <Text style={styles.logoText}>PrankCall</Text>
                </View>

                <Text style={styles.title}>{"Prank your friends.\nWherever."}</Text>
                <Text style={styles.description}>The world is better with a smile on your face.</Text>
            </View>


            {/*  <TouchableOpacity
                    onPress={() => buttonPressHandler('login')}
                    style={{ ...styles.button, backgroundColor: hexToRgba(Colors.primary, 0.3) }}
                    activeOpacity={0.7}
                >
                    <Text
                        style={{ ...styles.buttonText, color: Colors.primary }}
                    >Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => buttonPressHandler('signup')}
                    style={{ ...styles.button, backgroundColor: Colors.primary }}
                    activeOpacity={0.7}
                >
                    <Text
                        style={{ ...styles.buttonText, color: 'white' }}
                    >Signup</Text>
                </TouchableOpacity>*/}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={loginWithApple}
                style={styles.appleSignInButton}
            >
                <Image
                    source={require('../../assets/apple-logo.png')}
                    style={styles.appleLogo}
                />
                <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: '5%',
        justifyContent: 'space-between'
    },
    top: {
        paddingTop: '5%',
        height: '25%',
        justifyContent: 'space-between'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontFamily: 'popB',
        color: Colors.primary,
        marginLeft: '3%',
        fontSize: wp('5%')
    },
    title: {
        fontFamily: 'popB',
        fontSize: wp('7%')
    },
    description: {
        fontFamily: 'popM',
        fontSize: wp('3.5%')
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: '45%',
        aspectRatio: 2.7,
        borderRadius: wp('5.5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'popB',
        fontSize: wp('3.9%')
    },
    appleSignInButton: {
        width: '95%',
        aspectRatio: 5.5,
        backgroundColor: 'black',
        borderRadius: wp('5%'),
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    appleLogo: {
        height: '40%',
        width: '5%',
        aspectRatio: .85,
        marginBottom: '1%'
    },
    appleButtonText: {
        fontFamily: 'popM',
        fontSize: wp('4%'),
        color: 'white',
        marginLeft: '5%'
    }
})

export default WelcomeScreen;