import { StyleSheet } from 'react-native'

//azul oscuro
const colorOscuro = '#002f6c'

//azul empresarial
const colorPrimario = '#01579b'

//azul claro
const colorSecundario = '#4f83cc'

//Text----------------------------
//el tamaño del texto es opcional
// Texto grande
const txtGrande = 20
// Texto mediano
const txtMediano = 18
// Texto chico
const txtChico = 10

//colorText----------------------------

const blackText = '#000000'

const whiteText = '#ffffff'

//colorGlobal--------------------------

const balckColor = '#000000'

const white = '#ffffff'

const greenColor = '#4caf50'

const redColor = '#9b0000'

export default StyleSheet.create({
    keyboardStyles: {
        flex: 1
    },
    viewContainer:
    {
        padding: 0,
        flex: 1,
        justifyContent: "flex-start"
    },
    buttonPrimaryStyles:
    {
        backgroundColor: colorOscuro,
    },
    buttonDangerStyles:
    {
        backgroundColor: redColor,
        color: whiteText,

    },
    buttonSecondaryStyles:
    {
        backgroundColor: greenColor,
    },
    borderInputColors:
    {
        borderColor: '#41579b',
        borderWidth: 2,
        borderRadius: 2
    },
    containerButtonLetters:
    {
        color: whiteText
    },
    title:
    {
        fontSize: 18
    },
    subtitle:
    {
        fontSize: 17,

    },
    fontTextBold:
    {
        fontWeight: 'bold'
    },
    fontTextSubtopics:
    {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 19
    },
    borderContainerComponents:
    {
        borderRadius: 25,
    },
    borderContainerComponent:
    {
        alignItems: 'center',
        borderRadius: 25,
    },
    sizeImg:
    {
        width: 100,
        height: 100,
        borderRadius: 30
    },
    justifyText:
    {
        textAlign: 'center'
    },
    separateComponents:
    {
        paddingTop: 18
    },
    separateComponentsButtons:
    {
        paddingTop: 50
    },
    separateButtons:
    {
        paddingTop: 10
    },
    buttonFormGlobal:
    {
        height: 50,
        width: 300,
        paddingHorizontal: 5,
        paddingLeft: 7,
        borderRadius: 25,
    },
    alignComponents:
    {
        alignItems: 'center'
    },
    alignIcons:
    {
        top: 1,
        alignItems: 'center'
    },
    buttonPrimaryColor:
    {
        backgroundColor: colorOscuro,
    },
})
