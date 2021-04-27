import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

const Top = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.goBack}
                onPress={props.goBack}
            >
                <Ionicons name="chevron-back" size={wp('6%')} color={Colors.primary} />
            </TouchableOpacity>

            <Text style={styles.title}>Choose a token package</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: '3%'
    },
    goBack: {
        width: '11%',
        aspectRatio: 1,
        borderRadius: wp('3%'),
        borderColor: Colors.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: wp('5%'),
        fontFamily: 'popB',
        marginTop: '7%'
    }
})

export default Top;