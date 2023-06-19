import { View, Text, StyleSheet, Image, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../../components/Loader';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        getAllOrders();

        return () => {
            unsubscribe();
        };
    }, []);

    const getAllOrders = async () => {
        // setIsLoading(false);
        setRefreshing(true);

        const isConnectedToInternet = await NetInfo.fetch().then(state => state.isConnected);
        if (!isConnectedToInternet) {
            setOrders([]);
            setRefreshing(false);
            // setIsLoading(false);
            return;
        }

        firestore()
            .collection('orders')
            .get()
            .then(querySnapshot => {
                console.log('Total orders: ', querySnapshot.size);
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log(
                        'User ID: ',
                        documentSnapshot.id,
                        documentSnapshot.data(),
                    );
                    tempData.push({
                        orderId: documentSnapshot.id,
                        data: documentSnapshot.data().data,
                    });
                });

                console.log("user all orders", JSON.stringify(tempData));
                setOrders(tempData);
                setRefreshing(false);
                // setIsLoading(false);
            })
            .catch(error => {
                console.log('Error getting orders: ', error);
                setRefreshing(false);
                // setIsLoading(false);
            });
    };

    const handleRefresh = () => {
        if (!refreshing) {
            getAllOrders();
        }
    };

    return (
        <View style={styles.container}>
            {/* <Loader isLoading={isLoading} /> */}
            <View style={styles.orderHeaderView}>
                <Text style={styles.headerText}>All Orders</Text>
            </View>
            {!isConnected ? (
                <View style={styles.networkStatus}>
                    <Text style={styles.networkStatusText}>Internet not connected</Text>
                </View>
            ) : null}
            {isConnected && (
                <View style={{ marginBottom: 135 }}>
                    <FlatList
                        data={orders}
                        keyExtractor={(item, index) => item.orderId}
                        renderItem={({ item }) => {
                            console.log('item data' + item.data);
                            return (
                                <View style={styles.orderItem}>
                                    <Text style={styles.nameText}>Order ID: {item.orderId}</Text>
                                    <Text style={styles.nameText}>{item.data.Name}</Text>
                                    <Text style={styles.nameText}>{item.data.orderDateTime}</Text>
                                    <FlatList
                                        data={item.data.items}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={styles.itemView}>
                                                    <Image
                                                        source={{ uri: item.data.imageUrl }}
                                                        style={styles.itemImage}
                                                    />
                                                    <View>
                                                        <Text style={styles.nameText}>{item.data.name}</Text>
                                                        <Text style={styles.nameText}>
                                                            {'Price: ' +
                                                                item.data.price +
                                                                ', Qty: ' +
                                                                item.data.quantity}
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                            );
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                    />
                </View>
            )}
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '500',
        color: 'black',
    },
    orderHeaderView: {
        height: 60,
        backgroundColor: '#fff',
        padding: 10,
        elevation: 3,
        justifyContent: 'center',
    },
    orderItem: {
        width: '90%',
        borderRadius: 10,
        elevation: 5,
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    itemView: {
        margin: 10,
        width: '100%',
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginLeft: 20,
        marginTop: 5,
    },
    networkStatus: {
        height: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    networkStatusText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
