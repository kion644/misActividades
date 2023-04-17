package com.cda.np.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "his_estructura")
public class Proyecto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "hismotivo")
	private String nombre;
	private String tenro;
	@Column(name = "ternro")
	private String ternroUsuario;

	public Proyecto() {
		super();
	}

	public Long getId() {
		return id;
	}
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTenro() {
		return tenro;
	}

	public void setTenro(String tenro) {
		this.tenro = tenro;
	}

	public String getTernro() {
		return ternroUsuario;
	}

	public void setTernro(String ternro) {
		this.ternroUsuario = ternro;
	}

}
