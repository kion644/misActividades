package com.ca.control.enums;

public enum TipoEstadoEnum {
	// lo usa para decir en que condicion, Estado esta el Registro
    RECHAZADO("Rechazado"),
    ACEPTADO("Aceptado"),
    PENDIENTE("Pendiente"),

   // es para dar la caracteristica del registro
    EDITADO("Editado"),
    PEDIDO_EDICION("Pedido_Edicion"),
    NUEVO("Nuevo"),
    PARA_EDITAR("Para_Editar"),
    ANALIZADO("Analizado");


private final String nombre;

   TipoEstadoEnum(String nombre) {
        this.nombre = nombre;
    }

    public static TipoEstadoEnum getRECHAZADO() {
        return RECHAZADO;
    }

    public static TipoEstadoEnum getACEPTADO() {
        return ACEPTADO;
    }

    public static TipoEstadoEnum getPENDIENTE() {
        return PENDIENTE;
    }

    public static TipoEstadoEnum getEDITADO() {
        return EDITADO;
    }

    public static TipoEstadoEnum getPEDIDO_EDICION() {
        return PEDIDO_EDICION;
    }

    public static TipoEstadoEnum getNUEVO() {
        return NUEVO;
    }

    public static TipoEstadoEnum getPARA_EDITAR() {
        return PARA_EDITAR;
    }

    public static TipoEstadoEnum getANALIZADO() {
        return ANALIZADO;
    }

    public String getNombre() {
        return nombre;
    }


}
