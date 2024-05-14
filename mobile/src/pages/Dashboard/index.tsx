import React, { useState, useContext } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Pressable, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { StackPramsList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { signOut } = useContext(AuthContext)


  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

  const [number, setNumber] = useState('')

  async function openOrder() {

    if (number === '') {
      alert("Digite o número da mesa")
      return;
    }



    const response = await api.post('/order', {
      table: Number(number)
    })

    // console.log(response.data)
    navigation.navigate('Order', { number: number, order_id: response.data.id })
    setNumber('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>

      <TextInput
        placeholder="Numero da mesa"
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        inputMode="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <Pressable style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </Pressable>

      <Pressable style={styles.buttonLogOut} onPress={signOut}>
        <Text style={styles.textLogOut}>Sair</Text>
      </Pressable>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#FFF'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  },
  buttonLogOut: {
    position: 'absolute',
    bottom: '5%',
    width: '90%',
    height: 40,
    backgroundColor: '#FF3E4D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLogOut: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF'
  }

})