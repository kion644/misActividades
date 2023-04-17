import axios from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

export default async function HorasTrabajas(begin:string,end:string,user:string) {

  try {
  
    const response = await axios({
      //url: environment.BACK_FRONT+'Schedules',
      url: environment.BACK+'Horarios',
      method: 'post',
      headers: cabecero,
      data: {
        data: {
            user: user,
            begin:begin,
            end:end,
          }
      }
    }) 
    
    return response;
  }
  catch (e) {
    throw e
  }
  
}