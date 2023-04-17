export class AbmLicencias{
    
    descripcion:string
    nombre:string;
    tipo: string
    estado: string;
    id?: number
constructor(
    
    descripcion: string,
    nombre: string,
    tipo: string,
    estado: string,
    id?: number,
    ){
        this.descripcion= descripcion;
        this.nombre=nombre;
        this.tipo=tipo;
        this.estado= estado;
        this.id= id;
}
}