import axios, { AxiosRequestHeaders } from "axios";
import { environment } from "../../enviroment/enviroment";
import { cabecero } from "../../function/cabecero";
import { Feriados } from "../../models/Feriados";

export default async function NuevoFeriado(feriado: Feriados) {
  try {
    const response = await axios({
      url: environment.BACK + "feriados",
      //url: environment.BACK_FRONT + '',

      method: "post",
      headers: cabecero,
      data: {
        fecha: feriado.fecha,
        idPais: feriado.idPais,
        descripcion: feriado.descripcion,
      },
    });

    return response;
  } catch (e) {
    throw e;
  }
}
