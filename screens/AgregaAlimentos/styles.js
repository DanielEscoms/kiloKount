/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
//Agrega Alimento
export default StyleSheet.create({
    containerPage: {
        backgroundColor: '#7CFF14',
        flex: 1,
        padding: 8
    },
    container: {
        backgroundColor: '#46FF7A',
        padding: 10
    },
    container1: {
        
    },
    container2: {
        marginTop: 10
    },
    container2Fecha: {
        marginTop: 5,
        borderTopWidth: 0.5,
        paddingTop: 10,
        marginBottom: 5,
    },
    container2Peso: {
        marginTop: 5,
        borderTopWidth: 0.5,
        paddingTop: 10,
        marginBottom: 5,
    },
    container3: {
        
    },
    input: {
        height: 48,
        fontSize: 18,        
        borderRadius: 10,
        borderColor: '#05BB13',
        borderWidth: 2,
        overflow: 'hidden',
        backgroundColor: '#B7F77F',
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 16
    },
    buttonConsultar: {
        backgroundColor: '#2C5FDD',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 10,
        marginBottom: 5,
        height: 48,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 25,
        marginRight: 25
    },
    fecha: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginLeft: 30,
        marginRight: 20
    },
    buttonFecha: {
        backgroundColor: '#2C5FDD',
        marginTop: 10,
        marginBottom: 5,
        height: 48,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonAgregar: {
        backgroundColor: '#2C5FDD',
        marginLeft: 120,
        marginRight: 120,
        width: 130,
        marginTop: 10,
        marginBottom: 5,
        height: 48,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonRefresco: {
        backgroundColor: '#2C5FDD',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 40,
        marginBottom: 5,
        height: 48,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: '#000000'
    }
})