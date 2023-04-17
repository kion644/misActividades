package com.ca.control.dto;

import java.io.Serializable;

public class JsonFinalizarRequestDto implements Serializable {

    private static final long serialVersionUID = 1L;
    private HeaderDto header;
    private FinalizarFrontDto data;
    private InfoDto info;

    public JsonFinalizarRequestDto() {
    }

    public JsonFinalizarRequestDto(HeaderDto header, FinalizarFrontDto data, InfoDto info) {
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

    public FinalizarFrontDto getData() {
        return data;
    }

    public void setData(FinalizarFrontDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }

}
