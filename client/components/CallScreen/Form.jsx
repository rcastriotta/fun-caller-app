import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Animated, Alert } from 'react-native';
import Colors from '../../constants/colors';
import CallingModal from './CallingModal';
import { useDispatch, useSelector } from 'react-redux';
import * as audioActions from '../../store/actions/audio';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Form = (props) => {
    const dispatch = useDispatch();
    const { coinAmount } = useSelector(state => state.user);
    const [showModal, setShowModal] = useState(false)
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
    }, []);

    const animatedStyle = {
        transform: [{ scale }]
    }
    const [formState, setFormState] = useState({
        friendsNum: {
            text: '',
            valid: false
        },
        sendFrom: {
            text: '',
            valid: false
        },
        showErrors: false
    })

    const typeChangeHandler = (e, type) => {
        const text = e.nativeEvent.text;
        const valid = /^\d+$/.test(text) && text.length === 10
        setFormState(prev => ({ ...prev, [type]: { text, valid } }))
    }

    const submitHandler = () => {
        if (!formState.friendsNum.valid || !formState.sendFrom.valid) {
            setFormState(prev => ({ ...prev, showErrors: true }))
            return;
        }

        if (coinAmount < 1) {
            Alert.alert('Not enough tokens!', 'You need at least 1 token(s) to make this call.')
            return;
        }

        dispatch(audioActions.clearAudio())
        setShowModal(true)
    }


    return (
        <View style={styles.container}>
            <View style={(formState.showErrors && !formState.friendsNum.valid)
                ? [styles.textInputContainer, styles.error]
                : styles.textInputContainer
            }>
                <Text style={styles.countryCode}>+1</Text>
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    keyboardType='phone-pad'
                    returnKeyType='go'
                    maxLength={10}
                    selectionColor={Colors.primary}
                    placeholder="Friends Number"
                    value={formState.friendsNum.text}
                    onChange={(e) => typeChangeHandler(e, 'friendsNum')}
                />
            </View>

            <View style={(formState.showErrors && !formState.sendFrom.valid)
                ? [styles.textInputContainer, styles.error]
                : styles.textInputContainer
            }>
                <Text style={styles.countryCode}>+1</Text>
                <TextInput
                    style={styles.input}
                    maxLength={10}
                    keyboardType='phone-pad'
                    autoCorrect={false}
                    placeholder="Call From"
                    value={formState.sendFrom.text}
                    selectionColor={Colors.primary}
                    onChange={(e) => typeChangeHandler(e, 'sendFrom')}
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={submitHandler}
            >
                <Animated.View style={[styles.submit, animatedStyle]}>
                    <Text style={styles.submitText}>Send Prank</Text>
                </Animated.View>
            </TouchableOpacity>
            <CallingModal
                visible={showModal}
                sendTo={formState.friendsNum.text}
                sendFrom={formState.sendFrom.text}
                name={props.name}
                nav={props.nav}
                img={props.img}
                audio={props.audio}
                closeModal={() => setShowModal(false)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    textInputContainer: {
        width: '100%',
        marginTop: '5%',
        aspectRatio: 7,
        borderWidth: 2,
        borderColor: '#EFEFEF',
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        paddingLeft: '3%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        fontFamily: 'popM',
        marginLeft: '3%',
        width: '100%'
    },
    error: {
        borderColor: 'red',
    },
    submit: {
        backgroundColor: Colors.primary,
        width: '100%',
        alignSelf: 'center',
        aspectRatio: 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        shadowColor: Colors.primary,
        shadowOpacity: .3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'popB'
    },
    countryCode: {
        fontFamily: 'popB',
        fontSize: wp('4%'),
    }

})

export default Form;