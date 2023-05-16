/* eslint-disable prettier/prettier */
import React from "react";
import NavigationStrings from "../constants/NavigationStrings";
import { AllOrder, Checkout, Home, ItemsDetails, OrderInformation, Login, SplashScreen, Dashboard } from "../Screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddItem from "../tabs/AddItem/AddItem";
import ManageItem from '../tabs/ManageItem/ManageItem';
import Orders from "../tabs/Orders/Orders";
const Stack = createNativeStackNavigator();

export default function MainStack() {
    console.log("this is my mainstack file")
    return (
        <Stack.Navigator screenOptions={{ presentation: 'card', headerShown: false }}>
            {/* <Stack.Screen
                name={NavigationStrings.SPLASH_SCREEN}
                component={SplashScreen}
            /> */}
            {/* <Stack.Screen
                name={NavigationStrings.LOGIN}
                component={Login}
            /> */}

            <Stack.Screen
                name={NavigationStrings.DASHBOARD}
                component={Dashboard}
            />
            <Stack.Screen
                name={NavigationStrings.MANAGE_ITEM}
                component={ManageItem}
            />
            <Stack.Screen
                name={NavigationStrings.ADD_ITEM}
                component={AddItem}
            />

            <Stack.Screen
                name={NavigationStrings.ORDERS}
                component={Orders}
            />
            {/* <Stack.Screen
                name={NavigationStrings.ITEMS_DETAILS}
                component={ItemsDetails}
            />
            <Stack.Screen
                name={NavigationStrings.CHECKOUT}
                component={Checkout}
            />
            <Stack.Screen
                name={NavigationStrings.ORDER_INFORMATION}
                component={OrderInformation}
            />
            <Stack.Screen
                name={NavigationStrings.ALL_ORDER}
                component={AllOrder}
            /> */}
        </Stack.Navigator>
    )

}