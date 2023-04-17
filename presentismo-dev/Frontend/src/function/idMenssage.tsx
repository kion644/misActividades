export const idMensagge = () => {
    const hoy = new Date();
  
    const fecha = (hoy.getFullYear()) + ('0' + (hoy.getMonth() + 1)).slice(-2) + ('0' + (hoy.getDate())).slice(-2) +
      ('0' + (hoy.getMinutes())).slice(-2) + ('0' + (hoy.getSeconds())).slice(-2) + ('0' + (hoy.getMilliseconds())).slice(-3) + '7';
    return fecha;
  }