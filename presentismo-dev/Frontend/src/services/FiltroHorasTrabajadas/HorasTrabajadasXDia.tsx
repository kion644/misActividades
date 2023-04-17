import axios from 'axios'; 
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';

export default async function HorasTrabajadasXDia(begin:string,end:string,user:string) {

  try {
    const response = await axios({
      //url: environment.BACK_FRONT+'SchedulesPerDay',
     url: environment.BACK+'HorariosxDia',
      method: 'post',
      headers: cabecero,
      data: {
        header,
        data: {
            user: user, 
            begin:begin,
            end:end,
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