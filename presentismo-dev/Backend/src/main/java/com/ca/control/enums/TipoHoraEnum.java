package com.ca.control.enums;

public enum TipoHoraEnum {
    
    PRODUCTIVA("Productiva"),
    PAUSA("Pausa"),
    CAMBIO ("Cambio"),
    FINALIZADO ("Finalizado"),
    LICENCIA("Licencia");
    

    private final String nombre;

    TipoHoraEnum(String nombre) {
        this.nombre = nombre;
    }

    public static TipoHoraEnum getPRODUCTIVA() {
        return PRODUCTIVA;
    }

    public static TipoHoraEnum getPAUSA() {
        return PAUSA;
    }

    public static TipoHoraEnum getCAMBIO() {
        return CAMBIO;
    }

    public static TipoHoraEnum getFINALIZADO() {
        return FINALIZADO;
    }

    public static TipoHoraEnum getLICENCIA() {
        return LICENCIA;
    }

    public String getNombre() {
        return nombre;
    }
    
public String getRef() {
        return nombre;
    }
    
}
