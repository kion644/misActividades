package com.ca.control.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "usuario_disponibilidad")
public class UsuarioDisponibilidad implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;


    @NotNull
    @Column(name = "hs_diarias")
    private Double hs_diarias;

    @NotNull
    @Column(name = "fecha_creacion")
    private Date fecha_creacion;


    @Column(name = "usuario_creacion")
    private String usuario_creacion;

    private Integer hs_semanales;

    @NotNull
    @Column(name = "lunes")
    private boolean lunes;

    @NotNull
    @Column(name = "martes")
    private boolean martes;

    @NotNull
    @Column(name = "miercoles")
    private boolean miercoles;

    @NotNull
    @Column(name = "jueves")
    private boolean jueves;

    @NotNull
    @Column(name = "viernes")
    private boolean viernes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Integer getHs_semanales() {
        return hs_semanales;
    }

    public void setHs_semanales(Integer hs_semanales) {
        this.hs_semanales = hs_semanales;
    }

    public boolean getLunes() {
        return lunes;
    }

    public void setLunes(boolean lunes) {
        this.lunes = lunes;
    }

    public boolean getMartes() {
        return martes;
    }

    public void setMartes(boolean martes) {
        this.martes = martes;
    }

    public boolean getMiercoles() {
        return miercoles;
    }

    public void setMiercoles(boolean miercoles) {
        this.miercoles = miercoles;
    }

    public boolean getJueves() {
        return jueves;
    }

    public void setJueves(boolean jueves) {
        this.jueves = jueves;
    }

    public boolean getViernes() {
        return viernes;
    }

    public void setViernes(boolean viernes) {
        this.viernes = viernes;
    }
}
