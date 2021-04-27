import React from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Top from "../../components/CallScreen/Top";
import Info from "../../components/CallScreen/Info";
import Form from "../../components/CallScreen/Form";
import MorePranks from "../../components/CallScreen/MorePranks";

const CallScreen = ({ route, navigation }) => {
  const { name, images, audio, sent, uri, morePranks } = route.params;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <Top nav={navigation} img={images.full} />
        <View style={styles.container}>
          <View style={styles.grab} />
          <Info name={name} audio={audio} sent={sent} />
          <Form
            nav={navigation}
            name={name}
            img={images.square}
            audio={audio}
          />
          <MorePranks uri={uri} nav={navigation} data={morePranks} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  grab: {
    height: 6,
    marginTop: "3%",
    marginBottom: "6%",
    alignSelf: "center",
    width: 50,
    backgroundColor: "lightgray",
    borderRadius: 100,
  },
  container: {
    backgroundColor: "white",
    paddingHorizontal: "5%",
    borderRadius: 25,
    minHeight: "70%",
  },
});

export default CallScreen;
