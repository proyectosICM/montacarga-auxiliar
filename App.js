import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AsignarCarril } from './screens/AsignarCarril';
import { DetalleCarril } from './screens/DetalleCarril';
import { MenuCarrilApi } from './screens/MenuCarrilApi';
import { CarrilLibre } from './screens/CarrilLibre';
import { Identificar } from './screens/Identificar';
import { OpcionesMontacargas } from './screens/OpcionesMontacargas';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer> 
    <Stack.Navigator
    initialRouteName='Identificar'>
      <Stack.Screen name='Identificar' component={Identificar} />
        <Stack.Screen name='Inicio' component={MenuCarrilApi}  options={{headerShown: false }}/>
        <Stack.Screen name='Opciones' component={OpcionesMontacargas}  />

        
        <Stack.Screen name='Asignar' component={AsignarCarril} />
        <Stack.Screen name='Detalle' component={DetalleCarril} />
        <Stack.Screen name='Libre' component={CarrilLibre} />
    </Stack.Navigator>
    </NavigationContainer> 
  );
}
