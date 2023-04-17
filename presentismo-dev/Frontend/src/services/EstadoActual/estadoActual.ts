import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

const fecha = (xfecha: string) => {

  if(xfecha==null){
    const hoy = new Date()
    const fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
    return fecha;
  }else{
    const hoy = new Date(xfecha)
    const fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
    return fecha;
  }

};




export default async function EstadoActual(xfecha: string) {
  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'User': ''+ localStorage.getItem('user')
} 

  try {
   
    const response = await axios({
      //url: environment.BACK_FRONT+'CurrentState',
     url: environment.BACK+'status',
      method: 'post',
      headers: cabecero,
      data: {
        header:{
          consulter: localStorage.getItem("user"),
        date: new Date().toString(),
        messageId: idMensagge(),
        token: localStorage.getItem('token')},
        data: {
          user: localStorage.getItem("user"),
          day: fecha(xfecha),

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