import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Pantallas
import ValidarPedido from '../views/entradas/ValidarPedido';
import EscanearProducto from '../views/entradas/EscanearProducto';
import FinalizarPedido from '../views/entradas/FinalizarPedido';
import ListaPedido from '../views/entradas/ListaPedido';

const Stack = createStackNavigator();

const EntradasStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="validarPedido"
                component={ValidarPedido}
            />

            <Stack.Screen
                name="escanearProducto"
                component={EscanearProducto}
            />

            <Stack.Screen
                name="finalizarPedido"
                component={FinalizarPedido}
            />

            <Stack.Screen
                name="listaPedido"
                component={ListaPedido}
            />
        </Stack.Navigator>
    );
}

export default EntradasStack;