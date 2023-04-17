package com.ca.control.model;

import com.ca.control.enums.TipoHoraEnum;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Data
@Entity
@Table(name="tipo_hora")
public class TipoHora implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
     Long id;
    
    @Column(name="nombre")
     String nombre;
    
    @Column(name="tipo")
    @Enumerated(EnumType.STRING)
    private TipoHoraEnum tipo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public TipoHoraEnum getTipo() {
		return tipo;
	}

	public void setTipo(TipoHoraEnum tipo) {
		this.tipo = tipo;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, nombre, tipo);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TipoHora other = (TipoHora) obj;
		return Objects.equals(id, other.id) && Objects.equals(nombre, other.nombre) && tipo == other.tipo;
	}



	@Override
	public String toString() {
		return "TipoHora [id=" + id + ", nombre=" + nombre + ", tipo=" + tipo + "]";
	}
    
    
}
