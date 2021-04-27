import React from "react";
import { View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import Homescreen from "../screens/main/Homescreen";
import CallScreen from "../screens/main/CallScreen";
import SavedScreen from "../screens/main/SavedScreen";
import ResultScreen from "../screens/main/ResultScreen";
import CoinsScreen from "../screens/main/CoinsScreen";
import BuyCoinsScreen from "../screens/main/BuyCoinsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Placeholder = () => <></>;

const TabbedNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "rgba(255, 255, 255, .7)",
        style: {
          backgroundColor: Colors.primary,
          position: "absolute",
          paddingBottom: null,
          paddingVertical: null,
          paddingHorizontal: "9%",
          margin: "9%",
          borderRadius: 100,
          borderTopWidth: 0,
          shadowColor: Colors.primary,
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 10,
          height: "8%",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color }) => (
            <Feather name={"home"} size={27} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Placeholder"
        component={Placeholder}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: "50%",
                width: 1,
                backgroundColor: "rgba(255, 255, 255, .5)",
              }}
            />
          ),
        }}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault();
          },
        })}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color, active }) => (
            <MaterialIcons name="multitrack-audio" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TokenManager = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "white", flex: 1 },
        gestureEnabled: false,
      }}
      headerMode="none"
    >
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="Buy" component={BuyCoinsScreen} />
    </Stack.Navigator>
  );
};

const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "white", flex: 1 },
        gestureEnabled: false,
      }}
      headerMode="none"
      mode="modal"
    >
      <Stack.Screen name="Tabbed" component={TabbedNav} />
      <Stack.Screen name="Tokens" component={TokenManager} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "white", flex: 1 },
        gestureEnabled: false,
      }}
      headerMode="none"
    >
      <Stack.Screen name="Stack" component={StackNav} />
      <Stack.Screen name="Call" component={CallScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
