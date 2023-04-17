import axios from 'axios';
import Swal from 'sweetalert2';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewMoneda (              
   
    descripcion:string,
    abreviatura:string
 ) {
    try {
      const response = await axios({
        url: environment.BACK + "moneda/new", 
        method: "post",
        headers: cabecero,
        data: {
          id: 0,
            descripcion,
            abreviatura
        },
      });
      return response;
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: error.status,
      //   text: error.message,
      //   //footer: '<a href>Why do I have this issue?</a>'
      // });
      throw error;
    }
};
