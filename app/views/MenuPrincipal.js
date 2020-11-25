import React from 'react';
import { View, ToastAndroid, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

//Style
import EstiloMenu from '../styles/EstiloMenu';
import { LinearGradient } from 'expo-linear-gradient';

//Component.
const BotonMenu = (props) => {
    const { text, nameIcon, onPress } = props;

    return (
        
        <View style={EstiloMenu.containerBoton}>
            <TouchableOpacity style={EstiloMenu.touchableOpacityBoton}
                onPress={onPress}
            >
                <LinearGradient
                    colors={['#FFF', '#FFF']}
                    style={EstiloMenu.LinearGradientBoton}
                >
                    <Icon
                        style={{ paddingHorizontal: '25%' }}
                        type={"material-community"}
                        name={nameIcon}
                        size={60}
                        color="#01579b"
                    />
                    
                    <Text style={EstiloMenu.textBoton}>
                        {text}
                    </Text>

                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default function MenuPrincipal(props){

    const { route, navigation, } = props;

    if (route.params != undefined) {
        const { statusOrder } = route.params;
        if (statusOrder) {
            ToastAndroid.show("El pedido ha sido actualizado", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>

                    <BotonMenu
                        text={'Entradas'}
                        nameIcon={"truck-check"}
                    />

                    <BotonMenu
                        text={'Salidas'}
                        nameIcon={"forklift"}
                        onPress={() => navigation.navigate('salidasStack',{screen: 'validarPedido'})}
                    />

                    <BotonMenu
                        text={'Consultas'}
                        nameIcon={"magnify"}
                        onPress={() => navigation.navigate('consultaProducto')}
                    />

                    <BotonMenu
                        text={'Conteo'}
                        nameIcon={"playlist-check"}
                    />

                </View>
            </View>
        </View>
    )
}