export function getFormattedStartTime() {
  const horaDeInicio = new Date();
  const hora = horaDeInicio.getHours();
  const minutos = horaDeInicio.getMinutes().toString().padStart(2, "0");
  const segundos = horaDeInicio.getSeconds().toString().padStart(2, "0");

  return `${hora}:${minutos}:${segundos}`;
}
/*
export function formateoTiempo(timeArray) {
    const horaDeInicio = new Date(
      0,
      0,
      0,
      timeArray[0],
      timeArray[1],
      timeArray[2]
    );
    
    const formattedHora = horaDeInicio.getHours();
    const formattedMinutos = horaDeInicio.getMinutes().toString().padStart(2, '0');
    const formattedSegundos = horaDeInicio.getSeconds().toString().padStart(2, '0');
  
    return `${formattedHora}:${formattedMinutos}:${formattedSegundos}`;
  }
  */

  export function formateoTiempo(timeArray) {
    const horas = timeArray;
    if (horas.length < 3) {
      horas.push("00");
    }
    
    const horaDeInicio = new Date(
      0,
      0,
      0, 
      parseInt(horas[0]),
      parseInt(horas[1]),
      parseInt(horas[2])
    );
    
    const formattedHora = horaDeInicio.getHours().toString().padStart(2, '0');
    const formattedMinutos =  horaDeInicio.getMinutes().toString().padStart(2, '0');
    const formattedSegundos =  horaDeInicio.getSeconds().toString().padStart(2, '0');
  
    return `${formattedHora}:${formattedMinutos}:${formattedSegundos}`;
  }
  

  export const calcularTiempoTotal = (horaInicio, horaFin) => {
    const horaInicioDate = new Date(
      0,
      0,
      0,
      horaInicio[0],
      horaInicio[1],
      horaInicio[2]
    );
    const horaFinDate = new Date(0, 0, 0, horaFin[0], horaFin[1], horaFin[2]);

    const diferenciaEnMilisegundos = horaFinDate - horaInicioDate;
    const segundosTotales = Math.floor(diferenciaEnMilisegundos / 1000);

    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;

    return { minutos, segundos };
  };