import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";

export function DetalleCarril() {
  const navigation = useNavigation();
  const [montacarga1Liberado, setMontacarga1Liberado] = useState(false);
  const [montacarga2Liberado, setMontacarga2Liberado] = useState(false);
  const [simulacionCompletada, setSimulacionCompletada] = useState(false);

  const [confirmacionSalida, setConfirmacionSalida] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0); // Estado para el temporizador
  const [isEnabled, setIsEnabled] = useState(false); 
  useEffect(() => {
    // Iniciar el temporizador cuando el componente se monta
    const interval = setInterval(() => {
      if (secondsRemaining >= 0) {
        setSecondsRemaining(secondsRemaining + 1);
      } else {
        clearInterval(interval); // Detener el temporizador cuando llegue a cero
        setIsEnabled(true); // Habilitar el botón
      }
    }, 1000); // Actualizar cada 1 segundo

    // Limpieza cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const Liberar = (montacarga) => {
    realizarLiberacion(montacarga);
  };

  const realizarLiberacion = (montacarga) => {
    if (montacarga === 1) {
      setMontacarga1Liberado(true);
    } else if (montacarga === 2) {
      setMontacarga2Liberado(true);
    }
  };

  const Anunciar = () => {
    Alert.alert(
      "Confirmar Liberación",
      `¿Seguro que desea confirmar termino de carga?`,
      [
        { text: "No", style: "cancel" },
        { text: "Sí" },
      ]
    );
  };

  const permitirSalidaHabilitado = montacarga1Liberado && montacarga2Liberado;

  const handleSimulacionClick = () => {
    if (!simulacionCompletada) {
      if (!montacarga1Liberado) {
        setMontacarga1Liberado(true);
      } else if (!montacarga2Liberado) {
        setMontacarga2Liberado(true);
        setSimulacionCompletada(true);
      }
    } else {
      setSimulacionCompletada(false);
      setMontacarga1Liberado(false);
      setMontacarga2Liberado(false);
    }
  };

  const handleConfirmacionSalidaClick = () => {
    setConfirmacionSalida(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carril 1</Text>
      <Text style={styles.status}>Estado: Ocupado</Text>
      <Text style={styles.status}>Tiempo: {secondsRemaining}</Text>

      <Button
        title={
          montacarga1Liberado
            ? "Montacarga 1 - Libre"
            : "Montacarga 1 - Cargando mercaderia"
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
            : "Montacarga 2 - Cargando mercaderia"
        }
        buttonStyle={[
          styles.button,
          montacarga2Liberado && styles.liberadoButton,
        ]}
        onPress={() => Liberar(2)}
      />

      <Button
        title={"Avisar término de carga al conductor"}
        buttonStyle={[
          styles.salidaButton,
          !permitirSalidaHabilitado && styles.disabledButton,
        ]}
        disabled={!permitirSalidaHabilitado}
        onPress={() => Anunciar()}
      />

      <Text style={styles.waitText}>Esperando a que el conductor confirme su salida</Text>
      <Text style={styles.confirmationText}>
        {confirmacionSalida ? "Salida: Confirmada" : "Salida: No confirmada"}
      </Text>

      <Button
        title={simulacionCompletada ? 'Simulación Completada' : 'Simular término de carga'}
        buttonStyle={[
          styles.simulateButton,
          simulacionCompletada && styles.simulationCompletedButton,
        ]}
        onPress={handleSimulacionClick}
      />

      <Button
        title={'Simular confirmación de salida'}
        buttonStyle={[
          styles.confirmationButton,
          confirmacionSalida && styles.confirmationCompletedButton,
        ]}
        onPress={handleConfirmacionSalidaClick}
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
  simulateButton: {
    backgroundColor: "#F0AD4E", // Color para el botón de simulación
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
  },
  simulationCompletedButton: {
    backgroundColor: "#28A745", // Cambiar a verde cuando la simulación está completada
  },
  confirmationButton: {
    backgroundColor: "#007BFF", // Color para el botón de confirmación
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmationCompletedButton: {
    backgroundColor: "#28A745", // Cambiar a verde cuando la confirmación está completada
  },
  waitText: {
    fontSize: 16,
    marginTop: 10,
  },
  confirmationText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default DetalleCarril;
