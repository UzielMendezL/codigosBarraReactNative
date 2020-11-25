import React from 'react';
import { View, Text, } from 'react-native';

//styles
import globalStyles from '../../styles/EstilosGlobales';

//Icons
import { Ionicons } from '@expo/vector-icons';

const Complete = (props) => {
  const {setPedido } = props;
    return (
            <View>
                    <Text style={[globalStyles.fontTextSubtopics, globalStyles.justifyText]}>Detalle Lectura</Text>
                    <Text style={[, globalStyles.separateComponents, globalStyles.subtitle]}>Cantidad Productos Leídos :</Text>
                     <Text style={[globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}>{setPedido.productos} productos</Text>
                     <Text style={[globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}> {setPedido.piezas} piezas</Text>
                    <View style={[globalStyles.alignIcons]} >
                        <Ionicons name="ios-checkmark-circle" size={84} color="#4caf50" />
                    </View>
            </View>
    )

}

export default Complete;