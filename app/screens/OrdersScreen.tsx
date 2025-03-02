import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Order = {
  id: string;
  clientName: string;
  productName: string;
  quantity: number;
};

const orders: Order[] = [
  { id: '1', clientName: 'John Doe', productName: 'Smartphone', quantity: 1 },
  { id: '2', clientName: 'Jane Smith', productName: 'Laptop', quantity: 2 },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Client: {item.clientName}</Text>
            <Text>Product: {item.productName}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, backgroundColor: '#f5f5f5', marginBottom: 10, borderRadius: 5 },
});
