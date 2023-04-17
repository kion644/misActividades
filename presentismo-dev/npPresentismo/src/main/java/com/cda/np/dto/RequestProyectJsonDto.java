package com.cda.np.dto;

import java.io.Serializable;

public class RequestProyectJsonDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private HeaderDto header;
	private ProyectoRequestDto data;
	private InfoDto info;

	public RequestProyectJsonDto() {
		super();
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public HeaderDto getHeader() {
		return header;
	}

	public void setHeader(HeaderDto header) {
		this.header = header;
	}

	public ProyectoRequestDto getData() {
		return data;
	}

	public void setData(ProyectoRequestDto data) {
		this.data = data;
	}

	public InfoDto getInfo() {
		return info;
	}

	public void setInfo(InfoDto info) {
		this.info = info;
	}

}
