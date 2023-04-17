
package com.ca.control.dto;


public class NpResponse {
    private String legajo;
    private String nombre;
    private String apellido;
    private String ternro;
    private String legajoLider;
    private String nombreLider;
    private String ternroLider;
    private String apellidoLider;

    public NpResponse(String legajo, String nombre, String apellido, String ternro, String legajoLider, String nombreLider, String ternroLider, String apellidoLider) {
        this.legajo = legajo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.ternro = ternro;
        this.legajoLider = legajoLider;
        this.nombreLider = nombreLider;
        this.ternroLider = ternroLider;
        this.apellidoLider = apellidoLider;
    }

    public NpResponse() {
    }
    
    public String getLegajo() {
        return legajo;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
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

    public String getTernro() {
        return ternro;
    }

    public void setTernro(String ternro) {
        this.ternro = ternro;
    }

    public String getLegajoLider() {
        return legajoLider;
    }

    public void setLegajoLider(String legajoLider) {
        this.legajoLider = legajoLider;
    }

    public String getNombreLider() {
        return nombreLider;
    }

    public void setNombreLider(String nombreLider) {
        this.nombreLider = nombreLider;
    }

    public String getTernroLider() {
        return ternroLider;
    }

    public void setTernroLider(String ternroLider) {
        this.ternroLider = ternroLider;
    }

    public String getApellidoLider() {
        return apellidoLider;
    }

    public void setApellidoLider(String apellidoLider) {
        this.apellidoLider = apellidoLider;
    }
        
        
}
