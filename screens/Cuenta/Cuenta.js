/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import styles from './styles';

//import { authentication } from '../../database/Firebase';
import { signOut } from 'firebase/auth';
import firebaseApp from '../../database/Firebase';
import { getAuth } from 'firebase/auth';

const authentication = getAuth(firebaseApp);


export default function Cuenta(props) {
  return (
    <View>
      <View>
        <Text>Sesión iniciada desde cuenta:</Text>
        <Text>{props.correoUsuario}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => signOut(authentication)}>
          <Text style={styles.buttonTitle}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


