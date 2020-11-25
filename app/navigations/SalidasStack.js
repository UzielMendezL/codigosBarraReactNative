import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button,Alert } from 'react-native';

//Pantallas
import ValidarPedido from '../views/salidas/ValidarPedido';
import EscanearProducto from '../views/salidas/EscanearProducto';
import FinalizarPedido from '../views/salidas/FinalizarPedido';
import ListaPedido from '../views/salidas/ListaPedido';

//icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const SalidasStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName = 'validarPedido' >
            <Stack.Screen
                name="validarPedido"
                component={ValidarPedido}
                options={{
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#01579b'
                    },
                    headerStatusBarHeight: -15,
                    headerLeft: () => (
                        <Ionicons
                            onPress={() => navigation.goBack()}
                            name="ios-arrow-round-back"
                            style={{ left: 17 }}
                            size={35} color="white"
                        />
                    ),
                    headerTitleAlign: 'center',
                    title: "Validar Pedido"
                }}
            />
            <Stack.Screen
                name="escanearProducto"
                component={EscanearProducto}
                options={{   headerLeft: () => (
                            <Ionicons
                                onPress={() =>
                                    Alert.alert(
                                        "Se perderá el la lectura del pedido",
                                        " ¿Estás seguro de salir?",
                                        [
                                            {
                                                text: "No"
                                            },
                                            { text: "Si", onPress: () => navigation.goBack()}
                                        ],
                                    )}
                                name="ios-arrow-round-back"
                                style={{ left: 17 }}
                                size={35} color="white"
                            />
                            ),
                            headerStyle: { backgroundColor: '#01579b' },
                            headerStatusBarHeight: -15, headerTitleAlign: 'center', headerTintColor: 'white',
                             title: "Escanear Pedido" 
                        }}
            />
            <Stack.Screen
                name="finalizarPedido"
                component={FinalizarPedido}
                options={{ headerStyle: { backgroundColor: '#01579b' }, headerStatusBarHeight: -15, headerTitleAlign: 'center', headerTintColor: 'white', title: "Finalizar Pedido" }}
            />
            <Stack.Screen
                name="listaPedido"
                component={ListaPedido}
                options={{ headerStyle: { backgroundColor: '#01579b' }, headerStatusBarHeight: -15, headerTitleAlign: 'center', headerTintColor: 'white', title: "Lista Pedido" }}
            />

        </Stack.Navigator>
    );
}

export default SalidasStack;