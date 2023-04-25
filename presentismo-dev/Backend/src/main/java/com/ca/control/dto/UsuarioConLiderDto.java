package com.ca.control.dto;

import com.ca.control.enums.RolInterno;

public class UsuarioConLiderDto {
    private Long id;
    private String user;
    private String nombre;
    private String apellido;
    private UsuarioDto lider;
    private String legajo;
    private RolInterno rol;

    //Constructors

    public UsuarioConLiderDto(Long id, String user, String nombre, String apellido, UsuarioDto lider, String legajo, RolInterno rol) {
        this.id = id;
        this.user = user;
        this.nombre = nombre;
        this.apellido = apellido;
        this.lider = lider;
        this.legajo = legajo;
        this.rol = rol;
    }
    public UsuarioConLiderDto() {
    }

    //Getters n Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public UsuarioDto getLider() {
        return lider;
    }

    public void setLider(UsuarioDto lider) {
        this.lider = lider;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }

    public RolInterno getRol() {
        return rol;
    }

    public void setRol(RolInterno rol) {
        this.rol = rol;
    }
}
