import React, { useEffect, useState, } from 'react';
import { Card, Button, Input } from 'react-native-elements';
import { View, Text, KeyboardAvoidingView,ActivityIndicator, ToastAndroid, ScrollView, Keyboard, Picker } from 'react-native';
import { format } from "date-fns";
import AsyncStorage from '@react-native-community/async-storage';

//styles
import globalStyles from '../../styles/EstilosGlobales';
import entryPrincipalStyles from '../../styles/EstiloEntradaPrincipal';

// HTTP Client
import Request from '../../core/http';
const request = new Request();

export default function ValidarPedido(props) {

    const { navigation } = props;

    const [sesionControl, setSesionControl] = useState(null);
    const [folio, setearFolio] = useState('');
    const [prefijo, setearPrefijo] = useState('');
    const [loadingValidar, setLoadingValidar] = useState(false);
    const [pedido, setPedido] = useState(null);
    const [loadingEscanear, setLoadingEscanear] = useState(false);
    const [loadingPrefijo, setLoadingPrefijo] = useState(false);
    const [selectedValuesPicker, setselectedValuesPicker] = useState(
        {
            data: []
        });


    useEffect(() => {

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
    }, [])

    useEffect(() => {

        if (sesionControl != null) {
            setLoadingPrefijo(true);
            const getPrefixes = async () => {
                var data =
                {
                    id_sucursal: sesionControl.id_sucursal
                }
                var response = await request.post('/pedidosapp/GetDescriptores', data);

                if (response.error) {
                    setLoadingPrefijo(false);
                    ToastAndroid.show("Intentalo más tarde", ToastAndroid.SHORT);
                }
                else {
                    if (selectedValuesPicker.data.length == 0) {
                        setselectedValuesPicker({
                            data: response.records
                        });
                       
                    }
                }
                setLoadingPrefijo(false);
            }
            
            getPrefixes();
        }
    }, [sesionControl]);


    const validarFolio = async () => {
        Keyboard.dismiss();
        setPedido(null);

        if (folio === '') {

            ToastAndroid.show("Por favor, ingresa un pedido correcto", ToastAndroid.SHORT);
            return
        }

        let FolioCompleto = prefijo + folio;
        const data = {

            folio: FolioCompleto,
            id_sucursal: sesionControl.id_sucursal
        }

        setLoadingValidar(true);

        const response = await request.post('/pedidosapp/GetPedido', data);

        if (response.error) {

            setLoadingValidar(false);
            ToastAndroid.show("Lo sentimos, no se encontró el pedido", ToastAndroid.LONG);

        } else {

            setLoadingValidar(false);
            setPedido(response.records[0]);
        }
    }

    const ecanearPedido = async () => {

        const data = {
            id_factura: pedido.id_factura,
            id_sucursal: sesionControl.id_sucursal,
            usuario: sesionControl.usuario
        }

        setLoadingEscanear(true);

        const response = await request.post('/pedidosapp/GetLineasPedido', data);

        if (response.error) {

            setLoadingEscanear(false);
            return ToastAndroid.show("Lo sentimos, no se encontró escanear el pedido", ToastAndroid.LONG);

        } else {

            setLoadingEscanear(false);
            return navigation.navigate('escanearProducto', { pedido: pedido, pedidoLineas: response.records });
        }
    }

    return (
        <KeyboardAvoidingView style={globalStyles.keyboardStyles}>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={[globalStyles.viewContainer,]}>
                    {
                    loadingPrefijo == true ?
                    <View>
                        <ActivityIndicator animating= {true} style= {{paddingTop: 20}} color="#01579b" size="large" />
                    </View>
                    :
                    <Card containerStyle={[globalStyles.borderContainerComponents,]}>
                        <View style={{ position: 'absolute', top: '10%' }} >
                            <Picker
                                selectedValue={prefijo}
                                mode='dropdown'
                                style={entryPrincipalStyles.pickerStyle}
                                onValueChange={(itemValue) => setearPrefijo(itemValue)}
                            >
                                {
                                    selectedValuesPicker.data.map((item, key) =>
                                        <Picker.Item key={key} label={item.prefijo} value={item.prefijo + '-'} />
                                    )
                                }
                            </Picker>
                        </View>
                        <View style={entryPrincipalStyles.viewContainerInput}>
                            <Input
                                style={entryPrincipalStyles.inputTextSize}
                                placeholder="Nº. de Pedido"
                                maxLength={30}
                                autoFocus={true}
                                keyboardType= 'numeric'
                                returnKeyType={"go"}
                                onSubmitEditing={() => validarFolio()}
                                onChangeText={(value) => setearFolio(value)} />

                        </View>
                        <Button
                            loading={loadingValidar}
                            buttonStyle={[globalStyles.buttonPrimaryStyles, entryPrincipalStyles.borderButtons]}
                            title='Validar'
                            onPress={validarFolio}
                        />
                    </Card >
            }  
                    {pedido && 
                        <Card containerStyle={[globalStyles.borderContainerComponents]}>
                            <View>
                                <Text style={[globalStyles.fontTextSubtopics, entryPrincipalStyles.titlePadding]}>Detalles</Text>
                                <Text style={[globalStyles.title, entryPrincipalStyles.titlePadding]}>Clientes:</Text>
                                <Text style={[globalStyles.fontTextBold, globalStyles.subtitle]}>{pedido.nombre}</Text>
                                <Text style={[globalStyles.title, entryPrincipalStyles.titlePadding]}>Fecha:</Text>
                                <Text style={[globalStyles.fontTextBold, globalStyles.subtitle]}>{format(new Date(pedido.fecha), "dd/MM/yyyy")}</Text>
                                <Text style={[globalStyles.title, entryPrincipalStyles.titlePadding]}>Cantidad de Productos:</Text>
                                <Text style={[globalStyles.fontTextBold, globalStyles.subtitle]}>{pedido.productos} Productos</Text>
                                <Text style={[globalStyles.fontTextBold, globalStyles.subtitle]}>{pedido.piezas} Piezas</Text>
                                <Button
                                    loading={loadingEscanear}
                                    onPress={ecanearPedido}
                                    containerStyle={entryPrincipalStyles.titlePadding}
                                    buttonStyle={[globalStyles.buttonSecondaryStyles, entryPrincipalStyles.borderButtons,]}
                                    title="Escanear"
                                />
                            </View>
                        </Card>
                    }
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}