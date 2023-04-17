package com.ca.control.dto;

import java.io.Serializable;

public class JsonUserDayRequestDto implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private UserDayFrontDto data;
	private InfoDto info;
	
	
	
	public JsonUserDayRequestDto() {
		
	}



	public JsonUserDayRequestDto(HeaderDto header, UserDayFrontDto data, InfoDto info) {
		
		this.header = header;
		this.data = data;
		this.info = info;
	}



	public HeaderDto getHeader() {
		return header;
	}



	public void setHeader(HeaderDto header) {
		this.header = header;
	}



	public UserDayFrontDto getData() {
		return data;
	}



	public void setData(UserDayFrontDto data) {
		this.data = data;
	}



	public InfoDto getInfo() {
		return info;
	}



	public void setInfo(InfoDto info) {
		this.info = info;
	}
	
	
	

}
