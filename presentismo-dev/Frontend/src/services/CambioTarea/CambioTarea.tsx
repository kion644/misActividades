import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';
export default async function CambioTarea() {
 
  try {
  
    const response = await axios({
     // url: environment.BACK_FRONT+'TaskChange',
      url: environment.BACK+'CambioTarea',
      method: 'post',
      headers: cabecero,
      data: {
        header,
        data: {
          user: localStorage.getItem("user"),
          hour: fechaHora(new Date()),
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