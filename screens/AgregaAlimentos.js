/* eslint-disable quotes */
/* eslint-disable no-undef */
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
  const [alimentoBuscado, setAlimentoBuscado] = useState("potato");
  const [datos, setDatos] = useState([]);
  const [calories, setCalories] = useState("");
  const [carbohiratosTotalG, setCarbohidratosTotalG] = useState("");
  const [colesterolMg, setColesterolMg] = useState("");
  const [grasasSaturadasG, setGrasasSaturadasG] = useState("");
  const [grasasTotalG, setGrasasTotalG] = useState("");
  const [fibraG, setFibraG] = useState("");
  const [nombre, setNombre] = useState("");
  const [potasioMg, setPotasioMg] = useState("");
  const [proteinaG, setProteinaG] = useState("");
  const [cantidadG, setCantidadG] = useState("");
  const [sodioMg, setSodioMg] = useState("");
  const [azucarG, setAzucarG] = useState("");
  //const [imagenPerro, setImagenPerro] = useState();
  
  /*useEffect(() =>{
    getDatos();
  },[])*/
  
  
  /*const getDatos = () => {
    $.ajax({
      method: 'GET',
      url: `https://api.calorieninjas.com/v1/nutrition?query=${alimentoBuscado}`,
      headers: { 'X-Api-Key': 'nLw46OBFPXRZtypyMJcJ6Q==h6CNwrcwmBhXEgOX'},
      contentType: 'application/json',
      success: function(result) {
          console.log(result);
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      },
    });
  }*/
  
  const options = { 
    method: 'GET', 
    url: `https://api.calorieninjas.com/v1/nutrition?query=${alimentoBuscado}`,
    headers: { 'X-Api-Key': 'nLw46OBFPXRZtypyMJcJ6Q==h6CNwrcwmBhXEgOX'},
  };
    
  const getDatos = () => {
    axios.request(options).then(function (response) {
    console.log(response.data);
    setDatos(response.data.items);
    console.log(response.data.items);
    setCalories(response.data.items[0].calories);
    console.log(response.data.items[0].calories);
    setCarbohidratosTotalG(response.data.items[0].carbohydrates_total_g);
    console.log(response.data.items[0].carbohydrates_total_g);
    setColesterolMg(response.data.items[0].cholesterol_mg);
    console.log(response.data.items[0].cholesterol_mg);
    setGrasasSaturadasG(response.data.items[0].fat_saturated_g);
    console.log(response.data.items[0].fat_saturated_g);
    setGrasasTotalG(response.data.items[0].fat_total_g);
    console.log(response.data.items[0].fat_total_g);
    setFibraG(response.data.items[0].fiber_g);
    console.log(response.data.items[0].fiber_g);
    setNombre(response.data.items[0].name);
    console.log(response.data.items[0].name);
    setPotasioMg(response.data.items[0].potassium_mg);
    console.log(response.data.items[0].potassium_mg);
    setProteinaG(response.data.items[0].protein_g);
    console.log(response.data.items[0].protein_g);
    setCantidadG(response.data.items[0].serving_size_g);
    console.log(response.data.items[0].serving_size_g);
    setSodioMg(response.data.items[0].sodium_mg);
    console.log(response.data.items[0].sodium_mg);
    setAzucarG(response.data.items[0].sugar_g);
    console.log(response.data.items[0].sugar_g);
    }).catch(function (error) { 
    console.error(error);
    });
  }


  return (
    <View style={styles.containerPage}>
      <View style={styles.container1}>
        <View>
          <Text style={styles.text}>Alimento: </Text>
          <Input
            placeholder='Introduce el alimento'
            onChangeText={setAlimentoBuscado}
          />
          <Text>{alimentoBuscado}</Text>
          <Text>{calories}</Text>
          <Text>{carbohiratosTotalG}</Text>
          <Text>{colesterolMg}</Text>
          <Text>{grasasSaturadasG}</Text>
          <Text>{grasasTotalG}</Text>
          <Text>{fibraG}</Text>
          <Text>{nombre}</Text>
          <Text>{potasioMg}</Text>
          <Text>{proteinaG}</Text>
          <Text>{cantidadG}</Text>
          <Text>{sodioMg}</Text>
          <Text>{azucarG}</Text>
        </View>
        <View>
          <Button
            title='Consultar Alimento'
            raised={true}
            onPress={getDatos}
          />
        </View>
        <View>
          <Text style={styles.text}>Cantidad: </Text>
          <Input
            placeholder='Introduce el peso en gramos del alimento'
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