package com.cda.np.dto;

public class UsuarioDto {

	private String legajo;
	private String apellido;
	private String nombre;
	private String ternro;
	private String legajoLider;
	private String apellidoLider;
	private String nombreLider;
	private String ternroLider;

	

	public UsuarioDto(String legajo, String apellido, String nombre, String ternro, String legajoLider,
			String apellidoLider, String nombreLider, String ternroLider) {
		super();
		this.legajo = legajo;
		this.apellido = apellido;
		this.nombre = nombre;
		this.ternro = ternro;
		this.legajoLider = legajoLider;
		this.apellidoLider = apellidoLider;
		this.nombreLider = nombreLider;
		this.ternroLider = ternroLider;
	}

	public String getLegajo() {
		return legajo;
	}

	public void setLegajo(String legajo) {
		this.legajo = legajo;
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

	public String getLegajoLider() {
		return legajoLider;
	}

	public void setLegajoLider(String legajoLider) {
		this.legajoLider = legajoLider;
	}

	public String getTernro() {
		return ternro;
	}

	public void setTernro(String ternro) {
		this.ternro = ternro;
	}

	public String getApellidoLider() {
		return apellidoLider;
	}

	public void setApellidoLider(String apellidoLider) {
		this.apellidoLider = apellidoLider;
	}

	public String getNombreLider() {
		return nombreLider;
	}

	public void setNombreLider(String nombreLider) {
		this.nombreLider = nombreLider;
	}

	public String getTernroLider() {
		return ternroLider;
	}

	public void setTernroLider(String ternroLider) {
		this.ternroLider = ternroLider;
	}

}
