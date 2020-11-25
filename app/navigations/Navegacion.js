import React, { useEffect, useMemo, useReducer } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import AutenticacionStack from './AutenticacionStack';
import PrincipalStack from './PrincipalStack';

import { AuthContext } from '../core/context';

export default function Navegacion() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RECUPERAR_SESION':
          return {
            ...prevState,
            sesionControl: action.token,
            isLoading: false,
          };
        case 'INICIAR_SESION':
          return {
            ...prevState,
            sesionControl: action.token,
          };
        case 'CERRAR_SESION':
          return {
            ...prevState,
            sesionControl: null,
          };
      }
    },
    {
      isLoading: true,
      sesionControl: null
    }
  );

  useEffect(() => {

    const bootstrapAsync = async () => {

      let sesionControl;

      try {
        sesionControl = await AsyncStorage.getItem('sesionControl')
        sesionControl != null ? JSON.parse(sesionControl) : null;
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'RECUPERAR_SESION', token: sesionControl });

    };

    bootstrapAsync();

  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {

        let sesionControl;

        try {
          sesionControl = JSON.stringify(data)
          await AsyncStorage.setItem('sesionControl', sesionControl)
        } catch (error) {
          console.log(error);
        }

        dispatch({ type: 'INICIAR_SESION', token: sesionControl });

      },
      signOut: async () => {

        try {
          await AsyncStorage.removeItem('sesionControl');
        } catch (error) {
          console.log(error);
        }

        dispatch({ type: 'CERRAR_SESION' })
      }
    }), []);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar backgroundColor="#01579b" barStyle="light-content" />
        <ActivityIndicator size="large" color="#01579b" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.sesionControl == null ?
          <AutenticacionStack />
          :
          <PrincipalStack />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}