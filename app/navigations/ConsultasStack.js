import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Pantallas
import Consultas from '../views/Consultas';

//icons
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const ConsultasStack = ({ navigation }) => {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="consultaProducto"
                component={Consultas}
                options={{
                    headerTintColor: 'white', headerStyle: { backgroundColor: '#01579b' }, headerStatusBarHeight: -15, headerLeft: () => (
                        <Ionicons onPress={() => navigation.goBack()} name="ios-arrow-round-back" style={{ left: 17 }} size={35} color="white" />
                    ), headerTitleAlign: 'center', title: "Buscar Producto"
                }}
            />
        </Stack.Navigator>
    );
}

export default ConsultasStack;