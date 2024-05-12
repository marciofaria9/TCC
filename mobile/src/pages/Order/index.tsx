import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RouteDetailParams = {
    Order: {

        number: string | number;
        order_id: string;
    }

}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;


export default function Order() {
    const route = useRoute<OrderRouteProps>()

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title} >Mesa {route.params.number}</Text>
                <Pressable>
                <MaterialCommunityIcons name="delete-outline" size={28} color="#FF3f4b" />
                </Pressable>
            </View>

            <Pressable style={styles.input}>
                <Text style={{ color: '#FFF' }}>Pizzas</Text>
            </Pressable>

            <Pressable style={styles.input}>
                <Text style={{ color: '#FFF' }}>pizza de Calabreso</Text>
            </Pressable>

            <View style={styles.qtdContainer} >
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholder="1"
                    placeholderTextColor="#F0F0F0"
                    inputMode="numeric"
                    value='1'
                />
            </View>

            <View style={styles.actions}>
                <Pressable style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>

                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </View>
        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20,
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})