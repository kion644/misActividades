
package com.ca.control.dto;

import java.io.Serializable;

public class JsonUpdateDto implements Serializable{
	
	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private EditFrontDto data;
	private InfoDto info;

        
    public JsonUpdateDto(){
    }    
    
    public JsonUpdateDto(HeaderDto header, EditFrontDto data, InfoDto info) {
        this.header = header;
        this.data = data;
        this.info = info;
    }
    
    public HeaderDto getHeader() {
        return header;
    }

    public EditFrontDto getData() {
        return data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public void setData(EditFrontDto data) {
        this.data = data;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }


        
 
    
}