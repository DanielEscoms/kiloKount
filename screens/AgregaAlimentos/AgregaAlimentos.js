import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, DevSettings } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import uuid from 'react-native-uuid';
import styles from './styles';
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

  //Datos necesarios para conectar con la API calorieninjas
  const options = {

    method: 'GET',
    url: `https://api.calorieninjas.com/v1/nutrition?query=${alimentoBuscado}`,
    headers: { 'X-Api-Key': 'nLw46OBFPXRZtypyMJcJ6Q==h6CNwrcwmBhXEgOX' },
  };

  //Conexión a la API calorieninjas
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

  //Función creada para un correcto funcionamiento del calendario
  const showMode = (currentMode) => {

    setShow(true);
    setMode(currentMode);
  }

  //Función creada para un correcto funcionamiento del calendario complementaria a showMode()
  const onChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);

    // Modificamos el mes para que siempre tenga dos cifras
    let mesCifra = tempDate.getMonth() + 1;
    if (mesCifra < 10) {
      mesCifra = '0' + mesCifra.toString();
    }
    // Modificamos el día para que siempre tenga dos cifras
    let diaCifra = tempDate.getDate();
    if (diaCifra < 10) {
      diaCifra = '0' + diaCifra.toString();
    }

    //Ahora tiene el formato 'DD/MM/yyyy'
    let fDate = diaCifra + '/' + mesCifra + '/' + tempDate.getFullYear();

    setFecha(fDate);
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
      setPesoIntroducido("");
    } else {
      alert("Añade un peso en gramos válido.");
      return;
    }
  }

  const refrescar = () => {

    DevSettings.reload();
  }

  const cajaAlimento = (alimento) => {
    return(
      <View>
        <View style={styles.container2Fecha}>
          <Text style={styles.text}>Fecha de consumo del alimento</Text>
          <View style={styles.fecha}>
            <Text style={styles.text}>{fecha}</Text>
            <TouchableOpacity
              style={styles.buttonFecha}
              onPress={() => showMode('date')}>
              <Text style={styles.buttonTitle}>Modificar fecha</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              display='default'
              onChange={onChange}
            />)}
        </View>
        <View style={styles.container2Peso}>
          <Text style={styles.text}>Cantidad de {alimento.name} ingerida:</Text>
          <TextInput
              style={styles.input}
              placeholder='Introduce el peso en gramos del alimento'
              placeholderTextColor="#aaaaaa"
              keyboardType='decimal-pad'
              onChangeText={setPesoIntroducido}
              value={pesoIntroducido}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.buttonAgregar}
              onPress={agregarAlimento}>
              <Text style={styles.buttonTitle}>Agregar</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.containerPage}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">

        <View style={styles.container}>
          <View style={styles.container1}>
            <Text style={styles.text}>Agregue alimento a la base de datos: </Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre en INGLÉS de 1 alimento'
              placeholderTextColor="#aaaaaa"
              onChangeText={setAlimentoBuscado}
              value={alimentoBuscado}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.buttonConsultar}
              onPress={getDatos}>
              <Text style={styles.buttonTitle}>Consultar Alimento</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container2}>
            {(arrayAlimento[0].name !== '') && (
              <View>
                {cajaAlimento(arrayAlimento[0])}
              </View>)}
          </View>
          <View style={styles.container3}>
            <TouchableOpacity
              style={styles.buttonRefresco}
              onPress={refrescar}>
              <Text style={styles.buttonTitle}>Ver alimentos agregados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default AgregaAlimentos;