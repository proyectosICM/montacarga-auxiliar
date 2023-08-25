import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export function AsignarCarril() {
  const navigation = useNavigation();
  const [selectedCarril, setSelectedCarril] = useState(null);
  const [selectedMontacarga, setSelectedMontacarga] = useState(null);

  const handleCarrilSelect = (carril) => {
    setSelectedCarril(carril);
  };

  const handleMontacargaSelect = (montacarga) => {
    setSelectedMontacarga(montacarga);
  };

  const isContinuarDisabled = !selectedCarril || !selectedMontacarga;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione el Carril al que va a asignar</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={"2 Libre"}
          buttonStyle={[
            styles.button,
            selectedCarril === 2 && styles.selectedButton,
          ]}
          onPress={() => handleCarrilSelect(2)}
        />
        <Button
          title={"3 Libre"}
          buttonStyle={[
            styles.button,
            selectedCarril === 3 && styles.selectedButton,
          ]}
          onPress={() => handleCarrilSelect(3)}
        />
        <Button
          title={"6 Libre"}
          buttonStyle={[
            styles.button,
            selectedCarril === 6 && styles.selectedButton,
          ]}
          onPress={() => handleCarrilSelect(6)}
        />
        <Button
          title={"8 Libre"}
          buttonStyle={[
            styles.button,
            selectedCarril === 8 && styles.selectedButton,
          ]}
          onPress={() => handleCarrilSelect(8)}
        />
      </View>

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

      <Text style={styles.infoText}>Carril: {selectedCarril}</Text>
      <Text style={styles.infoText}>
        Nro. Montacargas: {selectedMontacarga}
      </Text>

      {/* Estilo para el botón "Continuar" */}
      <Button
        title={"Continuar"}
        buttonStyle={[
          styles.continuarButton,
          isContinuarDisabled && styles.disabledButton,
        ]}
        disabled={isContinuarDisabled}
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
