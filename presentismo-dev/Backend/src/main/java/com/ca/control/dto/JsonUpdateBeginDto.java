package com.ca.control.dto;

public class JsonUpdateBeginDto {
	private HeaderDto header;
	private EditBeginFrontDto data;
	 private InfoDto info;
	 
	 
	public JsonUpdateBeginDto(HeaderDto header, EditBeginFrontDto data, InfoDto info) {
		this.header = header;
		this.data = data;
		this.info = info;
	}
	
	
	public JsonUpdateBeginDto() {
	}
	public HeaderDto getHeader() {
		return header;
	}
	public void setHeader(HeaderDto header) {
		this.header = header;
	}
	public EditBeginFrontDto getData() {
		return data;
	}
	public void setData(EditBeginFrontDto data) {
		this.data = data;
	}
	public InfoDto getInfo() {
		return info;
	}
	public void setInfo(InfoDto info) {
		this.info = info;
	}
	 
	 
	 
}
