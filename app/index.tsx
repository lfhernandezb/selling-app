import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClientsScreen from './screens/ClientsScreen';
import ProductsScreen from './screens/ProductsScreen';
import OrdersScreen from './screens/OrdersScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { Product } from './screens/ProductsScreen';

export type RootStackParamList = {
  Home: undefined;
  Clients: undefined;
  Products: undefined;
  ProductDetail: { product: Product };
  Orders: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
//const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (

        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome'}} />
            <Stack.Screen name="Clients" component={ClientsScreen} />
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
        </Stack.Navigator>
  );
}
