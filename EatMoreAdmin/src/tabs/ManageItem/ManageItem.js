import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, PermissionsAndroid, ToastAndroid, Alert, FlatList } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../../styles/Colors';
import TextInputWithLabel from '../../components/TextinputWithLable';
import fontFamily from '../../styles/fontFamily';
import CustomPkgBtn from '../../components/CustomPkgBtn';
import CustomModal from '../../constants/CustomModal';
import imagePath from '../../constants/imagePath';
import Loader from '../../components/Loader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
const AddItem = () => {
    const [isLoading, setisLoading] = useState(false);
    const [items, setItems] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0);
    const buttons = [
        {
            // id: 1,
            title: 'All Items'
        },
        {
            // id: 2,
            title: 'Burger'
        },
        {
            // id: 3,
            title: 'Pizza'
        }
    ]
    const selectCategory = (index) => {
        setSelectedIndex(index)
        console.log(index, 'value of index');
        // getData();
    }
    const getButtonStyle = (index) => {
        if (index === selectedIndex) {
            return styles.selectedButton;
        } else {
            return styles.unselectedButton;
        }
    };

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        firestore()
            .collection('items')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({
                        id: documentSnapshot.id,
                        data: documentSnapshot.data(),
                    })
                });
                setItems(tempData);
            });
    }
    // const deleteData =(Uid)=>{
    //     firestore()
    //     .collection('items')
    //     .doc(Uid)
    //     .delete()
    //     .then(() => {
    //       console.log('User deleted!');
    //       getData();
    //     });
    // }
    const deleteData = async (uid, imageUrl) => {
        try {
          // Delete item document from Firestore
          await firestore().collection('items').doc(uid).delete();
          console.log('Item deleted from Firestore!');
      
          if (imageUrl) {
            // Delete image file from Firebase Storage
            await storage().refFromURL(imageUrl).delete();
            console.log('Image deleted from Storage!');
          }
      
          // Update item list
          getData();
        } catch (error) {
          console.error(error);
          ToastAndroid.show('Deletion failed!', ToastAndroid.SHORT);
        }
      };
      
      
    // LOADING CODE
    // useEffect(() => {
    //     setTimeout(() => {
    //         setisLoading(false);
    //     }, 1000);
    // }),
    //     [];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader isLoading={isLoading} />
            <View style={styles.container}>
                <CustomHeader
                    // leftImg={imagePath.icBack}
                    headerTitle={'Manage Items'}
                // headerImgStyle={styles.headerImgStyle}
                />
                <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.categoryView}>
                        <Text style={styles.categorylabel}>Categories</Text>
                        <View style={styles.categoryBtnView}>
                            {buttons.map((button, index) => {
                                return (
                                    <CustomPkgBtn
                                        key={index}
                                        btnText={button.title}
                                        textStyle={{ ...styles.textStyle, ...styles.categoryTextStyle, color: selectedIndex == index ? '#FFF' : '#A8A7A7' }}
                                        btnStyle={{ ...styles.btnStyle, ...getButtonStyle(index) }}
                                        onPress={() => selectCategory(index)}
                                    />
                                )
                            })

                            }
                        </View>
                    </View>
                    {/* {selectedIndex === 0 ? */}
                    <FlatList
                        data={items}
                        keyExtractor={(index, key) => index.toString()}
                        renderItem={({ item, index }) => {
                            console.log(item, 'this is add items');
                            return (
                                <View style={styles.itemView}>
                                    <View style={{ flex: 1 }}>
                                        <Image
                                            resizeMode='cover'
                                            source={{ uri: item.data.imageUrl }}
                                            style={{ width: 80, height: 80 }}
                                        />
                                    </View>
                                    <View style={styles.nameView}>
                                        <Text style={[styles.itemStyle, { color: '#000' }]}>{item.data.name}</Text>
                                        <Text style={[styles.itemStyle, {}]}>Rs.{item.data.price}</Text>
                                        <Text style={[styles.itemStyle, {}]}>Points: {item.data.points}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.deleteIconView}
                                        onPress={()=>deleteData(item.id,item.data.imageUrl)}
                                        >
                                            <Image
                                                source={imagePath.icCloseIcon}
                                                style={{ width: 25, height: 25 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />
                    {/* : <Text>the list is not show</Text> */}


                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(26),
        backgroundColor: '#FFf'
        // backgroundColor: 'red'
    },
    labelTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
    headerImgStyle: {
        tintColor: Colors.black
    },
    descInputStyle: {
        height: moderateVerticalScale(80),
    },
    categorylabel: {
        fontSize: scale(24),
        color: '#000',
        marginBottom: moderateVerticalScale(14)
    },
    categoryBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // categoryBtnStyle: {
    //     height: moderateVerticalScale(37),
    //     width: moderateScale(95),
    //     marginTop: moderateVerticalScale(1),
    //     borderRadius: moderateScale(11),
    //     backgroundColor: '#F2EFEF'
    // },
    categoryTextStyle: {
        fontSize: scale(13),
        color: '#A8A7A7',
    },
    selectedButton: {
        backgroundColor: '#7E58F4',
        height: moderateVerticalScale(37),
        width: moderateScale(95),
        borderRadius: moderateScale(11),
        marginTop: moderateVerticalScale(1),
        color: '#FFFFFF', // add this line
        marginBottom: moderateVerticalScale(25)
    },
    unselectedButton: {
        marginTop: moderateVerticalScale(1),
        backgroundColor: '#F2EFEF',
        height: moderateVerticalScale(37),
        width: moderateScale(95),
        borderRadius: moderateScale(11),
        marginTop: moderateVerticalScale(1),
        marginBottom: moderateVerticalScale(25)
    },
    addImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EFEF',
        width: moderateScale(117),
        height: moderateVerticalScale(117),
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        elevation: 4,
        height: 107,
        backgroundColor: '#EFEDED',
        marginBottom: 15,
        borderRadius: 15,
        paddingHorizontal: 20,
    },
    nameView: {
        flex: 1.5
    },
    itemStyle: {
        fontSize: scale(16),
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.5)'
    },
    deleteIconView: {
        position: 'absolute',
        right: -4,
        bottom:14,
    }
})
export default AddItem;