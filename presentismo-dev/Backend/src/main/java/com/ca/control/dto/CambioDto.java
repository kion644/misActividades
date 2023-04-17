
package com.ca.control.dto;


public class CambioDto {
    
     private Long registroId; // cual es k se va a modifica
     private String user;
     private String hour;
     private Long idLugarTrabajo;

    public Long getRegistroId() {
        return registroId;
    }

    public void setRegistroId(Long registroId) {
        this.registroId = registroId;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public Long getIdLugarTrabajo() {
        return idLugarTrabajo;
    }

    public void setIdLugarTrabajo(Long idLugarTrabajo) {
        this.idLugarTrabajo = idLugarTrabajo;
    }

    public CambioDto(Long registroId, String user, String hour, Long idLugarTrabajo) {
        this.registroId = registroId;
        this.user = user;
        this.hour = hour;
        this.idLugarTrabajo = idLugarTrabajo;
    }
     
     
     
     
}
