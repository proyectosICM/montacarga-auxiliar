import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { asignarMont, carrilesURL } from "../API/urlsApi";
import { getFormattedStartTime } from './../Hooks/timeUtils';
import { useListarElementos } from "../Hooks/CRUDHooks";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";

export function AsignarCarril() {
  const navigation = useNavigation();
  const route = useRoute();
  const {carrilId} = route.params
  const [trabaruedas, setTrabaruedas] = useState(false);
  const [selectedMontacarga, setSelectedMontacarga] = useState(null);

  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);
  useRedirectEffect(carril, 2);

  const handleTrabaruedas = () => {
    setTrabaruedas(true);
  };

  const handleMontacargaSelect = (montacarga) => {
    setSelectedMontacarga(montacarga);
  };

  const isContinuarDisabled = !selectedMontacarga || !trabaruedas;

  const handleContinuar = async () => {
    const horaDeInicio = getFormattedStartTime();
    const requestDatas = {
      cantidadMontacargas: selectedMontacarga,
      estadosModel: {
        id: 3,
      },
      horaInicio: horaDeInicio
    };
  
    await axios.put(`${asignarMont}${carrilId}`, requestDatas);

 
    console.log(`Hora de inicio: ${horaDeInicio}`);
    
    navigation.navigate('Inicio');
  };  

  return (
    <View style={styles.container}>
      <Button
        title={"Confirmar colocacion de trabaruedas"}
        buttonStyle={[
          styles.confirmButton,
          trabaruedas && styles.confirmButtonGreen, // Agregado
        ]}
        onPress={() => handleTrabaruedas()}
      />
      <Text style={styles.title}>Asignar número de Montacargas</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={"1"}
          buttonStyle={[
            styles.montacargaButton,
            selectedMontacarga === 1 && styles.selectedButton,
          ]}
          onPress={() => handleMontacargaSelect(1)}
        />
        <Button
          title={"2"}
          buttonStyle={[
            styles.montacargaButton,
            selectedMontacarga === 2 && styles.selectedButton,
          ]}
          onPress={() => handleMontacargaSelect(2)}
        />
      </View>

      <Text style={styles.infoText}>
        Trabaruedas: {trabaruedas ? "Si" : "No"}
      </Text>

      <Text style={styles.infoText}>
        Nro. Montacargas: {selectedMontacarga}
      </Text>

      <Button
        title={"Continuar"}
        buttonStyle={[
          styles.continuarButton,
          isContinuarDisabled && styles.disabledButton,
        ]}
        disabled={isContinuarDisabled}
        onPress={() => handleContinuar()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#28A745", // Verde para botones libres
    marginHorizontal: 10,
    borderRadius: 10,
  },
  montacargaButton: {
    backgroundColor: "#007BFF", // Azul para botones de montacargas
    marginHorizontal: 5,
    borderRadius: 10,
    width: 45,
  },
  selectedButton: {
    backgroundColor: "orange", // Color para botones seleccionados
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#DC3545", // Rojo para botones de confirmación
    marginVertical: 10,
    borderRadius: 10,
  },
  confirmButtonGreen: {
    backgroundColor: "#28A745", // Verde cuando se ha confirmado
  },
  continuarButton: {
    backgroundColor: "#007BFF", // Color para el botón "Continuar"
    marginVertical: 20, // Añade espacio vertical
    width: 200, // Ajusta el ancho según tu diseño
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#D3D3D3", // Color para el botón deshabilitado
  },
});

export default AsignarCarril;
