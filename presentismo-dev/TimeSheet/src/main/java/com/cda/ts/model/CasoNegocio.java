package com.cda.ts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PROGRAMAS")
public class CasoNegocio {



	@Id
	@Column(name = "PRG_CODIGO")
	private Long codigo;

	@Column(name = "PRG_DESCRIPCION")
	private String nombre;

	public CasoNegocio(Long codigo, String nombre) {
		this.codigo = codigo;
		this.nombre = nombre;
	}
	public CasoNegocio() {
	}

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	


}
