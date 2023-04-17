package com.ca.control.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "fase")
public class Fase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)

    private Long id;

    private String nombre;

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "proyecto_id", referencedColumnName = "id")
    private Proyecto proyecto;

    @Column(name = "timesheet_codigo_fase")
    private String TimesheetCodigoFase;

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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public String getTimesheetCodigoFase() {
        return TimesheetCodigoFase;
    }

    public void setTimesheetCodigoFase(String TimesheetCodigoFase) {
        this.TimesheetCodigoFase = TimesheetCodigoFase;
    }

    public Fase() {
    }

    public Fase(Long id, String nombre, String descripcion, Proyecto proyecto, String TimesheetCodigoFase) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.proyecto = proyecto;
        this.TimesheetCodigoFase = TimesheetCodigoFase;
    }

}
