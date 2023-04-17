package com.ca.control.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class NotificacionResponse {
    Long id;
    String descripcion;
    Timestamp fecha;
    String username;
    boolean visto;
}
