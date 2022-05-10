/* eslint-disable prettier/prettier */
import React from 'react'
import { Text, View } from 'react-native'

export default function HomeScreen(props) {
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/*import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AgregaAlimentos from './screens/AgregaAlimentos/AgregaAlimentos';
import Pagina2 from './screens/Pagina2/Pagina2';

import firebase from './database/Firebase';

const Drawer = createDrawerNavigator();
const App = () => (
  <NavigationContainer independent={true}>
    <Drawer.Navigator options="false" initialRouteName="Agrega Alimentos" style={styles.container}>
      <Drawer.Screen name="Agrega Alimentos" component={AgregaAlimentos}/>
      <Drawer.Screen name="Pagina 2" component={Pagina2}/>
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;*/