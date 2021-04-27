import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useDispatch } from "react-redux";
import * as audioActions from "../../store/actions/audio";
import { BlurView } from "expo-blur";

const Top = (props) => {
  const dispatch = useDispatch();

  const backPressHandler = () => {
    dispatch(audioActions.clearAudio());
    props.nav.goBack();
  };

  return (
    <View style={styles.imageContainer}>
      <ImageBackground style={styles.image} source={{ uri: props.img }}>
        <SafeAreaView>
          <TouchableOpacity activeOpacity={0.8} onPress={backPressHandler}>
            <BlurView tint="light" intensity={90} style={styles.goBack}>
              <Ionicons name="chevron-back" size={24} color={Colors.primary} />
            </BlurView>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: "-10%",
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: "lightgray",
  },
  goBack: {
    height: 45,
    width: 45,
    borderRadius: 10,
    marginLeft: "5%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
export default Top;
