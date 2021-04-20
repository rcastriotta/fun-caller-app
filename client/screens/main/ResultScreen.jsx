import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Colors from '../../constants/colors';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as audioActions from '../../store/actions/audio';
import * as savedActions from '../../store/actions/saved';
import { BarIndicator } from 'react-native-indicators';
import AudioTrack from '../../components/Global/AudioTrack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ResultScreen = ({ route, navigation }) => {
    const { number, date, audio } = route.params;
    const dispatch = useDispatch();
    const { completed, isPlaying, isBuffering } = useSelector(state => state.audio);

    useEffect(() => {
        dispatch(audioActions.playPause(audio))
    }, [])

    const backPressHandler = () => {
        dispatch(audioActions.clearAudio())
        navigation.goBack()
    }

    const deletePressHandler = () => {
        Alert.alert(
            "Warning",
            "Are you sure you want to delete this recording?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        dispatch(savedActions.deleteItem(audio));
                        dispatch(audioActions.clearAudio());
                        navigation.goBack();
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={backPressHandler}
                        style={styles.goBack}
                    >
                        <Ionicons name="chevron-back" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deletePressHandler}>
                        <Feather name="trash" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.info}>
                    <Text style={styles.number}>{number}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <BarIndicator
                        style={styles.indicator}
                        size={70}
                        color='white'
                        count={5}
                    />
                </View>

                <View style={styles.playController}>
                    <AudioTrack
                        isPlaying={isPlaying}
                        completed={completed}
                        isBuffering={isBuffering}
                        width={'65%'}
                        onPress={() => dispatch(audioActions.playPause(audio))}
                    />
                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    container: {
        padding: '5%',
        justifyContent: 'space-between',
        flex: 1
    },
    top: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goBack: {
        height: 45,
        width: 45,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playController: {
        width: '100%',
        backgroundColor: 'white',
        aspectRatio: 5,
        borderRadius: 20,
        paddingHorizontal: '5%',
        justifyContent: 'center'
    },
    info: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        paddingTop: '10%',
        flex: 1
    },
    number: {
        fontSize: wp('8%'),
        color: 'white',
        fontFamily: 'popB'
    },
    date: {
        fontSize: wp('5%'),
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'popM'
    },
    indicator: {
        marginBottom: '20%'
    }
})

export default ResultScreen;