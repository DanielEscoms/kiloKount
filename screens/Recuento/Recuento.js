import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Platform, DevSettings } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles';
import firebaseApp from '../../database/Firebase';
import { initializeFirestore, doc, updateDoc } from 'firebase/firestore';

const firestore = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});

const Recuento = (props) => {

  const [arrayAlimentos, setArrayAlimentos] = useState([{ "calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "date": " ", "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": " ", "potassium_mg": 0, "protein_g": 0, "serving_size_g": " ", "sodium_mg": 0, "sugar_g": 0, "uid": "1" }]);
  const [contadorKcal, setContadorKcal] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fechaInicial, setFechaInicial] = useState(moment().format('DD/MM/yyyy'));
  const [fechaFinal, setFechaFinal] = useState(moment().format('DD/MM/yyyy'));
  const [button1o2, setButton1o2] = useState(false);

  useEffect(() => {

    setArrayAlimentos(props.arrayAlimentos);
  }, [props.arrayAlimentos])

  //Función creada para un correcto funcionamiento del calendario
  const showMode = (currentMode, numButton) => {

    setShow(true);
    setMode(currentMode);

    /* Se asigna el convenio de que si se pulsa el boton1 (fecha) la constante button1o2 tomará el valor
     de false y si se pulsa el boton2 (fecha rango) la constante button1o2 tomará el valor de true*/
    if (numButton) {
      setButton1o2(true);
    } else {
      setButton1o2(false);
    }
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

    let fDate = diaCifra + '/' + mesCifra + '/' + tempDate.getFullYear();

    /*Actualizamos el valor de fecha inicial (boton1 === fecha) o fecha final (boton2 === fecha rango)
    en función de que botón de calendario se ha selecionado.*/
    if (button1o2) {
      setFechaFinal(fDate);
    } else {
      setFechaInicial(fDate);
    }

    /* Reseteamos el valor a 0 de modo que, al cambiar el valor de alguna fecha, el usuario
    deba volver a pulsar "Calcular total kcal" y que no haya error en los datos.*/
    setContadorKcal(0);
  }

  //Transforma un string a formato Pascal Case
  const toPascalCase = (str) => {

    return str.replace(/\w\S*/g, m => { return m.charAt(0).toUpperCase() + m.substr(1).toLowerCase() });
  }

  async function eliminaAlimento(uidAlimentoAEliminar) {

    //crear nuevo array de tareas
    const nuevoArrayAlimentos = arrayAlimentos.filter((objetoAlimento) => objetoAlimento.uid !== uidAlimentoAEliminar);

    //actualizar base de datos
    const docReference = doc(firestore, `usuarios/${props.correoUsuario}`);
    updateDoc(docReference, { alimentos: [...nuevoArrayAlimentos] });

    //actualizar state
    setArrayAlimentos(nuevoArrayAlimentos);

    /* Reseteamos el valor a 0 de modo que, al eliminar algun alimento, el usuario
    deba volver a pulsar "Calcular total kcal" y que no haya error en los datos.*/
    setContadorKcal(0);

    return;
  }

  const calculaTotal = () => {

    let caloriasTotal = 0;
    arrayAlimentos.map((alimento) => {
      //Se sumaran los valores de kcal si se encuentra dentro del rango de fechas.
      if (fechaInicial <= alimento.date && alimento.date <= fechaFinal || fechaInicial >= alimento.date && alimento.date >= fechaFinal) {
        caloriasTotal = caloriasTotal + alimento.calories;
      }
    })

    setContadorKcal(Math.round(caloriasTotal * 100) / 100);
  }

  const refrescar = () => {
    DevSettings.reload();
  }

  /*Muestra por pantalla los alimentos y alguna característica de los que se encuentren dentro del rango de fechas*/
  const cajonAlimento = (alimento) => {

    if (fechaInicial <= alimento.date && alimento.date <= fechaFinal || fechaInicial >= alimento.date && alimento.date >= fechaFinal) {

      return (
        <View style={styles.containerAlimento}>
          <View>
            <View>
              <Text style={styles.text}>{toPascalCase(alimento.name)}  {alimento.date}</Text>
            </View>
            <View>
              <Text style={styles.text}>{alimento.serving_size_g} g  ---{'>'}  {(Math.round(alimento.calories * 100) / 100)} kcal</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonEliminar}
            onPress={() => eliminaAlimento(alimento.uid)}>
            <Text style={styles.buttonTitle}>Eliminar</Text>
          </TouchableOpacity>
          
        </View>
      )
    } else {
      return;
    }

  }
  
  return (
    <View style={styles.containerPage}>
      <View style={styles.container1}>
        <View style={styles.container1Refresco}>
          <Text style={styles.textRefresco}>Refresca para actualizar los alimentos</Text>
          <TouchableOpacity
            style={styles.buttonRefresco}
            onPress={refrescar}>
            <Text style={styles.buttonTitle}>Refrescar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.container1Fecha1}>
            <Text style={styles.text}>Alimentos almacenados del día {fechaInicial}</Text>
            <TouchableOpacity
              style={styles.buttonFecha}
              onPress={() => showMode('date', false)}>
              <Text style={styles.buttonTitle}>Modificar fecha</Text>
            </TouchableOpacity>
          </View>
          {(fechaInicial !== fechaFinal) && (
            <View style={styles.container1Fecha2}>
              <Text style={styles.text}>hasta el día {fechaFinal}      </Text>
              <TouchableOpacity
                style={styles.buttonFecha}
                onPress={() => showMode('date', true)}>
                <Text style={styles.buttonTitle}>Fecha rango</Text>
              </TouchableOpacity>
            </View>
          )}
          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              display='default'
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">

        <View style={styles.container}>
          {(arrayAlimentos != null) ? (
            <View>
              {arrayAlimentos.map((objetoAlimento) => (
                <View key={objetoAlimento.uid}>
                  {cajonAlimento(objetoAlimento)}
                </View>
                ))}
            </View>
          ) : <View><Text style={styles.text}>Refrescando, espere por favor.</Text></View>}
        </View>
      </KeyboardAwareScrollView>
      <View>
        <TouchableOpacity
          style={styles.buttonTotal}
          onPress={calculaTotal}>
          <Text style={styles.buttonTitle}>Calcular total kcal</Text>
        </TouchableOpacity>
        {(contadorKcal !== 0) && (
          <View  style={styles.textRecuento}>
            <Text style={styles.text}>El total de calorias ingeridas es de</Text>
            <Text style={styles.textKcal}>{contadorKcal} kcal</Text>
          </View>)}
      </View>
    </View>
  )
}

export default Recuento;