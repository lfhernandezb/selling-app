import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClientsScreen from './screens/ClientsScreen';
import ProductsScreen from './screens/ProductsScreen';
import OrdersScreen from './screens/OrdersScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { Product } from './model/product.model';
import ClientDetailScreen from './screens/ClientDetailScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import { Client } from './model/client.model';

export type RootStackParamList = {
  Home: undefined;
  Clients: undefined;
  ClientDetail: { client: Client };
  Products: undefined;
  ProductDetail: { product: Product };
  Orders: { clientId?: number };
  OrderDetail: { orderId: number };
};
const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcomex'}} />
            <Stack.Screen name="Clients" component={ClientsScreen} />
            <Stack.Screen name="ClientDetail" component={ClientDetailScreen} options={{ title: 'Client Details' }} />
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Order Details' }} />
        </Stack.Navigator>
  );
}
