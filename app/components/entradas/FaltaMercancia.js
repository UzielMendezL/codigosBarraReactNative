import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, Image } from 'react-native-elements';

//styles
import productMissingStyle from '../../styles/EstilosFaltaMercancia';
import globalStyles from '../../styles/EstilosGlobales';

export default function FaltaMercancia(props) {

    const { navigation } = props;

    return (
        <View style={[globalStyles.keyboardStyles]} >

            <View style={productMissingStyle.hederMenu}>
                <Text style={productMissingStyle.Text}>158264</Text>
            </View>

            <Card containerStyle={[globalStyles.borderContainerComponents, productMissingStyle.marginCard]} >

                <View>
                    <Text style={[globalStyles.fontTextSubtopics, productMissingStyle.ajustTextContainer]}>Detalle de lectura</Text>
                    <Text style={[globalStyles.title,]}>Productos Leidos: </Text>
                    <Text style={[globalStyles.fontTextBold, globalStyles.subtitle, productMissingStyle.ajustTextContainer]}>· 4 Producto</Text>
                    <Text style={[globalStyles.fontTextBold, globalStyles.subtitle, productMissingStyle.ajustTextContainer]}>· 12 Piezas</Text>
                </View>

                <View>
                    <Text style={[globalStyles.title, productMissingStyle.colorTitle]}>Productos Faltantes: </Text>
                    <Text style={[globalStyles.fontTextBold, globalStyles.subtitle, productMissingStyle.opcionText]}>· 1 Producto</Text>
                    <Text style={[globalStyles.fontTextBold, globalStyles.subtitle, productMissingStyle.opcionText]}>· 3 Piezas </Text>
                </View>

                <View style={productMissingStyle.containerButton}>
                    <Button
                        buttonStyle={[productMissingStyle.botonLista]}
                        title="Lista"
                        type="solid"
                    />
                    <Image style={productMissingStyle.image} source={require('../../../assets/img/waring.png')} />
                </View>

                <View style={productMissingStyle.containerButton}>
                    <Button
                        buttonStyle={[productMissingStyle.botons, productMissingStyle.colorSecondary]}
                        title="Salir"
                        type="solid"
                    />
                    <Button
                        buttonStyle={[productMissingStyle.botons, productMissingStyle.heightButton]}
                        title="Posponer"
                        type="solid"
                    />
                </View>

            </Card>
        </View>
    );
}

