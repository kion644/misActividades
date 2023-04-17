export class mensaje{

texto?:string | undefined;
destinatario?:string | undefined;

constructor(texto: string, destinatario: string){

    this.texto=texto;
    this.destinatario=destinatario;
   
}

}