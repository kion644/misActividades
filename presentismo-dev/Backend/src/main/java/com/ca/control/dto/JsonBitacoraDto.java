
package com.ca.control.dto;

import java.io.Serializable;

public class JsonBitacoraDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private BitacoraDto data;
	private InfoDto info;

    

    public JsonBitacoraDto() {
    }

    public HeaderDto getHeader() {
        return header;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public BitacoraDto getData() {
        return data;
    }

    public void setData(BitacoraDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
    



}
