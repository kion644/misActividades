import axios, { AxiosRequestHeaders } from 'axios';
import { environment } from '../../enviroment/enviroment';
import { header } from '../../function/header';
import { fechaHora } from '../../function/fechaHora';
import { idMensagge } from '../../function/idMenssage';
import { tipoHora } from '../../function/tipoHora';
import { useState } from 'react';

export default async function ActualizarRegistro(inicio: Date, fin: Date, idLugar: number, Descripcion: String,
  idProyecto: number, proyectoText: String, idTipoHora: String, idCliente: number, clienteText: String,
  idRegistro: String) {

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
     url: environment.BACK+'editarDetalle',
      method: 'post',
      headers: cabecero,
      data: {
        header,
        data: {
          registroId: idRegistro,
          begin: fechaHora(inicio),
          end: fechaHora(fin),
          idLugarTrabajo: idLugar,
          idFase: idProyecto,
          proyectoText: proyectoText,
          idTipoHora: tipoHora(idTipoHora),
          user: localStorage.getItem("user"),
          idCliente: idCliente,
          txt: Descripcion,
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