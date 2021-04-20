import React from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { useDispatch } from 'react-redux';
import * as audioActions from '../../store/actions/audio';
import { BlurView } from 'expo-blur';

const Top = (props) => {
    const dispatch = useDispatch();

    const backPressHandler = () => {
        dispatch(audioActions.clearAudio())
        props.nav.goBack()
    }

    return (
        <ImageBackground
            style={styles.image}
            source={{ uri: props.img }}
        >
            <SafeAreaView>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={backPressHandler}
                >
                    <BlurView tint="light" intensity={90} style={styles.goBack}
                    >
                        <Ionicons name="chevron-back" size={24} color={Colors.primary} />

                    </BlurView>

                </TouchableOpacity>
            </SafeAreaView>

        </ImageBackground>)
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1.5,
    },
    goBack: {
        height: 45,
        width: 45,
        borderRadius: 10,
        marginLeft: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    }
})
export default Top;