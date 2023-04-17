
package com.ca.control.dto;

import java.io.Serializable;


public class JsonStateAcepptFrontDto implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private StateAcepptFrontDto data;
	private InfoDto info;

    public JsonStateAcepptFrontDto() {
    }

    public JsonStateAcepptFrontDto(HeaderDto header, InfoDto info) {
        this.header = header;
        this.info = info;
    }
    

    public JsonStateAcepptFrontDto(HeaderDto header, StateAcepptFrontDto data, InfoDto info) {
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

    public StateAcepptFrontDto getData() {
        return data;
    }

    public void setData(StateAcepptFrontDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }
    
        
}
