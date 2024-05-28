import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackPramsList } from '../../routes/app.routes'

import { api } from '../../services/api'

type RouteDetailParams = {
    FinishOrder: {
      number: string | number;
      order_id: string;
    }
  }
  
  
  type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>



export default function FinishOrder() {
    
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    async function handleSendOrder(){
        try{
          await api.put('/order/send', {
            order_id: route.params?.order_id
          })
    
           alert("Pedido foi finalizado com sucesso!")
           
          navigation.popToTop();
    
        }catch(err){
          console.log("Erro ao finalziar")
        }
      }
    
    return (
        <View style={styles.container}>
            <Text style={styles.alert}> Desaja finalizar esse pedido? </Text>
            <Text style={styles.title}> Mesa {route.params?.number} </Text>

            <Pressable style={styles.button} onPress={handleSendOrder}>
                <Text style={styles.textButton}> Finalizar Pedido</Text>
                <Feather name="shopping-cart" size={20} color="#1d1d2e"></Feather>
            </Pressable>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})