import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MenuCarril } from './screens/MenuCarril';
import QRScanner from './screens/QRScanner';
import { AsignarCarril } from './screens/AsignarCarril';
import { DetalleCarril } from './screens/DetalleCarril';
import { MenuCarrilApi } from './screens/MenuCarrilApi';
import { CarrilLibre } from './screens/CarrilLibre';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'Inicio' component={MenuCarrilApi}  />
        <Stack.Screen name = 'Leer QR' component={QRScanner} />
        <Stack.Screen name = 'Asignar' component={AsignarCarril} />
        <Stack.Screen name = 'Detalle' component={DetalleCarril} />
        <Stack.Screen name = 'Libre' component={CarrilLibre} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
