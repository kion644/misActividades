
package com.ca.control.dto;

import java.io.Serializable;


public class JsonCambioDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private CambioDto data;
	private InfoDto info;

    public JsonCambioDto() {
    }

    public JsonCambioDto(HeaderDto header, CambioDto data, InfoDto info) {
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

    public CambioDto getData() {
        return data;
    }

    public void setData(CambioDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
        
        
	
}
