package com.ca.control.dto;

import lombok.Getter;

@Getter
public class TomarLicenciaRequest {

    private String fechaDesde;
    private String fechaHasta;
    private Long idProyectoPersona;
}
