import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Top = (props) => {
    const { coinAmount } = useSelector(state => state.user);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={props.goBack}
                activeOpacity={0.8}
            >
                <Ionicons name="md-close" size={wp('6%')} color={Colors.primary} />
            </TouchableOpacity>

            <Text style={styles.title}>Get Tokens</Text>
            <Text style={styles.description}>You have {coinAmount} token(s) available.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '3%',
    },
    closeButton: {
        width: '11%',
        aspectRatio: 1,
        borderRadius: wp('3%'),
        borderColor: Colors.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: wp('6%'),
        fontFamily: 'popB',
        marginTop: '5%'
    },
    description: {
        color: '#919191',
        fontFamily: 'popM'
    }
})

export default Top;