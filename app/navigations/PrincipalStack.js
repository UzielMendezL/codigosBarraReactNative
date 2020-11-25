import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ContentDrawer from '../components/Navigation/Drawer';
import MenuPrincipal from '../views/MenuPrincipal';
import SalidasStack from './SalidasStack';
import ConsultasStack from './ConsultasStack';

const Drawer = createDrawerNavigator();

export default function PrincipalStack() {
    return (
        <Drawer.Navigator drawerContent={(props) => <ContentDrawer {...props} />}>
            <Drawer.Screen
                name="menuPrincipal"
                component={MenuPrincipal}
                options={{
                    headerStyle: {
                        backgroundColor: '#01579b'
                    },
                    headerStatusBarHeight: -15,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    title: "Menú Principal"
                }}
            />
            <Drawer.Screen
                name="salidasStack"
                component={SalidasStack}
                options={{
                    headerStatusBarHeight: -15,
                    headerShown: false,
                    title: "Salidas",
                    swipeEnabled: false
                }}
            />
            <Drawer.Screen
                name="consultaProducto"
                component={ConsultasStack}
                options={{
                    headerStatusBarHeight: -15,
                    headerShown: false,
                    title: "consulta Producto",
                    swipeEnabled: false
                }}
            />
        </Drawer.Navigator>
    )
}