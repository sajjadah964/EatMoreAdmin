import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, PermissionsAndroid, ToastAndroid, Alert } from 'react-native'
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

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [points, setPoints] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [imageData, setImageData] = useState(null);
    const buttons = [
        {
            id: 1,
            title: 'All Items'
        },
        {
            id: 2,
            title: 'Burger'
        },
        {
            id: 3,
            title: 'Pizza'
        }
    ]
    const selectCategory = (index) => {
        // setSelectedIndex(index)
    }
    const getButtonStyle = (index) => {
        if (index === selectedIndex) {
            return styles.selectedButton;
        } else {
            return styles.unselectedButton;
        }
    };
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                openGallery();
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.didCancel) {
        } else {
            console.log(result);
            setImageData(result);
        }
    };

    const uploadItem = async (url) => {
        if (!name || !price || !points || !description || !imageData) {
            ToastAndroid.show('Please enter all data', ToastAndroid.SHORT);
            return;
        }
        setisLoading(true);
        let imageUploaded = false;
        if (imageData.assets[0] !== '') {
            try {
                const reference = storage().ref(imageData.assets[0].fileName);
                const pathToFile = imageData.assets[0].uri;
                // uploads file
                await reference.putFile(pathToFile);
                url = await storage()
                    .ref(imageData.assets[0].fileName)
                    .getDownloadURL();
                console.log(url);
                imageUploaded = true;
            } catch (error) {
                ToastAndroid.show('Image upload failed', ToastAndroid.SHORT);
                console.log(error);
            }
        }
        firestore()
            .collection('items')
            .add({
                name: name,
                price: price,
                points: points,
                description: description,
                category:
                    selectedIndex == 0 ? 'All Items' : selectedIndex == 1 ? 'Burger' : 'Pizza',
                imageUrl: imageUploaded ? url + '' : null,
            })
            .then(() => {
                setisLoading(false)
                ToastAndroid.show('Item Added', ToastAndroid.SHORT);
            })
            .catch((error) => {
                setisLoading(false)
                ToastAndroid.show('Item added failed', ToastAndroid.SHORT);
                console.log(error);
            });

        setName('');
        setPrice('');
        setPoints('');
        setDescription('');
        setSelectedIndex(0);
        // setImageData('');
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
                    headerTitle={'Add Items'}
                // headerImgStyle={styles.headerImgStyle}
                />
                <ScrollView style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.FormInputView}>

                        <TextInputWithLabel
                            // label={'Department'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Item Name"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={name}
                            onChangeText={txt => setName(txt)}

                        />
                        <TextInputWithLabel
                            // label={'Gender'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Item Price"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={price}
                            onChangeText={txt => setPrice(txt)}

                        />
                        <TextInputWithLabel
                            // label={'City'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={styles.inputStyle}
                            placeHolder="Item Points"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={points}
                            onChangeText={txt => setPoints(txt)}
                        />
                        <TextInputWithLabel
                            // label={'Address'}
                            labelTextStyle={styles.labelTextStyle}
                            inputStyle={{ ...styles.inputStyle, ...styles.descInputStyle }}
                            placeHolder="Enter Your Description"
                            inlineInputStyle={styles.inlineInputStyle}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            value={description}
                            onChangeText={txt => setDescription(txt)}
                        />
                        <View style={styles.categoryView}>
                            <Text style={styles.categorylabel}>Select Your Category</Text>
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
                        <View style={styles.addImageView}>
                            <Text style={styles.categorylabel}>Add Your Image</Text>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity style={styles.addImageStyle}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        requestCameraPermission();
                                    }}
                                >
                                    {/* <Image
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            source={imagePath.icAddImage}
                                        /> */}
                                    {imageData !== null ? (
                                        <Image
                                            source={{ uri: imageData.assets[0].uri }}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 10
                                            }}
                                        />
                                    ) :
                                        <Image
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            source={imagePath.icAddImage}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CustomPkgBtn
                            btnText={'Upload Item'}
                            textStyle={{ ...styles.textStyle }}
                            btnStyle={{ ...styles.btnStyle }}
                            onPress={() => uploadItem()}
                        />
                    </View>
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
    inputStyle: {
        borderBottomWidth: 0,
        width: '100%',
        height: moderateScale(45),
        backgroundColor: '#F8F8F8',
        borderRadius: moderateScale(8),
        marginBottom: moderateVerticalScale(20),
        textAlignVertical: 'top',
    },
    inlineInputStyle: {
        // paddingVertical: verticalScale(8),
        flex: 1,
        fontSize: scale(16),
        paddingHorizontal: moderateScale(15)
    },
    btnStyle: {
        width: '92%',
        height: moderateScale(48),
        backgroundColor: '#50379E',
        marginTop: moderateVerticalScale(22),
        marginBottom: moderateVerticalScale(90)
    },
    descInputStyle: {
        height: moderateVerticalScale(80),
    },
    categorylabel: {
        fontSize: scale(10),
        color: 'rgba(0, 0, 0, 0.65)',
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
    }
})
export default AddItem;