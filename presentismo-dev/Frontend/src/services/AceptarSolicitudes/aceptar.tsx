import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
export default async function aceptar(idRegistro: string, estado: string) {

  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 
  try {

    

    const response = await axios({
      //url: environment.BACK_FRONT +'ApprovedRequest',
     url: environment.BACK +'aceptacion',
      method: 'post',
      headers:cabecero,
      data: {
        header,
        data: {
          registroId: idRegistro,
          estadoRegistro: estado,
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