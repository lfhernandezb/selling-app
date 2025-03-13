import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import 'react-rater/lib/react-rater.css';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import ReactImageGallery from 'react-image-gallery';
import { Client } from '../model/client.model';

type ClientDetailRouteProp = RouteProp<RootStackParamList, 'ClientDetail'>;
type ClientDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ClientDetail'>;

interface Props {
  route: ClientDetailRouteProp;
  navigation: ClientDetailNavigationProp;
}

export default function ClientDetailScreen({ route, navigation }: Props) {
  const { client } = route.params;

  function showClientOrders(client: Client): () => void {
    return () => {
      navigation.navigate('Orders', { client: client });
    };
  }
 
  return (
    /*
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {client.firstName} {client.lastName}
        </h2>
        <p className="font-bold">
          Email: <span className="font-normal">{client.email}</span>
        </p>
        <p className="font-bold">
          Phone:{" "}
          <span className="font-normal">{client.phone}</span>
        </p>
        <p className="font-bold">
          <span className="font-normal">Adress</span>
        </p>
        <p className="font-bold">
          Street: <span className="font-normal">{client.address.address}</span>
        </p>
        <p className="font-bold">
          City: <span className="font-normal">{client.address.city}</span>
        </p>
        <p className="font-bold">
          State: <span className="font-normal">{client.address.state}</span>
        </p>
        <p className="font-bold">
          State Code: <span className="font-normal">{client.address.stateCode}</span>
        </p>
        <p className="font-bold">
          Country: <span className="font-normal">{client.address.country}</span>
        </p>
        <div className="mt-7 flex flex-row items-center gap-6">
          <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800" onClick={showClientOrders(client)}>
            <BiShoppingBag className="mx-2" />
            Orders
          </button>
        </div>
      </div>
    </section>
    */

    <View style={styles.container}>
      <Text style={styles.title}>Cliente: {client.firstName} {client.lastName}</Text>
      <View style={styles.cardText}>
            
            <Text style={styles.phone}>Fono: {client.phone}</Text>
            <Text style={styles.phone}>Email: {client.email}</Text>
            <Text style={styles.phone}>Dirección</Text>
            <Text style={styles.phone}>Calle: {client.address.address}</Text>
            <Text style={styles.phone}>Ciudad: {client.address.city}</Text>
            <Text style={styles.phone}>Estado: {client.address.state}</Text>
            <Text style={styles.phone}>Código estado: {client.address.stateCode}</Text>
            <Text style={styles.phone}>País: {client.address.country}</Text>
            <View style={styles.footer}>
              <Button title="Pedidos" onPress={() => showClientOrders(client)()} />
            </View>
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
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 15,
  },
  clientName: { fontSize: 14, fontWeight: 'bold' },
  phone: { fontSize: 14, color: 'green' },
  footer: { padding: 10, alignItems: 'center' },
});
