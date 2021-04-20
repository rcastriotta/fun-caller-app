import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const options = [
    {
        title: '20 tokens',
        pricePer: '$0.30',
        price: '$5.99',
        icon: require('../../assets/coins_small.png')
    },
    {
        title: '40 tokens',
        pricePer: '$0.25',
        price: '$9.99',
        icon: require('../../assets/coins_small.png')
    },
    {
        title: '120 tokens',
        pricePer: '$0.22',
        price: '$25.99',
        icon: require('../../assets/coins_large.png')
    }, {
        title: '160 tokens',
        pricePer: '$0.20',
        price: '$31.99',
        icon: require('../../assets/coins_large.png')
    },
]

const Options = () => {

    const renderOption = (opt, i) => (
        <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            style={styles.option}
        >
            <View style={styles.imgContainer}>
                <Image
                    source={opt.icon}
                    style={styles.img} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{opt.title}</Text>
                <Text style={styles.pricePer}>{opt.pricePer} per token</Text>
            </View>

            <Text style={styles.price}>{opt.price}</Text>
        </TouchableOpacity>
    )
    return (
        <>
            {options.map((opt, i) => renderOption(opt, i))}
        </>
    )
}

const styles = StyleSheet.create({
    option: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        aspectRatio: 4,
        borderRadius: wp('5%'),
        alignItems: 'center',
        marginTop: '5%',
        paddingVertical: '5%',
        paddingHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imgContainer: {
        height: '80%',
        aspectRatio: 1
    },
    img: {
        height: '100%',
        width: '100%',
    },
    title: {
        fontFamily: 'popB',
        fontSize: wp('4%')
    },
    pricePer: {
        fontFamily: 'popM',
        color: 'gray',
        fontSize: wp('3.5%')
    },
    price: {
        fontFamily: 'popB',
        fontSize: wp('4%')
    }
})

export default Options;