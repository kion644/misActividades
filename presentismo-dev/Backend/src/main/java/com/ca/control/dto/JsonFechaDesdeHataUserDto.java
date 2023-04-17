
package com.ca.control.dto;

import java.io.Serializable;


public class JsonFechaDesdeHataUserDto implements Serializable {
	
    private static final long serialVersionUID = 1L;
    private HeaderDto header;
    private FechaDesdeHataUserDto data;
    private InfoDto info;

    public JsonFechaDesdeHataUserDto() {
    }

    public HeaderDto getHeader() {
        return header;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public FechaDesdeHataUserDto getData() {
        return data;
    }

    public void setData(FechaDesdeHataUserDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }

    public JsonFechaDesdeHataUserDto(HeaderDto header, FechaDesdeHataUserDto data, InfoDto info) {
        this.header = header;
        this.data = data;
        this.info = info;
    }
    
    
}
