import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
//Para usuários logados

export type StackPramsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string

    }
}



const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Order"
                component={Order}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}


export default AppRoutes;