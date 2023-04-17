package com.ca.control.dto;

import java.io.Serializable;

public class JsonUpdateRequestDto implements Serializable{
	
	

	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private UpdateFrontDto data;
	private InfoDto info;
	
	
	
	public JsonUpdateRequestDto() {
	
	}



	public JsonUpdateRequestDto(HeaderDto header, UpdateFrontDto data, InfoDto info) {

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



	public UpdateFrontDto getData() {
		return data;
	}



	public void setData(UpdateFrontDto data) {
		this.data = data;
	}



	public InfoDto getInfo() {
		return info;
	}



	public void setInfo(InfoDto info) {
		this.info = info;
	}
	
	

}
