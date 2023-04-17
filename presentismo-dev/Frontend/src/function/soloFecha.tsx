export const soloFecha = (d: any) => {

    const hoy = new Date(d);
  
    const fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
  
    return fecha ;
  
  };