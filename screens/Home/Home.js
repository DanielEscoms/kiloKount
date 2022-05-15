/* eslint-disable prettier/prettier */
import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//import AgregaAlimentos from './screens/AgregaAlimentos/AgregaAlimentos';
//import Pagina2 from './screens/Pagina2/Pagina2';
import { AgregaAlimentos, Pagina2, Cuenta } from '../'

import styles from './styles';

import firebase from '../../database/Firebase';
import { authentication } from '../../database/Firebase';
import { signOut } from 'firebase/auth';



export default function HomeScreen(props) {
  const Drawer = createDrawerNavigator();
  
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



