import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { Order } from '../model/order.model';
import { getOrders, getOrdersByClientId } from '../services/order.service';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '..';

type OrdersRouteProp = RouteProp<RootStackParamList, 'Orders'>;
type OrdersNavigationProp = StackNavigationProp<RootStackParamList, 'Orders'>;

interface Props {
  route: OrdersRouteProp;
  navigation: OrdersNavigationProp;
}

export default function OrdersScreen({ route, navigation }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Items per page
  const client = route.params?.client;
  let newOrders : Order[] = [];

  console.log("client: ", client);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (loading) return;
    setLoading(true);

    try {

      if (client) {
        // const response = await axios.get(`https://dummyjson.com/carts/user/${clientId}?limit=${limit}&skip=${(page - 1) * limit}`);
        newOrders =  await getOrdersByClientId(page, limit, client.id); //(response.data as { orders: Order[] }).orders;
      } else {
        // const response = await axios.get(`https://dummyjson.com/carts?limit=${limit}&skip=${(page - 1) * limit}`);
        newOrders =  await getOrders(page, limit); //(response.data as { orders: Order[] }).orders;
      }

      console.log("newOrders: ", newOrders);
      
      setOrders((prevOrders) => [...prevOrders, ...newOrders]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      {/* if clientId is not undefined, I display the name of the client */}
      {client && 
        <Text style={styles.title}>Cliente: {client.firstName} {client.lastName}</Text>
      }
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
          >
            {/*<Image source={{ uri: item.thumbnail }} style={styles.thumbnail} /> */}
            <View style={styles.cardText}>
              
              <Text style={styles.orderName}>Pedido #{item.id}</Text>
              <Text style={styles.orderName}>${item.total}</Text>
              {/* <img className="profile-photo" src={item.thumbnail} alt={item.title}/> */}
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {loading ? <ActivityIndicator size="large" color="#007AFF" /> : <Button title="Load More" onPress={fetchOrders} />}
          </View>
        )}
      />
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
  orderName: { fontSize: 14, fontWeight: 'bold' },
  phone: { fontSize: 14, color: 'green' },
  footer: { padding: 10, alignItems: 'center' },
});

