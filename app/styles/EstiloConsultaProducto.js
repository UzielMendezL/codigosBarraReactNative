import { StyleSheet } from 'react-native'

export default StyleSheet.create(
    {
        containerButtons:
        {
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        ButtonAlign:
        {
            position: 'absolute',
            left: 150,
            paddingVertical: 35
        },
        textNumberPrimary:
        {
            color: '#b2fab4',
            fontSize: 40,
            position: 'absolute',
            right: '40%',
            top: -45,
        },
        textNumberSecondary:
        {
            color: 'red',
            fontSize: 40,
            position: 'absolute',
            right: '40%',
            top: -45,
        },
        alignText:
        {
            top: 1,
        },
        justifyText:
        {
            paddingLeft: 7
        },
        separateComponentImg : 
        {
            paddingTop: 15
        },
        buttonForm:
        {
            height: 40,
            width: 100,
            paddingHorizontal: 5,
            paddingLeft: 7,
            borderRadius: 15,
        },
        alignButtons:
        {
            justifyContent: 'center',
            alignItems: 'center'
        },
        hideComponents : 
        {
            opacity: 0
        }
        ,
        backGroundImg: 
        {
            backgroundColor: 'white'
        },
        photoStyles: { 
            height: "100%",
            width: "100%",
            opacity: 1,
            backgroundColor: 'gray'
        }
    })