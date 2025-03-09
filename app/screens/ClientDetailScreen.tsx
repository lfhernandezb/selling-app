import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import 'react-rater/lib/react-rater.css';
import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import ReactImageGallery from 'react-image-gallery';

type ClientDetailRouteProp = RouteProp<RootStackParamList, 'ClientDetail'>;
type ClientDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ClientDetail'>;

interface Props {
  route: ClientDetailRouteProp;
  navigation: ClientDetailNavigationProp;
}

export default function ClientDetailScreen({ route, navigation }: Props) {
  const { client } = route.params;

  function showClientOrders(id: number): React.MouseEventHandler<HTMLButtonElement> | undefined {
    return () => {
      navigation.navigate('Orders', { clientId: id });
    };
  }
  /*
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{client.name}</Text>
      <Text style={styles.price}>Price: ${client.price}</Text>
      <Text style={styles.description}>
        This is a detailed description of the client "{client.name}". It has amazing features!
      </Text>
    
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
  */
 
    return (
        <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* description  */}
  
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
            <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800" onClick={showClientOrders(client.id)}>
              <BiShoppingBag className="mx-2" />
              Orders
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
