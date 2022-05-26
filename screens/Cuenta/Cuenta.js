import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

import firebaseApp from '../../database/Firebase';
import { getAuth, signOut } from 'firebase/auth';

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