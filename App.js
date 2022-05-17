/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Home, Registro } from './screens'

import firebaseApp from './database/Firebase';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const authentication = getAuth(firebaseApp);
const Stack = createStackNavigator();

export default function App() {

  //const [loading, setLoading] = useState(true)
  const [globalUser, setGlobalUser] = useState(null)

  /*Se cambia el usuario global en caso de que se inicie sesión, ya que lo recibe como parámetro y se setea el valor
  en caso de que la sesión no esté iniciada o se cierre sesión, el valor es null*/
  onAuthStateChanged(authentication, (usuarioFirebase) => {
    if(usuarioFirebase) {
      //código en caso de que la sesión esté iniciada
      setGlobalUser(usuarioFirebase);
      //console.log(globalUser.providerData);
    } else {
      //código en caso de que la sesión no esté iniciada (o se cierre sesión)
      setGlobalUser(null);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { globalUser ? (
          <Stack.Screen name="Home" options={{headerShown: false}}>
            {props => <Home userEmail={globalUser.email} {...props} extraData={globalUser} />}
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


//<Stack.Screen name="Home" options={{headerShown: false}} component={Home}/>

/*<Stack.Screen name="Home" options={{headerShown: false}}>
{props => <Home userEmail={globalUser.email} {...props} extraData={globalUser} />}
</Stack.Screen>*/