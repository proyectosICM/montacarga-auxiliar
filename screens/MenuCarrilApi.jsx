import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { carrilesURL } from "../API/urlsApi";
import {
  editarElemento,
  marcarNotificado,
  useListarElementos,
} from "../Hooks/CRUDHooks";
import {
  sendPushNotification,
  sendPushNotificationCamionPendiente,
  sendPushNotificationCamionPendiente2,
} from "./MenNot";
import { cargarPlacaDesdeAlmacenamiento } from "../Hooks/placaLocal";
import { general } from "../Styles/general";
import { useBackHandler } from "../Hooks/backHandler";

export function MenuCarrilApi() {
  const navigation = useNavigation();

  useBackHandler(navigation);

  const Detalles = (estado, dato) => {
    switch (estado) {
      case 1:
        navigation.navigate("Libre", { carrilId: dato });
        break;

      case 2:
        navigation.navigate("Asignar", { carrilId: dato });
        break;

      case 3:
        navigation.navigate("Detalle", { carrilId: dato });
        break;
    }
  };

  const [carriles, setCarriles] = useState();
  const [placaGuardada, setPlacaGuardada] = useState();

  cargarPlacaDesdeAlmacenamiento(setPlacaGuardada);





  useListarElementos(carrilesURL, carriles, setCarriles);

  /*useEffect(() => {
    if (carriles) {
      carriles.map(async(carril) => {
        if (carril.estadosModel.id === 2) {
          if(carril.notificar == false || carril.notificar == null){

            await axios.get(`${carrilesURL}/${carril.id}`).then(async(response) => {
              const elemento = response.data;
          
              elemento[`notificar`] = true;
          
              await axios.put(`${carrilesURL}/${carril.id}`, elemento).then(() => {
                console.log(elemento);
                console.log(carril.id, "pen2")
              });

            });
          }

        }
      });
    }
  }, [carriles]);
*/

const [carrilesNotificados, setCarrilesNotificados] = useState([]);

  useEffect(() => {
    const processCarriles = async () => {
      if (carriles) {
        for (const carril of carriles) {
          if (carril.estadosModel.id === 2 && !carril.notificar) {
            // Verificar si ya se notificó este carril
            if (!carrilesNotificados.includes(carril.id)) {
              sendPushNotificationCamionPendiente(carril.id);
              await editarElemento(carrilesURL, carril.id, "notificar");
              console.log("Cambiado", carril.id, carril.notificar);
              // Marcar este carril como notificado
              setCarrilesNotificados([...carrilesNotificados, carril.id]);
            }
          }
        }
      }
    };
  
    processCarriles();
  }, [carriles, carrilesNotificados]);
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
    <View style={general.container}>
      <Text style={[general.tittleText, { margin: 100 }]}>Carriles</Text>

      <Text style={general.tittleText}>Placa: {placaGuardada} </Text>
      <FlatList
        data={carriles}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        renderItem={({ item }) => (
          <View style={styles.column}>
            <Button
              title={`${item.id} - ${item.estadosModel.nombre} ${
                item.cantidadMontacargas
                  ? ` - ${item.cantidadMontacargas} Montacargas `
                  : ""
              } `}
              buttonStyle={getButtonStyle(item.estadosModel.id)}
              onPress={() => Detalles(item.estadosModel.id, item.id)}
            />
          </View>
        )}
      />

      <Button title={'Opciones de Montacargas'} onPress={() => navigation.navigate('Opciones')} buttonStyle={[general.buttonPalette, {margin: 80}]} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default MenuCarrilApi;
