package com.ca.control.dto;

import java.io.Serializable;

public class JsonHorasTrabajadasRequestDto implements Serializable{

	private static final long serialVersionUID = 1L;

	private HeaderDto header;
	private HoraTrabajadasFrontDto data;
	private InfoDto info;
	
	
	
	public JsonHorasTrabajadasRequestDto() {
	
	}
	public JsonHorasTrabajadasRequestDto(HeaderDto header, HoraTrabajadasFrontDto data, InfoDto info) {
		
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
	public HoraTrabajadasFrontDto getData() {
		return data;
	}
	public void setData(HoraTrabajadasFrontDto data) {
		this.data = data;
	}
	public InfoDto getInfo() {
		return info;
	}
	public void setInfo(InfoDto info) {
		this.info = info;
	}
	
	
	
	
	
}
