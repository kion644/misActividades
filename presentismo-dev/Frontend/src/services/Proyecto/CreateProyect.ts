import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { fechaHora } from '../../function/fechaHora';
import { Proyecto } from '../../models/Proyecto';

export default async function createNewProyect (newName: string,newDescription: string,newType:string,newClient:string,newLider:string,newEstado:string, newHorasCliente:number, newCN: number, newFechaInicio: Date, newFechaFinEstimada: Date) {
    try {
      const response = await axios({
        url: environment.BACK + "proyectos",
        method: "post",
        headers: cabecero,
        data: {
          nombre: newName,
          descripcion: newDescription,
          tipoProyecto: newType,
          idCliente: newClient,
          idLider: newLider,
          estado:newEstado,
          horasCliente: newHorasCliente,
          idCasoNegocio: newCN,
          fechaInicio: newFechaInicio,
          fechaFinEstimada: newFechaFinEstimada,
          fechaAlta: fechaHora(new Date())
          
        },
      });
    } catch (e) {
      throw e;
    }
};