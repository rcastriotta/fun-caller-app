import React from "react";
import SwitchNavigator from "./navigation/SwitchNavigator";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    popB: require("./assets/fonts/poppinsB.ttf"),
    popM: require("./assets/fonts/poppinsM.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <SwitchNavigator />;
}
