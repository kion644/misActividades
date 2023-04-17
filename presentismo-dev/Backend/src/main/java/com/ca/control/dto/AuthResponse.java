package com.ca.control.dto;

import java.util.List;

public class AuthResponse {
    private String token;
    private String username;
    private String nombre;
    private String apellido;
    private List<String> roles;

    public AuthResponse(String token, String username, String nombre, String apellido, List<String> roles) {
        this.token = token;
        this.username = username;
        this.nombre = nombre;
        this.apellido = apellido;
        this.roles = roles;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}
