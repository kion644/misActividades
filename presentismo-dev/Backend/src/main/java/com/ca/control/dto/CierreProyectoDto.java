package com.ca.control.dto;

import java.util.Date;
import com.ca.control.enums.EstadoProyecto;

public class CierreProyectoDto {

    private String fechaCierreProyecto;

    private String comentarioCierre;

    private Long id_proyecto;

    private EstadoProyecto estadoCierre;

    public String getFechaCierreProyecto() {
        return fechaCierreProyecto;
    }

    public void setFechaCierreProyecto(String fechaCierreProyecto) {
        this.fechaCierreProyecto = fechaCierreProyecto;
    }

    public String getComentarioCierre() {
        return comentarioCierre;
    }

    public void setComentarioCierre(String comentarioCierre) {
        this.comentarioCierre = comentarioCierre;
    }

    public Long getId_proyecto() {
        return id_proyecto;
    }

    public void setId_proyecto(Long id_proyecto) {
        this.id_proyecto = id_proyecto;
    }

    public EstadoProyecto getEstadoCierre() {
        return estadoCierre;
    }

    public void setEstadoCierre(EstadoProyecto estadoCierre) {
        this.estadoCierre = estadoCierre;
    }
}
