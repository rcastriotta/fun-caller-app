import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../api/config";
import Colors from "../constants/colors";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { NavigationContainer } from "@react-navigation/native";

const SwitchNavigator = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  auth.onAuthStateChanged((user) => {
    setLoggedIn(user ? true : false);
  });

  if (loggedIn === null) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: Colors.primary,
        }}
      >
        <ActivityIndicator color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default SwitchNavigator;
