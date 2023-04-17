import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

export default async function RegistroDeHorasRangos(Desde: string, Hasta: string, user: String) {

  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 
 
  try {
 
    const response = await axios({
     // url: environment.BACK_FRONT+'DateFromToPerUser',
      url: environment.BACK+'registroHoras',
      method: 'get',
      headers: cabecero,
      params: {
        desde: Desde + ' 00:00:00',
        hasta: Hasta + ' 23:59:59',
        usuario: user
      }
    })

    return response;
  }
  catch (e) {
    throw e
  }

} 