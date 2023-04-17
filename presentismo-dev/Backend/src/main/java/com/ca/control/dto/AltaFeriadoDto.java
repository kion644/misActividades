package com.ca.control.dto;

public class AltaFeriadoDto {

    private Integer registroId;

    private String fecha;

    private Integer idPais;

    private String descripcion;

    public AltaFeriadoDto() {
    }

    public AltaFeriadoDto(Integer registroId, String fecha, Integer idPais, String descripcion) {
        this.registroId = registroId;
        this.fecha = fecha;
        this.idPais = idPais;
        this.descripcion = descripcion;
    }



    public Integer getRegistroId() {
        return registroId;
    }

    public void setRegistroId(Integer registroId) {
        this.registroId = registroId;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Integer getIdPais() {
        return idPais;
    }

    public void setIdPais(Integer idPais) {
        this.idPais = idPais;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
