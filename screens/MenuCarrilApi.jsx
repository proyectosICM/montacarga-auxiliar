import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { carrilesURL } from "../API/urlsApi";
import { useListarElementos } from "../Hooks/CRUDHooks";


export function MenuCarrilApi() {
  const navigation = useNavigation();

  const Detalles = (estado, dato) => {
    switch (estado) {
      case 1:
        navigation.navigate("Libre",  {carrilId: dato});
        break;

      case 2:
        navigation.navigate("Asignar", {carrilId: dato});
        break;

      case 3:
        navigation.navigate("Detalle", {carrilId: dato});
        break;
    }
  };

  const [carriles, setCarriles] = useState();
/*
  const ListarCarriles = async () => {
    try {
      const response = await axios.get(carrilesURL);
      setCarriles(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };*/



 /* useEffect(() => {
    ListarCarriles();
  }, [ListarCarriles]);*/

  useListarElementos(carrilesURL,carriles, setCarriles);

  const getButtonStyle = (estadoId) => {
    if (estadoId === 1) {
      return styles.libreButton;
    } else if (estadoId === 2) {
      return styles.pendienteButton;
    } else if (estadoId === 3) {
      return styles.ocupadoButton;
    }
    return styles.libreButton; // Por defecto
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carriles</Text>
      {carriles &&
        carriles.map((carril) => (
          <View key={carril.id}>
            <Button
              title={`${carril.id} - ${carril.estadosModel.nombre} ${
                carril.cantidadMontacargas
                  ? ` - ${carril.cantidadMontacargas} Montacargas `
                  : ""
              } `}
              buttonStyle={getButtonStyle(carril.estadosModel.id)}
              onPress={() => Detalles(carril.estadosModel.id, carril.id)}
            />
          </View>
        ))}
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

export default MenuCarrilApi;
