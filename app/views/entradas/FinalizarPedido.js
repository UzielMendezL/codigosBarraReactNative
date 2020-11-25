import React, { useState } from 'react';
import { Button } from 'react-native';

//componentes
import Completada from '../../components/entradas/Completada';
import FaltaMercancia from '../../components/entradas/FaltaMercancia';

const FinalizarPedido = (props) => {

    const [prueba, setPrueba] = useState(true);

    return (
        <>
            {prueba ? (
                <Completada />
            ) : (
                <FaltaMercancia />)
            }
            <Button title='prueba'
                onPress={() => { setPrueba(!prueba) }}
            />
        </>
    );
}

export default FinalizarPedido;