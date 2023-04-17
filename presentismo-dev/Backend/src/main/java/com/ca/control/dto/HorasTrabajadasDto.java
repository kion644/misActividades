package com.ca.control.dto;

public class HorasTrabajadasDto {
	
	String hours;
	String minutes;
        
	public String getHours() {
		return hours;
	}
       
	public void setHours(Long hours) {
		this.hours =  String.format("%02d",hours) ;
	}
	public String getMinutes() {
		return minutes;
	}
        
	public void setMinutes(Long minutes) {
		this.minutes = String.format("%02d",minutes);
	}
	public HorasTrabajadasDto(Long hours, Long minutes) {

		this.hours = String.format("%02d",hours);
		this.minutes = String.format("%02d",minutes);
	}
	public HorasTrabajadasDto() {
		
            
	}
	

}
