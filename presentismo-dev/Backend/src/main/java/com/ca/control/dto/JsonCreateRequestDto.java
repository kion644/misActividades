package com.ca.control.dto;

import java.io.Serializable;

public class JsonCreateRequestDto implements Serializable{

	
	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private CreateFrontDto data;
	private InfoDto info;
	
	
	public JsonCreateRequestDto() {

	}


	public JsonCreateRequestDto(HeaderDto header, CreateFrontDto data, InfoDto info) {
	
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


	public CreateFrontDto getData() {
		return data;
	}


	public void setData(CreateFrontDto data) {
		this.data = data;
	}


	public InfoDto getInfo() {
		return info;
	}


	public void setInfo(InfoDto info) {
		this.info = info;
	}
	
	
}
