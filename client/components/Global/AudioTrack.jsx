import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlayButton from './PlayButton';
import Colors from '../../constants/colors';

const AudioTrack = ({ isPlaying, onPress, completed, isBuffering }) => {

    return (
        <View style={styles.audioPlayer}>
            <View style={styles.track}><View style={{ ...styles.fill, width: completed }} /></View>
            <PlayButton
                isBuffering={isBuffering}
                isPlaying={isPlaying}
                onPress={onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    audioPlayer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 35
    },
    track: {
        width: '80%',
        height: 5,
        borderRadius: 100,
        backgroundColor: 'lightgray'
    },
    fill: {
        height: 5,
        backgroundColor: Colors.primary,
        borderRadius: 100,
        shadowColor: Colors.primary,
        shadowOpacity: .4,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 3 },
        left: 0,
    }
})

export default AudioTrack;