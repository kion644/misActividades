package com.ca.control.enums;

public enum EstadoLicencia {
    
    RECHAZADA("Rechazada"),
    ACEPTADA("Aceptada"),

    PENDIENTE_TOMAR_ATENCION("Pendiente_Tomar_atencion"),
    PENDIENTE_APROBACION_ATENCION("Pendiente_Aprobacion_Atencion"),

    PENDIENTE_APROBACION_LIDER("Pendiente_Aprobacion_Lider");

    private final String name;

    EstadoLicencia(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }




}
