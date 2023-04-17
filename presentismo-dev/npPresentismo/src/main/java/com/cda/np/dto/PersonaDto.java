package com.cda.np.dto;

public class PersonaDto {

	private String nombre;
	private String apellido;
	private String legajo;
	private PersonaDto lider;

	public PersonaDto(String nombre, String apellido, String legajo, PersonaDto lider) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
		this.legajo = legajo;
		this.lider = lider;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getLegajo() {
		return legajo;
	}

	public void setLegajo(String legajo) {
		this.legajo = legajo;
	}

	public PersonaDto getLider() {
		return lider;
	}

	public void setLider(PersonaDto lider) {
		this.lider = lider;
	}

}
