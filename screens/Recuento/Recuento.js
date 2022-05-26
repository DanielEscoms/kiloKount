/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Image, Text, StyleSheet, View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input } from 'react-native-elements';
//import { useEffect, useState } from 'react';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
//import { event } from 'react-native-reanimated';
//import { Calendar } from 'react-native-calendario';

const Recuento = (props) => {
  
  //console.log(props.arrayAlimentos);
  const [arrayAlimentos, setArrayAlimentos] = useState([{"calories": 0, "carbohydrates_total_g": 0, "cholesterol_mg": 0, "date": " ", "fat_saturated_g": 0, "fat_total_g": 0, "fiber_g": 0, "name": " ", "potassium_mg": 0, "protein_g": 0, "serving_size_g": " ", "sodium_mg": 0, "sugar_g": 0, "uid": "1"}]);
  const [contadorKcal, setContadorKcal] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fechaInicial, setFechaInicial] = useState(moment().format('DD/MM/yyyy'));
  const [fechaFinal, setFechaFinal] = useState(moment().format('DD/MM/yyyy'));
  const [button1o2, setButton1o2] = useState(false);

  useEffect(()=> {
    setArrayAlimentos(props.arrayAlimentos);
    console.log(arrayAlimentos);
  }, [arrayAlimentos])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let mesCifra = tempDate.getMonth() + 1;
    //console.log(typeof mesCifra);
    if (mesCifra < 10){
      mesCifra = '0' + mesCifra.toString();
    }
    //console.log(mesCifra);
    //console.log(typeof mesCifra);
    let fDate = tempDate.getDate() + '/' + mesCifra + '/' + tempDate.getFullYear();
    //let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    


    if (button1o2) {
      setFechaFinal(fDate);// + '\n' + fTime)
    } else {
      setFechaInicial(fDate);// + '\n' + fTime)
    }
    setContadorKcal(0);
    //console.log(fDate);//) + ' (' + fTime + ')');
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

  const compruebaRangoFechas = (alimento) => {
    //console.log(contadorKcal);
    //setContadorKcal(contadorKcal+alimento.calories);
    //console.log(contadorKcal);

    if(fechaInicial <= alimento.date && alimento.date <= fechaFinal || fechaInicial >= alimento.date && alimento.date >= fechaFinal){
      console.log("Dentro de rango " + alimento.name + " con peso de " + alimento.serving_size_g + " y kcal "+ alimento.calories);
      console.log(alimento.date);
      console.log(fechaInicial);
      /*console.log(contadorKcal);
      setContadorKcal(contadorKcal+alimento.calories);
      console.log(contadorKcal);*/
      return(
        <View>
          <Text> </Text>
          <View>
            <View>
              <Text>{alimento.name}</Text>
            </View>
            <View>
              <Text>{alimento.serving_size_g}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{alimento.calories}</Text>
            </View>
            <View>
              <Button
                title='Eliminar Alimento'
                onPress={eliminaAlimento(alimento.uid)}
              />
            </View>
          </View>
        </View>
      )
    } else {
      console.log("Distinto");
      /*console.log(typeof alimento.date);
      console.log(typeof fechaInicial);
      console.log(alimento.date);
      console.log(fechaInicial);*/
      return
    }

  }
   
  
  const eliminaAlimento = (identificador) => {
  
  }

  const calculaTotal = () => {
    let caloriasTotal = 0;
    arrayAlimentos.map((alimento)=> {
      if(fechaInicial <= alimento.date && alimento.date <= fechaFinal || fechaInicial >= alimento.date && alimento.date >= fechaFinal){
        caloriasTotal = caloriasTotal + alimento.calories;
      }
    })
    setContadorKcal(Math.round(caloriasTotal * 100) / 100);
  }

  return (
    <View style={styles.containerPage}>
      <View>
        <View>
          <Text>Alimentos almacenados</Text>
        </View>
        <View>
          <View>
            <Text>del día</Text>
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
          {(arrayAlimentos.length > 1) ? (
            <View>
              
              {arrayAlimentos.map((objetoAlimento)=> {
                return(
                  compruebaRangoFechas(objetoAlimento)
                )
              
              })}

            </View>
          ) : <View><Text>No se encuentran alimentos para las fechas selecionadas</Text></View>}
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
  containerPage:{
    backgroundColor: '#7CFF14',
    flex:1,
    padding: 10,
  },
  container1:{
    backgroundColor: '#46FF7A',
    padding: 10,
  },
  fechaInicial:{
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

export default Recuento;

/*
<Calendar
              onChange={(value) => console.log(value)}
              minDate={new Date(2021, 1, 1)}
              maxDate={new Date(2022, 5, 18)}
              
              locale='es'

              theme={{
                activeDayColor: {},
                monthTitleTextStyle: {
                  color: '#6d95da',
                  fontWeight: '300',
                  fontSize: 16,
                },
                emptyMonthContainerStyle: {},
                emptyMonthTextStyle: {
                  fontWeight: '200',
                },
                weekColumnsContainerStyle: {},
                weekColumnStyle: {
                  paddingVertical: 10,
                },
                weekColumnTextStyle: {
                  color: '#b6c1cd',
                  fontSize: 13,
                },
                nonTouchableDayContainerStyle: {},
                nonTouchableDayTextStyle: {},
                startDateContainerStyle: {},
                endDateContainerStyle: {},
                dayContainerStyle: {},
                dayTextStyle: {
                  color: '#2d4150',
                  fontWeight: '200',
                  fontSize: 15,
                },
                dayOutOfRangeContainerStyle: {},
                dayOutOfRangeTextStyle: {},
                todayContainerStyle: {},
                todayTextStyle: {
                  color: '#6d95da',
                },
                activeDayContainerStyle: {
                  backgroundColor: '#6d95da',
                },
                activeDayTextStyle: {
                  color: 'white',
                },
                nonTouchableLastMonthDayTextStyle: {},
              }}
            />*/