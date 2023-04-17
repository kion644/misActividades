package com.ca.control.dto;

import java.util.Date;


public class BitacoraDto {
    private long idBitacora;
    public long getIdBitacora() {
        return idBitacora;
    }

    public void setIdBitacora(long idBitacora) {
        this.idBitacora = idBitacora;
    }

    private String  texto;
    private long  idLicencia;
    private String NombreLicencia;
    private Long idDeUsuario;
    private String nombreUsuario;
    private long idLider;
    private String nombreLider;
    private long idAtencion;
    private String nombreAtencion;
    private Date fecha;
    private long idSeleccion;
    private String enviadoPor;
    private Boolean visto;
    public Boolean getVisto() {
        return visto;
    }

    public void setVisto(Boolean visto) {
        this.visto = visto;
    }

    public String getEnviadoPor() {
        return enviadoPor;
    }

    public void setEnviadoPor(String enviadoPor) {
        this.enviadoPor = enviadoPor;
    }

    public BitacoraDto() {
    }

    public BitacoraDto(String texto, long idLicencia, Date fecha) {
        this.texto = texto;
        this.idLicencia = idLicencia;
        this.fecha = fecha;
    }

    public BitacoraDto(String texto, long idLicencia, Date fecha, long idSeleccion) {
        this.texto = texto;
        this.idLicencia = idLicencia;
        this.fecha = fecha;
        this.idSeleccion = idSeleccion;
    }

    public BitacoraDto(String texto, long idLicencia, String NombreLicencia, long idDeUsuario, String nombreUsuario, long idLider, String nombreLider, long idAtencion, String nombreAtencion, Date fecha, long idSeleccion) {
        this.texto = texto;
        this.idLicencia = idLicencia;
        this.NombreLicencia = NombreLicencia;
        this.idDeUsuario = idDeUsuario;
        this.nombreUsuario = nombreUsuario;
        this.idLider = idLider;
        this.nombreLider = nombreLider;
        this.idAtencion = idAtencion;
        this.nombreAtencion = nombreAtencion;
        this.fecha = fecha;
        this.idSeleccion = idSeleccion;
    }
    public BitacoraDto(String texto, long idLicencia, String NombreLicencia, long idDeUsuario, String nombreUsuario, long idLider, String nombreLider, long idAtencion, String nombreAtencion, Date fecha) {
        this.texto = texto;
        this.idLicencia = idLicencia;
        this.NombreLicencia = NombreLicencia;
        this.idDeUsuario = idDeUsuario;
        this.nombreUsuario = nombreUsuario;
        this.idLider = idLider;
        this.nombreLider = nombreLider;
        this.idAtencion = idAtencion;
        this.nombreAtencion = nombreAtencion;
        this.fecha = fecha;
    }

    public BitacoraDto(Long idLicencia, String NombreLicencia, Date fecha, String texto, Long idDeUsuario, String enviadoPor, String nombreUsuarioSeleccion, Long idAtencion, String nombreAtencion, Long idLider, String nombreLider, Boolean visto){
        this.idLicencia=idLicencia;
        this.NombreLicencia=NombreLicencia;
        this.fecha=fecha;
        this.texto=texto;
        this.idDeUsuario=idDeUsuario;
        this.enviadoPor=enviadoPor;
        this.nombreUsuario=nombreUsuarioSeleccion;
        this.idAtencion=idAtencion;
        this.nombreAtencion=nombreAtencion;
        this.visto=visto;
    }

    public long getIdSeleccion() {
        return idSeleccion;
    }

    public void setIdSeleccion(long idSeleccion) {
        this.idSeleccion = idSeleccion;
    }



    public String getNombreLicencia() {
        return NombreLicencia;
    }

    public void setNombreLicencia(String NombreLicencia) {
        this.NombreLicencia = NombreLicencia;
    }

    public long getIdDeUsuario() {
        return idDeUsuario;
    }

    public void setIdDeUsuario(long idDeUsuario) {
        this.idDeUsuario = idDeUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public long getIdLider() {
        return idLider;
    }

    public void setIdLider(long idLider) {
        this.idLider = idLider;
    }

    public String getNombreLider() {
        return nombreLider;
    }

    public void setNombreLider(String nombreLider) {
        this.nombreLider = nombreLider;
    }

    public long getIdAtencion() {
        return idAtencion;
    }

    public void setIdAtencion(long idAtencion) {
        this.idAtencion = idAtencion;
    }

    public String getNombreAtencion() {
        return nombreAtencion;
    }

    public void setNombreAtencion(String nombreAtencion) {
        this.nombreAtencion = nombreAtencion;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }


    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }


    public long getIdLicencia() {
        return idLicencia;
    }

    public void setIdLicencia(long idLicencia) {
        this.idLicencia = idLicencia;
    }





}