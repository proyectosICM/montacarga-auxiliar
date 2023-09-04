import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useBackHandler = (navigation) => {
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp(); // Cierra la aplicación si estás en la pantalla "Inicio" y no hay usuario
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);
};