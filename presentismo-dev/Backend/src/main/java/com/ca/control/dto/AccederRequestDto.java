package com.ca.control.dto;

public class AccederRequestDto {

    private String user;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public AccederRequestDto(String user) {
        this.user = user;
    }

    public AccederRequestDto() {
    }

}
