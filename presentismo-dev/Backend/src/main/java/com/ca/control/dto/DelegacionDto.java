package com.ca.control.dto;

import java.util.List;

public class DelegacionDto {
    private long idDelegado;
    private String accionDelegada;
    private List<Long> destinatarios;

    public DelegacionDto(long idDelegado, String accionDelegada, List<Long> destinatarios) {
        this.idDelegado = idDelegado;
        this.accionDelegada = accionDelegada;
        this.destinatarios = destinatarios;
    }

    public long getIdDelegado() {
        return idDelegado;
    }

    public String getAccionDelegada() {
        return accionDelegada;
    }

    public List<Long> getDestinatarios() {
        return destinatarios;
    }

}
