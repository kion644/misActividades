package com.cda.np.dto;

import java.io.Serializable;

public class UsuarioJsonDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private HeaderDto header;
	private UsuarioDto data;
	private InfoDto info;

	public UsuarioJsonDto() {
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

	public UsuarioDto getData() {
		return data;
	}

	public void setData(UsuarioDto usuarioDto) {
		this.data = usuarioDto;
	}

	public InfoDto getInfo() {
		return info;
	}

	public void setInfo(InfoDto info) {
		this.info = info;
	}

}
