import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { fechaHora } from '../../function/fechaHora';
import { Proyecto } from '../../models/Proyecto';

export default async function editProyectos (proyecto: Proyecto ) {
    
    try {
      const response = await axios({
        url: environment.BACK + "proyectos",
        method: "put",
        headers: cabecero,
        data: {
          id: proyecto.id,
          nombre: proyecto.nombre,
          descripcion: proyecto.descripcion,
          idCliente: proyecto.cliente,
          estado: proyecto.estado,
          tipoProyecto: proyecto.tipoProyecto,
          horasCliente: proyecto.horasCliente,
          idCasoNegocio: proyecto.idCasoNegocio,
          fechaUltimaActualizacion: fechaHora(new Date())
        },
      });

      return response;
    } catch (e) {
      throw e;
    }
};