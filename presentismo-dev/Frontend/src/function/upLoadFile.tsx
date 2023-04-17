import CargaArchivos from "../services/File/CargaArchivos";

export async function upLoadFile(
    archivo:any,
    idTem:string,
    setMensaje:(value:string)=>void,
    setOpenError:(value:boolean)=>void,
    setOpen:(value:boolean)=>void,
    setCargo:(value:boolean)=>void
    ) {

    const formData = new FormData();
    if (archivo) {
        formData.append('file', archivo)
    }else{
        setMensaje("NO AGREGE EL ARCHIVO");
        setOpenError(true)
    }

    if (formData !== undefined) {
        formData.append('idUsuarioLicencia', idTem)

        const response1: any =  await CargaArchivos(formData)

        if (response1.status === 201) {
            setMensaje("Archivo adjuntado a la licencia");
            setOpen(true);
            setCargo(true)
            return
        }
         if (response1.status === 500){
            setMensaje("Error al enviar el archivo");
            setOpenError(true)
            return
        }


    }else{
        setMensaje('Error');
        setOpenError(true)
    }

}