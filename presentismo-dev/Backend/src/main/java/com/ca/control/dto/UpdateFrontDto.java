package com.ca.control.dto;

public class UpdateFrontDto {

	
	private String begin;
	private String end;
	private Long idLugarTrabajo;// cda
	private Long idFase;
        private Long idCliente; // ypf
	private String day;
	private String user;
        private String proyectoText;
        private String clienteText;
	private Long idTipoEstado; //estado de la edicion
        private Long registroId; // cual es k se va a modificar 
        private Long idTipoHora; // hora productiva o no
        
        
	public UpdateFrontDto() {
		
	}

    public UpdateFrontDto(String begin, String end, Long idLugarTrabajo, Long idFase, Long idCliente,  String proyectoText, String clienteText, Long idTipoEstado, Long registroId, Long idTipoHora) {
        this.begin = begin;
        this.end = end;
        this.idLugarTrabajo = idLugarTrabajo;
        this.idFase = idFase;
        this.idCliente = idCliente;
        this.proyectoText = proyectoText;
        this.clienteText = clienteText;
        this.idTipoEstado = idTipoEstado;
        this.idTipoHora = idTipoHora;
    }

    public Long getIdFase() {
        return idFase;
    }

    public void setIdFase(Long idFase) {
        this.idFase = idFase;
    }

    public String getBegin() {
		return begin;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public Long getIdLugarTrabajo() {
        return idLugarTrabajo;
    }

    public void setIdLugarTrabajo(Long idLugarTrabajo) {
        this.idLugarTrabajo = idLugarTrabajo;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getProyectoText() {
        return proyectoText;
    }

    public void setProyectoText(String proyectoText) {
        this.proyectoText = proyectoText;
    }

    public String getClienteText() {
        return clienteText;
    }

    public void setClienteText(String clienteText) {
        this.clienteText = clienteText;
    }

    public Long getIdTipoEstado() {
        return idTipoEstado;
    }

    public void setIdTipoEstado(Long idTipoEstado) {
        this.idTipoEstado = idTipoEstado;
    }

    public Long getRegistroId() {
        return registroId;
    }

    public void setRegistroId(Long registroId) {
        this.registroId = registroId;
    }

    public Long getIdTipoHora() {
        return idTipoHora;
    }

    public void setIdTipoHora(Long idTipoHora) {
        this.idTipoHora = idTipoHora;
    }
	
    
}
