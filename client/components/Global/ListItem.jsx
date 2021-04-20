import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import PlayButton from './PlayButton';

const ListItem = (props) => {

    if (!props.animated && props.style) {
        delete props.style.transform
    }

    //console.log(props.animated)

    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={0.7}
        >
            <Animated.View
                style={[styles.item, props.style]}
            >
                <View style={styles.dataContainer}>
                    <Image
                        source={{ uri: props.uri }}
                        style={styles.image}
                    />
                    <View style={styles.info}>
                        {props.children}
                    </View>
                </View>
                <PlayButton
                    isBuffering={props.isBuffering}
                    isPlaying={props.isPlaying}
                    onPress={props.onAudioPress}
                />

            </Animated.View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        aspectRatio: 4,
        backgroundColor: '#F8F8F8',
        marginTop: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    dataContainer: {
        flexDirection: 'row'
    },
    image: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: 'lightgray'
    },
    info: {
        marginLeft: '5%',
        maxWidth: '65%'
    },
})

export default ListItem;