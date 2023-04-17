package com.cda.np.dto;

public class ProyectoRequestDto {
	private String ternro;

	public ProyectoRequestDto() {}
	
	public ProyectoRequestDto(String ternro) {
		super();
		this.ternro = ternro;
	}

	public String getTernro() {
		return ternro;
	}

	public void setTernro(String ternro) {
		this.ternro = ternro;
	}
	

}
