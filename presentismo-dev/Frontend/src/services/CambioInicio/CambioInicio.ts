import axios, { AxiosRequestHeaders } from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';
export default async function CabioInicio(idRegistro:number,beginChange:Date,justification:string) {
 
  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 
  try {
   
    const response = await axios({
      //url: environment.BACK_FRONT+'StartChange',
      url: environment.BACK+'editarInicio',
      method: 'post',
      headers: cabecero,
      data: {
       header,
        data: {
            registroId: idRegistro, 
            beginChange:fechaHora(beginChange),
            justification:justification,
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