import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import imagePath from '../../constants/imagePath';
import { useNavigation } from '@react-navigation/native';
import { scale, moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import NavigationStrings from '../../constants/NavigationStrings';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import Colors from '../../styles/Colors';
import fontFamily from '../../styles/fontFamily';

const SplashScreen = () => {
    const navigation = useNavigation();
    const moveToScreen = (screen) => {
        navigation.navigate(screen);
    }
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor='#009387' barStyle="light-content" /> */}
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={imagePath.bgLogo}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: Colors.white
                }]}
                animation="fadeInUpBig"
                duration={1000}
                // delay={50}
            >
                <Text style={[styles.title, {
                    color: Colors.black
                }]}>Enjoy Your Food!</Text>
                <Text style={styles.text}>Sign in with your account</Text>
                <View style={styles.button}>
                    <CustomPkgBtn
                        onPress={() => { moveToScreen(NavigationStrings.LOGIN) }}
                        textStyle={{ ...styles.textStyle }}
                        btnStyle={{ ...styles.btnStyle }}
                        btnText={'Get Started'}
                    />
                </View>
            </Animatable.View>
        </View>
    )
}

export default SplashScreen;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        paddingVertical: moderateVerticalScale(50),
        paddingHorizontal: moderateScale(30)
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: scale(30),
        fontWeight: 'bold'
    },
    text: {
        fontSize: scale(16),
        color: Colors.primaryColor,
        marginTop: moderateVerticalScale(5),
        fontWeight: '600'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: moderateVerticalScale(50)
    },
    btnStyle: {
        width: moderateScale(200),
        height: moderateScale(53),
        backgroundColor: Colors.primaryColor,
        borderRadius: moderateScale(42),
        justifyContent: 'center',
        borderColor: Colors.white,
        borderWidth: 2,
    },
    textStyle: {
        fontWeight:'400',
        fontSize: scale(22),
        color: Colors.white,
        fontStyle: 'normal',
    },
})