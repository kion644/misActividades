import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { header } from '../../function/header';
import { idMensagge } from '../../function/idMenssage';






export default async function PuedoIniciar() {
  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
  } 
  try {
    const response = await axios({
      url: environment.BACK + 'completeRegistro',
      //url: environment.BACK_FRONT+ 'CanIStart',
      method: 'post',
      headers: cabecero,
      data: {
        user: localStorage.getItem('user')
      }
    })

    return response;
  }
  catch (e) {
    throw e
  }

}
