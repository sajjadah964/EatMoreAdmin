import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
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
// import PropTypes from 'prop-types';
import { CommonActions } from '@react-navigation/native';

const Signup = ({navigateToLogin}) => {
      const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(false);
    const [isVisible, setVisible] = useState(true);
    const [CVisible, setCVisible] = useState(true);
    const [textWidth, setTextWidth] = useState(null);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const onTextLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width);
    };
    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    }
    const handleUserSignup = async () => {
        if (!email || !password || !name) {
            ToastAndroid.show('Please fill all the field', ToastAndroid.SHORT);
            return;
        }
        try {
            setisLoading(true);
            const result = await auth().createUserWithEmailAndPassword(email, password);
            firestore().collection('users').doc(result.user.uid).set({
                name: name,
                email: result.user.email,
                uid: result.user.uid,
                // pic:image
            })
            ToastAndroid.show('Signed up successfully', ToastAndroid.SHORT);
            // Navigate to the Login screen after successful signup
            navigation.replace(NavigationStrings.LOGIN);
              
            setisLoading(false);
        } catch (error) {
            console.log('error', error);
            ToastAndroid.show('Sign up failed', ToastAndroid.SHORT);
            if (error.code === 'auth/email-already-in-use') {
                // setEmailError('Email already in use');
                ToastAndroid.show('Email already in use', ToastAndroid.SHORT);

            }
            setisLoading(false);
        }
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    //   VALIDATION METHOD
    const validateEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        return nameRegex.test(name);
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        return password === confirmPassword;
    };
    //   VALIDATION METHOD

    // ON CHANGE TEXT METHOD
    const handleEmailChange = (text) => {
        setEmail(text);

        if (!validateEmail(text)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);

        if (!validatePassword(text)) {
            setPasswordError('Invalid password');
        } else {
            setPasswordError('');
        }
    };

    const handleNameChange = (text) => {
        setName(text);

        if (!validateName(text)) {
            setNameError('Invalid name');
        } else {
            setNameError('');
        }
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);

        if (!validateConfirmPassword(text)) {
            setConfirmPasswordError('Passwords do not match');
        }
        if (text !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };
    // ON CHANGE TEXT METHOD
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
                                btnText={'Sign Up'}
                            />
                        </View>
                        <TextInputWithLabel
                            placeHolder='Enter Name'
                            // onChangeText={(userName) => setName(userName)}
                            onChangeText={handleNameChange}
                            style={styles.placeholder}
                            value={name}
                        />
                        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
                        <TextInputWithLabel
                            placeHolder='Enter Email'
                            // onChangeText={(userEmail) => setEmail(userEmail)}
                            onChangeText={handleEmailChange}
                            style={styles.placeholder}
                            keyboardType="email-address"
                            value={email}
                        />
                        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                        <TextInputWithLabel
                            placeHolder={'Password'}
                            // onChangeText={(userPassword) => setPassword(userPassword)}
                            onChangeText={handlePasswordChange}
                            style={styles.placeholder}
                            secureTextEntry={isVisible}
                            rightIcon={isVisible ? imagePath.icHide : imagePath.icShow}
                            onPressRight={() => setVisible(!isVisible)}
                            value={password}
                        />

                        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
                        <TextInputWithLabel
                            placeHolder={'Confirm Password'}
                            // onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                            onChangeText={handleConfirmPasswordChange}
                            style={styles.placeholder}
                            secureTextEntry={CVisible}
                            rightIcon={CVisible ? imagePath.icHide : imagePath.icShow}
                            onPressRight={() => setCVisible(!CVisible)}
                            inputStyle={{ marginBottom: moderateVerticalScale(1) }}
                            value={confirmPassword}
                        />
                        {confirmPasswordError ? <Text style={[styles.error, { marginBottom: moderateVerticalScale(1) }]}>{confirmPasswordError}</Text> : null}

                        <CustomPkgBtn
                            textStyle={{ ...styles.textStyle, ...styles.customTextStyle }}
                            btnStyle={{ ...styles.btnStyle, ...styles.customStyle }}
                            btnText={'Sign Up'}
                            onPress={() => handleUserSignup()}
                        />
                        <TouchableOpacity
                            style={styles.loginSignview}
                            onPress={() => {
                                moveToScreen(NavigationStrings.LOGIN)
                            }}>
                            <Text style={styles.loginSignText} onLayout={onTextLayout}>
                                Already Account! Login here
                            </Text>
                            {textWidth ? <View style={[styles.line, { width: textWidth }]} /> : null}
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
// Signup.propTypes = {
//     navigateToLogin: PropTypes.func.isRequired,
//   };
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
        alignItems: 'center'
    },
    btnStyle: {
        width: moderateScale(130),
        height: moderateScale(36),
        justifyContent: 'center',
        backgroundColor: Colors.white,
        marginBottom: moderateVerticalScale(20),
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
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(10),
        backgroundColor: Colors.primaryColor
    },
    placeholder: {
        fontSize: 15,
        fontWeight: '400',
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
        height: moderateScale(1),
        backgroundColor: Colors.primaryColor,
    },
    error: {
        color: 'red',
    },
})
export default Signup;

