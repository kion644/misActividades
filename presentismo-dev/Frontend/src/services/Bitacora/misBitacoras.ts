import axios, { AxiosRequestHeaders } from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';

export default async function misBitacoras(idLicencia:number) {
  
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
      //url: environment.BACK_FRONT + 'observationChat',

      method: 'get',
      headers: cabecero,

    }) 
    
    return response;
  }
  catch (e) {
    throw e
  }
  
}