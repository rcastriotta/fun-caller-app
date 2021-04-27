import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import SlideUp from "../../components/SavedScreen/SlideUp";
import SavedList from "../../components/SavedScreen/SavedList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SavedScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ ...styles.screen, paddingTop: Math.max(insets.top, 16) }}>
      <Text style={styles.title}>Recorded Calls</Text>
      <SlideUp>
        <SavedList newVal={route.params ? true : false} nav={navigation} />
      </SlideUp>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  title: {
    fontSize: 23,
    margin: "5%",
    color: "white",
    fontFamily: "popB",
  },
});
export default SavedScreen;
