/* eslint-disable prettier/prettier */
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import imagePath from '../constants/imagePath';
// import { Image } from 'react-native';
// import NavigationStrings from '../constants/NavigationStrings';
// import ProfileStack from './ProfileStack';
// import SubscriptionStack from './SubscriptionStack';
// import CartStack from './CartStack';
// import SearchStack from './SearchStack';
// import HomeStack from './HomeStack';
// import Colors from '../styles/Colors';
// import { moderateScale } from 'react-native-size-matters';

// // const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function Routes() {
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 presentation: 'modal',
//                 headerShown: false,
//                 // tabBarLabel: ({ focused, }) => {

//                 // }
//                 tabBarLabel: () => null,
//             }}
//             initialRouteName={NavigationStrings.HOME}
//         >
//             <Tab.Screen
//                 name={NavigationStrings.HOME_STACK}
//                 component={HomeStack}
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <Image
//                                 style={{
//                                     tintColor: focused ? Colors.primaryColor : 'gray',
//                                     width: moderateScale(26),
//                                     height: moderateScale(26)
//                                 }}
//                                 source={imagePath.icHome}
//                             />
//                         )
//                     }
//                 }}
//             />
//             <Tab.Screen
//                 name={NavigationStrings.SEARCH_STACK}
//                 component={SearchStack}
//                 options={{
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <Image
//                                 style={{
//                                     tintColor: focused ? Colors.primaryColor : 'gray',
//                                     width:moderateScale(27),
//                                     height:moderateScale(27)
//                                 }}
//                                 source={imagePath.icSearch}
//                             />
//                         )
//                     }
//                 }}
//             />
//             <Tab.Screen
//                 name={NavigationStrings.CART_STACK}
//                 component={CartStack}
//                 options={{
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <Image
//                                 style={{
//                                     tintColor: focused ? Colors.primaryColor : 'gray',
//                                     width:moderateScale(27),
//                                     height:moderateScale(27)
//                                 }}
//                                 // source={focused ? IconPath.icExplores : IconPath.icExplore}
//                                 source={imagePath.icCart}
//                             />
//                         )
//                     }
//                 }}
//             />

//             <Tab.Screen
//                 name={NavigationStrings.SUBSCRIPTION_STACK}
//                 component={SubscriptionStack}
//                 options={{
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <Image
//                                 style={{
//                                     tintColor: focused ? Colors.primaryColor : 'gray',
//                                     width:moderateScale(27),
//                                     height:moderateScale(27)
//                                 }}
//                                 // source={focused ? IconPath.icExplores : IconPath.icExplore}
//                                 source={imagePath.icSubscription}
//                             />
//                         )
//                     }
//                 }}
//             />

//             <Tab.Screen
//                 name={NavigationStrings.PROFILE_STACK}
//                 component={ProfileStack}
//                 options={{
//                     tabBarIcon: ({ focused }) => {
//                         return (
//                             <Image
//                                 style={{
//                                     tintColor: focused ? Colors.primaryColor : 'gray',
//                                     width:moderateScale(27),
//                                     height:moderateScale(27)
//                                 }}
//                                 // source={focused ? IconPath.icExplores : IconPath.icExplore}
//                                 source={imagePath.icUserLogo}
//                             />
//                         )
//                     }
//                 }}
//             />
//         </Tab.Navigator>
//     )
// }

// export default Routes;