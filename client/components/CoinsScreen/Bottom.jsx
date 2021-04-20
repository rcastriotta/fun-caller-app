import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/actions/user';

const Bottom = () => {
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.user);

    const logoutPressHandler = () => {
        Alert.alert(
            "Warning",
            "By logging out, your coins will be set back to 0, and your saved calls will be erased.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        dispatch(userActions.logout())
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.option}>Privacy Policy</Text>
            <Text style={styles.option}>Terms of use</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={logoutPressHandler}
            >
                <Text style={styles.option}>Logout</Text>
                <Text style={styles.email}>{email}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    option: {
        fontFamily: 'popM',
        fontSize: wp('3.5%')
    },
    email: {
        fontSize: wp('3%'),
        color: 'gray',
        marginTop: '1%'
    }
})

export default Bottom;