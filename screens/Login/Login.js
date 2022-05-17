/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

import firebaseApp from '../../database/Firebase';
import { getAuth } from 'firebase/auth';

//import { authentication } from '../../database/Firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const authentication = getAuth(firebaseApp);

export default function LoginScreen({navigation}) {
    //const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Registro')
    }

    const onLoginPress = () => {
        
        signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
            console.log(response);
            //alert(`Se ha registrado correctamente.\nDatos de la cuenta:\n\n* Nombre: ${fullName}\n\n* E-mail: ${email}`);
            //setIsSignedIn(true);
        })
        .catch((error) => {
            alert(`Usuario no registrado.\n\nCompruebe que ha escrito su E-mail y contraseña correctamente.`);
            console.log(error);
        })
        
        /*
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
        })*/
    }

    /*const onLogoutPress = () => {
        
        signOut(authentication)
        .then((response) => {
            console.log(response);
            //setIsSignedIn(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }*/

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
/*
{isSignedIn === true?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLogoutPress()}>
                        <Text style={styles.buttonTitle}>Cerrar sesión</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Iniciar sesión</Text>
                    </TouchableOpacity>
<View style={styles.footerView}>
                    <Text style={styles.footerText}>¿Logueado en este momento? {isSignedIn?"Si":"No"}</Text>
                </View>
                }*/