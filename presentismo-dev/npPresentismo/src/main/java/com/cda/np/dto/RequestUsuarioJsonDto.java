package com.cda.np.dto;

import java.io.Serializable;

public class RequestUsuarioJsonDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private HeaderDto header;
	private UsuarioRequestDto data;
	private InfoDto info;

	public RequestUsuarioJsonDto() {
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

	public UsuarioRequestDto getData() {
		return data;
	}

	public void setData(UsuarioRequestDto data) {
		this.data = data;
	}

	public InfoDto getInfo() {
		return info;
	}

	public void setInfo(InfoDto info) {
		this.info = info;
	}

}
