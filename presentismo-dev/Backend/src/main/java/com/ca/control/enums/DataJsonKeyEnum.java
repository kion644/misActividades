package com.ca.control.enums;

//FIXME Sacar

@Deprecated
public enum DataJsonKeyEnum {

    HORA("hour"),
    DIA("day"),
    INICIO("begin"),
    FIN("end"),
    IDLUGARTRABAJO("idLugarTrabajo"),
    IDTIPOHORA("idTipoHora"),
    IDREGISTROHORA("idRegistroHora"),
    CONSULTOR("consulter"),
    FECHA("date"),
    USUARIO("user"),
    IDPROYECTO("idProyecto"),
    CONTRASEÑA("password"),
    EMAIL("email"),
    ESTADO("idTipoEstado"),
    REGISTRO("registroId"),
    CLIENTE("idCliente"),
    TXT("txt");
     
    private final String referencia;

    DataJsonKeyEnum(String referencia) {
        this.referencia = referencia;
    }
    
    public String getRef(){
        return referencia;
    }
}
