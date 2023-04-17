import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

export default async function LugarTrabajo() {

  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 
  try {
    
    const response = await axios({
      //url: environment.BACK_FRONT + 'Workplace',
      url: environment.BACK + 'lugarTrabajo',
      method: 'post',
      headers: cabecero,
      data: {
        header:{consulter: localStorage.getItem("user"),
        date: new Date().toString(),
        messageId: idMensagge(),
        token: localStorage.getItem('token')},
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