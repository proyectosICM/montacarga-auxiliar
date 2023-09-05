import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import {
  asignarMont,
  carrilesURL,
  desunirseURL,
  unirseURL,
} from "../API/urlsApi";
import { getFormattedStartTime } from "./../Hooks/timeUtils";
import { editarElemento, useListarElementos } from "../Hooks/CRUDHooks";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";
import { cargarPlacaDesdeAlmacenamiento } from "../Hooks/placaLocal";
import { general } from "../Styles/general";

export function AsignarCarril() {
  const navigation = useNavigation();
  const route = useRoute();
  const { carrilId } = route.params;
  const [trabaruedas, setTrabaruedas] = useState(false);
  const [selectedMontacarga, setSelectedMontacarga] = useState(null);
  const [join, setJoin] = useState(false);

  const [placa, setPlaca] = useState();

  cargarPlacaDesdeAlmacenamiento(setPlaca);

  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);

  useEffect(() => {
    if (carril) {
      if (carril.placa1 || carril.placa2) {
        if (carril.placa1 != null && carril.placa1 == placa) {
          setJoin(true);
        } else if (!carril.placa2 && carril.placa2 == placa) {
          setJoin(true);
        }
      }
    }
  });

  useEffect(()=> {
    if(carril){
      if(carril.placa1 && carril.placa2){
        setSelectedMontacarga(2);
      } else if(carril.placa1 && !carril.placa2){
        setSelectedMontacarga(1);
      } else if(!carril.placa1 && carril.placa2){
        setSelectedMontacarga(1);
      }
    }
  },[carril])

  useRedirectEffect(carril, 2);

  const handleTrabaruedas = () => {
    editarElemento(`${carrilesURL}`,`${carrilId}`, `trabaruedas`)
    setTrabaruedas(true);
  };

  const handleMontacargaSelect = (montacarga) => {
    setSelectedMontacarga(1);
  };

  const isContinuarDisabled = !selectedMontacarga || !trabaruedas;

  const handleJoin = async () => {
    try {
      if (join) {
        const response = await axios.put(`${desunirseURL}${carrilId}/${placa}`);
        console.log("DesUnión exitosa");
        setJoin(false);
      } else if (!join) {
        const response = await axios.put(`${unirseURL}${carrilId}/${placa}`);
        console.log("Unión exitosa");
        setJoin(true);
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
    }
  };

  const handleContinuar = async () => {
    const horaDeInicio = getFormattedStartTime();
    const requestDatas = {
      cantidadMontacargas: selectedMontacarga,
      estadosModel: {
        id: 3,
      },
      horaInicio: horaDeInicio,
    };
    console.log(`${asignarMont}${carrilId}`);
    await axios.put(`${asignarMont}${carrilId}`, requestDatas);

  };

  useRedirectEffect(carril, 3);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Montacargas maximos:{" "}
        {carril && carril.montacargasSolicitados}
      </Text>

      <Text style={styles.title}>Montacargas que han aceptado</Text>
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

      <Text style={styles.infoText}>
        Montacargas 1: {carril && carril.placa1 ? carril.placa1 : "No unido"}
      </Text>

      <Text style={styles.infoText}>
        Montacargas 2: {carril && carril.placa2 ? carril.placa2 : "No unido"}
      </Text>

      <Button
        title={join ? "Unido" : "Unirme"}
        buttonStyle={join ? styles.confirmButtonGreen : general.styleButton}
        onPress={() => handleJoin()}
      />

      <Button
        title={"Confirmar colocacion de trabaruedas"}
        buttonStyle={[
          styles.confirmButton,
          trabaruedas && styles.confirmButtonGreen, // Agregado
        ]}
        onPress={() => handleTrabaruedas()}
      />

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
