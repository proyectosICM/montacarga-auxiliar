import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function useRedirectEffect(carril, estado) {
  const navigation = useNavigation();

  useEffect(() => {
    switch (estado) {
      case 1:
        if (carril && carril.estadosModel.id === 2) {
          navigation.replace("Asignar", { carrilId: carril.id });
        }
        break;
      case 2:
        if (carril && carril.estadosModel.id === 1) {
          navigation.replace("Libre", { carrilId: carril.id });
        } else if (carril && carril.estadosModel.id === 3) {
          navigation.replace("Detalle", { carrilId: carril.id });
        }
        break;
      case 3:
        if (carril && carril.estadosModel.id === 1) {
          navigation.replace("Libre", { carrilId: carril.id });
        }
        break;
    }
  }, [carril, navigation]);
}
