import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../../styles/Colors';
import TextInputWithLabel from '../../components/TextinputWithLable';
import fontFamily from '../../styles/fontFamily';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import CustomModal from '../../constants/CustomModal';
import imagePath from '../../constants/imagePath';
import Loader from '../../components/Loader';

const OrderInformation = () => {
    const [ModalVisible, setModalVisible] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const toggleModal = () => {
        setModalVisible(!ModalVisible);
    };
    const onClose = () => {
        setModalVisible(false);
    }
    // LOADING CODE
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }),
        [];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <CustomHeader
                        leftImg={imagePath.icBack}
                        headerTitle={'Information'}
                        headerImgStyle={styles.headerImgStyle}
                    />
                    <View style={styles.FormInputView}>
                        <Text style={styles.informationTitle}>Basic Information</Text>
                        <TextInputWithLabel
                            label={'Department'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Department"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                        />
                        <TextInputWithLabel
                            label={'Gender'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Gender"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                        />
                    </View>
                    <View style={styles.FormInputView}>
                        <Text style={styles.informationTitle}>Address Information</Text>
                        <TextInputWithLabel
                            label={'City'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="City"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                        />
                        <TextInputWithLabel
                            label={'Address'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Home Address"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                        />
                    </View>

                    <CustomPkgBtn
                        btnText={'Submit'}
                        textStyle={{ ...styles.textStyle }}
                        btnStyle={{ ...styles.btnStyle }}
                        onPress={() => toggleModal()}
                    // onPress={() => alert("you alert")}
                    />

                    {/* <CustomModal
                        visible={ModalVisible}
                        title="Place Order"
                        buttonText="Done"
                        onButtonPress={toggleModal}
                        onRequestClose={onClose}
                    >
                        <Text>Your Order Will Delivered Soon.</Text>
                    </CustomModal> */}
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
    labelTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
    headerImgStyle: {
        tintColor: Colors.black
    },
    informationTitle: {
        fontSize: scale(16),
        fontWeight: '600',
        color: Colors.black,
        marginBottom: moderateVerticalScale(20),
        // fontFamily:fontFamily.italic
    },
    // FormInputView :{
    //     marginBottom:verticalScale(0)
    // },
    inputStyle: {
        borderBottomWidth: 0,
        width: '100%',
        height: moderateScale(45),
        backgroundColor: '#EFEDED',
        borderRadius: moderateScale(8),
        marginBottom: moderateVerticalScale(15),
    },
    inlineInputStyle: {
        // paddingVertical: verticalScale(8),
        flex: 1,
        fontSize: scale(16),
        paddingHorizontal: moderateScale(15)
    },
    btnStyle: {
        width: moderateScale(200),
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(36),
    },
})

export default OrderInformation;

