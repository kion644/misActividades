package com.cda.np.dto;

import java.io.Serializable;
import java.util.List;

import com.cda.np.model.Proyecto;

public class ProyectoJsonDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private HeaderDto header;
	private List<Proyecto> data;
	private InfoDto info;

	public ProyectoJsonDto() {
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

	public List<Proyecto> getData() {
		return data;
	}

	public void setData(List<Proyecto> data) {
		this.data = data;
	}

	public InfoDto getInfo() {
		return info;
	}

	public void setInfo(InfoDto info) {
		this.info = info;
	}

}
