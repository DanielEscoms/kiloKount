/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
// Login
export default StyleSheet.create({
    containerPage: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#7CFF14'
    },
    input: {
        height: 48,
        fontSize: 16,        
        borderRadius: 5,
        borderColor: '#05BB13',
        borderWidth: 2,
        overflow: 'hidden',
        backgroundColor: '#B7F77F',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#2C5FDD',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#000000'
    },
    footerLink: {
        color: "#2C5FDD",
        fontWeight: "bold",
        fontSize: 16
    }
})