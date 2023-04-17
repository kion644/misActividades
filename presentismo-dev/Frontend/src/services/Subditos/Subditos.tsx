import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';

export default async function Subditos() {


  try {
    const response = await axios({
      url: environment.BACK + 'subditos',
      //url: environment.BACK_FRONT + 'subjects',
      method: 'post',
      headers: cabecero,
      data: {
        header,
        data: {
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