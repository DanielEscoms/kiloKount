/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
//Recuento
export default StyleSheet.create({
    containerPage: {
        backgroundColor: '#7CFF14',
        flex: 1,
        padding: 8
    },
    container1: {
        padding: 5
    },
    container1Refresco: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomWidth: 0.5
    },
    container: {
        backgroundColor: '#46FF7A',
        padding: 10
    },
    container1Fecha1: {
        marginTop: 5,
        paddingTop: 5,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 240,
        alignItems: 'center'
    },
    container1Fecha2: {
        paddingTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 240,
        alignItems: 'center'
    },
    containerAlimento: {
        marginTop: 7,
        borderBottomWidth: 0.5,
        paddingBottom: 7,
        paddingRight: 5,
        paddingLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 20,
        marginRight: 20
    },
    buttonFecha: {
        backgroundColor: '#2C5FDD',
        height: 48,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonRefresco: {
        backgroundColor: '#2C5FDD',
        width: 135,
        marginTop: 5,
        marginBottom: 5,
        height: 48,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonEliminar: {
        backgroundColor: '#2C5FDD',
        width: 110,
        marginTop: 5,
        marginBottom: 5,
        height: 48,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTotal: {
        backgroundColor: '#2C5FDD',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 5,
        marginBottom: 5,
        height: 48,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: '#000000'
    },
    textRefresco: {
        fontSize: 20,
        color: '#000000',
        width: 240
    },
    textRecuento: {
        fontSize: 20,
        backgroundColor: '#46FF7A',
        color: '#000000',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-around'
    },
    textKcal: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
})