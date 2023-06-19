/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationStrings from '../constants/NavigationStrings';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import MainStack from './MainStack'
import { firebase } from '@react-native-firebase/firestore';
const Stack = createNativeStackNavigator();

function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ presentation: 'card', headerShown: false }}
                initialRouteName={NavigationStrings.SPLASH_SCREEN}
            >
              <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;