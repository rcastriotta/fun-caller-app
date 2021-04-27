import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';


const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ cardStyle: { backgroundColor: 'white', flex: 1 }, gestureEnabled: false }}
            headerMode="none"
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;