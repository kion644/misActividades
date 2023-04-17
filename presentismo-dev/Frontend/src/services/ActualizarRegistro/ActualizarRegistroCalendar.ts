import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { header } from '../../function/header';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { tipoHora } from '../../function/tipoHora';
import { useState } from 'react';

export default async function ActualizarRegistroCalendar(idLugar: number, descripcion: String,
  idProyecto: number, proyectoText: String, idTipoHora: number, idCliente: number, clienteText: String,
  idRegistro: String, justificacion: String,  fin: String ) {

    const cabecero:AxiosRequestHeaders={
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'User': ''+ localStorage.getItem('user')
} 

  try {

    const response = await axios({
     // url: environment.BACK_FRONT+'DetailsUpdate',
     url: environment.BACK+'registroHoras',
      method: 'PUT',
      headers: cabecero,
      data: {
          registroId: idRegistro,
          idLugarTrabajo: idLugar,
          idFase: idProyecto,
          proyectoText: proyectoText,
          idTipoHora: idTipoHora,
          idCliente: idCliente,
          descripcion: descripcion,
          justificacion: justificacion,
          fin: fin
        
      }
    })

    return response;
  }
  catch (e) {
    throw e
  }

}