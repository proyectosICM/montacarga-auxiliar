import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useListarElementos } from '../Hooks/CRUDHooks';
import { useRedirectEffect } from '../Hooks/useRedirectEffect';
import { carrilesURL } from '../API/urlsApi';
import { useRoute } from '@react-navigation/native';

export function CarrilLibre(){
    const route = useRoute();
    const { carrilId } = route.params;
    const [carril, setCarril] = useState();
    useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);
    useRedirectEffect(carril, 1);

    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Carril Libre</Text>
            <Text style={styles.title}>Este carril se encuentra libre, cuando se detecte un camion recibira una notificacion</Text>
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
      textAlign:"center"
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