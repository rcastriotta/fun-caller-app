import React, { useEffect, useState, useRef } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as savedActions from "../../store/actions/saved";
import { BlurView } from "expo-blur";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import io from "socket.io-client";

const CallingModal = (props) => {
  const { sendTo, sendFrom, audio } = props;
  const dispatch = useDispatch();
  const [callState, setCallState] = useState("Calling...");
  const [textColor, setTextColor] = useState("white");
  const socket = useRef();
  const callId = useRef();

  const closeHandler = async () => {
    props.closeModal();
    if (socket.current) {
      if (callId.current) {
        await axios.get(
          `http://a3679117b01a.ngrok.io/cancel/${callId.current}`
        );
      }
      socket.current.close();
    }
    socket.current = null;
    callId.current = null;
  };

  useEffect(() => {
    if (!props.visible) {
      return;
    }
    setCallState("Calling...");
    setTextColor("white");

    socket.current = io("https://a3679117b01a.ngrok.io", {
      transports: ["websocket"],
    });

    socket.current.emit("make-call", {
      sendTo,
      sendFrom,
      audio,
    });

    socket.current.on("callID", ({ message: id }) => {
      callId.current = id;
    });

    socket.current.on("call-event", ({ type, message }) => {
      switch (type) {
        case "success":
          socket.current.disconnect();
          setTextColor("#00CC6D");
          setCallState("Call completed!");
          dispatch(
            savedActions.addItem({
              audio: message,
              name: props.name,
              number: props.sendTo,
              img: props.img,
            })
          );
          setTimeout(() => {
            props.closeModal();
            props.nav.navigate("Saved", { newVal: true });
          }, 1500);
          break;
        case "not-answered":
          callId.current = null;
          setTextColor("#FF0247");
          setCallState(message);
          break;
        default:
          setCallState(message);
      }
    });

    socket.current.on("error", ({ message }) => {
      setTextColor("#FF0247");
      setCallState(message);
      socket.current.disconnect();
    });

    return () => (socket.current ? socket.current.disconnect() : undefined);
  }, [props.visible]);

  return (
    <Modal
      visible={props.visible}
      transparent
      animationType="fade"
      style={styles.screen}
    >
      <BlurView
        tint="dark"
        intensity={100}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <Text style={{ ...styles.status, color: textColor }}>{callState}</Text>
        <TouchableOpacity style={styles.exit} onPress={closeHandler}>
          <Text style={styles.exitText}>Cancel</Text>
          <AntDesign name="close" size={20} color="white" />
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    fontSize: wp("10%"),
    fontFamily: "popM",
    color: "white",
    textAlign: "center",
  },
  exit: {
    marginTop: "20%",
    flexDirection: "row",
    alignItems: "center",
  },
  exitText: {
    color: "white",
    fontSize: wp("4%"),
    fontFamily: "popM",
    marginRight: 5,
  },
});

export default CallingModal;
