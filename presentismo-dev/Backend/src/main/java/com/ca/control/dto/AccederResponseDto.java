package com.ca.control.dto;

import java.util.Date;

public class AccederResponseDto {

    private Date day; // dia

    public AccederResponseDto() {
    }

    public AccederResponseDto(Date day) {
        this.day = day;
    }

    public Date getDay() {
        return day;
    }

    public void setDay(Date day) {
        this.day = day;
    }

}
