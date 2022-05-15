/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import styles from './styles';

export default function Cuenta(){
  return(
    <View>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <Text>Hola mundo desde Cuenta</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signOut(authentication)}>
        <Text style={styles.buttonTitle}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}


