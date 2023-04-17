import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function Rechazado() {
  try {
  
    const response = await axios({
     // url: environment.BACK_FRONT + 'RejectedRequest',
      url: environment.BACK + 'registroHorasRechazados',
      method: 'post',
      headers:cabecero,
      data: {
        header,
        data: {

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
