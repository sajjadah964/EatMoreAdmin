import React, { useState ,useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import * as Animatable from 'react-native-animatable';
import imagePath from '../../constants/imagePath';
import Colors from '../../styles/Colors';
import CustomPkgBtn from '../../components/CustomPkgBtn';
// import CustomHeader from '../../components/CustomHeader';
import { scale, moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import NavigationStrings from '../../constants/NavigationStrings';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';

const ItemsDetails = (props) => {
    // console.log(props.route.params.detail);
    // console.log(props.index)
    // const{navigation}={props
    const [isLoading, setisLoading] = useState(true);
    const navigation = useNavigation()
    const { itemName, itemPrice, itemUrl } = props.route.params.detail;
    const { index } = props.route.params.index;
    const [count, setCount] = useState(0);

    const moveToScreen = (screen) => {
        navigation.navigate(screen)
    }
    // LOADING CODE
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }),
        [];
    const counter = (type) => {
        if (type == "increment") {
            setCount(count + 1)
        } else if (type == "decrement" && count > 0) {
            setCount(count - 1)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    {/* <StatusBar backgroundColor='#009387' barStyle="light-content" /> */}
                    <View style={{ paddingHorizontal: moderateScale(26) }}>
                        <CustomHeader
                            leftImg={imagePath.icBack}
                        />
                    </View>
                    <View style={styles.header}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <Animatable.Image
                                animation="bounceIn"
                                duraton="1500"
                                source={itemUrl}
                                style={styles.logo}
                                resizeMode="stretch"
                            />
                        </View>
                    </View>
                    <Animatable.View
                        style={[styles.footer, {
                            backgroundColor: Colors.white
                        }]}
                        animation="fadeInUpBig"
                    >
                        <Text style={[styles.itemNameStyle, {
                            color: Colors.black
                        }]}>{itemName}</Text>
                        <Text style={styles.itemPriceStyle}>Rs.{itemPrice}</Text>
                        <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum   has been the industry's standard dummy text ever since the 1500s
                        </Text>
                        <View style={styles.button}>
                            <View style={styles.CounterView}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => counter('decrement')}
                                >
                                    <Image
                                        source={imagePath.icMinus}
                                    />
                                </TouchableOpacity>
                                <Text style={{
                                    marginHorizontal: moderateScale(10),
                                    fontSize: scale(20),
                                    fontWeight: '400',
                                }}>{count}</Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => counter('increment')}
                                >
                                    <Image
                                        source={imagePath.icPLus}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <CustomPkgBtn
                                    onPress={() => { moveToScreen(NavigationStrings.CART_STACK) }}
                                    textStyle={{ ...styles.textStyle }}
                                    btnStyle={{ ...styles.btnStyle }}
                                    btnText={'Add to Cart'}
                                />
                            </View>
                        </View>
                    </Animatable.View>
                </View>
            }
        </SafeAreaView>
    )
}

export default ItemsDetails;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.26;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
    },
    header: {
        flex: 1.5,
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
        height: height_logo,
    },
    itemNameStyle: {
        color: '#000',
        fontSize: scale(24),
        fontWeight: '500'
    },
    itemPriceStyle: {
        color: Colors.primaryColor,
        marginTop: moderateVerticalScale(5),
        fontWeight: '600',
        fontSize: scale(20)
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateVerticalScale(40),
        // alignItems: 'center',
        // backgroundColor: 'red'
    },
    CounterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnStyle: {
        // flex:1,
        width: moderateScale(150),
        height: moderateScale(45),
        backgroundColor: Colors.primaryColor,
        borderRadius: moderateScale(42),
        borderColor: Colors.primaryColor,
        borderWidth: moderateScale(1),
        backgroundColor: Colors.white,
        // marginTop: moderateVerticalScale(20)
    },
    textStyle: {
        fontWeight: 400,
        fontSize: 16,
        color: Colors.primaryColor,
        fontStyle: 'normal',
    },
    description: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '500'
    },
})