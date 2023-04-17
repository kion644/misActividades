package com.ca.control.dto;

public class LoginDto {

    private String password;
    private String usuario;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public LoginDto(String password, String usuario) {
        this.password = password;
        this.usuario = usuario;
    }

    public LoginDto() {
    }

}
