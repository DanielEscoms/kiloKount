import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, DevSettings } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebaseApp from '../../database/Firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const authentication = getAuth(firebaseApp);

export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [camposValidos, setCamposValidos] = useState(false);

    const onFooterLinkPress = () => {
        navigation.navigate('Inicio sesión');
    }

    const compruebaCampos = () => {

        if (fullName == '') {
            alert("Requiere de un nombre de usuario.");
            return;
        } else if (fullName.split(' ').length < 2) {
            alert("Introduzca apellido.");
            return;
        }

        if (email == '') {
            alert("Requiere de un email.");
            return;
        } else if (email.split(' ').length > 1 || !email.includes('@') || !email.split('@')[1].includes('.')) {
            alert("Introduzca un email válido.");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña ha de tener al menos 6 carácteres.");
            return;
        } else if (password !== confirmPassword) {
            alert("Las contraseñas no son iguales.");
            return;
        }

        setCamposValidos(true);
    }

    const onRegisterPress = () => {

        compruebaCampos();

        if (!camposValidos) {
            return
        }

        /*Llamamos a la API Auth y createUserWithEmailAndPassword de Firebase, que 
        crea una nueva cuenta que aparecerá en Firebase Console -> Tabla de autenticación.*/
        createUserWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                console.log(response);
                alert(`Se ha registrado correctamente.\nDatos de la cuenta:\n\n* Nombre: ${fullName}\n\n* E-mail: ${email}`);

                /*Aplico una espera de tiempo y reload para volver a cargar la aplicación una vez se haya generado un almacenamiento 
                en la base de datos, de este modo me evito que hayan errores durante la introducción de alimentos.*/
                setTimeout(function () {
                    DevSettings.reload();
                }, 3000);
            })
            /*Si ocurre algún error, simplemente mostramos una alerta con él. Los 
            errores pueden ser cosas como falta de conexión a la red, contraseña 
            demasiado corta, correo electrónico no válido, etc.*/
            .catch((error) => {
                alert(`No se ha podido realizar el registro.`);
                console.log(error);
            })
    }

    return (
        <View style={styles.containerPage}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                <TextInput
                    style={styles.input}
                    placeholder='Nombre y Apellido(s)'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Contraseña'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirmar contraseña'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Crear cuenta</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Doble click en "Crear cuenta" para registrarse.</Text>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>¿Ya tiene una cuenta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Inicia sesión</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}