import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/colors';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as audioActions from '../../store/actions/audio';

const Top = (props) => {
    const dispatch = useDispatch();
    const { coinAmount } = useSelector(state => state.user);

    const coinsPressHandler = () => {
        dispatch(audioActions.clearAudio());
        props.navigate();
    }

    return (
        <View style={styles.top}>
            <SafeAreaView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Welcome!</Text>

                    <TouchableOpacity
                        onPress={coinsPressHandler}
                        style={styles.coins}
                        activeOpacity={0.7}
                    >
                        <Image style={styles.coinImage} source={require('../../assets/coin.png')} />
                        <Text style={styles.amount}>{coinAmount}</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={24} color="white" />

                    <TextInput
                        onChange={(e) => props.setSearchField(e.nativeEvent.text)}
                        style={styles.search}
                        placeholderTextColor="white"
                        placeholder="Search"
                        selectionColor="white"
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        height: '75%',
    },
    top: {
        width: '100%',
        paddingHorizontal: '5%',
        alignSelf: 'center',
        height: '27%',
        backgroundColor: Colors.primary,
    },
    welcomeContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    welcome: {
        fontSize: 23,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'popB'
    },
    searchContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 100,
        marginTop: '4%',
        width: '100%',
        aspectRatio: 7.3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    search: {
        marginLeft: '5%',
        color: 'white',
        height: '100%',
        width: '100%',
        fontFamily: 'popM'
    },
    coins: {
        height: '55%',
        aspectRatio: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    coinImage: {
        width: '25%',
        aspectRatio: 1
    },
    amount: {
        color: 'white',
        fontFamily: 'popB'
    }

})

export default Top;