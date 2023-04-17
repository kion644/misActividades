
package com.ca.control.dto;


public class UsuarioDto {
     private String user;
     private String nombre;
     private String apellido;

    public UsuarioDto(String user, String nombre, String apellido) {
        this.user = user;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public UsuarioDto() {
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
     
     
}
