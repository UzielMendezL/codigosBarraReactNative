import React from 'react';
import { Card, Button, Input } from 'react-native-elements';
import { View, Text, KeyboardAvoidingView } from 'react-native';

//styles
import globalStyles from '../../styles/EstilosGlobales';
import { FlatList } from 'react-native-gesture-handler';
//Icons
import { Ionicons } from '@expo/vector-icons';

const renderItem = ({ item }) => {
    return (
        <Text style={[globalStyles.separateComponents, globalStyles.fontTextBold, globalStyles.subtitle]}>
            {item}
        </Text>
    )
}

const Complete = (props) => {
    return (
        <KeyboardAvoidingView style={globalStyles.keyboardStyles}>
            <View style={globalStyles.viewContainer}>
                <Card containerStyle={[globalStyles.borderContainerComponents]}>
                    <Input
                        style={[globalStyles.justifyText, globalStyles.borderInputColors]}
                        defaultValue='158264'
                        disabled
                    />
                    <Text style={[globalStyles.fontTextSubtopics]}>Detalle Lectura</Text>
                    <Text style={[, globalStyles.separateComponents, globalStyles.subtitle]}>Cantidad Productos Leídos :</Text>

                    <FlatList data={['15 productos', '18 piezas']}
                        keyExtractor={(index) => { index.toString() }}
                        renderItem={renderItem} 
                    />
                    <View style={[globalStyles.alignIcons]} >
                        <Ionicons name="ios-checkmark-circle" size={84} color="#4caf50" />
                    </View>
                    <Button containerStyle={globalStyles.separateButtons}
                        buttonStyle={[globalStyles.buttonSecondaryStyles]}
                        title='Finalizar'
                    />
                </Card>
            </View>
        </KeyboardAvoidingView>
    )

}

export default Complete;