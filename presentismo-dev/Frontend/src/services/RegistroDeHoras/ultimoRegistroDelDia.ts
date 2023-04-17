import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { idMensagge } from '../../function/idMenssage';
import { cabecero } from '../../function/cabecero';
import { header } from '../../function/header';
import { useState } from 'react';

export default async function ultimoRegistroDelDia() {

  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 
  try {
    
    const response = await axios({
      //url: environment.BACK_FRONT + 'RegisterOfHous',
     url: environment.BACK + 'registroHoras/ultimoDelDia',
      method: 'get',
      headers:cabecero,
    })

    return response;
  }
  catch (e) {
    throw e
  }

} 