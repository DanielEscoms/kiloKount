import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, DevSettings } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

import firebaseApp from '../../database/Firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const authentication = getAuth(firebaseApp);

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {

        navigation.navigate('Registro')
    }

    const onLoginPress = () => {

        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {

                alert(`Se ha iniciado sesión correctamente.\n\n* E-mail: ${email}`);

                //Aplico una espera de tiempo y reload para volver a cargar la aplicación una vez se haya generado un almacenamiento 
                //en la base de datos, de este modo me evito que hayan errores durante la introducción de alimentos.
                setTimeout(function () {
                    DevSettings.reload();
                }, 3000);
            })
            .catch((error) => {
                alert(`Usuario no registrado.\n\nCompruebe que ha escrito su E-mail y contraseña correctamente.`);
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Iniciar sesión</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>¿No tienes una cuenta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Regístrate</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}