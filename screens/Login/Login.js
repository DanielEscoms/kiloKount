/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from '../../database/Firebase';
import { authentication } from '../../database/Firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function LoginScreen({navigation}) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Registro')
    }

    const onLoginPress = () => {
        
        signInWithEmailAndPassword(authentication, email, password)
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

    const onLogoutPress = () => {
        
        signOut(authentication)
        .then((response) => {
            console.log(response);
            setIsSignedIn(false);
        })
        .catch((error) => {
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
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {isSignedIn === true?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLogoutPress()}>
                        <Text style={styles.buttonTitle}>Log out</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity>

                }
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>¿Logueado en este momento? {isSignedIn?"Si":"No"}</Text>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>¿No tienes una cuenta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Regístrate</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}