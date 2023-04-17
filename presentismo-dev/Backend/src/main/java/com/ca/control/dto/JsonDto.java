package com.ca.control.dto;

import com.ca.control.utils.FormatoFecha;
import com.ca.control.utils.Validate;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;


// Sera la clase PADRE


public class JsonDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private HeaderDto header;
    private Object data;
    private InfoDto info;

    public JsonDto() {
    }

    public JsonDto(HeaderDto header, Object data, InfoDto info) {

        this.header = header;
        this.data = data;
        this.info = info;
    }
   public JsonDto(HeaderDto header, InfoDto info) {

        this.header = header;
        this.info = info;
    }
    public JsonDto(JsonDto json) {

        this.header = json.getHeader();
        this.data = json.getData();
        this.info = json.getInfo();
    }

    public JsonDto(Object data, InfoDto info) {
        this.data = data;
        this.info = info;
    }

    
    public HeaderDto getHeader() {
        return header;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public ResponseEntity<JsonDto> jsonResponde(Object data,Validate validate) {
        FormatoFecha formatoFecha = new FormatoFecha();
        this.header.setDate(formatoFecha.jsonDtoAndJsonLIstDto());
        this.info.setMessage(validate.getCode().name());
        this.info.setCode(String.valueOf(validate.getCode().getCodigo()));
        this.setData(data);
        return new ResponseEntity<>(this, validate.getCode().getHttpStatus());
    }
    public ResponseEntity<JsonDto> jsonRespondeConHEader(Object data,HeaderDto header,Validate validate) {
       try {
    	   FormatoFecha formatoFecha = new FormatoFecha();
           this.header.setDate(formatoFecha.jsonDtoAndJsonLIstDto());
           this.info.setMessage(validate.getCode().name());
           this.info.setCode(String.valueOf(validate.getCode().getCodigo()));
           this.setData(data);
           return new ResponseEntity<>(this, validate.getCode().getHttpStatus());
       }catch (Exception e) {
    	   System.out.println(e);
    	   return null;
       }
       
    	
    }
}
