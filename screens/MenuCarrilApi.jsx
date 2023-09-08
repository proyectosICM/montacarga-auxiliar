import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { carrilesURL, notificarURL } from "../API/urlsApi";
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
import { cargarNIP, cargarPlacaDesdeAlmacenamiento } from "../Hooks/placaLocal";
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

  const [notificar, setNotificar] = useState(null);
/*
  useEffect(() => {
    if(carriles){
      carriles.forEach((carril) => {
        if (!carril.notificar && carril.estadosModel.id == 2) {
            axios.put(`${notificarURL}${carril.id}`).then(()=> {
              setNotificar(true)
              console.log("Notificado", carril.id)
              sendPushNotificationCamionPendiente(carril.id);
          });
        }
      });

      // Verificar si se debe enviar la notificación
      /*
      const shouldNotify = carriles.some((carril) => carril.notificar);
      if (shouldNotify && notificar) {
        console.log("Notificado 3")
        //sendPushNotificationCamionPendiente("ZE");
        setNotificar(false);
      }

    }
  }, [carriles, notificar]); 
*/

const getButtonStyle = (estadoId, id) => {
  if (estadoId === 1) {
    return styles.libreButton;
  } else if (estadoId === 2) {
    // Realizar el PUT y manejar la notificación en el .then()
   /* axios.put(`${notificarURL}${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("YA")
          sendPushNotificationCamionPendiente("WSE");
        }
      })
      .catch((error) => {

      });
*/
    return styles.pendienteButton;
  } else if (estadoId === 3) {
    return styles.ocupadoButton;
  }
  return styles.libreButton; // Por defecto
};

const [ipn, setIpn] = useState();
cargarNIP(setIpn)

  return (
    <View style={general.container}>
      <Text style={[general.tittleText, { margin: 100 }]}>Carriles</Text>
      <Text style={general.tittleText}>url: {ipn} </Text>
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
              buttonStyle={getButtonStyle(item.estadosModel.id, item.id)}
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
