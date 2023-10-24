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
      <Text style={general.title}>Carril {carril && carril.nombre}</Text>
      <Text style={general.title}>Este carril se encuentra libre</Text>
      <Text style={[general.tittleText, { textAlign: "center" }]}>Cuando el sensor detecte un camion el estado cambiara</Text>
    </View>
  );
}
