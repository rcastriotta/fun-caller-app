import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowHeight = Dimensions.get('window').height;

const SlideUp = (props) => {
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    return (
        <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    //props.getMore()
                }
            }}
            scrollEventThrottle={400}
        >
            <View style={styles.container}>
                <View style={styles.grab} />
                {props.children}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flex: 1,
        marginTop: '5%'
    },
    grab: {
        height: 6,
        marginTop: '3%',
        alignSelf: 'center',
        width: 50,
        backgroundColor: 'lightgray',
        borderRadius: 100
    },
    container: {
        borderRadius: 25,
        backgroundColor: 'white',
        paddingBottom: '50%',
        minHeight: hp('85%')
    }
})

export default SlideUp;