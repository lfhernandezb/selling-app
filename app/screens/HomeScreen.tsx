import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Selling App</Text> */}
      <TouchableOpacity style={styles.button}>
        <Button title="Clientes" onPress={() => navigation.navigate('Clients')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Button title="Productos" onPress={() => navigation.navigate('Products')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Button title="Pedidos" onPress={() => navigation.navigate('Orders', { client: undefined })} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { padding: 20, width: '50%' }
});
