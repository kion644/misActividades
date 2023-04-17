package com.ca.control.dto;

public class HoraTrabajadasFrontDto {
	/*
	 * "user": "acarreras", "begin": "2021-12-22 00:00:00",
	 * "end":"2021-12-22 23:59:50"
	 */
    private String user;
    private String begin;
    private String end;
    
    public HoraTrabajadasFrontDto() {
	
	}
	public HoraTrabajadasFrontDto(String user, String begin, String end) {

		this.user = user;
		this.begin = begin;
		this.end = end;
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
