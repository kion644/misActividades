import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

export default async function PausarDia(valueLugar: string) {
  let idLugar: number = 0;

  if (valueLugar === 'Home Office') {
    idLugar = 1;
  }
  else if (valueLugar === 'Cliente') {
    idLugar = 2;
  }
  else if (valueLugar === 'Presencial CDA') {
    idLugar = 3;
  }

  try {
   
    const response = await axios({
      //url: environment.BACK_FRONT + 'pause',
      url: environment.BACK + 'pausar',
      method: 'post',
      headers: cabecero,
      data: {
        header,
        data: {
          user: localStorage.getItem("user"),
          hour: fechaHora(new Date()),
          idLugarTrabajo: idLugar,
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
