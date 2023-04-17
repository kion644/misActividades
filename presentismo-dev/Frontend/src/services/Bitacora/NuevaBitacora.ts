import axios, { AxiosRequestHeaders } from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { header } from '../../function/header';
import { mensaje } from '../../models/Mensaje';

export default async function NuevaBitacora(idLicencia: number, mensaje:mensaje) {
 
  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 
  try {
    const response = await axios({
      url: environment.BACK+'mensajes/' + idLicencia,
      //url: environment.BACK_FRONT + 'newObservation',

      method: 'post',
      headers: cabecero,
      data: {
       texto: mensaje.texto,
       destinatario: mensaje.destinatario
      }
    }) 
    
    return response;
  }
  catch (e) {
    throw e
  }
  
}