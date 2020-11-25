import React, { useState, useContext, useRef } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Image, ToastAndroid, Text, } from 'react-native';
import base64 from 'react-native-base64';
import NetInfo from '@react-native-community/netinfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//Styles
import Styles from '../styles/EstilosInicioSesion';

// HTTP Client
import Request from '../core/http';
const request = new Request();

import { AuthContext } from '../core/context';

export default function IniciarSesion() {

    const { signIn } = useContext(AuthContext);

    var [errors, validate] = useState(
        {
            isErrorUser: false,
            isErrorPass: false
        }
    );

    const [errorUser, ErrorInputUser] = useState(false);
    const [messageErrorUser, setMessageUser] = useState('');
    const [messageErrorPass, setMessagePass] = useState('');

    const [formData, setFormData] = useState(defaultFormLogin());
    const [mostrarPassword, setMostrarContraseña] = useState(false);
    const [loading, setLoading] = useState(false);

    const TextInput2 = useRef();

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })

        if (type == 'usuario') {
            validateInputName(e.nativeEvent.text);
        }
        validateInputPass(e.nativeEvent.text);
    }

    const validateInputName = (value) => {

        if (value == '') {

            setMessageUser('Ingresa un usuario');
            ErrorInputUser(true);

        } else {
            ErrorInputUser(false);
        }
    }

    const validateInputPass = (value) => {
        if (value == '') {

            setMessagePass('Ingresa una contraseña ');
            return validate({ isErrorPass: true });

        }

        return validate({ isErrorPass: false });
    }

    const onPress = async () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected == false) {
                return ToastAndroid.show("Upss... revisa tu conexión de internet", ToastAndroid.SHORT);
            }
        });

        if (!formData.usuario || !formData.contraseña) {

            validate({
                isErrorPass: true
            });

            ErrorInputUser(true);
            setMessageUser('Ingresa un usuario correctamente');
            setMessagePass('Ingresa una contraseña correctamente');

        } else {

            setLoading(true);

            const data = {
                usuario: formData.usuario,
                password: base64.encode(formData.contraseña)
            }

            const response = await request.post('/usuariosapp/login', data);

            if (response.error) {
                setLoading(false);
                ToastAndroid.show("Error al iniciar sesión", ToastAndroid.SHORT);
            } else {
                setLoading(false);
                const sesionControl = response.records;
                signIn(sesionControl);
            }
            
        }
    }

    return (

        <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>

            <View style={Styles.container}>

                <View style={Styles.header}>
                    <View style={Styles.containerImg} >
                        <Image
                            source={require('../../assets/img/logobetablanco.png')}
                            style={Styles.sizeImg}
                            resizeMode={"contain"}

                        />
                    </View>
                </View>


                <View style={Styles.footer}>
                    <Text style={{ color: '#01579b', fontSize: 25, textAlign: 'center' }}>Bienvenido</Text>

                    <Input
                        autoFocus={true}
                        style={Styles.input}
                        errorStyle={!errorUser ? Styles.errorInputMessage : null}
                        errorMessage={messageErrorUser}
                        blurOnSubmit={false}
                        placeholder='Usuario'
                        onSubmitEditing={ ()=> TextInput2.current.focus() }
                        returnKeyType={'next'}
                        onChange={(e) => onChange(e, "usuario")}
                        leftIcon={
                            <Icon
                                type={"simple-line-icon"}
                                name={"user"}
                            />
                        }
                    />

                    <Input
                        ref={TextInput2}
                        errorStyle={!errors.isErrorPass ? Styles.errorInputMessage : null}
                        errorMessage={messageErrorPass}
                        blurOnSubmit={true}
                        placeholder={'Contraseña'}
                        style={Styles.input}
                        password={true}
                        returnKeyType={"go"}
                        onSubmitEditing={onPress}
                        secureTextEntry={mostrarPassword ? false : true}
                        onChange={(e) => onChange(e, "contraseña")}
                        leftIcon={
                            <Icon
                                type={"material-community"}
                                name={"lock-outline"}
                            />
                        }
                        rightIcon={
                            <Icon
                                type={"material-community"}
                                name={mostrarPassword ? "eye-off-outline" : "eye-outline"}
                                onPress={() => setMostrarContraseña(!mostrarPassword)}
                            />
                        }
                    />

                    <Button
                        onPress={onPress}
                        containerStyle={Styles.separateButtonContainer}
                        buttonStyle={Styles.buttonContainer}
                        raised
                        title={"Iniciar Sesión"}
                        type={"solid"}
                        loading={loading}
                    />

                </View>

            </View>
        </KeyboardAwareScrollView>
    );
}

function defaultFormLogin() {
    return {
        usuario: "",
        contraseña: ""
    }
}
