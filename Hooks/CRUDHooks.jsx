import axios from "axios";
import { useCallback, useEffect } from "react";

export function useListarElementos(url, dato, setDatos) {
  const ListarCarriles = async () => {
    try {
      const response = await axios.get(url);
      setDatos(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    ListarCarriles();
  }, [ListarCarriles]);

  return dato;
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
