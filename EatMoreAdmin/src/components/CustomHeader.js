
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import imagePath from '../constants/imagePath';
import { useNavigation } from '@react-navigation/native'
import Colors from '../styles/Colors';
import { scale, moderateVerticalScale, moderateScale ,verticalScale } from 'react-native-size-matters';

// create a component
const CustomHeader = ({
    leftImg,
    onPressBack,
    headerImgStyle,
    headerStyle = {},
    headerTitle,
    headerHeading,
}) => {
    const navigation = useNavigation();
    return (
        <View style={{ ...styles.headerStyle, ...headerStyle }}>
            {leftImg ?
                <TouchableOpacity
                    onPress={!!onPressBack ? onPressBack : () => navigation.goBack()}
                >
                    <Image
                        source={leftImg}
                        style={{ ...styles.imgStyle, ...headerImgStyle }}
                    />
                </TouchableOpacity> : null

            }
            {headerTitle ?
                <Text style={styles.headerTitleStyle}>{headerTitle}</Text>
                : null
            }
            <View>
                {headerHeading ?
                    <Text style={styles.headerTitleStyle}>{headerHeading}</Text>
                    : null
                }
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    headerStyle: {
        minHeight: moderateScale(70),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'#FEFEFE'

    },
    imgStyle: {
        width: moderateScale(26),
        height: moderateScale(17),
        // tintColor:Colors.blue,
    },
    headerTitleStyle: {
        fontSize: scale(24),
        fontWeight: '500',
        color: Colors.black
    }
});

//make this component available to the app
export default CustomHeader;
