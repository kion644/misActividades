import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { fechaHora } from '../../function/fechaHora';

export default async function reporteDeHoras (proyecto: string,tipoDeFecha: string,tipoDeHora:string,dateDesde: Date, dateHasta: Date) {
    try {
      const response = await axios({
        url: environment.BACK + "proyectos",
        method: "post",
        headers: cabecero,
        data: {
          proyecto: proyecto,
          tipoDeFecha: tipoDeFecha,
          tipoDeHora: tipoDeHora,
          dateDesde: fechaHora(dateDesde),
          dateHasta: fechaHora(dateHasta),
          
        },
      });
    } catch (e) {
      throw e;
    }
};