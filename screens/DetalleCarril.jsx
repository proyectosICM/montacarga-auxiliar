import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";

export function DetalleCarril() {
  const navigation = useNavigation();
  const [montacarga1Liberado, setMontacarga1Liberado] = useState(false);
  const [montacarga2Liberado, setMontacarga2Liberado] = useState(false);

  const Liberar = (montacarga) => {
    Alert.alert(
      "Confirmar Liberación",
      `Seguro que desea liberar el montacarga ${montacarga}?`,
      [
        { text: "No", style: "cancel" },
        { text: "Sí", onPress: () => realizarLiberacion(montacarga) },
      ]
    );
  };

  const realizarLiberacion = (montacarga) => {
    if (montacarga === 1) {
      setMontacarga1Liberado(true);
    } else if (montacarga === 2) {
      setMontacarga2Liberado(true);
    }
  };

  const permitirSalidaHabilitado = montacarga1Liberado && montacarga2Liberado;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carril 1</Text>
      <Text style={styles.status}>Estado: Ocupado</Text>

      <Button
        title={
          montacarga1Liberado
            ? "Montacarga 1 - Libre"
            : "Montacarga 1 - Liberar"
        }
        buttonStyle={[
          styles.button,
          montacarga1Liberado && styles.liberadoButton,
        ]}
        onPress={() => Liberar(1)}
      />
      <Button
        title={
          montacarga2Liberado
            ? "Montacarga 2 - Libre"
            : "Montacarga 2 - Liberar"
        }
        buttonStyle={[
          styles.button,
          montacarga2Liberado && styles.liberadoButton,
        ]}
        onPress={() => Liberar(2)}
      />

      <Button
        title={"Permitir salida del vehículo"}
        buttonStyle={[
          styles.salidaButton,
          !permitirSalidaHabilitado && styles.disabledButton,
        ]}
        disabled={!permitirSalidaHabilitado}
        onPress={() => navigation.navigate('Inicio')}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#DC3545", // Rojo para botones de liberar
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  liberadoButton: {
    backgroundColor: "#28A745", // Verde para botones liberados
  },
  salidaButton: {
    backgroundColor: "#007BFF", // Azul para el botón de salida
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: "#CCC", // Color para botones deshabilitados
  },
});

export default DetalleCarril;
