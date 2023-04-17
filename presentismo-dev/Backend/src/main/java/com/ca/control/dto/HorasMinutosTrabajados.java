package com.ca.control.dto;

public class HorasMinutosTrabajados {

	private String user;
	private String begin;
	private String end;
	
	public HorasMinutosTrabajados(String user, String begin, String end) {
		this.user = user;
		this.begin = begin;
		this.end = end;
	}

	public HorasMinutosTrabajados() {
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
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
	
	
	
	
	
	
}
