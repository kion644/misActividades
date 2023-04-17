package com.ca.control.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
public class NotificacionRequest {
    String descripcion;
    Timestamp fecha;
    Long idUsuario;
}
