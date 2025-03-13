import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import ReactImageGallery from 'react-image-gallery';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  route: ProductDetailRouteProp;
  navigation: ProductDetailNavigationProp;
}

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { product } = route.params;

    return (
      <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardText}>
            
            {product.stock > 0 ? (
              <Text style={styles.phone}>Disponibilidad: En stock</Text>
            ) : (
              <Text style={styles.phone}>Availability: Agotado</Text>
            )}
            <Text style={styles.phone}>Marca: {product.brand}</Text>
            <Text style={styles.phone}>Categoría: {product.category}</Text>
            <Text style={styles.phone}>SKU: {product.sku}</Text>
            <Text style={styles.phone}>Precio: {product.price}</Text>
            <Text style={styles.phone}>{product.description}</Text>
      </View>
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
    width: 200,
    height: 200,
    borderRadius: 5,
    marginRight: 15,
  },
  clientName: { fontSize: 14, fontWeight: 'bold' },
  phone: { fontSize: 14, color: 'green' },
  footer: { padding: 10, alignItems: 'center' },
});

