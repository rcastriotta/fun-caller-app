import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import NumberScreen from '../screens/auth/NumberScreen';
import CodeScreen from '../screens/auth/CodeScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ cardStyle: { backgroundColor: 'white', flex: 1 }, gestureEnabled: false }}
            headerMode="none"
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Number" component={NumberScreen} />
            <Stack.Screen name="Code" component={CodeScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;