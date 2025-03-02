import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import Product from './ProductsScreen'
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

  /*
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>
        This is a detailed description of the product "{product.name}". It has amazing features!
      </Text>
    
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
  */
 
    return (
        <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        <div className="container mx-auto px-4">
           <ReactImageGallery
            showBullets={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={product.images.map((image) => ({
              original: product.thumbnail,
            //   thumbnail: product.thumbnail,
            }))}
          />
  
          {/* /image gallery  */}
        </div>
        {/* description  */}
  
        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
            {product.title}
          </h2>
          <div className="mt-1">
            <div className="flex items-center">
              <div style={{ fontSize: "20px" }}>
                <Rater
                  total={5}
                  interactive={false}
                  rating={3.5}
                />
              </div>
  
{/*               <p className="ml-3 text-sm text-gray-400">
                ({product.reviews})
              </p> */}
            </div>
          </div>
          <p className="mt-5 font-bold">
            Availability:{" "}
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock </span>
            ) : (
              <span className="text-red-600">Expired</span>
            )}
          </p>
          <p className="font-bold">
            Brand: <span className="font-normal">{product.brand}</span>
          </p>
          <p className="font-bold">
            Cathegory:{" "}
            <span className="font-normal">{product.category}</span>
          </p>
          <p className="font-bold">
            SKU: <span className="font-normal">{product.sku}</span>
          </p>
          <p className="mt-4 text-4xl font-bold text-violet-900">
            ${product.price}{" "}
{/*             <span className="text-xs text-gray-400 line-through">
              ${product.previousPrice}
            </span>
 */}          </p>
          <p className="pt-5 text-sm leading-5 text-gray-500">
            {product.description}
          </p>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Size</p>
{/*             <div className="flex gap-1">
              {product.size.map((x, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                  >
                    {x}
                  </div>
                );
              })}
            </div>
 */}          </div>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Color</p>
{/*             <div className="flex gap-1">
              {product.color.map((x, index) => {
                return (
                  <div
                    key={index}
                    className={`h-8 w-8 cursor-pointer border border-white bg-${x}-600 focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                  />
                );
              })}
            </div>
 */}          </div>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Quantity</p>
            <div className="flex">
              <button className="flex h-8 w-8 items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">−</button>
              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                1
              </div>
              <button className="flex h-8 w-8 items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"> +</button>
            </div>
          </div>
          <div className="mt-7 flex flex-row items-center gap-6">
            <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
              <BiShoppingBag className="mx-2" />
              Add to cart
            </button>
            <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
              <AiOutlineHeart className="mx-2" />
              Wishlist
            </button>
          </div>
        </div>
      </section>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});
