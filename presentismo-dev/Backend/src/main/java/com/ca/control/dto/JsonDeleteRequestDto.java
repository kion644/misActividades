package com.ca.control.dto;

import java.io.Serializable;

public class JsonDeleteRequestDto implements Serializable{
	
	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private DeleteFrontDto data;
	private InfoDto info;
	
	
	
	public JsonDeleteRequestDto() {
		super();
	}

	public JsonDeleteRequestDto(HeaderDto header, DeleteFrontDto data, InfoDto info) {
		super();
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

	public DeleteFrontDto getData() {
		return data;
	}

	public void setData(DeleteFrontDto data) {
		this.data = data;
	}

	public InfoDto getInfo() {
		return info;
	}

	public void setInfo(InfoDto info) {
		this.info = info;
	}
	
	

}
