import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useListarElementos } from "../Hooks/CRUDHooks";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";
import { carrilesURL } from "../API/urlsApi";
import { useRoute } from "@react-navigation/native";
import { LogoAb, general } from "../Styles/general";

export function CarrilLibre() {
  const route = useRoute();
  const { carrilId } = route.params;
  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);
  useRedirectEffect(carril, 1);

  return (
    <View style={general.container}>
      <View>
        <Image source={LogoAb} style={general.imagenLogo} />
      </View>
      <Text style={general.tittleText}>Carril Libre</Text>
      <Text style={[general.tittleText, { textAlign: "center" }]}>Este carril se encuentra libre, cuando se detecte un camion recibira una notificacion</Text>
    </View>
  );
}
