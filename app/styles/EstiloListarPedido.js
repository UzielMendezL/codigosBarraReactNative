import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({

    scrollViewContainer: {
        width: "100%",
        height: "96%"
    },
    text1: {
        width: '50%',
        color: "#FFF"
    },
    text2: {
        width: '25%',
        color: "#FFF",
        textAlign: "right"
    },
    viewTextContainer: {
        width: "100%",
        height: 30,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#01579b",
        paddingHorizontal: "2%"
    },
    viewPrincipal: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 10,
        alignContent: 'center'
    },
    viewSecondary: {
        width: "90%",
        marginHorizontal: '5%'
    },
    text3: {
        width: '25%',
        textAlign: "right",
        textAlignVertical: 'bottom'
    },
    text4: {
        width: '50%'
    }
});