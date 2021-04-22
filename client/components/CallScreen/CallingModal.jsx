import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as savedActions from '../../store/actions/saved';
import { BlurView } from 'expo-blur';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

const CallingModal = (props) => {
    const dispatch = useDispatch();
    const [callState, setCallState] = useState('Calling...')
    const [textColor, setTextColor] = useState('white')
    const [ws, setWs] = useState(null)
    const [callId, setCallId] = useState(null)

    const closeHandler = async () => {
        if (ws) {
            props.closeModal()
            if (callId && ws) {
                await axios.get(`https://b09299482efd.ngrok.io/cancel/${callId}`)
            }
            ws.close()
            setWs(null)
            setCallId(null)
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

            switch (type) {
                case 'success':
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
                    }, 1500)
                    break;
                case 'not-answered':
                    ws.close()
                    setCallId(null)
                    setTextColor('#FF0247')
                    setCallState(message)
                    break;
                case 'id':
                    setCallId(message)
                    break;
                case 'error':
                    errorHandler(ws, message)
                    break;
                default:
                    setCallState(message)
            }
        };

        ws.onerror = () => {
            errorHandler(ws, `There's been an error`)
        };

        return () => {
            ws.close()
            setWs(null)
            setCallId(null)
        }

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
                    <Text style={styles.exitText}>Cancel</Text>
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