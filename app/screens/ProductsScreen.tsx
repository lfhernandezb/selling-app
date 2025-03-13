import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

import { NavigationProp } from '@react-navigation/native';
import { getProductCategories, getProducts, getProductsByCategory } from '../services/product.service';
import { Product } from '../model/product.model';

type Props = {
  navigation: NavigationProp<any>;
};

export default function ProductsScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Items per page
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>("option1");

  const handleChange = (itemValue: string | null) => {
    console.log("itemValue: ", itemValue);
    if (itemValue === null) return;
    setSelectedValue(itemValue);
    Alert.alert("Selection Changed", `You selected: ${itemValue}`);
    console.log("page before: ", page);
    setPage((prevPage) => 1);
    // movido a useEffect
    // setProducts([]);
    // fetchProducts(1, itemValue);
  };

  useEffect(() => {
    fetchProducts();
    fetchProductCategories();
  }, []);

  useEffect(() => {
    // This effect will run after categories have been updated
    if (categories.length > 0) {
      console.log('Categories have been updated:', categories);
      // Perform any actions that need to happen after categories are updated
      setItems(categories.map((category) => ({ label: category, value: category })));
    }
  }, [categories]);

  useEffect(() => {
    // This effect will run after page have been updated
    if (page > 0) {
      console.log('Page have been updated:', page);
      // Perform any actions that need to happen after categories are updated
      if (page === 1) {
        setProducts([]);
        fetchProducts();
      } 
     }
  }, [page]);

  const fetchProducts = async () => {
    console.log("fetchProducts: ", selectedValue);
    let newProducts: Product[] = [];

    if (loading) return;

    setLoading(true);

    console.log("page: ", page);

    try {
      if (selectedValue && selectedValue !== 'Todas' && selectedValue !== 'option1') {
          newProducts = await getProductsByCategory(page, limit, selectedValue);
      } else {
          newProducts = await getProducts(page, limit);
      }

      console.log("newProducts: ", newProducts);

      // const newProducts = await getProducts(page, limit); //(response.data as { products: Product[] }).products;

      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setLoading(false);
  };

  const fetchProductCategories = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const categories: string[] = await getProductCategories();
      
      setCategories(['Todas', ...categories]);
      
      // movido a useEffect
      // setItems(categories.map((category) => ({ label: category, value: category })));

    } catch (error) {
      console.error("Error fetching product categories:", error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Seleccione una categoría'
        onChangeValue={handleChange}
      />
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
            {loading ? <ActivityIndicator size="large" color="#007AFF" /> : <Button title="Load More" onPress={() => fetchProducts()} />}
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
