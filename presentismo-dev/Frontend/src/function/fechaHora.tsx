export const fechaHora = (d: any) => {

    const hoy = new Date(d);
  
    const fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
  
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds() + '.' + hoy.getMilliseconds();
  
  
    return fecha + ' ' + hora;
  
  };