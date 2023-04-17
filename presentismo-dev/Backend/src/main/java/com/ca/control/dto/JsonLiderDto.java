
package com.ca.control.dto;

import java.io.Serializable;


public class JsonLiderDto implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private LiderDto data;
	private InfoDto info;

    public JsonLiderDto(HeaderDto header, LiderDto data, InfoDto info) {
        this.header = header;
        this.data = data;
        this.info = info;
    }

    public JsonLiderDto() {
    }

    public HeaderDto getHeader() {
        return header;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public LiderDto getData() {
        return data;
    }

    public void setData(LiderDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
    
        
        
}
