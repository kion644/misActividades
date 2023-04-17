package com.ca.control.dto;

public class AltaUsuarioDisponibilidadDto {

    private Long id;
    private String usuario;
    private Double hs_diarias;
    private String fecha_creacion;
    private String usuario_creacion;
    private Integer hs_semanales;
    private boolean lunes;
    private boolean martes;
    private boolean miercoles;
    private boolean jueves;
    private boolean viernes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Integer getHs_semanales() {
        return hs_semanales;
    }

    public void setHs_semanales(Integer hs_semanales) {
        this.hs_semanales = hs_semanales;
    }

    public Double getHs_diarias() {
        return hs_diarias;
    }

    public void setHs_diarias(Double hs_diarias) {
        this.hs_diarias = hs_diarias;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(String fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public String getUsuario_creacion() {
        return usuario_creacion;
    }

    public void setUsuario_creacion(String usuario_creacion) {
        this.usuario_creacion = usuario_creacion;
    }

    public boolean isLunes() {return lunes;}

    public void setLunes(boolean lunes) {this.lunes = lunes;}

    public boolean isMartes() {return martes;}

    public void setMartes(boolean martes) {this.martes = martes;}

    public boolean isMiercoles() {return miercoles;}

    public void setMiercoles(boolean miercoles) {this.miercoles = miercoles;}

    public boolean isJueves() {return jueves;}

    public void setJueves(boolean jueves) {this.jueves = jueves;}

    public boolean isViernes() {return viernes;}

    public void setViernes(boolean viernes) {this.viernes = viernes;}

    public AltaUsuarioDisponibilidadDto(Long id, String usuario, Double hs_diarias, String fecha_creacion, String usuario_creacion, Integer hs_semanales, boolean lunes, boolean martes, boolean miercoles, boolean jueves, boolean viernes) {
        this.id = id;
        this.usuario = usuario;
        this.hs_diarias = hs_diarias;
        this.fecha_creacion = fecha_creacion;
        this.usuario_creacion = usuario_creacion;
        this.hs_semanales = hs_semanales;
        this.lunes = lunes;
        this.martes = martes;
        this.miercoles = miercoles;
        this.jueves = jueves;
        this.viernes = viernes;
    }

    public AltaUsuarioDisponibilidadDto() {}
}
