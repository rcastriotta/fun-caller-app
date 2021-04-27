import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import AuthTemplate from "../../components/Global/AuthTemplate";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/colors";
import AvoidingView from "../../components/Global/AvoidingView";
import axios from "axios";

const NumberScreen = ({ route, navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState({
    text: "",
    valid: false,
  });

  const textChangeHandler = (e) => {
    const text = e.nativeEvent.text;
    const valid = /^\d+$/.test(text) && text.length === 10;
    setPhoneNumber({ text, valid });
  };

  const nextHandler = async () => {
    if (!phoneNumber.valid) {
      return;
    }
    axios
      .get(
        `http://6766fd546871.ngrok.io/verification/sendCode?number=${phoneNumber.text}`
      )
      .then(() => {
        Keyboard.dismiss();

        setTimeout(() => {
          navigation.navigate("Code", { number: phoneNumber.text });
        }, 0);
      })
      .catch(() => {
        Alert.alert("Error", "Please try again later");
      });
  };

  return (
    <View style={styles.screen}>
      <AuthTemplate
        nav={navigation}
        title="Enter your mobile number"
        description="We will send you a confirmation code."
      >
        <View style={styles.container}>
          <Text style={styles.countryCode}>+1</Text>
          <TextInput
            value={phoneNumber.text}
            onChange={textChangeHandler}
            style={styles.textInput}
            placeholder="(000) 000 0000"
            maxLength={10}
            placeholderTextColor="#BDBEC0"
            autoFocus
            selectionColor={Colors.primary}
            keyboardType="number-pad"
          />
        </View>
      </AuthTemplate>

      <AvoidingView valid={phoneNumber.valid} nextHandler={nextHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCode: {
    fontFamily: "popM",
    fontSize: wp("7%"),
  },
  textInput: {
    fontFamily: "popM",
    fontSize: wp("7%"),
    marginLeft: "3%",
    width: "100%",
  },
});
export default NumberScreen;
