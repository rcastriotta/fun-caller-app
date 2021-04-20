import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as audioActions from '../../store/actions/audio';
import AudioTrack from '../Global/AudioTrack';

const Info = (props) => {
    const dispatch = useDispatch();
    const { completed, curSound, isPlaying, isBuffering } = useSelector(state => state.audio);

    useEffect(() => {
        return curSound
            ? () => {
                curSound.unloadAsync();
            }
            : undefined;
    }, [curSound])

    let sent;
    if (parseInt(props.sent) < 1000000) {
        sent = `${(props.sent / 1000).toFixed(1)}k sent`
    } else {
        sent = `${(props.sent / 1000000).toFixed(1)}m sent`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.sent}>{sent}</Text>
            <AudioTrack
                isBuffering={isBuffering}
                completed={completed}
                onPress={() => dispatch(audioActions.playPause(props.audio))}
                isPlaying={isPlaying}
                width={'75%'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'popB'

    },
    sent: {
        color: 'gray',
        marginTop: '3%',
        fontSize: 16,
        fontFamily: 'popM'
    },

})

export default Info;