
package com.ca.control.dto;

import java.io.Serializable;
import java.util.List;


public class JsonProyectoFaseDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private List<ProyectoFaseDto> data;
	private InfoDto info;

    public HeaderDto getHeader() {
        return header;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public List<ProyectoFaseDto> getData() {
        return data;
    }

    public void setData(List<ProyectoFaseDto> data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }

 

   
        
	
}
