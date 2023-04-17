package com.ca.control.dto;

public class InformacionLicenciaDto {

    private long idDeUsuario;
    private String nombreUsuario;

    public InformacionLicenciaDto() {
    }

    public InformacionLicenciaDto(long idDeUsuario, String nombreUsuario) {
        this.idDeUsuario = idDeUsuario;
        this.nombreUsuario = nombreUsuario;
       
    }

    public long getIdDeUsuario() {
        return idDeUsuario;
    }

    public void setIdDeUsuario(long idDeUsuario) {
        this.idDeUsuario = idDeUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

   

}
