
package com.ca.control.dto;


public class StateAcepptFrontDto {
    private Long registroId;
    private String estadoRegistro;

    public StateAcepptFrontDto() {
    }

    public StateAcepptFrontDto(Long registroId, String estadoRegistro) {
        this.registroId = registroId;
        this.estadoRegistro = estadoRegistro;
    }

    public Long getRegistroId() {
        return registroId;
    }

    public void setRegistroId(Long registroId) {
        this.registroId = registroId;
    }

    public String getEstadoRegistro() {
        return estadoRegistro;
    }

    public void setEstadoRegistro(String estadoRegistro) {
        this.estadoRegistro = estadoRegistro;
    }
    
    
}
