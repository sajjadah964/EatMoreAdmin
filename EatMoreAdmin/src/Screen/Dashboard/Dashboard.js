import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native';

import imagePath from '../../constants/imagePath';
import ManageItem from '../../tabs/ManageItem/ManageItem';
import AddItem from '../../tabs/AddItem/AddItem';
import Orders from '../../tabs/Orders/Orders';
const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Orders />
      ) : selectedTab == 1 ? (
        <AddItem />
      ) : (
        <ManageItem />
      )}
      <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.bottomTabView}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(0);
            }}>
            <Image
              source={
                selectedTab == 0
                  ? (imagePath.icPurchaseOrderFill)
                  : (imagePath.icPurchaseOrder)
              }
              style={styles.bottomIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(1);
            }}>
            <Image
              source={
                selectedTab == 1
                  ? (imagePath.icAddItemFill)
                  : (imagePath.icAddItem)
              }
              style={styles.bottomIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(2);
            }}>
            <Image
              source={
                selectedTab == 2
                  ? (imagePath.icShowItemFill)
                  : (imagePath.icShowItem)
              }
              style={styles.bottomIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
  },
  bottomTabView: {
    flexDirection: 'row',
    height: 60,
    width: '80%',
    backgroundColor: '#F2EFEF',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.4 }],
    borderRadius: 30,
    marginBottom: 20
  },

  bottomTab: {
    width: '20%',
    // height: '100%',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 25,
    height: 25,
  },
});
export default Dashboard;

