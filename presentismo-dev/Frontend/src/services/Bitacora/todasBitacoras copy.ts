import axios from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';

export default async function todasBitacoras(idLecencia:number,seleccion:number) {
 
  try {
    const response = await axios({
      url: environment.BACK+'bitacoraChatTodo',
      //url: environment.BACK_FRONT + 'observationChat',

      method: 'post',
      headers: cabecero,
      data: {
       header,
        data: {
            id: idLecencia, 
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
  }
  
}