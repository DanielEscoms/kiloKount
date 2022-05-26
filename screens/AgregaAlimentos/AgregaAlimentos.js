import * as React from 'react';
import { Text, StyleSheet, View, DevSettings } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import uuid from 'react-native-uuid';

import firebaseApp from '../../database/Firebase';
import { initializeFirestore, doc, updateDoc } from 'firebase/firestore';

const firestore = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});

const AgregaAlimentos = (props) => {
  //llamadas axios a API
  const [alimentoBuscado, setAlimentoBuscado] = useState("");
  const [arrayAlimento, setArrayAlimento] = useState([{ "calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": "", "potassium_mg": 0, "protein_g": 0, "serving_size_g": 0, "sodium_mg": 0, "sugar_g": 0 }]);
  const [arrayAlimentos, setArrayAlimentos] = useState([{ "calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "date": " ", "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": " ", "potassium_mg": 0, "protein_g": 0, "serving_size_g": " ", "sodium_mg": 0, "sugar_g": 0, "uid": "1" }]);
  const [pesoIntroducido, setPesoIntroducido] = useState("");
  const [fecha, setFecha] = useState(moment().format('DD/MM/yyyy'));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {

    setArrayAlimentos(props.arrayAlimentos);
  }, [props.arrayAlimentos])

  const onChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let mesCifra = tempDate.getMonth() + 1;
    if (mesCifra < 10) {
      mesCifra = '0' + mesCifra.toString();
    }

    let fDate = tempDate.getDate() + '/' + mesCifra + '/' + tempDate.getFullYear();
    setFecha(fDate);
  }

  const showMode = (currentMode) => {

    setShow(true);
    setMode(currentMode);
  }

  const options = {

    method: 'GET',
    url: `https://api.calorieninjas.com/v1/nutrition?query=${alimentoBuscado}`,
    headers: { 'X-Api-Key': 'nLw46OBFPXRZtypyMJcJ6Q==h6CNwrcwmBhXEgOX' },
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

      if (response.data.items.length === 0) {
        alert("El alimento buscado no es válido, por favor, pruebe con otro.");
        return;
      }

      setArrayAlimento(response.data.items);
      
    }).catch(function (error) {
      console.log(error);
    });
  }

  const anyadeFechaYPeso = () => {

    let alimentoModificado = {
      date: fecha,
      uid: uuid.v4(),
      calories: arrayAlimento[0].calories * pesoIntroducido / 100,
      carbohydrates_total_g: arrayAlimento[0].carbohydrates_total_g * pesoIntroducido / 100,
      cholesterol_mg: arrayAlimento[0].cholesterol_mg * pesoIntroducido / 100,
      fat_saturated_g: arrayAlimento[0].fat_saturated_g * pesoIntroducido / 100,
      fat_total_g: arrayAlimento[0].fat_total_g * pesoIntroducido / 100,
      fiber_g: arrayAlimento[0].fiber_g * pesoIntroducido / 100,
      name: arrayAlimento[0].name,
      potassium_mg: arrayAlimento[0].potassium_mg * pesoIntroducido / 100,
      protein_g: arrayAlimento[0].protein_g * pesoIntroducido / 100,
      serving_size_g: pesoIntroducido,
      sodium_mg: arrayAlimento[0].sodium_mg * pesoIntroducido / 100,
      sugar_g: arrayAlimento[0].sugar_g * pesoIntroducido / 100
    };

    return alimentoModificado;
  }

  function agregarAlimento(e) {

    e.preventDefault();
    if (pesoIntroducido > 0) {
      let alimentoAAgregar = anyadeFechaYPeso();

      const nuevoArrayAlimentos = [...arrayAlimentos, alimentoAAgregar];

      //actualizar base de datos
      const docReference = doc(firestore, `usuarios/${props.correoUsuario}`);
      updateDoc(docReference, { alimentos: [...nuevoArrayAlimentos] })

      //actualizar estado
      setArrayAlimentos(nuevoArrayAlimentos);
      setArrayAlimento([{ "calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": "", "potassium_mg": 0, "protein_g": 0, "serving_size_g": 0, "sodium_mg": 0, "sugar_g": 0 }]);
      //limpiar valor a buscar
      setAlimentoBuscado("");
    } else {
      alert("Añade un peso en gramos válido.");
      return;
    }
  }

  const refrescar = () => {

    DevSettings.reload();
  }

  return (
    <View style={styles.containerPage}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">

        <View style={styles.container1}>
          <View>
            <View>
              <Text style={styles.text}>Agregue alimentos a la base de datos: </Text>
              <Input
                value={alimentoBuscado}
                placeholder='Nombre del alimento en inglés'
                onChangeText={setAlimentoBuscado}
              />
            </View>
            <View>
              <Button
                title='Consultar Alimento'
                raised={true}
                onPress={getDatos}
              />
            </View>
            <View>
              {(arrayAlimento[0].name !== '') ? (
                <View>
                  {arrayAlimento.map((objetoAlimento) => {
                    return (
                      <View>
                        <View>
                          <Text style={styles.text}>Fecha de consumo del alimento</Text>
                          <Text style={styles.text}>{fecha}</Text>
                          <Button
                            title='Modificar fecha'
                            onPress={() => showMode('date')}
                          />

                          {show && (
                            <DateTimePicker
                              testID='dateTimePicker'
                              value={date}
                              mode={mode}
                              display='default'
                              onChange={onChange}
                            />)}
                        </View>
                        <View>
                          <Text style={styles.text}>Cantidad de {objetoAlimento.name} ingerida:</Text>
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
            <View>
              <View>
                <Text> </Text>
                <Button
                  title='Ver alimentos agregados'
                  raised={true}
                  onPress={refrescar}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerPage: {
    backgroundColor: '#7CFF14',
    flex: 1,
    padding: 10,
  },
  container1: {
    backgroundColor: '#46FF7A',
    padding: 10,
  },
  text: {
    fontSize: 20,
  },
  containerButton: {
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