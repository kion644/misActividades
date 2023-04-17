package com.cda.ts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ePM_PROYECTOS")
public class Proyecto {

	@Id
	@Column(name = "PRO_CODIGO")
	private Long codigo;

	@Column(name = "PRO_DESCRIPCION")
	private String descripcion;

	@Column(name = "PRO_ABREVIATURA")
	private String abreviatura;

	@Column(name = "PRO_PERSONA_LIDER")
	private String liderProyecto;
	
	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getAbreviatura() {
		return abreviatura;
	}

	public void setAbreviatura(String abreviatura) {
		this.abreviatura = abreviatura;
	}

	public String getLiderProyecto() {
		return liderProyecto;
	}

	public void setLiderProyecto(String liderProyecto) {
		this.liderProyecto = liderProyecto;
	}

}
