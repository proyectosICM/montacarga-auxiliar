import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { general } from "../Styles/general";
import {
  cargarNIP,
  cargarPlacaDesdeAlmacenamiento,
  eliminarNIP,
  eliminarPlacaDelAlmacenamiento,
  guardarNIp,
  guardarPlacaEnAlmacenamiento,
} from "../Hooks/placaLocal";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

export function OpcionesMontacargas() {
  const [placa, setPlaca] = useState("");
  const [placaGuardada, setPlacaGuardada] = useState("");
  const [editarVisible, setEditarVisible] = useState(false);


  const navigation = useNavigation();

  const EliminarPlaca = () => {
    eliminarPlacaDelAlmacenamiento(navigation);
  };

  const GuardarPlaca = () => {
    guardarPlacaEnAlmacenamiento(placa, setPlaca, setPlacaGuardada);
    setEditarVisible(false);
  };

  const EliminarIp = () => {
    eliminarNIP();
  };


  cargarPlacaDesdeAlmacenamiento(setPlacaGuardada);

  return (
    <View style={general.container}>
      <Text style={general.tittleText}>Opciones de Montacargas</Text>

      <Text style={general.textStyle}>Placa guardada: {placaGuardada}</Text>

      {editarVisible ? (
        // Muestra la sección de edición solo cuando editarVisible es verdadero
        <>
          <Text style={general.textStyle}>Editar Placa de montacarga:</Text>
          <TextInput
            placeholder="Ingrese la nueva placa"
            value={placa}
            onChangeText={(texto) => setPlaca(texto)}
            style={general.input}
          />
          <Button
            title="Guardar Placa"
            onPress={GuardarPlaca}
            buttonStyle={general.buttonPalette}
          />
        </>
      ) : (
        // Muestra el botón "Editar" solo cuando editarVisible es falso
        <View>
          <Button
            title="Editar Placa"
            onPress={() => setEditarVisible(true)}
            buttonStyle={general.buttonPalette}
          />
          <Button
            title="Eliminar Placa"
            onPress={EliminarPlaca}
            buttonStyle={general.buttonPalette}
          />
        </View>
      )}


    </View>
  );
}
