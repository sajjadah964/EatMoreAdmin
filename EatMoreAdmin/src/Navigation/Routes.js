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
    // const [user, setUser] = useState('');
    // // const navigation = useNavigation();
    // useEffect(() => {
    //     const unsubscribe =  auth().onAuthStateChanged((userExist) => {
    //         if (user) {
    //             setUser(userExist)
    //         } else {
    //             setUser('')
    //         }
    //     })
    //     return unsubscribe; // Unsubscribe from the listener when the component unmounts
    // }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ presentation: 'card', headerShown: false }}
                initialRouteName={NavigationStrings.LOGIN}
            >
                {/* {user ? MainStack(Stack) : AuthStack(Stack)}
                {MainStack(Stack)} */}
              <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} />
            </Stack.Navigator>
              {/* <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} /> */}
            {/* <Stack.Navigator screenOptions={{ presentation: 'card', headerShown: false }}>
                {user ? (
                    <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} />
                ) : (
                    <Stack.Screen name={NavigationStrings.AUTH_STACK} component={AuthStack} />
                )}
            </Stack.Navigator> */}
        </NavigationContainer>
    )
}

export default Routes;