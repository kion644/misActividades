package com.ca.control.dto;

import com.ca.control.enums.EstadosEnum;

import java.sql.Timestamp;
import java.util.Objects;

public class EstadoDiaDto {
	
	private Timestamp horaInicio;
	private Timestamp horaFin;
	private Integer horasTrabajadas;
	private String lugarTrabajo;
	private EstadosEnum estado;
	
	@Override
	public int hashCode() {
		return Objects.hash(estado, horaFin, horaInicio, horasTrabajadas, lugarTrabajo);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EstadoDiaDto other = (EstadoDiaDto) obj;
		return estado == other.estado && Objects.equals(horaFin, other.horaFin)
				&& Objects.equals(horaInicio, other.horaInicio)
				&& Objects.equals(horasTrabajadas, other.horasTrabajadas)   
				&& Objects.equals(lugarTrabajo, other.lugarTrabajo);
	}
	public Timestamp getHoraInicio() {
		return horaInicio;
	}
	public void setHoraInicio(Timestamp horaInicio) {
		this.horaInicio = horaInicio;
	}
	public Timestamp getHoraFin() {
		return horaFin;
	}
	public void setHoraFin(Timestamp horaFin) {
		this.horaFin = horaFin;
	}
	public Integer getHorasTrabajadas() {
		return horasTrabajadas;
	}
	public void setHorasTrabajadas(Integer horasTrabajadas) {
		this.horasTrabajadas = horasTrabajadas;
	}
	public String getLugarTrabajo() {
		return lugarTrabajo;
	}
	public void setLugarTrabajo(String lugarTrabajo) {
		this.lugarTrabajo = lugarTrabajo;
	}
	public EstadosEnum getEstado() {
		return estado;
	}
	public void setEstado(EstadosEnum estado) {
		this.estado = estado;
	}

    }
