export class Feriados {
  fecha: string;
  idPais: number;
  descripcion: string;
  registroId?: number;
  constructor(
    fecha: string,
    idPais: number,
    descripcion: string,
    registroId?: number,
    ) {
      this.fecha = fecha;
      this.idPais = idPais;
      this.descripcion = descripcion;
      this.registroId = registroId;
  }
}
