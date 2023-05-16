import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import Colors from '../../styles/Colors';
import AllOrderData from './AllOrderData';
import Loader from '../../components/Loader';

const AllOrder = () => {
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    }, []);
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.listMainView}>
                <View style={styles.headingFlexView}>
                    <Text style={styles.CountTitle}>{item.title}.</Text>
                    <Image
                        source={imagePath.icDeleteCart}
                    />
                </View>
                <View style={styles.listViewContent}>
                    <View style={styles.titleView}>
                        <Text style={styles.singleTitle}>{item.personName}</Text>
                        <Text style={styles.singleTitle}>{item.Department}</Text>
                        <Text style={styles.singleMiniTitle}>{item.itemName}</Text>
                        <Text style={styles.singleMiniTitle}>{item.deliveryTitle}</Text>
                        <Text style={styles.singleMiniTitle}>{item.totalHeading}</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.singleMiniTitle}>{item.itemPrice}</Text>
                        <Text style={styles.singleMiniTitle}>{item.deliveryFee}</Text>
                        <Text style={styles.singleMiniTitle}>{item.totalPrice}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? <Loader isLoading={isLoading} /> :
                <View style={styles.container}>
                    <Text style={styles.mainTitle}>AllOrder</Text>
                    <View style={styles.middleContent}>
                        <FlatList
                            data={AllOrderData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View
                                style={{
                                    marginBottom: moderateVerticalScale(25),
                                }}
                            />}
                            contentContainerStyle={{ alignItems: 'center', }} // add this line
                        />
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
        backgroundColor: '#FEFEFE',
        paddingVertical: moderateVerticalScale(20),
    },
    mainTitle: {
        fontSize: scale(20),
        fontWeight: '600',
        color: Colors.black,
        marginBottom: moderateVerticalScale(15)
    },
    middleContent: {
        // backgroundColor: 'yellow',
    },
    CountTitle: {
        fontSize: scale(20),
        color: Colors.black,
        fontWeight: '600',
    },
    headingFlexView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listMainView: {
        // width: 300,
        // height: 190,
        // flex:1
    },
    listViewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateVerticalScale(14),
    },
    singleTitle: {
        color: Colors.primaryColor,
        fontSize: scale(18),
        fontWeight: '500',
    },
    singleMiniTitle: {
        color: Colors.primaryColor,
        fontSize: scale(15),
        fontWeight: '600'
    },
    titleView: {

    },
    priceView: {
        alignSelf: 'flex-end',
    }
})
export default AllOrder;
