import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

const fecha = () => {

  const hoy = new Date();

  const fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();

  const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds() + '.' + hoy.getMilliseconds();


  return fecha + ' ' + hora;

};

export default async function FinalizarJornada(hour: string) {

  try {
    
    const response = await axios({
      //url: environment.BACK_FRONT + 'Finish',
      url: environment.BACK+ 'finalizarJornada',
      method: 'post',
      headers: cabecero,
      data: {
          user: localStorage.getItem("user"),
          hour: fechaHora(hour),
      }
    })

    return response;
  }
  catch (e) {
    throw e
  }

}