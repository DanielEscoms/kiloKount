/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//import AgregaAlimentos from './screens/AgregaAlimentos/AgregaAlimentos';
//import Pagina2 from './screens/Pagina2/Pagina2';
import { AgregaAlimentos, Pagina2, Cuenta } from '../'
import styles from './styles';

import { getAuth } from 'firebase/auth';
import firebaseApp from '../../database/Firebase';
import { getFirestore, initializeFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Consumer } from 'react-native-paper/lib/typescript/core/settings';
import { async } from '@firebase/util';

const authentication = getAuth(firebaseApp);
//firebaseApp.firestore().settings({ experimentalForceLongPolling: true});
//const firestore = getFirestore(firebaseApp);
const firestore = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});


//import { signOut } from 'firebase/auth';



export default function HomeScreen(props) {
  const Drawer = createDrawerNavigator();
  //  console.log(props.extraData.email);

  const [arrayAlimentos, setArrayAlimentos] = useState(null);
 
  const fakeData = [
    {"calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": "", "potassium_mg": 0, "protein_g": 0, "serving_size_g": 0, "sodium_mg": 0, "sugar_g": 0}
  ];
 

  async function findDocOrCreateDoc(idDocument){
    //crear una referencia al documento
    const docReference = doc(firestore, `usuarios/${idDocument}`);

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

  /*
  Al montarse la pantalla se corre el useEffect, nos busca la tareas, las guarda en el estado
  */
  useEffect(()=> {
    async function fetchAlimentos(){
      const alimentosFetchados = await findDocOrCreateDoc(props.extraData.email);
      setArrayAlimentos(alimentosFetchados);
    };

    fetchAlimentos();
  }, [])

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator options="false" initialRouteName="Agrega Alimentos" style={styles.container}>
        <Drawer.Screen name="Agrega Alimentos" component={AgregaAlimentos}/>
        <Drawer.Screen name="Pagina 2" component={Pagina2}/>
        <Drawer.Screen name="Cuenta" component={Cuenta}/>
      </Drawer.Navigator>
    </NavigationContainer>
    )
}



