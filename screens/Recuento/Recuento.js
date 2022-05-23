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
  
  console.log(props.extraData);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [button1o2, setButton1o2] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    //let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    

    if (button1o2) {
      setFechaFinal(fDate);// + '\n' + fTime)
    } else {
      setFechaInicial(fDate);// + '\n' + fTime)
    }

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

  useEffect(()=> {
    let fechaHoy = moment().format('DD/MM/yyyy');
    setFechaInicial(fechaHoy);
    setFechaFinal(fechaHoy);
  }, [])


  return (
    <View style={styles.containerPage}>
      <View>
        <View>
          <Text>Alimentos almacenados</Text>
        </View>
        <View>
          <View>
            <Text>Fecha inicial</Text>
            <Text>{fechaInicial}</Text>
            <Button
                title='Seleccionar fecha inicial'
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
          <View>
            <Text>Fecha final</Text>
            <Text>{fechaFinal}</Text>
            <Button
                title='Seleccionar fecha final'
                onPress={() => showMode('date', true)}
              />
          </View>
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        
        <View style={styles.container1}>
          <View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View>
        
      </View>
    </View>
  )
}
//is24Hour={true}
/*
            <Text style={styles.fechaInicial}>Alimentos: </Text>
            <Input
              placeholder='Introduce los alimentos'
              onChangeText={setAlimentoBuscado}
            />
            <View>
              <Button
                title='Consultar Alimento'
                raised={true}
                onPress={getDatos}
              />
            </View>
            {(arrayAlimentos[0].name !== '') ? (
              <View>
                <View>
                  <Text>Alimentos encontrados</Text>
                </View>
                {arrayAlimentos.map((objetoAlimento)=> {
                  return(
                    <View>
                      <View>
                        <Text>{toPascalCase(objetoAlimento.name)}</Text>
                      </View>
                      <View>
                        <Text style={styles.fechaInicial}>Cantidad: </Text>
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
                          onPress={this.calculaIMC}
                        />
                      </View>
                    </View>
                  )
                })}

              </View>) : null}
*/

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