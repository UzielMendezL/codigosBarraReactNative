import React from 'react';
import { Card, Button, Input, } from 'react-native-elements';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

//styles
import globalStyles from '../../styles/EstilosGlobales';
import entryPrincipalStyles from '../../styles/EstiloEntradaPrincipal';


const ValidarPedido = (props) => {

    const { navigation } = props;

    const renderItem = ({ item }) => {
        return (
            <Text style={[globalStyles.fontTextBold, globalStyles.subtitle]}>
                {item}
            </Text>
        )
    }

    return (
        <KeyboardAvoidingView style={globalStyles.keyboardStyles}>

            <View style={globalStyles.viewContainer}>
                <Card containerStyle={globalStyles.borderContainerComponents}>
                    <View style={{ width: 250, height: 49, }}>
                        <Input keyboardType='numeric' placeholder="Nº. de Pedido" />
                    </View>
                    <Button buttonStyle={[globalStyles.buttonPrimaryStyles, entryPrincipalStyles.borderButtons]}
                        title='Validar'
                    />
                    <Text style={[globalStyles.fontTextSubtopics, entryPrincipalStyles.titlePadding]}>Detalles</Text>
                    <Text style={[globalStyles.title, entryPrincipalStyles.titlePadding]}>Proveedor:</Text>
                    <Text style={[globalStyles.fontTextBold, globalStyles.subtitle]}>Schaeffler</Text>
                    <Text style={[globalStyles.title, entryPrincipalStyles.titlePadding]}>Fecha:</Text>
                    <Text style={[globalStyles.fontTextBold, globalStyles.subtitle]}>15/08/20</Text>
                    <Text style={[globalStyles.title, entryPrincipalStyles.titlePadding]}>Cantidad de Productos:</Text>
                    <FlatList data={['5 productos', '15 piezas']}
                        keyExtractor={(item, index) => item + index}
                        renderItem={renderItem}
                    />

                    <Button onPress={() => navigation.navigate('escanearProducto')}
                        containerStyle={entryPrincipalStyles.titlePadding}
                        buttonStyle={[globalStyles.buttonSecondaryStyles, entryPrincipalStyles.borderButtons]}
                        title="Escanear"
                    />

                </Card>
            </View>

        </KeyboardAvoidingView>
    )
}

export default ValidarPedido;

