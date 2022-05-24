/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { RANDOM_FACTOR } from '@firebase/util';
import uuid from 'react-native-uuid';

import firebaseApp from '../../database/Firebase';
import { getFirestore, initializeFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const firestore = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});



const AgregaAlimentos = (props) => {
  //llamadas axios a API
  const [alimentoBuscado, setAlimentoBuscado] = useState("");
  const [arrayAlimento, setArrayAlimento] = useState([{"calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": "", "potassium_mg": 0, "protein_g": 0, "serving_size_g": 0, "sodium_mg": 0, "sugar_g": 0}]);
  const [arrayAlimentos, setArrayAlimentos] = useState();
  const [alimentoAgregado, setAlimentoAgregado] = useState([]);
  const [pesoIntroducido, setPesoIntroducido] = useState("");
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
  const [fecha, setFecha] = useState('');
  
  useEffect(()=> {
    let fechaHoy = moment().format('DD/MM/yyyy');
    setFecha(fechaHoy);
    console.log(props.correoUsuario);
    console.log(props.arrayAlimentos);
  }, [])
  
  
  const options = { 
    method: 'GET', 
    url: `https://api.calorieninjas.com/v1/nutrition?query=${alimentoBuscado}`,
    headers: { 'X-Api-Key': 'nLw46OBFPXRZtypyMJcJ6Q==h6CNwrcwmBhXEgOX'},
  };
    
  const getDatos = () => {
    if (alimentoBuscado == '') {
      alert("Requiere un nombre de alimento.");
      return;
    } else if (alimentoBuscado.split(' ').length > 1) {
      alert("Solamente se acepta un alimento.");
      return;
    }

    axios.request(options).then(function (response) {
    //console.log(response.data);
    
    if (response.data.items.length === 0) {
      alert("El alimento buscado no es válido, por favor, pruebe con otro.");
      return;
    }
    setArrayAlimento(response.data.items);
    console.log(arrayAlimento);

    setCalories(response.data.items[0].calories);
    //console.log(response.data.items[0].calories);
    setCarbohidratosTotalG(response.data.items[0].carbohydrates_total_g);
    //console.log(response.data.items[0].carbohydrates_total_g);
    setColesterolMg(response.data.items[0].cholesterol_mg);
    //console.log(response.data.items[0].cholesterol_mg);
    setGrasasSaturadasG(response.data.items[0].fat_saturated_g);
    //console.log(response.data.items[0].fat_saturated_g);
    setGrasasTotalG(response.data.items[0].fat_total_g);
    //console.log(response.data.items[0].fat_total_g);
    setFibraG(response.data.items[0].fiber_g);
    //console.log(response.data.items[0].fiber_g);
    setNombre(response.data.items[0].name);
    //console.log(response.data.items[0].name);
    setPotasioMg(response.data.items[0].potassium_mg);
    //console.log(response.data.items[0].potassium_mg);
    setProteinaG(response.data.items[0].protein_g);
    //console.log(response.data.items[0].protein_g);
    setCantidadG(response.data.items[0].serving_size_g);
    //console.log(response.data.items[0].serving_size_g);
    setSodioMg(response.data.items[0].sodium_mg);
    //console.log(response.data.items[0].sodium_mg);
    setAzucarG(response.data.items[0].sugar_g);
    //console.log(response.data.items[0].sugar_g);
    }).catch(function (error) { 
    console.error(error);
    });
  }

  /*
  Descripción: función creada para que transforme un string a Pascal Case
  Input: string
  Output: string en formato Pascal Case
  */
  const toPascalCase = (str) => {
    return str.replace(/\w\S*/g, m => {return m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()});
  }

  /*function guidGenerator(){
    let S4 = function(){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }*/

  const anyadeFechaYPeso = () => {
    
      let alimentoModificado = {
        date: fecha,
        uid: uuid.v4(),
        calories: arrayAlimento[0].calories*pesoIntroducido/100,
        carbohydrates_total_g: arrayAlimento[0].carbohydrates_total_g*pesoIntroducido/100,
        cholesterol_mg: arrayAlimento[0].cholesterol_mg*pesoIntroducido/100,
        fat_saturated_g: arrayAlimento[0].fat_saturated_g*pesoIntroducido/100,
        fat_total_g: arrayAlimento[0].fat_total_g*pesoIntroducido/100,
        fiber_g: arrayAlimento[0].fiber_g*pesoIntroducido/100,
        name: arrayAlimento[0].name,
        potassium_mg: arrayAlimento[0].potassium_mg*pesoIntroducido/100,
        protein_g: arrayAlimento[0].protein_g*pesoIntroducido/100,
        serving_size_g: pesoIntroducido,
        sodium_mg: arrayAlimento[0].sodium_mg*pesoIntroducido/100,
        sugar_g: arrayAlimento[0].sugar_g*pesoIntroducido/100
      };
      //setAlimentoAgregado(alimentoModificado); sale error por bucle infinito
      //console.log(alimentoAgregado);
      //console.log(alimentoModificado);
      return alimentoModificado;
      
    
  }
  
    function agregarAlimento(e){
      e.preventDefault();
      console.log(pesoIntroducido);
      if (pesoIntroducido>0) {
        let alimentoAAgregar = anyadeFechaYPeso();
        console.log(alimentoAAgregar);

        console.log(props.correoUsuario);
        console.log(props.arrayAlimentos);

        /*console.log(props.arrayProps);
        console.log(props.arrayProps.setArrayAlimentos);
        console.log(props.arrayProps.correoUsuario);
        console.log(props.arrayProps.arrayAlimentos);*/
        
        //A partir de aquí he realizado la prueba

        //funciones por definir, continuar por aquí.
        
        const nuevoArrayAlimentos = [...props.arrayAlimentos, alimentoAAgregar]

        console.log(nuevoArrayAlimentos);
        //actualizar base de datos
        const docReference = doc(firestore, `usuarios/${props.correoUsuario}`);
        updateDoc(docReference, {alimentos: [...nuevoArrayAlimentos] })

        //actualizar estado
        setArrayAlimentos(nuevoArrayAlimentos);

      } else {
        alert("Añade un peso en gramos válido.");
        return;
      }
    }
  
    /*const agregarAlimento = (objetoAlimento) => {
    if (pesoIntroducido>0) {
      let alimentoAAgregar = anyadeFechaYPeso(objetoAlimento);
      console.log(alimentoAAgregar);
      //funciones por definir, continuar por aquí.
    } else return;
  }*/
  
//<Text>{datos[0].calories}</Text>
//<Text>{toPascalCase("name")}</Text>

  return (
    <View style={styles.containerPage}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        
        <View style={styles.container1}>
          <View>
            <Text style={styles.text}>Alimentos: </Text>
            <Input
              placeholder='Introduce el alimento'
              onChangeText={setAlimentoBuscado}
            />
            <View>
              <Button
                title='Consultar Alimento'
                raised={true}
                onPress={getDatos}
              />
            </View>
            {(arrayAlimento[0].name !== '') ? (
              <View>
                <View>
                  <Text>Alimentos encontrados</Text>
                </View>
                {arrayAlimento.map((objetoAlimento)=> {
                  return(
                    <View>
                      <View>
                        <Text>{toPascalCase(objetoAlimento.name)}</Text>
                      </View>
                      <View>
                        <Text style={styles.text}>Cantidad: </Text>
                        <Input
                          placeholder='Introduce el peso en gramos del alimento'
                          keyboardType='decimal-pad'
                          onChangeText={setPesoIntroducido}
                        />
                      </View>
                      <View style={styles.containerButton}>
                        <Button
                          title='Agregar'
                          raised={true}
                          onPress={agregarAlimento}
                        />
                      </View>
                    </View>
                )
                })}

              </View>) : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
//
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

/*

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
<View>
  <Text style={styles.text}>Cantidad: </Text>
  <Input
    placeholder='Introduce el peso en gramos del alimento'
    keyboardType='decimal-pad'
    onChangeText={this.guardaPeso}
  />
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
*/

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

/*
{arrayAlimento.map((objetoAlimento)=> {
  return(
    <View>
      <View>
        <Text>{toPascalCase(objetoAlimento.name)}</Text>
      </View>
      <View>
        <Text style={styles.text}>Cantidad: </Text>
        <Input
          placeholder='Introduce el peso en gramos del alimento'
          keyboardType='decimal-pad'
          onChangeText={setPesoIntroducido}
        />
      </View>
      <View style={styles.containerButton}>
        <Button
          title='Agregar'
          raised={true}
          onClick={agregarAlimento(objetoAlimento)}
        />
      </View>
    </View>
  )
})}*/