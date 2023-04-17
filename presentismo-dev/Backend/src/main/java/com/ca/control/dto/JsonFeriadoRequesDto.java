package com.ca.control.dto;

import java.io.Serializable;


public class JsonFeriadoRequesDto implements Serializable {

    private static final long serialVersionUID = 1L;
    private HeaderDto header;
    private FeriadoRequesDto data;
    private InfoDto info;

    public JsonFeriadoRequesDto() {
    }

    public JsonFeriadoRequesDto(HeaderDto header, FeriadoRequesDto data, InfoDto info) {
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

    public FeriadoRequesDto getData() {
        return data;
    }

    public void setData(FeriadoRequesDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
    
    
}
 