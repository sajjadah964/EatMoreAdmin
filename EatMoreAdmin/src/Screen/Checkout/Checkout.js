import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, Modal, Button, TouchableOpacity } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import Colors from '../../styles/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import TextInputWithLabel from '../../components/TextinputWithLable'
import imagePath from '../../constants/imagePath'
import CustomPkgBtn from '../../components/CustomPkgBtn';
import CustomModal from '../../constants/CustomModal';
import { useNavigation } from '@react-navigation/native';
import NavigationStrings from '../../constants/NavigationStrings';
import Loader from '../../components/Loader';
import { RadioButton } from 'react-native-paper';
const Checkout = () => {
    const navigation = useNavigation();
    const [ModalVisible, setModalVisible] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const toggleModal = () => {
        setModalVisible(!ModalVisible);
    };
    const onClose = () => {
        setModalVisible(false);
    }
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
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [textSelected, setTextSelected] = useState(false);

    const selectPaymentMethod = (method) => {
        setPaymentMethod(method);
        //   setTextSelected(false);
    };

    const paymentMethods = [
        { name: 'Cash On delivery', description: 'Pay in Cash when your order arrives' },
        { name: 'EasyPaisa Online', description: 'Pay in Cash when your order arrives' },
        { name: 'JazzCash Online', description: 'Pay in Cash when your order arrives' },
        { name: 'Borrow', description: 'Pay in Cash when your order arrives' },
    ];

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <CustomHeader
                        leftImg={imagePath.icBack}
                        headerTitle={'Checkout'}
                        headerImgStyle={styles.headerImgStyle}
                    />
                    <View style={styles.mainContentView}>
                        <View>
                            <TextInputWithLabel
                                label={'Delivery Address'}
                                inputStyle={styles.inputStyle}
                                placeHolder="Enter Address"
                                inlineInputStyle={styles.inlineInputStyle}
                                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                            />
                            <TextInputWithLabel
                                label={'Phone Number'}
                                // inputStyle={[styles.inputStyle, {height: verticalScale(45)}]}
                                inputStyle={{ ...styles.inputStyle, height: moderateScale(45) }}
                                placeHolder="Enter Number"
                                inlineInputStyle={styles.inlineInputStyle}
                                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                keyboardType="numeric"
                            />
                            <TouchableOpacity style={styles.paymentMethodView} activeOpacity={0.8} onPress={() => toggleModal()}>
                                <Text style={styles.paymentMethodText}>Payment Method</Text>
                                <Image
                                    source={imagePath.icPaymentArrow}
                                />
                            </TouchableOpacity>
                            {/* 
            <Modal
                visible={ModalVisible}
                animationType="fade"
                style={styles.modal}
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Payment Method</Text>
                        <CustomPkgBtn
                            textStyle={{ ...styles.textStyle, ...styles.customTextStyle }}
                            btnStyle={{ ...styles.btnStyle, ...styles.customStyle }}
                            btnText={'Done'}
                            onPress={toggleModal}
                        />
                    </View>
                </View>
            </Modal> */}
                            <CustomModal
                                visible={ModalVisible}
                                title="Payment Method"
                                buttonText="Done"
                                onButtonPress={toggleModal}
                                onRequestClose={onClose}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            backgroundColor: 'white',
                                            padding: 20,
                                            // borderRadius: 10,
                                            // shadowColor: '#000',
                                            // shadowOffset: { width: 0, height: 2 },
                                            // shadowOpacity: 0.25,
                                            // shadowRadius: 4,
                                            // elevation: 5,

                                        }}
                                    >
                                        {paymentMethods.map((method, index) => (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(15), }} key={index}>
                                                <TouchableOpacity onPress={() => selectPaymentMethod(method.name)}
                                                >
                                                    <View
                                                        style={{
                                                            height: moderateScale(30),
                                                            width: moderateScale(30),
                                                            borderRadius: moderateScale(30 / 2),
                                                            borderWidth: 2,
                                                            borderColor: paymentMethod === method.name ? Colors.primaryColor : Colors.primaryColor,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginRight: moderateScale(20),
                                                            backgroundColor: paymentMethod === method.name ? 'white' : 'transparent',
                                                        }}
                                                    >
                                                        {paymentMethod === method.name && (
                                                            <View
                                                                style={{
                                                                    height: moderateScale(15),
                                                                    width: moderateScale(15),
                                                                    borderRadius: moderateScale(15 / 2),
                                                                    backgroundColor: Colors.primaryColor,
                                                                }}
                                                            />
                                                        )}
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.paymentTextView,
                                                    { backgroundColor: paymentMethod === method.name ? 'white' : 'transparent', }]}
                                                    activeOpacity={0.8}
                                                >
                                                    <Text style={styles.paymentViewName}>{method.name}</Text>
                                                    <Text style={styles.paymentViewDesc}>{method.description}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </CustomModal>

                            <View style={styles.orderSummaryView}>
                                <Text style={styles.orderSummaryLabel}> Order Summary</Text>
                                <View style={styles.orderSummaryContent}>
                                    <View style={styles.singleContent}>
                                        <Text style={styles.singleContentText}>1x Chicken Burger</Text>
                                        <Text style={styles.singleContentText}>300</Text>
                                    </View>
                                    <View style={[styles.singleContent, { marginBottom: moderateVerticalScale(15) }]}>
                                        <Text style={styles.singleContentText}>Delivery Fee</Text>
                                        <Text style={styles.singleContentText}>50</Text>
                                    </View>
                                    <View style={styles.singleContent}>
                                        <Text style={styles.singleContentText}>Total</Text>
                                        <Text style={styles.singleContentText}>350</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View>
                            <CustomPkgBtn
                                btnText={'Place Order'}
                                textStyle={{ ...styles.textStyle }}
                                btnStyle={{ ...styles.btnStyle }}
                                onPress={() => moveToScreen(NavigationStrings.ORDER_INFORMATION)}
                            />
                        </View>
                    </View>
                </View>

            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(26),
        backgroundColor: '#FEFEFE'
    },
    mainContentView :{
        display:'flex',
        flex:1,
        justifyContent:'space-evenly',
        // backgroundColor:'red'
    },
    headerImgStyle: {
        tintColor: Colors.black
    },
    inputStyle: {
        borderBottomWidth: 0,
        width: '100%',
        height: moderateScale(60),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        marginBottom: moderateVerticalScale(15),
    },
    inlineInputStyle: {
        paddingHorizontal: moderateScale(16),
        fontSize: scale(16),
        color: 'rgba(0, 0, 0, 0.5)'
    },
    paymentMethodView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: moderateScale(60),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateVerticalScale(30),
    },
    paymentMethodText: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: scale(16),
    },
    orderSummaryView: {
        marginBottom: moderateVerticalScale(23),
    },
    orderSummaryContent: {
        width: moderateScale(300),
        height: moderateScale(120),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateVerticalScale(16),
        justifyContent: 'center',
    },
    singleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    singleContentText: {
        fontSize: scale(15),
        fontWeight: '600',
        color: Colors.black
    },
    orderSummaryLabel: {
        fontSize: scale(16),
        fontWeight: '600',
        marginBottom: moderateVerticalScale(16),
        color: Colors.black
    },
    btnStyle: {
        width: moderateScale(200),
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(26),
    },

    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    radioUnselected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    paymentTextView: {
        width: moderateScale(200),
        height: moderateScale(40),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        padding: moderateScale(6)
    },
    paymentViewName: {
        fontWeight: '600',
        fontSize: scale(10),
        color: Colors.primaryColor,
        marginBottom: moderateVerticalScale(1)
    },
    paymentViewDesc: {
        fontWeight: '600',
        fontSize: scale(6),
        color: Colors.primaryColor,
    }
});

export default Checkout;
