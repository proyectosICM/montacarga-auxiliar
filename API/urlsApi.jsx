import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { cargarNIP } from "../Hooks/placaLocal";




export const base = 'https://montacargas-api-production.up.railway.app/api';
// export const base = 'http://192.168.1.202:65006/api/api';
// export const base = '161.132.180.242:65006/api/api'; 
export const carrilesURL = `${base}/carriles`;
export const asignarMont = `${carrilesURL}/asignarMontacargas/`;
export const finAuxiliarURL = `${carrilesURL}/finAuxiliar/`
export const unirseURL = `${carrilesURL}/unirse/`
export const desunirseURL = `${carrilesURL}/desunirse/`
export const cambiarEstadoURL = `${carrilesURL}/cambiarEstado/`

export const notificarURL = `${carrilesURL}/notificarIng/`