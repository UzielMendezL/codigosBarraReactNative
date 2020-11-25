import React from 'react';
import { Card, Button, } from 'react-native-elements';
import { View, Text, KeyboardAvoidingView } from 'react-native';

//styles
import globalStyles from '../../styles/EstilosGlobales';
import entryScannerStyles from '../../styles/EstiloEntradaEscaneada';

//icons
import { AntDesign } from '@expo/vector-icons';

const EscanearProducto = (props) => {

    const { navigation } = props;
    
    return (

        <KeyboardAvoidingView style={globalStyles.keyboardStyles}>
            <View style={globalStyles.viewContainer}>
                
                <Card containerStyle={globalStyles.borderContainerComponents}>
                    <Text style={[globalStyles.subtitle, globalStyles.justifyText]}>N. Pedido:
                        <Text style={[globalStyles.fontTextBold,]}>158264</Text>
                    </Text>
                    <Text style={[globalStyles.separateComponents, globalStyles.title]}> Producto :
                        <Text style={[globalStyles.fontTextBold]}>630012530</Text>
                    </Text>
                    <Text style={[globalStyles.fontTextBold, globalStyles.separateComponents, globalStyles.subtitle]}>Kit de clutch VW Jetta 2016</Text>
                    <Text style={[globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}>LUK REPSET</Text>
                    <View style={entryScannerStyles.containerTextNumber}>
                        <Text style={[entryScannerStyles.stylesIntent, globalStyles.separateComponents, globalStyles.subtitle]}>Compra :</Text>
                        <Text style={[entryScannerStyles.colorTextPrimary, entryScannerStyles.sizeTextNumbers, entryScannerStyles.stylesIntent3, entryScannerStyles.SeparateNumberPrimary]}>3</Text>
                        <Text style={[entryScannerStyles.stylesIntent, globalStyles.separateComponents, globalStyles.subtitle]}>Legada :</Text>
                        <Text style={[entryScannerStyles.colorTextSecondary, entryScannerStyles.sizeTextNumbers, entryScannerStyles.stylesIntent3, entryScannerStyles.SeparateNumberSecondary]}>2</Text>
                    </View>
                    <View style={entryScannerStyles.containerTextNumber}>
                        <Text style={[globalStyles.subtitle, entryScannerStyles.stylesIntent, globalStyles.separateComponents, entryScannerStyles.colorTextSecondary]}>2<Text style={entryScannerStyles.colorTextDefault}>/5</Text></Text>
                        <Text style={[globalStyles.subtitle, entryScannerStyles.stylesIntent2, globalStyles.separateComponents, entryScannerStyles.colorTextSecondary]}>7<Text style={entryScannerStyles.colorTextDefault} >/15</Text></Text>
                    </View>

                    <View style={entryScannerStyles.containerButtons}>
                        <Button buttonStyle={[globalStyles.buttonPrimaryStyles, entryScannerStyles.buttonForm]}
                            title='Lista'
                            onPress={() => navigation.navigate('Pedidos Salidas')}
                        />
                        <Button buttonStyle={[globalStyles.buttonSecondaryStyles, entryScannerStyles.buttonForm]}
                            icon=
                            {
                                <AntDesign name="arrowright" size={24} color="white" />
                            }
                        />

                        <Button buttonStyle={[globalStyles.buttonSecondaryStyles, entryScannerStyles.buttonForm]}
                            icon=
                            {
                                <AntDesign name="arrowleft" size={24} color="white" />
                            }
                        />
                    </View>
                    <View>
                        <Button onPress={() => navigation.navigate('finalizarPedido')}
                            buttonStyle={[entryScannerStyles.buttonFinishForm, globalStyles.buttonSecondaryStyles]}
                            title='Finalizar'
                        />
                    </View>
                </Card>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EscanearProducto;
