/* eslint-disable prettier/prettier */

import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import Colors from '../styles/Colors';
import colors from '../styles/Colors'

// create a component
const TextInputWithLabel = ({
    label,
    inlineInputStyle,
    labelTextStyle,
    placeHolder,
    onChangeText = () => { },
    inputStyle = {},
    rightIcon,
    onPressRight,
    searchIcon,
    ...props
}) => {
    return (
        <View>
            {/* <Text style={{ ...styles.labelTextStyle, ...labelTextStyle }}>{label}</Text> */}
            {label ?
                <Text style={{ ...styles.labelTextStyle, ...labelTextStyle }}>{label}</Text>
                : null
            }
            <View style={{ ...styles.inputStyle, ...inputStyle }}>
                <View style={styles.flexView}>

                    {searchIcon ?
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.searchBtnStyle}
                        >
                            <Image
                                source={searchIcon}
                            />
                        </TouchableOpacity>
                        : null
                    }
                    <TextInput
                        placeholderTextColor='#472D9CCC'
                        placeholder={placeHolder}
                        style={{ ...styles.inlineInputStyle, ...inlineInputStyle }}
                        {...props}
                        onChangeText={onChangeText}
                    />

                    {!!rightIcon ? <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onPressRight}
                    >
                        <Image style={styles.visibleStyle} source={rightIcon} />
                    </TouchableOpacity> : null}
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        height: moderateScale(40),
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        borderRadius: moderateScale(4),
        // backgroundColor:'red'
    },
    inlineInputStyle: {
        paddingVertical: moderateVerticalScale(8),
        fontSize: scale(16),
        flex: 1
    },
    labelTextStyle: {
        fontSize: scale(16),
        color: Colors.black,
        fontWeight: '600',
        marginBottom: moderateScale(12)
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    visibleStyle: {
        tintColor: Colors.primaryColor,
        width: moderateScale(19),
        height: moderateScale(13)
    },
    searchBtnStyle: {
        paddingLeft: moderateScale(20),
    }
});

export default TextInputWithLabel;
