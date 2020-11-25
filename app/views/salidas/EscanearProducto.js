import React, { useState, useEffect, useRef } from 'react'
import { Card, Button } from 'react-native-elements'
import { View, Text, KeyboardAvoidingView, ToastAndroid, TextInput, ScrollView, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Audio} from 'expo-av'  

//styles
import globalStyles from '../../styles/EstilosGlobales';
import entryScannerStyles from '../../styles/EstiloEntradaEscaneada';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function EscanearProducto(props) {

    const { navigation, route } = props;
    const { pedido, pedidoLineas } = route.params;

    const [pedidoLineaIndex, setPedidoLineaIndex] = useState(0);
    const [pedidoLineCurrent, setPedidoLineCurrent] = useState({});

    const [pedidoScanContTOtal, setpedidoScanContTOtal] = useState(0);
    const [pedidoScanCont, setpedidoScanCont] = useState(0);

    const [previousProductDisable, setPreviousProductDisable] = useState(false);
    const [nextProducDisable, setNextProducDisable] = useState(false);
    const [codigoBarras, setCodigoBarras] = useState("");

    const [inputproduct, manualInput] = useState(false);
    const [loadingValidar, setLoadingValidar] = useState(false);
    const [inputValue, setValueInputOrder] = useState('');

    const inputRef = useRef();
    const inputManualRef = useRef();

    useEffect(() => {
        navigation.setOptions({ title: pedido.num_factura });
        inputRef.current.focus();
    }, []);

    useEffect(() => {
    }, [inputproduct]);

    useEffect(() => {
        setPedidoLineCurrent(pedidoLineas[pedidoLineaIndex]);


        if (pedidoLineaIndex === 0) {
            setPreviousProductDisable(true);
        } else {
            setPreviousProductDisable(false);
        }

        if (pedidoLineas.length === pedidoLineaIndex + 1) {
            setNextProducDisable(true);
        } else {
            setNextProducDisable(false);
        }

    }, [pedidoLineaIndex]);

    useEffect(() => {

        if (codigoBarras) {

            validateScannerOrder('');
            setCodigoBarras('');
        }

    }, [codigoBarras]);

    const validateScannerOrder = (value) => {
        let lineaIndex;

        if (value == '') {
            lineaIndex = pedidoLineas.findIndex(x => x.codigo_barras == codigoBarras);
        }
        else {
            setLoadingValidar(true);
            lineaIndex = pedidoLineas.findIndex(x => x.codigo_barras == value);
        }

        if (lineaIndex === -1) {
            setLoadingValidar(false);
            ToastAndroid.show("Lo sentimos , no se encontró el producto en este pedido", ToastAndroid.SHORT);
        } else {

            setPedidoLineaIndex(lineaIndex);
            setLoadingValidar(false);

            if (pedidoLineas[lineaIndex].cantidad === pedidoLineas[lineaIndex].cant_esc) {
                setPedidoLineaIndex(lineaIndex)
                playSound();
                alert("Ya ha escaneado el total a surtir");

            } else {

                if (value != '') {
                    ToastAndroid.show("Se ha escaneado correctamente", ToastAndroid.SHORT);
                }
                pedidoLineas[lineaIndex].cant_esc = pedidoLineas[lineaIndex].cant_esc + 1;
            }
            if (pedidoScanContTOtal >= pedido.piezas) {

                setpedidoScanContTOtal(pedidoScanContTOtal)
            } else {

                setpedidoScanContTOtal(pedidoScanContTOtal + 1)
            }
            if (pedidoScanCont >= pedido.productos || pedidoScanCont == pedido.productos) {

                setpedidoScanCont(pedidoScanCont)
            } else if (pedidoLineCurrent.cantidad == pedidoLineCurrent.cant_esc) {

                setpedidoScanCont(pedidoScanCont + 1)
            }
        }

    }

    const orderComplete = () => {
        var statusOrder = false;
        pedidoLineas.forEach(item => {
            if (item.cant_esc == item.cantidad) {
                statusOrder = true;
            } else {
                statusOrder = false;
            }
        });

        navigation.navigate('finalizarPedido', { pedidoLineas: pedidoLineas, pedido: pedido, pedidoCompletado: statusOrder });
    }

    const nextProduct = () => {
        setPedidoLineaIndex(pedidoLineaIndex + 1);
    };

    const previousProduct = () => {
        setPedidoLineaIndex(pedidoLineaIndex - 1);
    };
    const showInput = () => {
        inputRef.current.focus();
        if (inputproduct == false) {
            inputManualRef.current.focus();
            return manualInput(true);
        }
        else {
            Keyboard.dismiss();
            return manualInput(false);
        }
    }

    const playSound = async () => {

        const playbackObject = new Audio.Sound();
        var  status = 
        {
            shouldPlay: false
        }
        await playbackObject.loadAsync(require('../../../assets/audio/error_text_message.mp3'),  status, false);
      return  await playbackObject.playAsync();
    }

    return (
        <KeyboardAvoidingView style={entryScannerStyles.keyBoardViewStyle}  >

            <Card containerStyle={[globalStyles.borderContainerComponents, inputproduct == false ? entryScannerStyles.hiddenInput : null]}>

                <View style={entryScannerStyles.containerInput}>
                    <TextInput
                        style={entryScannerStyles.manualInput}
                        placeholder="Escribe tu código CB"
                        returnKeyType={"go"}
                        autoFocus={true}
                        ref={inputManualRef}
                        onSubmitEditing={() => validateScannerOrder(inputValue)}
                        onChangeText={(value) => setValueInputOrder(value)}
                    />
                </View>
                <Button
                    icon={<EvilIcons name="search" size={24} color="white" />}
                    loading={loadingValidar}
                    containerStyle={entryScannerStyles.buttonContainer}
                    buttonStyle={[globalStyles.buttonPrimaryStyles]}
                    onPress={() => validateScannerOrder(inputValue)}
                />
            </Card>

            <View style={globalStyles.viewContainer}>
                <Card containerStyle={globalStyles.borderContainerComponents}>
                    <ScrollView >
                        <TextInput
                            ref={inputRef}
                            style={[entryScannerStyles.textInputsStyle, inputproduct == false ? null : entryScannerStyles.hiddenInput]}
                            value={codigoBarras}
                            onChangeText={(value) => setCodigoBarras(value)}
                            showSoftInputOnFocus={false}
                        />
                        <View style={entryScannerStyles.containerButtonsFotter}>
                            <Text>Producto:</Text>
                            <Text style={entryScannerStyles.fontText}>{pedidoLineCurrent.clave}</Text>
                        </View>

                        <Text style={entryScannerStyles.textposition1}>{pedidoLineCurrent.descripcion}</Text>

                        <Text style={entryScannerStyles.textposition2}>{pedidoLineCurrent.marca}</Text>

                        <View style={entryScannerStyles.containerViewText}>
                            <Text>Pedido:</Text>
                            <Text style={entryScannerStyles.colorPrimaryText}>{pedidoLineCurrent.cantidad}</Text>
                        </View>

                        <View style={entryScannerStyles.containerViewText}>
                            <Text>Surtido:</Text>
                            <Text style={entryScannerStyles.colorSecondaryText}>{pedidoLineCurrent.cant_esc}</Text>
                        </View>

                        <View style={entryScannerStyles.containerViewTextProducts} >
                            <Text>{pedidoScanCont}/<Text style={entryScannerStyles.colorSecondaryText}>{pedido.productos}</Text></Text>
                            <Text>{pedidoScanContTOtal}/<Text style={entryScannerStyles.colorSecondaryText}>{pedido.piezas}</Text></Text>
                        </View>
                    </ScrollView>
                </Card>
            </View>
            <View style={entryScannerStyles.containerFooter}>
                <View style={entryScannerStyles.containerViewFooter}>

                    <Button
                        buttonStyle={[globalStyles.buttonPrimaryStyles, entryScannerStyles.buttonForm]}
                        //title='Lista'
                        icon={<FontAwesome5 name="clipboard-list" size={24} color="white" />}
                        onPress={() => navigation.navigate('listaPedido', { pedido: pedido, pedidoLineas: pedidoLineas })}
                    />
                    <Button
                        disabled={previousProductDisable}
                        onPress={previousProduct}
                        buttonStyle={[globalStyles.buttonSecondaryStyles, entryScannerStyles.buttonForm]}
                        icon={<AntDesign name="arrowleft" size={24} color="white" />}
                    />
                    <Button
                        disabled={nextProducDisable}
                        onPress={nextProduct}
                        buttonStyle={[globalStyles.buttonSecondaryStyles, entryScannerStyles.buttonForm]}
                        icon={<AntDesign name="arrowright" size={24} color="white" />}
                    />
                    <Button
                        onPress={showInput}
                        buttonStyle={[globalStyles.buttonPrimaryColor, entryScannerStyles.buttonForm]}
                        icon={<MaterialIcons name="touch-app" size={24} color="white" />}
                    />
                </View>
                <Button
                    containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={orderComplete}
                    buttonStyle={[entryScannerStyles.buttonFinishForm, globalStyles.buttonSecondaryStyles]}
                    title='Finalizar'
                />
            </View>

        </KeyboardAvoidingView>
    );
}