import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function estadoPendientes() {

  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 
 
  try {
   
    const response = await axios({
    // url: environment.BACK_FRONT+'stateLeaderRecord',
      url: environment.BACK+'registroLiderCargoEstado',
      method: 'post',
      headers: cabecero,
      data: {
        header,
        data: {
          user: localStorage.getItem("user"),
          estadoRegistro: "Pendiente",
        },
        info: {
          message: '',
          code: ''
        }
      }
    })

    return response;
  }
  catch (e) {
    throw e
  }

}