package com.cda.np.dto;

public class InfoDto {
	private String Message;
	private String code;

	public String getMessage() {
		return Message;
	}

	public void setMessage(String message) {
		Message = message;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public InfoDto() {

	}

	public InfoDto(String message, String code) {

		Message = message;
		this.code = code;
	}

}
