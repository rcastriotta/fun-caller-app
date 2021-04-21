import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
                    props.getMore()
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

export default SlideUp;

const styles = StyleSheet.create({
    scroll: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flex: 1,
        marginTop: '-5%',
    },
    container: {
        borderRadius: 25,
        backgroundColor: 'white',
        paddingTop: '0%',
        paddingBottom: '50%',
        flex: 1,
        minHeight: hp('80%')
    },
    grab: {
        height: 6,
        marginTop: '3%',
        marginBottom: '5%',
        alignSelf: 'center',
        width: 50,
        backgroundColor: 'lightgray',
        borderRadius: 100
    }
})