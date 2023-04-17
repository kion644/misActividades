package com.cda.ts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PERSONAS_DISPONIBILIDADES")
public class PersonasDisponibilidades {
	
	@Id
	@Column(name = "PDI_PERSONA")
	private String usuario;
	
	@ManyToOne
	@JoinColumn(name = "PDI_DISPONIBILIDAD")
	private Disponibilidad disponibilidad;

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public Disponibilidad getDisponibilidad() {
		return disponibilidad;
	}

	public void setDisponibilidad(Disponibilidad disponibilidad) {
		this.disponibilidad = disponibilidad;
	}

}
