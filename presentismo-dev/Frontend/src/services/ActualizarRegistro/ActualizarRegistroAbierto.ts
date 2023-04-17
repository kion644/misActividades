import axios, { AxiosRequestHeaders } from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { idMensagge } from '../../function/idMenssage';
import { tipoHora } from '../../function/tipoHora';
import { header } from '../../function/header';
import { useState } from 'react';

  const fechas = (d:any) => {

    const hoy = new Date(d);
  
    const fecha = hoy.getFullYear() + '-' +  (hoy.getMonth() + 1) + '-' + hoy.getDate();
  
    const hora  = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds() + '.' + hoy.getMilliseconds();
  
  
    return fecha + ' ' + hora;
  
  };




export default async function ActualizarRegistro(inicio:Date,idLugar:number,Descripcion:String,
idProyecto:number,proyectoText:String,idTipoHora:String,idCliente:number,clienteText:String,
idRegistro:String) {
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
      headers:cabecero,
      data: {
        header,
        data: {
          registroId: idRegistro,
          begin: fechas(inicio),
          idLugarTrabajo: idLugar,
          idProyecto: 1,
          proyectoText: proyectoText,
          idTipoHora: tipoHora(idTipoHora),
          user:localStorage.getItem("user"), 
          idCliente: idCliente,
          clienteText: clienteText,
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