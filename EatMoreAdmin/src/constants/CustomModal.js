import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import CustomPkgBtn from '../components/CustomPkgBtn';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Colors from '../styles/Colors';

const CustomModal = ({
    visible,
    title,
    buttonText,
    onButtonPress,
    onRequestClose,
    modalContainer,
    children
}) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onRequestClose}
        >
            <TouchableOpacity activeOpacity={0.9} style={{ ...styles.modalContainer, ...modalContainer }} onPress={() => onRequestClose()}>
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    {children}
                    <CustomPkgBtn
                        textStyle={{ ...styles.customTextStyle }}
                        btnStyle={{ ...styles.customStyle }}
                        btnText={buttonText}
                        onPress={onButtonPress}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = {
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: moderateScale(300),
        height: moderateScale(400),
        borderRadius: moderateScale(37),
        backgroundColor: Colors.white,
        padding: moderateScale(20),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: scale(24),
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.black
    },
    modalDoneBtn: {

    },
    customTextStyle: {
        color: Colors.white,
        fontSize: scale(16),
    },
    customStyle: {
        height: moderateScale(45),
        width: moderateScale(200),
        backgroundColor: Colors.primaryColor
    }
};

export default CustomModal;
