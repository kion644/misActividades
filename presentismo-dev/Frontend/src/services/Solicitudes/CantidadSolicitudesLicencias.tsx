import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';

export default async function CantidadSolicitudesLicencias() {

  try {
    const response = await axios({
      url: environment.BACK + 'licencias/notificaciones',
     // url: environment.BACK_FRONT + "requestCount",
      method: 'get',
      headers: cabecero,
    })

    return response;
  }
  catch (e) {
    throw e
  }

}
