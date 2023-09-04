import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { general } from "../Styles/general";
import { guardarPlacaEnAlmacenamiento } from "../Hooks/placaLocal";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

export function Identificar() {
  const [placa, setPlaca] = useState("");
  const [placaGuardada, setPlacaGuardada] = useState("");
  const navigation = useNavigation();

  const guardar = () => {
    guardarPlacaEnAlmacenamiento(placa, setPlaca, setPlacaGuardada);
    navigation.navigate("Inicio");
  };

  return (
    <View style={general.container}>
      <Text style={general.tittleText}>
        Ingrese la placa de su Montacargas:
      </Text>
      <TextInput
        placeholder="Escriba la placa aquí"
        value={placa}
        onChangeText={(texto) => setPlaca(texto)}
        style={general.input}
      />
      <Button
        title="Guardar Placa"
        onPress={() => guardar()}
        buttonStyle={general.buttonPalette}
        titleStyle={general.textoButton}
      />
    </View>
  );
}
