import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

import { NavigationProp } from '@react-navigation/native';
import { getProducts } from '../services/product.service';
import { Product } from '../model/product.model';

type Props = {
  navigation: NavigationProp<any>;
};

export default function ProductsScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Items per page

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
      const newProducts = await getProducts(page, limit); //(response.data as { products: Product[] }).products;
      
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.card}>
              
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
              {/* <img className="profile-photo" src={item.thumbnail} alt={item.title}/> */}
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {loading ? <ActivityIndicator size="large" color="#007AFF" /> : <Button title="Load More" onPress={fetchProducts} />}
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
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 15,
  },
  productName: { fontSize: 14, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green' },
  footer: { padding: 10, alignItems: 'center' },
});
