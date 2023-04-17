package com.ca.control.dto;

public class HeaderDto {

    private String consulter;
    private String date;
    private String messageId;
    private String token;
   

    public String getConsulter() {
        return consulter;
    }

    public void setConsulter(String consulter) {
        this.consulter = consulter;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public HeaderDto() {

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public HeaderDto(String consulter, String date, String messageId, String token) {
        this.consulter = consulter;
        this.date = date;
        this.messageId = messageId;
        this.token = token;
    }
}
