import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Touchable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Top from '../../components/BuyCoinsScreen/Top';
import Options from '../../components/BuyCoinsScreen/Options';

const BuyCoinsScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                ...styles.screen,
                paddingTop: Math.max(insets.top, 16)
            }}
        >
            <Top goBack={() => navigation.goBack()} />
            <Options />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: '5%'
    },
    goBack: {

    }
})

export default BuyCoinsScreen;