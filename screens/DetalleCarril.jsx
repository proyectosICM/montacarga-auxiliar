import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { carrilesURL, finAuxiliarURL } from "../API/urlsApi";
import { useListarElementos } from "../Hooks/CRUDHooks";
import { calcularTiempoTotal, formateoTiempo, getFormattedStartTime } from "../Hooks/timeUtils";
import axios from "axios";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";

export function DetalleCarril() {
  const route = useRoute();
  const { carrilId } = route.params;
  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);

  useRedirectEffect(carril, 3);

  const navigation = useNavigation();
  const [montacarga1Liberado, setMontacarga1Liberado] = useState(false);
  const [montacarga2Liberado, setMontacarga2Liberado] = useState(false);
  const [simulacionCompletada, setSimulacionCompletada] = useState(false);

  const [confirmacionSalida, setConfirmacionSalida] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0); // Estado para el temporizador
  const [isEnabled, setIsEnabled] = useState(false);

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
      "Confirmar Termino de carga",
      `¿Seguro que desea confirmar término de carga?`,
      [
        { text: "No", style: "cancel" },
        { text: "Sí", onPress: ConfirmarFin },
      ]
    );
  };

  const ConfirmarFin = async () => {
    const horaDeFin = getFormattedStartTime();
    const requestData = {
      finAuxiliar: 1,
      horaFin: horaDeFin,
    };
    console.log(`${finAuxiliarURL}${carrilId}`);
    console.log(requestData);
    await axios.put(`${finAuxiliarURL}${carrilId}`, requestData);
  };

  const permitirSalidaHabilitado =
    carril &&
    ((carril.cantidadMontacargas === 1 && carril.finMontacarga1) ||
      (carril.cantidadMontacargas === 2 &&
        carril.finMontacarga1 &&
        carril.finMontacarga2));

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
      {carril && (
        <>
          <Text style={styles.title}>Carril {carril.id}</Text>
          <Text style={styles.status}>
            Estado: {carril.estadosModel.nombre}
          </Text>
          <Text style={styles.status}>
            Hora de Inicio de carga:{" "}
            {carril.horaInicio ? formateoTiempo(carril.horaInicio) : "--"}
          </Text>
          <Text style={styles.status}>
            {carril.horaFin && (
              <Text style={styles.status}>
                Hora de Fin de carga:{" "}
                {carril.horaFin ? formateoTiempo(carril.horaFin) : "--"}
              </Text>
            )}
          </Text>
          <Text style={styles.status}>
            TIempo total:{" "}
            {carril.horaInicio && carril.horaFin && (
              <Text>
                {calcularTiempoTotal(carril.horaInicio, carril.horaFin).minutos}
                :
                {
                  calcularTiempoTotal(carril.horaInicio, carril.horaFin)
                    .segundos
                }{" "}
                minutos
              </Text>
            )}
          </Text>

          {carril.cantidadMontacargas === 1 && (
            <Button
              title={
                carril.finMontacarga1
                  ? "Montacarga 1 - Libre"
                  : "Montacarga 1 - Cargando mercaderia"
              }
              buttonStyle={[
                styles.button,
                carril.finMontacarga1 && styles.liberadoButton,
              ]}
            />
          )}

          {carril.cantidadMontacargas === 2 && (
            <>
              <Button
                title={
                  carril.finMontacarga1
                    ? "Montacarga 1 - Libre"
                    : "Montacarga 1 - Cargando mercaderia"
                }
                buttonStyle={[
                  styles.button,
                  carril.finMontacarga1 && styles.liberadoButton,
                ]}
              />
              <Button
                title={
                  carril.finMontacarga2
                    ? "Montacarga 2 - Libre"
                    : "Montacarga 2 - Cargando mercaderia"
                }
                buttonStyle={[
                  styles.button,
                  carril.finMontacarga2 && styles.liberadoButton,
                ]}
              />
            </>
          )}

          {carril.finAuxiliar != true && (
            <Button
              title={
                "Avisar término de carga y retiro de trabaruedas al conductor "
              }
              buttonStyle={[
                styles.salidaButton,
                !permitirSalidaHabilitado && styles.disabledButton,
              ]}
              disabled={!permitirSalidaHabilitado}
              onPress={() => Anunciar()}
            />
          )}

          {carril.salida !== true && (
            <Text style={styles.waitText}>
              Esperando a que el conductor confirme su salida
            </Text>
          )}
          <Text style={styles.confirmationText}>
            {carril.finAuxiliar
              ? "Fin de carga: Confirmada"
              : "Fin de carga: No confirmada"}
          </Text>
          <Text style={styles.confirmationText}>
            {carril.salida
              ? "Salida del conductor: Confirmada"
              : "Salida del conductor: No confirmada"}
          </Text>
          {/*
<Button
            title={
              simulacionCompletada
                ? "Simulación Completada"
                : "Simular término de carga"
            }
            buttonStyle={[
              styles.simulateButton,
              simulacionCompletada && styles.simulationCompletedButton,
            ]}
            onPress={handleSimulacionClick}
          />

          <Button
            title={"Simular confirmación de salida"}
            buttonStyle={[
              styles.confirmationButton,
              confirmacionSalida && styles.confirmationCompletedButton,
            ]}
            onPress={handleConfirmacionSalidaClick}
          />
              */}
        </>
      )}
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
