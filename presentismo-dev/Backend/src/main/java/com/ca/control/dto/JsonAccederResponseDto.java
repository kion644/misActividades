
package com.ca.control.dto;

import java.io.Serializable;

public class JsonAccederResponseDto implements Serializable {

    private static final long serialVersionUID = 1L;
    private HeaderDto header;
    private AccederResponseDto data;
    private InfoDto info;

    public JsonAccederResponseDto() {
    }

    public JsonAccederResponseDto(HeaderDto header, AccederResponseDto data, InfoDto info) {
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

    public AccederResponseDto getData() {
        return data;
    }

    public void setData(AccederResponseDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
    
    
    
    
    
}
