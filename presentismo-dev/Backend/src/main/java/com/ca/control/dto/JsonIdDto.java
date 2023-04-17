package com.ca.control.dto;

import java.io.Serializable;

public class JsonIdDto implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private IdDto data;
	private InfoDto info;

    public JsonIdDto() {
    }

    public JsonIdDto(HeaderDto header, IdDto data, InfoDto info) {
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

    public IdDto getData() {
        return data;
    }

    public void setData(IdDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }


}
