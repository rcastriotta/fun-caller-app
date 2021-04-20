import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import AuthTemplate from '../../components/Global/AuthTemplate';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import AvoidingView from '../../components/Global/AvoidingView';
import axios from 'axios';

const CODE_LENGTH = 4;
const codeDigitsArray = new Array(CODE_LENGTH).fill(null)

const CodeScreen = ({ route, navigation }) => {
    const { number } = route.params;
    const [code, setCode] = useState('');

    const nextHandler = () => {
        axios.get(`http://6766fd546871.ngrok.io/verification/checkCode?number=${number}&code=${code}`)
            .then((res) => {
                console.log(res)
            })
            .catch(() => {
                Alert.alert('Error', 'Code is invalid or has expired.')
            })
    }


    const toDigitInput = (item, i) => {
        const digit = code[i];

        return (
            <View style={styles.digitContainer} key={i}>
                <Text
                    style={digit
                        ? styles.digit
                        : { ...styles.digit, color: '#BDBEC0' }
                    }
                >{digit || 0}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <AuthTemplate
                nav={navigation}
                title="Enter code"
                description="We sent you a 5 digit confirmation code."
            >
                <TextInput
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    maxLength={4}
                    autoFocus
                    style={styles.hiddenCodeInput}
                />
                <View style={styles.code}>
                    {codeDigitsArray.map(toDigitInput)}
                </View>

            </AuthTemplate>

            <AvoidingView
                valid={false}
                nextHandler={nextHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    hiddenCodeInput: {
        position: 'absolute',
        height: 0,
        width: 0,
        opacity: 0,
    },
    code: {
        width: '100%',
        aspectRatio: 5,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    digitContainer: {
        backgroundColor: '#F4F5F7',
        height: '100%',
        aspectRatio: 1,
        borderRadius: wp('2%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    digit: {
        fontSize: wp('5%'),
        fontFamily: 'popB',
    }
})

export default CodeScreen;