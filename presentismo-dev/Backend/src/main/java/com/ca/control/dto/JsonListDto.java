package com.ca.control.dto;

import com.ca.control.utils.FormatoFecha;
import com.ca.control.utils.Validate;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.List;

public class JsonListDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private HeaderDto header;
    private List<Object> data;
    private InfoDto info;

    public JsonListDto() {
    }

    public JsonListDto(HeaderDto header) {
        this.header = header;
    }

    public JsonListDto(JsonDto json, List<Object> data) {
        this.header = json.getHeader();
        this.data = data;
        this.info = json.getInfo();
    }

    public JsonListDto(InfoDto info) {
        this.info = info;
    }

    public JsonListDto(JsonDto json) {
        this.header = json.getHeader();
        this.info = json.getInfo();
    }
    public JsonListDto(HeaderDto header,InfoDto info) {
        this.header = header;
        this.info = info;
    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }

    public HeaderDto getHeader() {
        return header;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }

    public ResponseEntity<JsonListDto> jsonListResponde(List<Object> data,Validate validate) {
        FormatoFecha formatoFecha = new FormatoFecha();
        this.setData(data);
        this.header.setDate(formatoFecha.jsonDtoAndJsonLIstDto());

        this.info.setMessage(validate.getCode().name());
        this.info.setCode(String.valueOf(validate.getCode().getCodigo()));
        
        return new ResponseEntity<>(this, validate.getCode().getHttpStatus());
    }

}
