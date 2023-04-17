export const  SumarDias =(dias:number,fecha:Date) => {

    fecha.setDate(fecha.getDate()+dias);
    return fecha;

  
}