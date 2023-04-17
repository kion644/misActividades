
package com.cda.ts.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PROYECTOS_FASES_PERSONAS")
public class ProyectoPersona implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "PPE_PROYECTO")
	private Long claveProyecto;

	@Column(name = "PPE_FASE")
	private String fase;
	
	@Column(name = "PPE_PERSONA")
	private String usuario;
	@Column(name = "PPE_FECHA_DESDE")
	private String fechaDesde;
	@Column(name = "PPE_FECHA_HASTA")
	private String fechaHasta;
	@Column(name = "PPE_TOTAL_HS_REALES")
	private String horas;

	public Long getClaveProyecto() {
		return claveProyecto;
	}

	public void setClaveProyecto(Long claveProyecto) {
		this.claveProyecto = claveProyecto;
	}

	public String getFase() {
		return fase;
	}

	public void setFase(String fase) {
		this.fase = fase;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getFechaDesde() {
		return fechaDesde;
	}

	public void setFechaDesde(String fechaDesde) {
		this.fechaDesde = fechaDesde;
	}

	public String getFechaHasta() {
		return fechaHasta;
	}

	public void setFechaHasta(String fechaHasta) {
		this.fechaHasta = fechaHasta;
	}

	public String getHoras() {
		return horas;
	}

	public void setHoras(String horas) {
		this.horas = horas;
	}

}
