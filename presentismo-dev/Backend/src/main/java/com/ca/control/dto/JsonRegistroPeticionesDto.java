
package com.ca.control.dto;

import java.io.Serializable;


public class JsonRegistroPeticionesDto implements Serializable{

	private static final long serialVersionUID = 1L;

	private HeaderDto header;
	private RegistroPeticionesDto data;
	private InfoDto info;

    public JsonRegistroPeticionesDto() {
    }

    public JsonRegistroPeticionesDto(HeaderDto header, RegistroPeticionesDto data, InfoDto info) {
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

    public RegistroPeticionesDto getData() {
        return data;
    }

    public void setData(RegistroPeticionesDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
        
  
        
}
