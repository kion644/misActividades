package com.ca.control.dto;

public class InicioPausaReinicioFrontDto {

	
	private String user;
	private String hour;
	private Long idLugarTrabajo;
       

	
	public InicioPausaReinicioFrontDto() {
	
	}



	public InicioPausaReinicioFrontDto(String user, String hour, Long idLugarTabajo) {
	
        this.user = user;
        this.hour = hour;
		this.idLugarTrabajo = idLugarTabajo;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public Long getIdLugarTrabajo() {
        return idLugarTrabajo;
    }

    public void setIdLugarTrabajo(Long idLugarTrabajo) {
        this.idLugarTrabajo = idLugarTrabajo;
    }



}