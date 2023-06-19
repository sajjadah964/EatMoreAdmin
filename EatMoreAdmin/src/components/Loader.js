import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../styles/Colors';

const Loader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Modal transparent>
        <View style={styles.loaderStyle}>
          {/* <Text style={{ color: Colors.primaryColor, fontSize: 22,marginBottom:moderateVerticalScale(5) }}> Loading...</Text> */}
          <ActivityIndicator color={Colors.primaryColor} size={35} />
        </View>
      </Modal>
    );
  }
  return null;
};

export default Loader;

const styles = StyleSheet.create({
  loaderStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
});
