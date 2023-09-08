import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { base, carrilesURL } from "../API/urlsApi";
import { sendPushNotificationCamionPendiente } from "../screens/MenNot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cargarNIP, cargarNIP2 } from "./placaLocal";


export function useListarElementos(url, dato, setDatos) {

  const ListarCarriles = async () => {
    try {
      const response = await axios.get(`${url}`);
      setDatos(response.data);
      /*const da = response.data;
      da.forEach(async (d) => {
        if (!d.notificar && d.estadosModel.id === 2) {
          await axios.get(`${carrilesURL}/${d.id}`).then(async (response) => {
            const elemento = response.data;
            elemento[`notificar`] = true;
            await axios.put(`${carrilesURL}/${d.id}`, elemento).then(() => {
              sendPushNotificationCamionPendiente(d.id);
            });
          });
        }
      });*/

    } catch (error) {
      console.error("Error al obtener los datos:", error, url);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(ListarCarriles, 500); // Llama a ListarCarriles cada 1 segundo
    ListarCarriles();
    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, []);

/*
  useEffect(() => {
    ListarCarriles();
  }, [ListarCarriles]);
  return dato;
*/
}

export function editarElemento(url, id, est) {
  const nurl = `${url}/${id}`;

  axios.get(nurl).then((response) => {
    const elemento = response.data;

    elemento[est] = true;

    axios.put(nurl, elemento).then(() => {
      console.log(elemento);
    });
  });
}
