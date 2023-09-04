import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MenuCarril } from './screens/MenuCarril';
import QRScanner from './screens/QRScanner';
import { AsignarCarril } from './screens/AsignarCarril';
import { DetalleCarril } from './screens/DetalleCarril';
import { MenuCarrilApi } from './screens/MenuCarrilApi';
import { CarrilLibre } from './screens/CarrilLibre';
import { Identificar } from './screens/Identificar';
import { OpcionesMontacargas } from './screens/OpcionesMontacargas';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Identificar' component={Identificar} />
        <Stack.Screen name='Inicio' component={MenuCarrilApi}  options={{headerShown: false }}/>
        <Stack.Screen name='Opciones' component={OpcionesMontacargas}  />
        <Stack.Screen name='Leer QR' component={QRScanner} />

        
        <Stack.Screen name='Asignar' component={AsignarCarril} />
        <Stack.Screen name='Detalle' component={DetalleCarril} />
        <Stack.Screen name='Libre' component={CarrilLibre} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
