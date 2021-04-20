import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AuthTemplate = (props) => {
    const insets = useSafeAreaInsets();

    const backPressHandler = () => {
        props.nav.goBack()
    }

    return (
        <View
            style={{
                ...styles.screen,
                paddingTop: Math.max(insets.top, 16)
            }}
        >

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={backPressHandler}
                style={styles.goBack}
            >
                <Ionicons name="chevron-back" size={24} color={Colors.primary} />
            </TouchableOpacity>

            <Text style={styles.title}>
                {props.title}
            </Text>

            <Text style={styles.description}>
                {props.description}
            </Text>

            {props.children}

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: '5%',
        height: '40%',
        justifyContent: 'space-between'
    },
    goBack: {
        height: 45,
        width: 45,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 10,
        marginTop: '5%',
        backgroundColor: 'rgba(255,255,255,.9)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: wp('7.5%'),
        fontFamily: 'popB'
    },
    description: {
        fontFamily: 'popM',
        fontSize: wp('4%')
    }
})

export default AuthTemplate;