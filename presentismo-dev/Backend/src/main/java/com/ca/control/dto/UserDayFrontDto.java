package com.ca.control.dto;

public class UserDayFrontDto {
	
	private String user;
	private String day;
	
	public UserDayFrontDto(String user, String day) {
		
		this.user = user;
		this.day = day;
	}
	
	public UserDayFrontDto() {
		
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}
	
	

}
