import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';

export default async function CantidadSolicitudesBitaLicencia(idLicencia:number) {

  try {
    const response = await axios({
      url: environment.BACK + 'cantNuevasBitaEnLicencia',
     // url: environment.BACK_FRONT + "requestCount",
      method: 'post',
      headers: cabecero,
      data: {
        header,
        data: {
          idLicencia: idLicencia,
          user: localStorage.getItem("user"),
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
