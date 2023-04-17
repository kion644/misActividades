package com.cda.np.dto;

public class HeaderDto {
	private String consulter;
	private String date;
	private String messageId;

	public HeaderDto(String consulter, String date, String messageId) {

		this.consulter = consulter;
		this.date = date;
		this.messageId = messageId;
	}

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

}
