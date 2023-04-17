package com.ca.control.dto;

public class FeriadoRequesDto  {

    private Long registroId;
    private String dia;
    private String diaTraslada;
    private String descripcion;
    private String paisId;
    private Integer zonaId;

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }


    public String getDiaTraslada() {
        return diaTraslada;
    }

    public void setDiaTraslada(String diaTraslada) {
        this.diaTraslada = diaTraslada;
    }

   public Long getRegistroId() {
        return registroId;
    }

    public void setRegistroId(Long registroId) {
        this.registroId = registroId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPaisId() {
        return paisId;
    }

    public void setPaisId(String paisId) {
        this.paisId = paisId;
    }

    public Integer getZonaId() {
        return zonaId;
    }

    public void setZonaId(Integer zonaId) {
        this.zonaId = zonaId;
    }

    public FeriadoRequesDto() {
    }

    public FeriadoRequesDto(String dia, String diaTraslada, String descripcion, String paisId, Integer zonaId) {
        this.dia = dia;
        this.diaTraslada = diaTraslada;
        this.descripcion = descripcion;
        this.paisId = paisId;
        this.zonaId = zonaId;
    }

    public FeriadoRequesDto(Long registroId, String dia, String diaTraslada, String descripcion, String paisId, Integer zonaId) {
        this.registroId = registroId;
        this.dia = dia;
        this.diaTraslada = diaTraslada;
        this.descripcion = descripcion;
        this.paisId = paisId;
        this.zonaId = zonaId;
    }


}
    
    
    