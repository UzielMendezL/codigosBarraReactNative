import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Tooltip, Button } from 'react-native-elements';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';

//styles
import styles from '../styles/EstiloListaPedidoSalida'

export default function EntradasPedidosSalidas({ navigation }) {

    const [cart, setCart] = useState([
        {
            id: 'PID000101',
            title: 'Ma152',
            pedidos: '5',
            salidas: '3',
        },
        {
            id: 'PID000121',
            title: 'M-753',
            pedidos: '3',
            salidas: '3',
        },
    ]);

    const renderItem = ({ item }) => (
        <Item title={item.title} pedidos={item.pedidos} salidas={item.salidas} />
    );

    const Item = ({ title, pedidos, salidas }) => (
        <View style={styles.item}>
            <Text style={styles.title}>· {title}</Text>
            <Text style={[styles.title, { color: '#01579b' }]}>{pedidos}</Text>
            <Text style={[styles.title, { color: '#4caf50' }]}>{salidas}</Text>
        </View>
    );

    return (
        <View style={styles.container}>

            <Text style={styles.tituloProducto}>No.Pedido: </Text>
            <Text style={[styles.tituloProducto, { color: 'black' }]}>158264</Text>

            <View style={styles.cartContainer}>

                <View style={styles.cartTitleView}>

                    <FontAwesome5 name="warehouse" size={24} color="black" />
                    <Text style={[styles.cartTitle, { marginRight: 15, }]} >Producto</Text>

                    <Entypo name="shopping-basket" size={24} color="black" />
                    <Tooltip
                        popover={<Text style={{ color: 'white', fontSize: 180 }} >Pedidos</Text>}
                        overlayColor='rgba(0, 0, 146, 0.0)'
                        backgroundColor='#002f6c'
                    >
                        <Text style={styles.cartTitle}>P</Text>
                    </Tooltip>

                    <Ionicons name="ios-exit" size={24} color="black" />
                    <Tooltip
                        popover={<Text style={{ color: 'white', fontSize: 18 }} >Salidas</Text>}
                        overlayColor='rgba(0, 0, 146, 0.0)'
                        backgroundColor='#002f6c'
                    >
                        <Text style={[styles.cartTitle, { borderColor: 'white', }]}>S</Text>
                    </Tooltip>

                </View>
                <View style={styles.inicioList}></View>
                <View style={styles.listConten}>
                    {cart.length > 0 ? (
                        <View>
                            <FlatList
                                data={cart}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>

                    ) : (
                            <View style={styles.emptyCartView}>
                                <Text style={styles.emptyCartViewText}>No tienes Pedidos o Salidas</Text>
                            </View>
                        )
                    }
                </View>
                <View style={{ paddingLeft: '10%', }}>
                    <Button
                        buttonStyle={[styles.botonSalir]}
                        title="Atras"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </View>
    );
}
