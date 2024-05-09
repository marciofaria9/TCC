import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'

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

        <SafeAreaView>
            <View style={styles.container}>
                <Text>pagina order</Text>
                <Text>
                    {route.params.order_id}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {


    }


})