package com.cda.np.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "empleado")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "empleg")
	private String legajo;
	@Column(name = "terape")
	private String apellido;
	@Column(name = "ternom")
	private String nombre;
	private String ternro;
	@Column(name = "empreporta")
	private String ternroLider;

	

	public String getTernroLider() {
		return ternroLider;
	}

	public void setTernroLider(String ternroLider) {
		this.ternroLider = ternroLider;
	}

	public Usuario() {
	}

	public Usuario(String legajo, String apellido, String nombre, String ternro, String ternroLider) {
		this.legajo = legajo;
		this.apellido = apellido;
		this.nombre = nombre;
		this.ternro = ternro;
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

	public String getLider() {
		return ternroLider;
	}

	public void setLider(String lider) {
		this.ternroLider = lider;
	}

	public String getTernro() {
		return ternro;
	}

	public void setTernro(String ternro) {
		this.ternro = ternro;
	}

}
