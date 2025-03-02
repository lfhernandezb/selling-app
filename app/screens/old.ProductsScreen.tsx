import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Product = {
  id: string;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: '1', name: 'Laptop', price: 1200 },
  { id: '2', name: 'Smartphone', price: 800 },
];

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>Price: ${item.price}</Text>
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
