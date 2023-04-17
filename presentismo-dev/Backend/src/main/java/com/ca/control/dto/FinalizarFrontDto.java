package com.ca.control.dto;

public class FinalizarFrontDto {

	
	private String user;
	private String hour;
	
	
	
	public FinalizarFrontDto() {
		
	}
	public FinalizarFrontDto(String user, String hour) {
		this.user = user;
		this.hour = hour;
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
	
}
