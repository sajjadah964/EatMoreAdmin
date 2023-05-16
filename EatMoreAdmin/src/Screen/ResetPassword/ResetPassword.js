import React, { useState, } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert,ToastAndroid } from 'react-native'
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import imagePath from '../../constants/imagePath';
import Colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import TextInputWithLabel from '../../components/TextinputWithLable';
import NavigationStrings from '../../constants/NavigationStrings';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';


const Login = () => {
    const [isLoading, setisLoading] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    }
    const handleResetPassword = async () => {
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                ToastAndroid.show('Password reset email sent successfully.', ToastAndroid.SHORT);
                // navigation.navigate(NavigationStrings.LOGIN)
            })
            .catch(error => {
                Alert.alert('Reset Email error',error)
            });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader isLoading={isLoading} />
            <View style={{ flex: 1, flexDirection: 'column', }}>
                <View style={styles.eatmoreLogo}>
                    <View style={styles.loginLogoView}>
                        <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            style={styles.loginLogoStyle}
                            source={imagePath.icLogo}
                        />
                    </View>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 30,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles.formView}>
                        <View style={{ marginTop: moderateVerticalScale(40) }}>
                            <CustomPkgBtn
                                textStyle={{ ...styles.textStyle }}
                                btnStyle={{ ...styles.btnStyle }}
                                btnText={'Reset Password'}
                            />
                        </View>
                        <TouchableOpacity style={styles.descView}>
                            <Text style={styles.descStyle}>Enter the email and follow the link in your inbox to reset your password.</Text>
                        </TouchableOpacity>
                        <TextInputWithLabel
                            placeHolder='Enter Email'
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            inputStyle={{ marginBottom: moderateVerticalScale(70) }}
                            keyboardType="email-address"
                        />

                        <CustomPkgBtn
                            textStyle={{ ...styles.textStyle, ...styles.customTextStyle }}
                            btnStyle={{ ...styles.btnStyle, ...styles.customStyle }}
                            btnText={'Reset Password'}
                            onPress={handleResetPassword}
                        />

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eatmoreLogo: {
        // flex: 1,
        height: moderateScale(350),
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: moderateScale(80),
        borderBottomRightRadius: moderateScale(80),
    },
    formView: {
        backgroundColor: Colors.white,
        width: moderateScale(300),
        height: moderateScale(440),
        borderRadius: moderateScale(39),
        borderWidth: 1,
        borderColor: 'rgba(71, 45, 156, 0.8)',
        paddingHorizontal: moderateScale(25)
    },
    loginLogoStyle: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    loginLogoView: {
        marginTop: moderateVerticalScale(100),
        alignItems: 'center',
    },
    btnStyle: {
        width: moderateScale(195),
        height: moderateScale(36),
        justifyContent: 'center',
        backgroundColor: Colors.white,
        marginBottom: moderateVerticalScale(38),
        borderColor: Colors.primaryColor,
        borderWidth: 1,
    },
    textStyle: {
        color: Colors.primaryColor
    },
    descStyle: {
        color: Colors.primaryColor,
    },
    descView: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        marginBottom: moderateVerticalScale(60)
    },
    customStyle: {
        marginBottom: moderateVerticalScale(20),
        backgroundColor: Colors.primaryColor
    },
    customTextStyle: {
        fontSize: scale(15),
        fontWeight: '500',
        color: Colors.white
    },
    loginSignview: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginSignText: {
        fontSize: scale(15),
        fontWeight: '500',
        color: Colors.primaryColor
    },
    line: {
        height: 1,
        backgroundColor: Colors.primaryColor,
        // width: '73%',
    },
})
export default Login;

