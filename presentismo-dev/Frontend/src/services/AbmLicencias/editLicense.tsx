import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function editLicence ( 
    descripcion:string,
    nombre:string,
    tipoProyecto: string,
    estado: string,
    clienteId: number,
    id?: number,
    ) {
    try {
      const response = await axios({
        url: environment.BACK + "tipoLicencia/"+ clienteId,
        method: "put",
        headers: cabecero,
        data: {
          nombre:nombre,
          descripcion:descripcion,
          estado: estado,
          tipoProyecto: tipoProyecto,
          clienteId: clienteId,
          id: id,
        },
      });
    } catch (e) {
      throw e;
    }
};
