export const  formatoFecha =(xfecha:string) => {
        const hoy = new Date(xfecha)
        
        const fecha =  (('0' + (hoy.getUTCDate())).slice(-2) + '/'+ ('0' + (hoy.getUTCMonth() + 1)).slice(-2))+'/'+   hoy.getFullYear() ;
        return fecha
      
}
