import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Dashboard from "../pages/Dashboard";


//Para usuários logados
const Stack = createNativeStackNavigator();

function AppRoutes(){

    return (
         <Stack.Navigator>
            <Stack.Screen name="DashBoard" component={Dashboard}/>
         </Stack.Navigator>
    )
}


export default AppRoutes;