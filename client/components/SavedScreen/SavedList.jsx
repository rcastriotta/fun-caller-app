import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import ListItem from '../../components/Global/ListItem';
import Colors from '../../constants/colors';
import dateFormat from 'dateformat';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as audioActions from '../../store/actions/audio';

const SavedList = (props) => {
    const dispatch = useDispatch();
    const { isPlaying, uri, isBuffering } = useSelector(state => state.audio);
    const { itemsList } = useSelector(state => state.saved)
    const scale = new Animated.Value(1);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.04,
                    timing: 1200,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, [props]);

    const savedPressHandler = (data) => {
        dispatch(audioActions.clearAudio())
        props.nav.navigate('Result', data)
    }

    const renderItem = (item, i) => {
        const number = item.number.slice(0, 3)
            + "-" + item.number.slice(3, 6)
            + "-" + item.number.slice(6)

        const date = dateFormat(item.recordedAt, "longTime")

        return (
            <ListItem
                key={item.audio}
                uri={item.img}
                animated={props.newVal && i === 0}
                onPress={() => savedPressHandler({
                    number,
                    audio: item.audio,
                    date
                })}
                style={{ aspectRatio: 3.5, transform: [{ scale }] }}
                isBuffering={isBuffering && item.audio === uri}
                isPlaying={isPlaying && item.audio === uri}
                onAudioPress={() => dispatch(audioActions.playPause(item.audio))}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.number}>
                        {number}
                    </Text>
                    <View style={styles.dateContainer}>
                        <AntDesign name="clockcircleo" size={12} color="gray" />
                        <Text style={styles.date}>{date}</Text>
                    </View>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </ListItem >
        )
    }

    return (
        <View style={styles.container}>
            {itemsList.length
                ? itemsList.map((item, i) => renderItem(item, i))
                : <Text style={styles.noData}>{'Your recorded pranks will show up here!'}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        alignItems: 'center',
        flex: 1,
    },
    number: {
        fontSize: 18,
        fontFamily: 'popB'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    date: {
        color: 'gray',
        fontSize: 11,
        marginTop: '3%',
        marginLeft: '3%',
        fontFamily: 'popM',
    },
    name: {
        color: Colors.primary,
        marginTop: '3%',
        fontFamily: 'popB',
        fontSize: 12
    },
    noData: {
        marginTop: '50%',
        fontFamily: 'popM',
        textAlign: 'center'
    }
})
export default SavedList;
