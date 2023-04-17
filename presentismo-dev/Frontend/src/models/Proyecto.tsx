export class Proyecto{
    id:number;
    nombre:string;
    descripcion:string;
    tipoProyecto:string;
    estado:void;
    cliente:string;
    horasCliente:number;
    idCasoNegocio:number;
    
    
    constructor(
        id:number,
        nombre:string,
        descripcion:string,
        tipoProyecto:string,
        estado:void,
        cliente:string,
        horasCliente:number,
        idCasoNegocio: number)
        {
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.tipoProyecto=tipoProyecto;
        this.estado=estado;
        this.cliente=cliente;
        this.horasCliente=horasCliente;
        this.idCasoNegocio=idCasoNegocio;
    }
    }