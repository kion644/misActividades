package com.ca.control.dto;

import java.sql.Timestamp;
import java.util.Date;

public class RegistroHorasCreacionDiasDto {
    private Timestamp fechaDesde;

    public Timestamp getFechaDesde() {
        return fechaDesde;
    }

    public void setFechaDesde(Timestamp fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public RegistroHorasCreacionDiasDto(Timestamp fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public RegistroHorasCreacionDiasDto() {
    }
}


