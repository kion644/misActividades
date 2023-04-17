
package com.ca.control.dto;

import java.io.Serializable;


public class JsonUserDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private HeaderDto header;
	private UserDto data;
	private InfoDto info;

    public HeaderDto getHeader() {
        return header;
    }

    public void setHeader(HeaderDto header) {
        this.header = header;
    }

    public UserDto getData() {
        return data;
    }

    public void setData(UserDto data) {
        this.data = data;
    }

    public InfoDto getInfo() {
        return info;
    }

    public void setInfo(InfoDto info) {
        this.info = info;
    }

   
        
        
	
}
