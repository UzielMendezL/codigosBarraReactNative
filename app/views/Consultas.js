import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Input, Image } from 'react-native-elements'
import { ActivityIndicator, View, Text, KeyboardAvoidingView, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as FileSystem from 'expo-file-system';

//styles
import globalStyles from '../styles/EstilosGlobales'
import searchProductStyle from '../styles/EstiloConsultaProducto'

//Icons
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// HTTP Client
import Request from '../core/http';
const request = new Request();

export default function ConsultarProducto(props) {

    const [sesionControl, setSesionControl] = useState(null);
    const [product, setProduct] = useState("");
    const [loadingValidar, setLoadingValidar] = useState(false);
    const [pedido, setPedido] = useState(null);
    const [showButtons, visibleButtons] = useState(true);
    const [loadingEscanear, setLoadingEscanear] = useState(false);
    const [data, setData] = useState();
    const [existProduct, verifyProduct] = useState(false);
    const inputRef = useRef();
    const [viewModal, setModal] = useState(false);
    const [containImg, checkContainImage] = useState(false);

    useEffect(() => {

        const getSesionControl = async () => {
            try {

                let sesionControlStorage = await AsyncStorage.getItem('sesionControl')
                sesionControlStorage = JSON.parse(sesionControlStorage);
                setSesionControl(sesionControlStorage[0]);
                inputRef.current.focus();

            } catch (e) {
                console.log(e);
            }
        };
        getSesionControl();

    }, []);

    useEffect(() => {

        if (sesionControl != null) {
            const setRequest = async () => {
                const response = await request.post('/productosapp/GetProducto', data);
                if (response.error) {
                    setLoadingValidar(false);
                    setPedido(null);
                    ToastAndroid.show("Lo sentimos, no se encontró el pedido", ToastAndroid.LONG);

                } else {
                    setLoadingValidar(false);
                    setLoadingEscanear(true);
                    visibleButtons(false);
                    verifyProduct(true);
                    if (response.records[0].stock == 0) {
                        verifyProduct(false);
                    }

                    constcheckUrl(response.records[0].id_producto);
                    return setPedido(response.records[0]);
                }
            }
            setRequest();
        }

    }, [data]);

    const checkProduct = (value) => {
        setLoadingValidar(true);
        setProduct(value);
        if (value == '') {
            setData({
                codigo: null,
                id_sucursal: null

            });
            setLoadingValidar(true);
        } else {
            setData({
                codigo: value,
                id_sucursal: sesionControl.id_sucursal
            });
        }
    }

    const cleanInput = () => {
        setProduct('');
        setPedido(null);
        inputRef.current.focus();
    }

    const visibleModal = (value) => {
        setModal(value);
    }

    const constcheckUrl = async (product) => {

        var uri = 'https://imagenesbeta.blob.core.windows.net/imagenes/' + product + '.jpg';
        // Downloading the file
        let fileLocation = FileSystem.documentDirectory + "img.jpg";
        FileSystem.downloadAsync(uri, fileLocation)
            .then((res) => {

                if (res.status == 200) {
                    checkContainImage(false);

                } else {

                    checkContainImage(true);

                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <KeyboardAvoidingView style={globalStyles.keyboardStyles}>

            <View style={globalStyles.viewContainer} >
                <ScrollView>
                    <Card containerStyle={globalStyles.borderContainerComponents}>

                        <Input
                            ref={inputRef}
                            value={product}
                            returnKeyType={"go"}
                            placeholder={"Escanea el Código"}
                            onChangeText={(value) => checkProduct(value)}
                        />
                        <ActivityIndicator hidesWhenStopped={true} size={loadingValidar ? "large" : 0} color="#01579b" animating={loadingValidar} />

                        {pedido == null ?
                            <View />
                            :

                            <View>
                                <Text style={[searchProductStyle.alignText, searchProductStyle.justifyText, globalStyles.fontTextSubtopics]}>
                                    Detalle Producto :
                                                </Text>
                                <Text style={[searchProductStyle.justifyText, globalStyles.fontTextBold, globalStyles.separateComponents, globalStyles.subtitle]}>
                                    {pedido.descripcion}
                                </Text>
                                <Text style={[searchProductStyle.justifyText, globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}>
                                    {pedido.codigo}
                                </Text>

                                <View style={[globalStyles.alignComponents]}>
                                    <TouchableOpacity
                                        style={globalStyles.sizeImg}
                                        onPress={() => visibleModal(true)}
                                        disabled={containImg}
                                    >

                                        <Image
                                            style={globalStyles.sizeImg}
                                            source={{ uri: 'https://imagenesbeta.blob.core.windows.net/imagenes/' + pedido.id_producto + '.jpg' }}
                                            resizeMode="contain"
                                            PlaceholderContent={<Image containerStyle={searchProductStyle.backGroundImg}
                                                style={globalStyles.sizeImg} source={require('../../assets/img/no-image.jpg')} />
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[searchProductStyle.separateComponentImg, searchProductStyle.justifyText, globalStyles.fontTextBold, globalStyles.subtitle]}>
                                    Inventario :
                                    </Text>
                                <View>
                                    <Text style={[existProduct == true ? searchProductStyle.textNumberPrimary : searchProductStyle.textNumberSecondary]}>{pedido.stock}</Text>
                                </View>
                                <View style={[searchProductStyle.alignButtons]}>
                                    <Button containerStyle={[globalStyles.separateComponents]}
                                        buttonStyle={[searchProductStyle.buttonForm, globalStyles.buttonSecondaryStyles]}
                                        title='Limpiar'
                                        onPress={() => cleanInput("")}
                                    />
                                </View>
                                <Modal
                                    isVisible={viewModal}
                                    onBackdropPress={() => visibleModal(false)}
                                    onBackButtonPress={() => visibleModal(false)}
                                    style={{ margin: 0 }}
                                    useNativeDriver={true}
                                    animationInTiming={300}
                                    animationOutTiming={300}
                                    hideModalContentWhileAnimating
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#000" }}>
                                        <AntDesign style={{ paddingTop: 10 }} onPress={() => visibleModal(false)} name="closecircle" size={24} color="white" />
                                    </View>
                                    <ImageViewer
                                        imageUrls={[{ url: 'https://imagenesbeta.blob.core.windows.net/imagenes/' + pedido.id_producto + '.jpg' }]}
                                        index={0}
                                        saveToLocalByLongPress={false}
                                        renderIndicator={() => <View />}
                                    />
                                </Modal>
                            </View>
                        }
                    </Card>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}