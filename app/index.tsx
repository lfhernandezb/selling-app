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
import Header from './screens/Header';

export type RootStackParamList = {
  Home: undefined;
  Clients: undefined;
  ClientDetail: { client: Client };
  Products: undefined;
  ProductDetail: { product: Product };
  Orders: { client?: Client };
  OrderDetail: { orderId: number };
};
const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <>
        <Header />
        <Stack.Navigator initialRouteName="Home" >
            
            <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Inicio'}} />
            <Stack.Screen name="Clients" component={ClientsScreen} options={{ title: 'Clientes' }} />
            <Stack.Screen name="ClientDetail" component={ClientDetailScreen} options={{ title: 'Detalle de cliente' }} />
            <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Productos' }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Detalle de producto' }} />
            <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Pedidos' }} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Detalle de pedido' }} />
        </Stack.Navigator>
    </>
  );
}
