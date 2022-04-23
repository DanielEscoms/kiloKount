/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AgregaAlimentos = () => {
  //llamadas axios a API
  //const [datos, setDatos] = useState();
  const [imagenPerro, setImagenPerro] = useState();
  
  useEffect(() =>{
    getDatos();
  },[])
  
  const getDatos = async() => {
    const resultado = await axios.get('https://dog.ceo/api/breeds/image/random');
    setImagenPerro(resultado.data.message);
    console.log('imagen del Perro: ', imagenPerro);
  }
  return (
    <View style={styles.containerPage}>
      <View style={styles.container1}>
        <View>
          <Text style={styles.text}>Alimento: </Text>
          <Input
            placeholder='Introduce el alimento'
            onChangeText={this.guardaPeso}
          />
        </View>
        <View>
          <Button
            title='Consultar Alimento'
            raised={true}
            onPress={this.calculaIMC}
          />
        </View>
        <View>
          <Text style={styles.text}>Cantidad: </Text>
          <Input
            placeholder='Introduce el peso del alimento'
            keyboardType='decimal-pad'
            onChangeText={this.guardaPeso}
          />
        </View>
      </View>
      <View style={styles.containerButton}>
        <Button
          title='Agregar'
          raised={true}
          onPress={this.calculaIMC}
        />
      </View>
      <View style={styles.layout}>
        <Image
          style = {styles.avatar}
          source={{uri : imagenPerro}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerPage:{
    backgroundColor: '#7CFF14',
    flex:1,
    padding: 10,
  },
  container1:{
    backgroundColor: '#46FF7A',
    padding: 10,
  },
  text:{
    fontSize: 25,
  },
  containerButton:{
    padding: 10,
  },
  avatar: {
    height: 128,
    width: 128,
    borderRadius: 15,
    alignSelf: 'center',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default AgregaAlimentos;

/*import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, StyleSheet, View } from 'react-native';

const Pantalla3 = () => {
  //llamadas axios a API
  //const [datos, setDatos] = useState();

  const [imagenPerro, setImagenPerro] = useState();
  
  useEffect(() =>{
    getDatos();
  },[])
  
  const getDatos = async() => {
    const resultado = await axios.get('https://dog.ceo/api/breeds/image/random');
    setImagenPerro(resultado.data.message);
    console.log('imagen del Perro: ', imagenPerro);
  }
  
  return (
    <View style={styles.layout}>
      <Image
        style = {styles.avatar}
        source={{uri : imagenPerro}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    height: 128,
    width: 128,
    borderRadius: 15,
    alignSelf: 'center',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default Pantalla3;
*/