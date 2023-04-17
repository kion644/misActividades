package com.ca.control.dto;

import com.ca.control.enums.EstadoProyecto;
import com.ca.control.enums.TipoProyectoEnum;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AltaProyectoDto {


    private Long id;
    private String nombre;
    private String descripcion;
    private EstadoProyecto estado;
    private Long idCliente;
    private String nombreCliente;
    private String timesheetClaveProyecto;
    private String timesheetCodigoInterno;
    private TipoProyectoEnum tipoProyecto;
    private Long horasCliente;

    private Integer idCasoNegocio;
    private String fechaInicio;
    private String fechaFinEstimada;
    private String fechaFinReal;
    private String fechaAlta;
    private String fechaUltimaActualizacion;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getHorasCliente() {
        return horasCliente;
    }

    public void setHorasCliente(Long horasCliente) {
        this.horasCliente = horasCliente;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public String getFechaUltimaActualizacion() {
        return fechaUltimaActualizacion;
    }

    public void setFechaUltimaActualizacion(String fechaUltimaActualizacion) {
        this.fechaUltimaActualizacion = fechaUltimaActualizacion;
    }
    public String getFechaFinEstimada() {
        return fechaFinEstimada;
    }

    public void setFechaFinEstimada(String fechaFinEstimada) {
        this.fechaFinEstimada = fechaFinEstimada;
    }
    public String getFechaFinReal() {
        return fechaFinReal;
    }

    public void setFechaFinReal(String fechaFinReal) {
        this.fechaFinReal = fechaFinReal;
    }

    public String getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(String fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public EstadoProyecto getEstado() {
        return estado;
    }

    public void setEstado(EstadoProyecto estado) {
        this.estado = estado;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getTimesheetClaveProyecto() {
        return timesheetClaveProyecto;
    }

    public void setTimesheetClaveProyecto(String timesheetClaveProyecto) {
        this.timesheetClaveProyecto = timesheetClaveProyecto;
    }

    public String getTimesheetCodigoInterno() {
        return timesheetCodigoInterno;
    }

    public void setTimesheetCodigoInterno(String timesheetCodigoInterno) {
        this.timesheetCodigoInterno = timesheetCodigoInterno;
    }

    public TipoProyectoEnum getTipoProyecto() {
        return tipoProyecto;
    }

    public void setTipoProyecto(TipoProyectoEnum tipoProyecto) {
        this.tipoProyecto = tipoProyecto;
    }



    public AltaProyectoDto(Long id, String nombre, String descripcion, EstadoProyecto estado, Long idCliente, String nombreCliente, String timesheetClaveProyecto, String timesheetCodigoInterno, TipoProyectoEnum tipoProyecto, String fechaInicio, String fechaFinEstimada, String fechaFinReal, String fechaAlta, Long horasCliente, String fechaUltimaActualizacion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
        this.idCliente = idCliente;
        this.nombreCliente = nombreCliente;
        this.timesheetClaveProyecto = timesheetClaveProyecto;
        this.timesheetCodigoInterno = timesheetCodigoInterno;
        this.tipoProyecto = tipoProyecto;
        this.fechaInicio = fechaInicio;
        this.fechaFinEstimada = fechaFinEstimada;
        this.fechaFinReal = fechaFinReal;
        this.fechaAlta = fechaAlta;
        this.horasCliente = horasCliente;
        this.fechaUltimaActualizacion = fechaUltimaActualizacion;
    }
    public AltaProyectoDto(Long id, String nombre, String descripcion, EstadoProyecto estado, Long idCliente, String nombreCliente, String timesheetClaveProyecto, String timesheetCodigoInterno, TipoProyectoEnum tipoProyecto, String fechaInicio, String fechaFinEstimada, String fechaFinReal, String fechaAlta, Long horasCliente, Integer idCasoNegocio, String fechaUltimaActualizacion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
        this.idCliente = idCliente;
        this.nombreCliente = nombreCliente;
        this.timesheetClaveProyecto = timesheetClaveProyecto;
        this.timesheetCodigoInterno = timesheetCodigoInterno;
        this.tipoProyecto = tipoProyecto;
        this.fechaInicio = fechaInicio;
        this.fechaFinEstimada = fechaFinEstimada;
        this.fechaFinReal = fechaFinReal;
        this.fechaAlta = fechaAlta;
        this.horasCliente = horasCliente;
        this.idCasoNegocio = idCasoNegocio;
        this.fechaUltimaActualizacion = fechaUltimaActualizacion;
    }

    public AltaProyectoDto() {
    }
}
