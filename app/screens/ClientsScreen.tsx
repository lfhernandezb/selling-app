import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { Client } from '../model/client.model';
import { getClients } from '../services/client.service';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type Props = {
  navigation: NavigationProp<any>;
};

export default function ClientsScreen({ navigation }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Items per page

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // const response = await getClients(page, limit); // axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`);
      const newClients = await getClients(page, limit); // (response.data as { users: Client[] }).users;
            
      setClients((prevClients) => [...prevClients, ...newClients]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }

    setLoading(false);
  };

  return (
    /*
    <View style={styles.container}>
      <Text style={styles.title}>Clients</Text>
      <FlatList
        data={clients}
        keyExtractor={(client) => client.id}
        renderItem={({ client }) => (
          <View style={styles.card}>
            <Text>{client.firstName} {client.lastName}</Text>
            <Text>{client.email}</Text>
            <Text>{client.phone}</Text>
          </View>
        )}
      />
    </View>
    */

    <View style={styles.container}>
      <Text style={styles.title}>Clients</Text>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ClientDetail', { client: item })}
          >
            {/*<Image source={{ uri: client.thumbnail }} style={styles.thumbnail} /> */}
            <View style={styles.card}>
              
              <Text style={styles.clientName}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
              {/* <img className="profile-photo" src={client.thumbnail} alt={client.title}/> */}
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {loading ? <ActivityIndicator size="large" color="#007AFF" /> : <Button title="Load More" onPress={fetchClients} />}
          </View>
        )}
      />
    </View>

  );
}

/*
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, backgroundColor: '#f5f5f5', marginBottom: 10, borderRadius: 5 },
});
*/

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
  clientName: { fontSize: 14, fontWeight: 'bold' },
  phone: { fontSize: 14, color: 'green' },
  footer: { padding: 10, alignItems: 'center' },
});

