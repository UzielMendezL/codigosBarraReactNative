
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-native-elements';
import { View, KeyboardAvoidingView, ToastAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//styles
import globalStyles from '../../styles/EstilosGlobales';
import styleFalta from '../../styles/EstilosFaltaMercancia';
//HTTP Client
import Request from '../../core/http';
//Components
import Complete from '../../components/salidas/Completada'
import Incomplete from '../../components/salidas/FaltaMercancia'


const request = new Request();

const FinalizarPedido = (props) => {

    const { navigation, route } = props;
    const { pedido, pedidoLineas, pedidoCompletado } = route.params;

    const [sesionControl, setSesionControl] = useState(null);
    const [loadingValidar, setLoadingValidar] = useState(false);

    useEffect(() => {

        navigation.setOptions({ title: pedido.num_factura });
        const getSesionControl = async () => {
            try {

                let sesionControlStorage = await AsyncStorage.getItem('sesionControl')
                sesionControlStorage = JSON.parse(sesionControlStorage);
                setSesionControl(sesionControlStorage[0]);

            } catch (e) {
                console.log(e);
            }
        };
        getSesionControl();

    }, []);

    const sendRequest = async () => {
        setLoadingValidar(true);
        var makeRequest = [];
        for (let i = 0; i < pedidoLineas.length; i++) {
            var producteScanned =
            {
                id_linea: pedidoLineas[i].id_linea,
                id_producto: pedidoLineas[i].id_producto,
                cantidad: pedidoLineas[i].cantidad,
                cant_esc: pedidoLineas[i].cant_esc
            }
            makeRequest.push(producteScanned);
        }

        var setStatus = 0;
        if (pedidoCompletado) {
            setStatus = 1;
        }

        var data ={
            id_factura: pedido.id_factura,
            completado: setStatus,
            lineas: makeRequest
        }

        const response = await request.post('/pedidosapp/GetUpdatePedido', data);

        if (response.error) {
            setLoadingValidar(false);
            ToastAndroid.show("Error al finalizar al pedido", ToastAndroid.LONG);

        } else {
            setLoadingValidar(false);
            if (setStatus == 0) {
                return alert('Se pospuso correctamente tu pedido');
            }

            navigation.navigate('menuPrincipal', { statusOrder: pedidoCompletado })
        }
    }

    const notifyLostOrder = () => 
    {
        Alert.alert(
            "Se perderá la lectura del pedido",
            " ¿Estás seguro de salir?",
            [
                {
                    text: "No"
                },
                { text: "Si", onPress: () => navigation.navigate('menuPrincipal')}
            ],
        );
    }
    return (
        <KeyboardAvoidingView style={globalStyles.keyboardStyles}>
            <View style={globalStyles.viewContainer}>
                <Card containerStyle={[globalStyles.borderContainerComponents]}>
                    {
                        pedidoCompletado == true
                            ?
                            <View>
                                <Complete setPedido={pedido} />
                                <Button containerStyle={globalStyles.separateButtons}
                                    buttonStyle={[globalStyles.buttonSecondaryStyles]}
                                    title='Finalizar'
                                    loading={loadingValidar}
                                    onPress={sendRequest}
                                />
                            </View>
                            :
                            <View>
                                <Incomplete setPedido={pedido} />
                                <View style={styleFalta.container}>
                                    <Button
                                        buttonStyle={globalStyles.buttonPrimaryStyles}
                                        containerStyle={[globalStyles.buttonPrimaryStyles, styleFalta.borderButtons]}
                                        onPress={sendRequest}
                                        title="Pausar"
                                        type="solid"
                                    />
                                    <Button
                                        buttonStyle={styleFalta.buttonFormHome}
                                        title="Inicio"
                                        type="solid"
                                        onPress={() => notifyLostOrder()}
                                    />
                                    <Button
                                        buttonStyle={[globalStyles.buttonPrimaryStyles, styleFalta.buttonFormExit]}
                                        title="Lista"
                                        type="solid"
                                        onPress={() => navigation.navigate('listaPedido', { pedido: pedido, pedidoLineas: pedidoLineas })}
                                    />
                                </View>
                            </View>
                    }
                </Card>
            </View>
        </KeyboardAvoidingView>
    )
}

export default FinalizarPedido;