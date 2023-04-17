
package com.ca.control.dto;

import java.io.Serializable;


public class JsonLicenciaRequestUsuarioDto implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private UsuarioLicenciaResponse data;
	private InfoDto info;

    public JsonLicenciaRequestUsuarioDto() {
    }

    public JsonLicenciaRequestUsuarioDto(HeaderDto header, UsuarioLicenciaResponse data, InfoDto info) {
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

    public UsuarioLicenciaResponse getData() {
        return data;
    }

    public void setData(UsuarioLicenciaResponse data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
    


}
