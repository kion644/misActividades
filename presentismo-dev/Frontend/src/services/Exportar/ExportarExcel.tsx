import axios from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { soloFecha } from '../../function/soloFecha';
export default async function ExportarExcel() {
 
  try {
    const response = await axios({
      url: environment.BACK+'exportExcelRegistro',
      method: 'post',
      responseType: 'blob',
      headers: cabecero,
      data: {
        header:{
          consulter: localStorage.getItem("user"),
          date: new Date().toString(),
          messageId: idMensagge(),
        },
        data: {
            day: soloFecha(new Date()),
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