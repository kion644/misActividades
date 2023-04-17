import axios from "axios";
import { environment } from "../../enviroment/enviroment";
import { cabecero } from "../../function/cabecero";
import { Feriados } from "../../models/Feriados";

export default async function obtenerFeriados():Promise<Feriados[]> {
  try {
    const response = await axios({
      url: environment.BACK + "feriados",
      method: "get",
      headers: cabecero,
    });

    return response.data;
  } catch (e) {
    throw e;
  }
}
