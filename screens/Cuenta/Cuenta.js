import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import firebaseApp from '../../database/Firebase';
import { getAuth, signOut } from 'firebase/auth';

const authentication = getAuth(firebaseApp);

export default function Cuenta(props) {
  return (
    <View style={styles.containerPage}>
      <Text style={styles.text}>Sesión iniciada desde la cuenta:</Text>
      <Text style={styles.text}>{props.correoUsuario}</Text>
      <TouchableOpacity
          style={styles.buttonCerrar}
          onPress={() => signOut(authentication)}>
          <Text style={styles.buttonTitle}>Cerrar sesión</Text>
        </TouchableOpacity>
    </View>
  );
}