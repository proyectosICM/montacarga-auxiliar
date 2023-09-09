import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { cargarNIP } from "../Hooks/placaLocal";




//export const base = ipN ? `http://${ipN}/api` : 'http://192.168.1.231:8080/api';

//export const base = 'https://api-montacargas-production.up.railway.app/api';

//export const base = 'http://192.168.1.232:8080/api';
//export const carrilesURL = `${base}/carriles`;
export const carrilesURL = `https://api-montacargas-production.up.railway.app/api/carriles`;
export const asignarMont = `${carrilesURL}/asignarMontacargas/`;
export const finAuxiliarURL = `${carrilesURL}/finAuxiliar/`
export const unirseURL = `${carrilesURL}/unirse/`
export const desunirseURL = `${carrilesURL}/desunirse/`

export const notificarURL = `${carrilesURL}/notificarIng/`