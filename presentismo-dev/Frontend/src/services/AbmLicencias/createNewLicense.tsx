import axios from 'axios';
import Swal from 'sweetalert2';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewLicense (              
    descripcion:string,
    nombre:string,
    tipoProyecto: string,
    estado: string,
    clienteId: number,) {
    try {
      const response = await axios({
        url: environment.BACK + "tipoLicencia/"+ 38, 
        method: "post",
        headers: cabecero,
        data: {
            descripcion:descripcion,
            nombre:nombre,
            tipoProyecto: tipoProyecto,
            estado: estado,
            clienteID: clienteId
        },
      });
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
