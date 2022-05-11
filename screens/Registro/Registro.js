/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from '../../database/Firebase';
import { authentication } from '../../database/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

/*import 'firebase/compat/auth';
import 'firebase/compat/firestore';*/

export default function RegistrationScreen({navigation}) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => { //cambiar nombre a alPulsarRegistro
        if (password !== confirmPassword) {
            alert("Las contraseñas no son iguales.")
            return
        }
        /*Llamamos a la API Auth y createUserWithEmailAndPassword de Firebase (línea 25), que 
        crea una nueva cuenta que aparecerá en Firebase Console -> Tabla de autenticación.*/
        
        createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
            console.log(response);
            setIsSignedIn(true);
        })
        .catch((error) => {
            console.log(error);
        })
        /*
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                /*Si el registro de la cuenta fue exitoso, también almacenamos los datos del 
                usuario en Firebase Firestore (línea 24). Esto es necesario para almacenar
                información adicional del usuario, como el nombre completo, la URL de la foto 
                de perfil, etc., que no se puede almacenar en la tabla de autenticación.
                const usersRef = firebase.firestore().collection('users')
                /*Si el registro fue exitoso, navegamos a la pantalla de inicio, 
                pasando también los datos del objeto de usuario.
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            /*Si ocurre algún error, simplemente mostramos una alerta con él. Los 
            errores pueden ser cosas como falta de conexión a la red, contraseña 
            demasiado corta, correo electrónico no válido, etc.
            .catch((error) => {
                alert(error)
        });*/
    }
    
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
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
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}