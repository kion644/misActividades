
package com.ca.control.dto;

import java.sql.Timestamp;

public class StateFrontDto {
 
private Long registroId; // cual es k se va a modifica
private String user;
private Timestamp begin;
private Timestamp beginChange; // 
private String justification;
private String estadoRegistro;

    public StateFrontDto() {
    }

    public StateFrontDto(Long registroId, String user, Timestamp begin, Timestamp beginChange, String justification, String estadoRegistro) {
        this.registroId = registroId;
        this.user = user;
        this.begin = begin;
        this.beginChange = beginChange;
        this.justification = justification;
        this.estadoRegistro = estadoRegistro;
    }

    public StateFrontDto(Long registroId, String user, Timestamp begin, Timestamp beginChange, String justification) {
        this.registroId = registroId;
        this.user = user;
        this.begin = begin;
        this.beginChange = beginChange;
        this.justification = justification;
    }
  
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

    public Timestamp getBegin() {
        return begin;
    }

    public void setBegin(Timestamp begin) {
        this.begin = begin;
    }

    public Timestamp getBeginChange() {
        return beginChange;
    }

    public void setBeginChange(Timestamp beginChange) {
        this.beginChange = beginChange;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public String getEstadoRegistro() {
        return estadoRegistro;
    }

    public void setEstadoRegistro(String estadoRegistro) {
        this.estadoRegistro = estadoRegistro;
    }


}
