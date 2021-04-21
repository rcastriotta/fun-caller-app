import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as savedActions from '../../store/actions/saved';
import { BlurView } from 'expo-blur';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CallingModal = (props) => {
    const dispatch = useDispatch();
    const [callState, setCallState] = useState('Calling...')
    const [textColor, setTextColor] = useState('white')
    const [ws, setWs] = useState(null)

    const closeHandler = () => {
        if (ws) {
            ws.close()
            props.closeModal()
        }
    }

    const errorHandler = (ws, message) => {
        setTextColor('#FF0247')
        setCallState(message)
        ws.close()
    }

    useEffect(() => {
        if (!props.visible) {
            return;
        }
        setCallState('Calling...')
        setTextColor('white')

        const ws = new WebSocket('ws://b09299482efd.ngrok.io')
        setWs(ws);

        ws.onopen = () => {
            const { sendTo, sendFrom, audio } = props;
            ws.send(JSON.stringify({
                sendTo,
                sendFrom,
                audio
            }))
        }

        ws.onmessage = (e) => {
            const { message, type } = JSON.parse(e.data);
            if (type === 'success') {
                ws.close()
                setTextColor('#00CC6D')
                setCallState('Call completed!')
                dispatch(savedActions.addItem({
                    audio: message,
                    name: props.name,
                    number: props.sendTo,
                    img: props.img
                }))
                setTimeout(() => {
                    props.closeModal()
                    props.nav.navigate('Saved', { newVal: true })
                }, 2000)
            } else if (type === 'not-answered') {
                ws.close()
                setTextColor('#FF0247')
                setCallState(message)
            } else if (type === 'error') {
                errorHandler(ws, message)
            } else {
                setCallState(message)
            }
        };

        ws.onerror = (err) => {
            errorHandler(ws, `There's been an error`)
        };

        return () => ws.close()

    }, [props.visible])


    return (
        <Modal
            visible={props.visible}
            transparent
            animationType="fade"
            style={styles.screen}
        >
            <BlurView tint="dark" intensity={100} style={[StyleSheet.absoluteFill, styles.container]}>
                <Text style={{ ...styles.status, color: textColor }}>{callState}</Text>
                <TouchableOpacity style={styles.exit} onPress={closeHandler}>
                    <Text style={styles.exitText}>Close</Text>
                    <AntDesign name="close" size={20} color="white" />
                </TouchableOpacity>
            </BlurView>
        </Modal >
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        backgroundColor: 'red',
        justifyContent: 'flex-end'
    },
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    status: {
        fontSize: wp('10%'),
        fontFamily: 'popM',
        color: 'white',
        textAlign: 'center'
    },
    exit: {
        marginTop: '20%',
        flexDirection: 'row',
    },
    exitText: {
        color: 'white',
        fontSize: wp('4%'),
        fontFamily: 'popM',
        marginRight: 5
    }

})

export default CallingModal;