import { DrawerItemList } from '@react-navigation/drawer';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../core/context';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const drawerCustom = (props) => {

    const { signOut } = useContext(AuthContext);
    const [sesionControl, setSesionControl] = useState(null);

    useEffect(() => {

        const getSesionControl = async () => {
            try {

                let sesionControlStorage = await AsyncStorage.getItem('sesionControl')
                sesionControlStorage = JSON.parse(sesionControlStorage);
                setSesionControl(sesionControlStorage[0]);
            } catch (e) {
                console.log(e);
            }
        }

        getSesionControl();
    }, []);

    return (

        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            {
                sesionControl != null
                    ?
                    <View>

                        <View style={{
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#A0A0A0'
                        }}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 30
                            }}>
                                <Image source={require('../../../assets/img/logo.png')} />
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19 }}>
                                    {sesionControl.nombre}
                                </Text>

                                <Text style={{ textAlign: 'center', fontSize: 15, color: '#2196f3', paddingVertical: 5, }}>
                                    {sesionControl.Alias}
                                </Text>
                            </View>
                        </View>
                        <DrawerItemList {...props} />
                        <Divider />
                        <Button
                            iconRight
                            icon={<MaterialCommunityIcons
                                style={{ left: 10 }}
                                name="logout"
                                size={24}
                                color="white" />}
                            onPress={() => signOut()}
                            buttonStyle={{ backgroundColor: '#e57373', color: 'white' }}
                            containerStyle={{ paddingTop: 10, left: 10, width: '93%' }}
                            title='Cerrar Sesión'
                        />
                    </View>
                    :
                    <></>
            }
        </View>
    )

}

export default drawerCustom;