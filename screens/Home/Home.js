import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AgregaAlimentos, Recuento, Cuenta } from '../';
import styles from './styles';

import firebaseApp from '../../database/Firebase';
import { initializeFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firestore = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});

export default function HomeScreen(props) {
  const Drawer = createDrawerNavigator();

  const fakeData = [{ "calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "date": " ", "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": " ", "potassium_mg": 0, "protein_g": 0, "serving_size_g": " ", "sodium_mg": 0, "sugar_g": 0, "uid": "1" }];

  const [arrayAlimentos, setArrayAlimentos] = useState(null);
  const [correoUsuario, setCorreoUsuario] = useState(props.globalUser.email);
  const [boleano, setBoleano] = useState(true);


  async function findDocOrCreateDoc(userEmail) {
    //crear una referencia al documento
    const docReference = doc(firestore, `usuarios/${userEmail}`);

    // buscar documento (query === consulta)
    const query = await getDoc(docReference);

    //revisar si existe
    if (query.exists()) {
      //si sí existe
      const docInformation = query.data();
      return docInformation.alimentos;
    } else {
      //si no existe
      await setDoc(docReference, { alimentos: [...fakeData] });
      const query = await getDoc(docReference);
      return docInformation.alimentos;
    }
  }

  /* Al montarse la pantalla se corre el useEffect, nos busca la tareas, las guarda en el estado*/
  useEffect(() => {
    async function fetchAlimentos() {
      
      const alimentosFetchados = await findDocOrCreateDoc(props.globalUser.email);
      setArrayAlimentos(alimentosFetchados);
      setBoleano(false);
    };

    if (boleano) {
      fetchAlimentos();
    }
  }, [arrayAlimentos])

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator options="false" initialRouteName="Recuento kcal" style={styles.container}>
        <Drawer.Screen name="Recuento kcal">
          {props => <Recuento {...props} correoUsuario={correoUsuario} arrayAlimentos={arrayAlimentos} />}
        </Drawer.Screen>
        <Drawer.Screen name="Agrega Alimentos">
          {props => <AgregaAlimentos {...props} correoUsuario={correoUsuario} arrayAlimentos={arrayAlimentos} />}
        </Drawer.Screen>
        <Drawer.Screen name="Cuenta">
          {props => <Cuenta {...props} correoUsuario={correoUsuario} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}