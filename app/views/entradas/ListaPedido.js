import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';


export default function ListaPedido(props) {

    const { navigation, route } = props;
    const { pedido, pedidoLineas } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: pedido.num_factura });
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: '#FFF', paddingTop: 10, alignContent: 'center',}}>
            <View style={{ width: "90%", marginHorizontal: '5%',}}>

                <View style={{ width: "100%", height: 30, flexDirection: 'row', alignItems: "center", backgroundColor: "#01579b", paddingHorizontal: "2%"}} >
                    <Text style={{ width: '50%', color: "#FFF", }}>Producto</Text>
                    <Text style={{ width: '25%', color: "#FFF", textAlign: "right" }}>P</Text>
                    <Text style={{ width: '25%', color: "#FFF", textAlign: "right" }}>S</Text>
                </View>

                <ScrollView style={{ width: "100%", height: "96%" }} >
                    {
                        pedidoLineas.map((linea, key) =>
                            <View
                                key={key}
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: key % 2 == 0 ? 'rgba(1, 87, 155, 0.1)' : undefined,
                                    borderColor: 'black',
                                    padding: "2%" 
                                }}>

                                <Text style={{ width: '50%' }}>
                                    {linea.clave}
                                </Text>
                                <Text style={{ width: '25%', textAlign: "right" , textAlignVertical: 'bottom'}}>
                                    {linea.cantidad}
                                </Text>
                                <Text style={{ width: '25%', textAlign: "right", textAlignVertical: 'bottom'}}>
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
export default ListaPedido;