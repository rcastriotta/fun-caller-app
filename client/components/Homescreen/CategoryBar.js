import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';

const data = [
    { image: '👪', label: 'All' },
    { image: '❤️', label: 'Love' },
    { image: '💋', label: 'Sexy' },
    { image: '😡', label: 'Angry' },
    { image: '😝', label: 'Insult' },
    { image: '😖', label: 'Annoying' },
    { image: '😄', label: 'Funny' },
    { image: '🎉', label: 'Celebrations' },
    { image: '💰', label: 'Scam' },
    { image: '💸', label: 'Money' },
    { image: '🏠', label: 'Neighbor' },
    { image: '🙋', label: 'Politics' },
    { image: '📞', label: 'Automated' },
    { image: '🏪', label: 'Services' },
    { image: '🐈', label: 'Animals' },
    { image: '⭐️', label: 'Celebs' }
]

const CategoryBar = (props) => {

    const categoryChangeHandler = (id) => {
        props.setCategory(id)
    }

    const renderItem = (cur) => {

        let style = styles.item;

        if (cur.item.label.toLowerCase() === props.category) {
            style = { ...styles.item, ...styles.active }
        }
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={style}
                    activeOpacity={0.8}
                    onPress={() => categoryChangeHandler(cur.item.label.toLowerCase())}
                >
                    <Text style={styles.emoji}>{cur.item.image}</Text>
                </TouchableOpacity>
                <Text style={styles.label}>{cur.item.label}</Text>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                horizontal
                keyExtractor={item => item.label}
                contentContainerStyle={{ paddingHorizontal: '5%' }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        paddingRight: 15,
    },
    item: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 100,
        borderColor: Colors.primary,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',

    },
    active: {
        borderColor: Colors.primary,
        borderStyle: 'solid',
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOpacity: .3,
        shadowOffset: { width: 0, height: 3 },
    },
    emoji: {
        fontSize: 20
    },
    label: {
        marginTop: 6,
        fontSize: 11,
        fontFamily: 'popM'
    }
})

export default CategoryBar;
