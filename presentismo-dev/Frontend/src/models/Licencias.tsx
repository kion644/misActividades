export class licencias{
    idRegistro: number;
    idArchivo: number|null;
    idTipoLicencia: number;
    nombre:string;
    fechaDesde: string;
    fechaHasta: string;
    bitaciora: number|null;
    usuario: string;
    usuario_Modifico: string;
    usuario_Asignado: string;
    ultima_modificacion: string;
    fecha_creacion: string;
    diasPedido: number;
    estado: string;
    requiereArchivo: boolean;
    tieneArchivo: boolean;
    tieneBitas: boolean;
constructor(idRegistro: number,
    idArchivo: number|null,
    idTipoLicencia: number,
    nombre:string,
    fechaDesde: string,
    fechaHasta: string,
    bitaciora: number|null,
    usuario: string,
    usuario_Modifico: string,
    usuario_Asignado: string,
    ultima_modificacion: string,
    fecha_creacion: string,
    diasPedido: number,
    estado: string,
    requiereArchivo: boolean,
    tieneArchivo: boolean,
    tieneBitas: boolean){
        this.idRegistro= idRegistro;
        this.idArchivo=idArchivo;
        this.idTipoLicencia=idTipoLicencia;
        this.nombre=nombre;
        this.fechaDesde= fechaDesde;
        this.fechaHasta= fechaHasta;
        this.bitaciora= bitaciora;
        this.usuario= usuario;
        this.usuario_Modifico=usuario_Modifico;
        this.usuario_Asignado=usuario_Asignado;
        this.ultima_modificacion= ultima_modificacion;
        this.fecha_creacion=fecha_creacion;
        this.diasPedido= diasPedido;
        this.estado= estado;
        this.requiereArchivo= requiereArchivo;
        this.tieneArchivo=tieneArchivo;
        this.tieneBitas=tieneBitas;
}
}