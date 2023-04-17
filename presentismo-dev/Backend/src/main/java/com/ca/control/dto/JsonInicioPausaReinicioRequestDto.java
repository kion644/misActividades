package com.ca.control.dto;

import java.io.Serializable;

public class JsonInicioPausaReinicioRequestDto implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private InicioPausaReinicioFrontDto data;
	private InfoDto info;
	
	
	public JsonInicioPausaReinicioRequestDto() {
		super();
	}


	public JsonInicioPausaReinicioRequestDto(HeaderDto header, InicioPausaReinicioFrontDto data, InfoDto info) {
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


	public InicioPausaReinicioFrontDto getData() {
		return data;
	}


	public void setData(InicioPausaReinicioFrontDto data) {
		this.data = data;
	}


	public InfoDto getInfo() {
		return info;
	}


	public void setInfo(InfoDto info) {
		this.info = info;
	}
	
	
	

}
