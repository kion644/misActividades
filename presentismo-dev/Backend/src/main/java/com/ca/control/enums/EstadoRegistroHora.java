package com.ca.control.enums;

public enum EstadoRegistroHora {
    INICIADO("INICIADO"),
    FINALIZADO("FINALIZADO"),
    PROCESADO("PROCESADO");

    private final String string;

    EstadoRegistroHora(String string) {
        this.string = string;
    }

    public String toString(){
        return string;
    }
}
