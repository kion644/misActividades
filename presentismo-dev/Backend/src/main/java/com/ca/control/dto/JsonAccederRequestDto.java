
package com.ca.control.dto;

import java.io.Serializable;

public class JsonAccederRequestDto implements Serializable {

    private static final long serialVersionUID = 1L;
    private HeaderDto header;
    private AccederRequestDto data;
    private InfoDto info;

    public JsonAccederRequestDto() {
    }

    public JsonAccederRequestDto(HeaderDto header, AccederRequestDto data, InfoDto info) {
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

    public AccederRequestDto getData() {
        return data;
    }

    public void setData(AccederRequestDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
    
    
    
    
    
}
