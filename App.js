import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Home, Registro } from './screens';

import firebaseApp from './database/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LogBox } from "react-native";

/* Antes de introducir esta función me he cerciorado de que todos los logs que salían fueran
corregidos, lo he introducido por controlar un warning de async que no lo he podido eliminar.*/
LogBox.ignoreAllLogs();

//Para que no aparezca el siguiente error: Can't find a variable atob
import { decode, encode } from 'base-64';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const authentication = getAuth(firebaseApp);
const Stack = createStackNavigator();

export default function App() {

  const [globalUser, setGlobalUser] = useState(null)

  /*Se cambia el usuario global en caso de que se inicie sesión, ya que lo recibe como parámetro y se setea el valor
  en caso de que la sesión no esté iniciada o se cierre sesión, el valor es null*/
  onAuthStateChanged(authentication, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //código en caso de que la sesión esté iniciada
      setGlobalUser(usuarioFirebase);
    } else {
      //código en caso de que la sesión no esté iniciada (o se cierre sesión)
      setGlobalUser(null);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {globalUser ? (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {props => <Home {...props} globalUser={globalUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Inicio sesión" component={Login} />
            <Stack.Screen name="Registro" component={Registro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}