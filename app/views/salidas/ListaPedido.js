import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

//Styles
import listProductStyles from '../../styles/EstiloListarPedido';
export default function ListaPedido(props) {

    const { navigation, route } = props;
    const { pedido, pedidoLineas } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: pedido.num_factura });
    }, []);

    return (
        <View style={listProductStyles.viewPrincipal}>
            <View style={listProductStyles.viewSecondary}>

                <View style={listProductStyles.viewTextContainer} >
                    <Text style={listProductStyles.text1}>Producto</Text>
                    <Text style={listProductStyles.text2}>P</Text>
                    <Text style={listProductStyles.text2}>S</Text>
                </View>

                <ScrollView style={listProductStyles.scrollViewContainer} >
                    {
                        pedidoLineas.map((linea, key) =>
                            <View
                                key={key}
                                style={{flexDirection: "row",width: "100%",borderColor: 'black',
                                padding: "2%",backgroundColor: key % 2 == 0 ? 'rgba(1, 87, 155, 0.1)' : undefined}}
                                >
                                <Text style={listProductStyles.text4}>
                                    {linea.clave}
                                </Text>
                                <Text style={listProductStyles.text3}>
                                    {linea.cantidad}
                                </Text>
                                <Text style={listProductStyles.text3}>
                                    {linea.cant_esc}
                                </Text>

                            </View>
                        )
                    }
                </ScrollView>
            </View>
        </View>
    );
}