import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Client = {
  id: string;
  name: string;
  email: string;
};

const clients: Client[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export default function ClientsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clients</Text>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, backgroundColor: '#f5f5f5', marginBottom: 10, borderRadius: 5 },
});
