package com.ca.control.dto;

public class ComboDto {

    private Long comboId;
    private String descripcion;

    public Long getComboId() {
        return comboId;
    }

    public void setComboId(Long comboId) {
        this.comboId = comboId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public ComboDto(Long comboId, String descripcion) {
        this.comboId = comboId;
        this.descripcion = descripcion;
    }
}
