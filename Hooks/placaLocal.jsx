import AsyncStorage from "@react-native-async-storage/async-storage";

// Función para guardar la placa en el almacenamiento local
export const guardarPlacaEnAlmacenamiento = async (
  placa,
  setPlaca,
  setPlacaGuardada
) => {
  try {
    await AsyncStorage.setItem("placaMontacargas", placa);
    setPlacaGuardada(placa);
    setPlaca("");
  } catch (error) {
    console.error("Error al guardar la placa:", error);
  }
};

// Función para cargar la placa desde el almacenamiento local
export const cargarPlacaDesdeAlmacenamiento = async (setPlacaGuardada) => {
  try {
    const placaGuardada = await AsyncStorage.getItem("placaMontacargas");
    if (placaGuardada !== null) {
      setPlacaGuardada(placaGuardada);
    }
  } catch (error) {
    console.error("Error al cargar la placa:", error);
  }
};

// Función para eliminar la placa del almacenamiento local
export const eliminarPlacaDelAlmacenamiento = async (navigation) => {
  try {
    await AsyncStorage.removeItem("placaMontacargas");
    navigation.navigate('Identificar')
  } catch (error) {
    console.error("Error al eliminar la placa:", error);
  }
};


// Función para guardar la placa en el almacenamiento local
export const guardarNIp= async (
  placa,
  setPlaca,
  setPlacaGuardada
) => {
  try {
    await AsyncStorage.setItem("NServidor", placa);
    setPlacaGuardada(placa);
    setPlaca("");
  } catch (error) {
    console.error("Error al guardar la ip:", error);
  }
};

// Función para cargar la placa desde el almacenamiento local
export const cargarNIP = async (setPlacaGuardada) => {
  try {
    const placaGuardada = await AsyncStorage.getItem("NServidor");
    if (placaGuardada !== null) {
      setPlacaGuardada(placaGuardada);
    }
  } catch (error) {
    console.error("Error al cargar la op:", error);
  }
};



// Función para eliminar la placa del almacenamiento local
export const eliminarNIP = async () => {
  try {
    await AsyncStorage.removeItem("NServidor");
  } catch (error) {
    console.error("Error al eliminar la ip:", error);
  }
};
