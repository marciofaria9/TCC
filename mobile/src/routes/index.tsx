import React, { useContext} from 'react'
import { View, ActivityIndicator } from 'react-native'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import { AuthContext } from '../contexts/AuthContext'

function Routes() {
    
    const { isAuthenticated, loading } = useContext(AuthContext)


    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f5f7fb',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size={'large'} color="#1D1D2E" />

            </View>
        )
    }

    return (
         // se estiver logado, app routes. Se não, auth routes
        isAuthenticated ? <AppRoutes /> : <AuthRoutes /> 
       
    )
}

export default Routes;