package com.ca.control.dto;

import lombok.Getter;

@Getter
public class EditarRegistroHoraRequest {
    String descripcion;
    String tipoEstadoEnum;
    Long idCliente;
    Long idFase;
    Long idLugarTrabajo;
    Long idTipoHora;
    String justificacion;
    String proyectoText;
    Long registroId;
    String fin;

}
