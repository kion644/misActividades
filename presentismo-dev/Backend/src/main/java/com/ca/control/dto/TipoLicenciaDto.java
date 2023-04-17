package com.ca.control.dto;


public class TipoLicenciaDto {
   
     private String id;
     private String nombre;
     private Boolean documentacion;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoLicenciaDto() {
    }

    public TipoLicenciaDto(String id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Boolean getDocumentacion() {
        return documentacion;
    }

    public void setDocumentacion(Boolean documentacion) {
        this.documentacion = documentacion;
    }

 
}
