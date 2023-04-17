package com.ca.control.utils;

import com.ca.control.enums.CodigosEstadoEnum;

public class Validate {

	private CodigosEstadoEnum code;
	private Boolean success;
	private String message;
	public CodigosEstadoEnum getCode() {
		return code;
	}
	public void setCode(CodigosEstadoEnum code) {
		if(this.code==null)
		 this.code = code;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		if(this.success==null)
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public Validate setError(CodigosEstadoEnum code,Boolean success) {
		if(this.code==null || this.success!=success) {
		this.code=code;
		this.success=success;
		}
		return this;
	}
	
}
