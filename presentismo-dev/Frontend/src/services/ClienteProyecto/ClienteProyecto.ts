import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

export default async function ClienteProyecto(user: string | null) {

  try {
  
    const response = await axios({
    //  url: environment.BACK_FRONT+'GetProyect',
      url: environment.BACK+'ProyectoFase',
      method: 'post',
      headers: cabecero,
      data: {
        header:{consulter: localStorage.getItem("user"),
        date: new Date().toString(),
        messageId: idMensagge(),
        token: localStorage.getItem('token')},
        data: {
          user: user
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