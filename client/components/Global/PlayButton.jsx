import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../constants/colors';

const PlayButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                ...styles.play,
                ...props.style,
                backgroundColor: props.isBuffering ? null : Colors.primary
            }}
        >
            {props.isBuffering ? <ActivityIndicator color={Colors.primary} /> : props.isPlaying
                ? <View style={styles.pause}>
                    <View style={styles.bar} />
                    <View style={styles.bar} />
                </View>
                : <View style={[styles.triangle, styles.arrowUpRight]}
                />
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    play: {
        height: 35,
        width: 35,
        backgroundColor: Colors.primary,
        alignSelf: 'center',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOpacity: .3,
        shadowOffset: { width: 0, height: 3 },
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        marginLeft: 3
    },
    arrowUpRight: {
        borderTopWidth: 6,
        borderRightWidth: 0,
        borderBottomWidth: 6,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: "white",
    },
    pause: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 10
    },
    bar: {
        width: 3,
        height: 12,
        backgroundColor: 'white'
    }
})

export default PlayButton;

