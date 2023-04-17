
package com.ca.control.dto;


public class FechaDesdeHataUserDto {
    
    private String user;
    private String from; //desde
    private String until ; // hasta

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getUntil() {
        return until;
    }

    public void setUntil(String until) {
        this.until = until;
    }

    public FechaDesdeHataUserDto(String user, String from, String until) {
        this.user = user;
        this.from = from;
        this.until = until;
    }

    public FechaDesdeHataUserDto() {
    }

    
    
}