import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, Image, } from 'react-native-elements';

//styles
import styleFalta from '../../styles/EstilosFaltaMercancia';
import globalStyles from '../../styles/EstilosGlobales';

//icons
import { Entypo } from '@expo/vector-icons';

export default function FaltaMercancia(props) {

    const { navigation, setPedido } = props;
    return (

        <View>
            <Text style={[globalStyles.fontTextSubtopics, globalStyles.justifyText]}>Detalle Lectura</Text>
            <Text style={[, globalStyles.separateComponents, globalStyles.subtitle]}>Cantidad Productos Leídos :</Text>
            <Text style={[globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}>{setPedido.productos} productos</Text>
            <Text style={[globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}> {setPedido.piezas} piezas</Text>
            <View style={[globalStyles.alignIcons]} >
                <Entypo style={styleFalta.image} name="warning" size={94} color="orange" />
            </View>

        </View>

    );
}
