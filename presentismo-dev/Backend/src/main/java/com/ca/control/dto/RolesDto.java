package com.ca.control.dto;

import com.ca.control.model.Rol;
import com.ca.control.model.Usuario;

public class RolesDto {

    private Long id;

    private String apellido;

    private String nombre;

    private String username;

    private Rol rol;

    private Usuario lider;


    public RolesDto(Long id, String apellido, String nombre, String username, Rol rol, Usuario lider) {
        this.id = id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.username = username;
        this.rol = rol;
        this.lider = lider;
    }

    public Long getId() {return id;}

    public String getApellido() {return apellido;}

    public String getNombre() {
        return nombre;
    }

    public String getUsername() {
        return username;
    }

    public Rol getRol() {
        return rol;
    }



    public Usuario getLider() {
        return lider;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public void setLider(Usuario lider) {
        this.lider = lider;
    }
}
