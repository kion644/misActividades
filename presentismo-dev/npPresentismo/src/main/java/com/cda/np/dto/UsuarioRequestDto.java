package com.cda.np.dto;

public class UsuarioRequestDto {
	private String legajo;

	public UsuarioRequestDto() {}
	
	public UsuarioRequestDto(String legajo) {
		super();
		this.legajo = legajo;
	}

	public String getLegajo() {
		return legajo;
	}

	public void setLegajo(String ternro) {
		this.legajo = ternro;
	}

}
