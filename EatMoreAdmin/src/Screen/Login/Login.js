import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert, ToastAndroid,Dimensions,    ScrollView,
    KeyboardAvoidingView, } from 'react-native'
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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const [isLoading, setisLoading] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setVisible] = useState(true)
    // const moveToScreen = (screen) => {
    //     navigation.navigate(screen);
    // }

    // ADDING ADMIN LOGIN FIREBASE 
    // useEffect(() => {
    //     firestore()
    //     .collection('AdminLogin')
    //     .add({
    //       email: 'admin123@gmail.com',
    //       password: 'admin@1234',
    //     })
    //     .then(() => {
    //       console.log('admin data added!');
    //     });
    // }, []);
    

    const adminLogin= async ()=>{
        setisLoading(true);
        const users = await firestore().collection('AdminLogin').get();
        console.log("admin user data",users.docs[0]._data.email)
        if (email == users.docs[0]._data.email && password == users.docs[0]._data.password) {
            ToastAndroid.show('Login successfully  ', ToastAndroid.SHORT);
            setisLoading(false);
            navigation.navigate(NavigationStrings.DASHBOARD);
            await AsyncStorage.setItem('EMAIL', email);
            
        } else {
            setisLoading(false)
            ToastAndroid.show('Wrong email and password ', ToastAndroid.SHORT);
        }
        console.log(users.docs[0]._data)
        setEmail('');
        setPassword('');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader isLoading={isLoading} />
            <KeyboardAvoidingView style={{ flex: 1 }} enabled>
            <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
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
                        flex: 1,
                        position: 'relative',
                        bottom: 80,
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
                                    btnText={'Login as Admin'}
                                />
                            </View>
                            <TextInputWithLabel
                                placeHolder='Enter Email'
                                onChangeText={(userEmail) => setEmail(userEmail)}
                                // onChangeText={handleEmailChange}
                                inputStyle={{ marginBottom: moderateVerticalScale(10) }}
                                keyboardType="email-address"
                                value={email}
                            // error={emailError}
                            />
                            <TextInputWithLabel
                                placeHolder={'Password'}
                                onChangeText={(userPassword) => setPassword(userPassword)}
                                // onChangeText={handlePasswordChange}
                                secureTextEntry={isVisible}
                                rightIcon={isVisible ? imagePath.icHide : imagePath.icShow}
                                onPressRight={() => setVisible(!isVisible)}
                                inputStyle={{ marginBottom: moderateVerticalScale(60) }}
                                value={password}
                            />
                            <CustomPkgBtn
                                textStyle={{ ...styles.textStyle, ...styles.customTextStyle }}
                                btnStyle={{ ...styles.btnStyle, ...styles.customStyle }}
                                btnText={'Login'}
                                onPress={() => {
                                    navigation.navigate(NavigationStrings.DASHBOARD)
                                if (email !== '' && password !== '') {
                                    adminLogin()
                                } else {
                                    ToastAndroid.show('please enter data', ToastAndroid.SHORT);
                                }
                                }}

                            />
                        

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eatmoreLogo: {
        height: moderateScale(350),
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: moderateScale(80),
        borderBottomRightRadius: moderateScale(80),
    },
    formView: {
        backgroundColor: Colors.white,
        width: (windowWidth - 45),
        height: (windowHeight - 270),
        borderRadius: moderateScale(39),
        borderWidth: 1,
        borderColor: 'rgba(71, 45, 156, 0.8)',
        paddingHorizontal: moderateScale(25)
    },
    loginLogoView: {
        marginTop: moderateVerticalScale(100),
        alignItems: 'center',
    },
    btnStyle: {
        width: moderateScale(160),
        height: moderateScale(36),
        justifyContent: 'center',
        backgroundColor: Colors.white,
        marginBottom: moderateVerticalScale(60),
        borderColor: Colors.primaryColor,
        borderWidth: 1,
    },
    textStyle: {
        color: Colors.primaryColor
    },
    forgotPassStyle: {
        color: Colors.primaryColor,
    },
    forgotPassView: {
        textAlign: 'right',
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: moderateVerticalScale(40)
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
})
export default Login;

