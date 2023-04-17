package com.ca.control.dto;

public class EditBeginFrontDto {

	 
	   private Long registroId; // cual es k se va a modifica
	   private String beginChange; // 
	   private String justification;
	public Long getRegistroId() {
		return registroId;
	}
	public void setRegistroId(Long registroId) {
		this.registroId = registroId;
	}
	public String getBeginChange() {
		return beginChange;
	}
	public void setBeginChange(String beginChange) {
		this.beginChange = beginChange;
	}
	public String getJustification() {
		return justification;
	}
	public void setJustification(String justification) {
		this.justification = justification;
	}
	public EditBeginFrontDto(Long registroId, String beginChange, String justification) {
		this.registroId = registroId;
		this.beginChange = beginChange;
		this.justification = justification;
	}
	public EditBeginFrontDto() {
	}
	   
	   
	}
