import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as audioActions from '../../store/actions/audio';

const MorePranks = (props) => {
    const dispatch = useDispatch();

    const prankPressHandler = (data) => {
        dispatch(audioActions.clearAudio())
        props.nav.replace('Call', data)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => prankPressHandler({
                sent: item.sent,
                images: {
                    full: item.images.full,
                    square: item.images.square
                },
                name: item.name,
                audio: item.audio,
                uri: item.uri_name,
                morePranks: props.data
            })}

        >
            <Image
                style={styles.image}
                source={{ uri: item.images.square }}
            />
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>More Pranks</Text>
                <FlatList
                    style={styles.flatList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={props.data.filter(item => item.uri_name !== props.uri)}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingHorizontal: '5%' }}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 0,
    },
    title: {
        fontFamily: 'popB',
        fontSize: 15,
        marginBottom: '5%'
    },
    flatList: {
        marginLeft: '-5%',
        marginRight: '-5%'
    },
    item: {
        aspectRatio: 1,
        height: 100,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 10
    },
    image: {
        flex: 1
    }
})

export default MorePranks;

