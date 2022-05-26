import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Platform, DevSettings } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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

    if (button1o2) {
      setFechaFinal(fDate);
    } else {
      setFechaInicial(fDate);
    }
    setContadorKcal(0);
  }

  const showMode = (currentMode, numButton) => {

    setShow(true);
    setMode(currentMode);
    if (numButton) {
      setButton1o2(true);
    } else {
      setButton1o2(false);
    }
  }

  /*
  Descripción: función creada para que transforme un string a Pascal Case
  Input: string
  Output: string en formato Pascal Case
  */
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

    return;
  }

  const calculaTotal = () => {

    let caloriasTotal = 0;
    arrayAlimentos.map((alimento) => {
      if (fechaInicial <= alimento.date && alimento.date <= fechaFinal || fechaInicial >= alimento.date && alimento.date >= fechaFinal) {
        caloriasTotal = caloriasTotal + alimento.calories;
      }
    })

    setContadorKcal(Math.round(caloriasTotal * 100) / 100);
  }

  const refrescar = () => {
    DevSettings.reload();
  }

  const compruebaRangoFechas = (alimento) => {

    if (fechaInicial <= alimento.date && alimento.date <= fechaFinal || fechaInicial >= alimento.date && alimento.date >= fechaFinal) {

      return (
        <View>
          <Text> </Text>
          <View>
            <View>
              <Text>{toPascalCase(alimento.name)}</Text>
            </View>
            <View>
              <Text>{alimento.serving_size_g} g</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{alimento.calories} kcal</Text>
            </View>
            <View>
              <Text>{alimento.date}</Text>
            </View>
            <View>
              <Button
                title='Eliminar Alimento'
                raised={true}
                onPress={() => eliminaAlimento(alimento.uid)}
              />
            </View>
          </View>
        </View>
      )
    } else {
      return;
    }

  }

  return (
    <View style={styles.containerPage}>
      <View>
        <View>
          <Text>Refresca para actualizar los alimentos</Text>
          <Button
            title='Refrescar'
            raised={true}
            onPress={refrescar}
          />
        </View>
        <View>
          <View>
            <Text>Alimentos almacenados del día</Text>
            <Text>{fechaInicial}</Text>
            <Button
              title='Seleccionar fecha'
              onPress={() => showMode('date', false)}
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
          {(fechaInicial !== fechaFinal) ? (
            <View>
              <Text>hasta el día (incluído)</Text>
              <Text>{fechaFinal}</Text>
              <Button
                title='Seleccionar fecha rango'
                onPress={() => showMode('date', true)}
              />
            </View>) : null}
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">

        <View style={styles.container1}>
          {(arrayAlimentos != null) ? (
            <View>
              {arrayAlimentos.map((objetoAlimento) => {
                return (
                  compruebaRangoFechas(objetoAlimento)
                )
              })}
            </View>
          ) : <View><Text>Refrescando, espere por favor.</Text></View>}
        </View>
      </KeyboardAwareScrollView>
      <View>
        <Text> </Text>
        <Button
          title='Calcular total kcal'
          raised={true}
          onPress={calculaTotal}
        />
        {(contadorKcal !== 0) ? (
          <View>
            <Text>El total de calorias ingeridas es de {contadorKcal} kcal</Text>
          </View>) : null}
      </View>
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
  fechaInicial: {
    fontSize: 25,
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

export default Recuento;