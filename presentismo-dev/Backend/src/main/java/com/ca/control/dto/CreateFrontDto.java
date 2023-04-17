package com.ca.control.dto;

public class CreateFrontDto {
	
	

	private String begin;
	private String end;
	private String day;
	private Long idLugarTrabajo;
	private Long idProyecto;
	private Long idTipoHora;
	private String user;
	
	
	
	public CreateFrontDto() {
		
	}



	public CreateFrontDto(String begin, String end, String day, Long idLugarTrabajo, Long idProyecto, String user,Long idTipoHora) {

		this.begin = begin;
		this.end = end;
		this.day = day;
		this.idLugarTrabajo = idLugarTrabajo;
		this.idProyecto = idProyecto;
		this.idTipoHora=idTipoHora;
		this.user = user;
	}



	public String getBegin() {
		return begin;
	}



	public void setBegin(String begin) {
		this.begin = begin;
	}



	public String getEnd() {
		return end;
	}



	public void setEnd(String end) {
		this.end = end;
	}



	public String getDay() {
		return day;
	}



	public void setDay(String day) {
		this.day = day;
	}



	public Long getIdLugarTrabajo() {
		return idLugarTrabajo;
	}



	public void setIdLugarTrabajo(Long idLugarTrabajo) {
		this.idLugarTrabajo = idLugarTrabajo;
	}



	public Long getIdProyecto() {
		return idProyecto;
	}



	public void setIdProyecto(Long idProyecto) {
		this.idProyecto = idProyecto;
	}



	public String getUser() {
		return user;
	}



	public void setUser(String user) {
		this.user = user;
	}



	public Long getIdTipoHora() {
		return idTipoHora;
	}



	public void setIdTipoHora(Long idTipoHora) {
		this.idTipoHora = idTipoHora;
	}
	
	
	
	
}
