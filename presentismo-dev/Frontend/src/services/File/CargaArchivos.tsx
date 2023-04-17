import axios from 'axios';
//import * as FormData from 'form-data';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function CargaArchivos(datos: FormData|undefined) {
 



 if(!datos)return

    try {
      const response = await axios({
          url: environment.BACK + 'adjunto',
          //url: environment.BACK_FRONT + 'uploadFile',

          method: 'post',
          headers:cabecero,
          data:datos
      })

      return response;
  }
  catch (e) {
    throw e
  }
  

}