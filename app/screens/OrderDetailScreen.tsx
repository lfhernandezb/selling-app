import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '..';
import { getOrder } from '../services/order.service';
import { Order } from '../model/order.model';
import { RouteProp } from '@react-navigation/native';

type OrderDetailRouteProp = RouteProp<RootStackParamList, 'OrderDetail'>;
type OrderDetailNavigationProp = StackNavigationProp<RootStackParamList, 'OrderDetail'>;

interface Props {
  route: OrderDetailRouteProp;
  navigation: OrderDetailNavigationProp;
}

export default function OrderDetailScreen({ route, navigation }: Props) {
  const { orderId } = route.params;
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const order: Order = await getOrder(orderId);

      setOrder({ ...order });    

    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Items</Text>
      {order && (
        <>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.title}>Client: {order.client?.firstName} {order.client?.lastName}</Text>
          <FlatList
            data={order.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              /*onPress={() => navigation.navigate('OrderItemDetail', { orderitem: item })}*/
            >
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.cardText}>
                
                <Text style={styles.orderitemName}>Product: {item.title}</Text>
                <Text style={styles.price}>Quantity: {item.quantity}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <Text style={styles.price}>Discount {item.discountPercentage}%</Text>
                {/* <img className="profile-photo" src={item.thumbnail} alt={item.title}/> */}
              </View>
        
        
            </TouchableOpacity>
          )}
          />
        </>
      )}
    </View>
  );



  

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row',  // Align image and text horizontally
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardText: {
    flexDirection: 'column',  // Align image and text horizontally
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 15,
  },
  orderitemName: { fontSize: 14, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green' },
  footer: { padding: 10, alignItems: 'center' },
});
