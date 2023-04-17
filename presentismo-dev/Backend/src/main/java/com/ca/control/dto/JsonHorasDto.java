package com.ca.control.dto;

import java.io.Serializable;

public class JsonHorasDto implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private HorasMinutosTrabajados data;
	private InfoDto info;
	
	public JsonHorasDto(HeaderDto header, HorasMinutosTrabajados data, InfoDto info) {
		this.header = header;
		this.data = data;
		this.info = info;
	}

	public JsonHorasDto() {
	}

	public HeaderDto getHeader() {
		return header;
	}

	public void setHeader(HeaderDto header) {
		this.header = header;
	}

	public HorasMinutosTrabajados getData() {
		return data;
	}

	public void setData(HorasMinutosTrabajados data) {
		this.data = data;
	}

	public InfoDto getInfo() {
		return info;
	}

	public void setInfo(InfoDto info) {
		this.info = info;
	}
	
	

}
