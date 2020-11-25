import React from 'react'
import { Card, Button, Input } from 'react-native-elements'
import { View, Text, KeyboardAvoidingView, Image, ScrollView } from 'react-native'

//styles
import globalStyles from '../styles/EstilosGlobales'
import searchProductStyle from '../styles/EstiloConsultaProducto'


const searchProduct = ({ navigation }) => {
    return (
        <KeyboardAvoidingView style={globalStyles.keyboardStyles}>

            <View style={globalStyles.viewContainer} >
                <Card containerStyle={globalStyles.borderContainerComponents}>
                    <Input
                        style={[globalStyles.justifyText, globalStyles.borderInputColors]}
                        defaultValue='630 0250 00'
                        disabled
                    />
                    <Text style={[searchProductStyle.alignText, searchProductStyle.justifyText, globalStyles.fontTextSubtopics]}>Detalle Producto :</Text>
                    <Text style={[searchProductStyle.justifyText, globalStyles.fontTextBold, globalStyles.separateComponents, globalStyles.subtitle]}>Kit de clutch VW Jetta 2016</Text>
                    <Text style={[searchProductStyle.justifyText, globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}>LUK REPSET</Text>

                    <View style={globalStyles.alignComponents}>
                        <Image style={globalStyles.sizeImg}
                            source={{ uri: 'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:good/mg/images/categorias/d-autos/f-autos-refacciones-autopartes/l-refacciones-autopartes-piezas-motor.jpg' }}
                        />
                    </View>
                    <Text style={[searchProductStyle.justifyText, globalStyles.fontTextBold, globalStyles.subtitle]}>Inventario :</Text>
                    <Text style={[searchProductStyle.textNumberPrimary]}>3</Text>

                    <View style={searchProductStyle.alignButtons}>

                        <Button containerStyle={[globalStyles.separateComponents]}
                            buttonStyle={[searchProductStyle.buttonForm, globalStyles.buttonDangerStyles]}
                            title='Salir'
                        />
                        <Button containerStyle={[searchProductStyle.ButtonAlign, globalStyles.separateComponentsButtons]}
                            buttonStyle={[searchProductStyle.buttonForm, globalStyles.buttonSecondaryStyles]}
                            title='Limpiar'
                        />

                    </View>


                </Card>
            </View>

        </KeyboardAvoidingView>
    )

}

export default searchProduct