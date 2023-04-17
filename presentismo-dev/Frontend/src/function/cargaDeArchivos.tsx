export const CargaDeArchivos = (event: any) => {
    let files: any[] = [];
    const formData = new FormData()

    for (let i = 0; i < event.target.files.length; i++) {
        files.push(event.target.files[i])
    }
    formData.append('File', event.target.files[0])

    const archivo: File = event.target.files[0];
    

}