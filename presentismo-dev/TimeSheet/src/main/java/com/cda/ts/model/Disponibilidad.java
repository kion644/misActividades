package com.cda.ts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "DISPONIBILIDADES")
public class Disponibilidad {
	@Id
	@Column(name = "ESD_CODIGO")
	private Long codigo; 
	@Column(name = "ESD_DESCRIPCION")
	private String descripcion;
	@Column(name = "ESD_HS_POR_SEMANA_DISP")
	private String horasSemanales;

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

	public String getHorasSemanales() {
		return horasSemanales;
	}

	public void setHorasSemanales(String horasSemanales) {
		this.horasSemanales = horasSemanales;
	}

	

}
