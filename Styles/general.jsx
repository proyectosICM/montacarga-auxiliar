import { StyleSheet } from "react-native";
import { BotonColorOscuro, ColorTexto, ColorTextoBoton, ColotTexto } from "./PaletaColores";
//const fondo1 = require("./fondo1.jpg");

export const LogoAb = require('../Styles/logoab.png');

export const general = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#63777D",
    alignItems: "center",
    justifyContent: "center",
  },
  tittleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: ColorTexto
  },
  imagenLogo: {
    width: 350,  
    height: 150, 
    margin: 15
  },
  subLogo: {
    width: 250,  
    height: 100, 
    margin: 15
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  styleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2
  },
  textStyle: {
    fontSize: 18,
    marginBottom: 10,
  },

  flatListContent: {
    justifyContent: 'space-between',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  backButton: {
    backgroundColor: "#ccc",
    color: ColorTexto,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  marcaText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modeloText: {
    fontSize: 18,
    marginBottom: 20,
  },

  buttonPalette: {
    backgroundColor: BotonColorOscuro,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2
  },
  textoButton: {
    color: ColorTextoBoton,
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});