import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Pantallas
import IniciarSesion from '../views/IniciarSesion';

const Stack = createStackNavigator();

export default function AutenticacionStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="iniciarSesion"
                component={IniciarSesion}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}