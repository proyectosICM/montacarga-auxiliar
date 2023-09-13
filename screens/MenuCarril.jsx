import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { carrilesURL } from "../API/urlsApi";

export function MenuCarril() {
    const navigation = useNavigation();

    const Detalles = () => {
        navigation.navigate('Detalle');
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carriles</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Button title={"1 Ocupado - 2 Montacargas"} buttonStyle={styles.ocupadoButton} onPress={() => Detalles()}/>
          <Button title={"2 Libre"} buttonStyle={styles.libreButton} onPress={() => Detalles()}/>
        </View>
        <View style={styles.column}>
          <Button title={"3 Libre"} buttonStyle={styles.libreButton} onPress={() => Detalles()}/>
          <Button title={"4 Pendiente"} buttonStyle={styles.pendienteButton} onPress={() => navigation.navigate('Asignar')}/>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Button title={"5 Ocupado - 1 Montacarga"} buttonStyle={styles.ocupadoButton} onPress={() => Detalles()}/>
          <Button title={"6 Pendiente"} buttonStyle={styles.pendienteButton} onPress={() => navigation.navigate('Asignar')}/>
        </View>
        <View style={styles.column}>
          <Button title={"7 Ocupado - 2 Montacargas"} buttonStyle={styles.ocupadoButton} onPress={() => Detalles()}/>
          <Button title={"8 Libre"} buttonStyle={styles.libreButton} onPress={() => Detalles()}/>
        </View>
      </View>

      <Button title={'Escanear QR'} buttonStyle={styles.scanButton} onPress={() => navigation.navigate('Leer QR')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  libreButton: {
    backgroundColor: "#28A745", // Verde para botones libres
    marginBottom: 5,
    width: 120,
  },
  ocupadoButton: {
    backgroundColor: "#DC3545", // Rojo para botones ocupados
    marginBottom: 5,
    width: 120,
  },
  pendienteButton: {
    backgroundColor: "#FFC107", // Amarillo para botones pendientes
    marginBottom: 5,
    width: 120,
  },
  scanButton: {
    backgroundColor: "#007BFF", // Azul para botón de escanear QR
    marginTop: 20,
    width: 200,
  },
});

export default MenuCarril;
