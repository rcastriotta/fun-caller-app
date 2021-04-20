import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AvoidingView = ({ valid, nextHandler }) => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.avoidingView}
        >
            <TouchableOpacity
                onPress={nextHandler}
                activeOpacity={0.7}
                style={{ ...styles.next, backgroundColor: valid ? Colors.primary : '#F4F5F7' }}
            >
                <Text
                    style={{ ...styles.buttonText, color: valid ? 'white' : '#BDBEC0' }}
                >Next</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    next: {
        width: '70%',
        aspectRatio: 5,
        borderRadius: 100,
        backgroundColor: Colors.primary,
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'popB',
        fontSize: wp('4%'),
        color: 'white'
    }
})

export default AvoidingView;