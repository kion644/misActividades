package com.ca.control.model;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "proyecto_persona")
public class ProyectoFasePersona implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "proyecto_id", referencedColumnName = "id")
	private Proyecto proyecto;

	@ManyToOne
	@JoinColumn(name = "user_persona", referencedColumnName = "id")
	private Usuario userPersona;

	@ManyToOne
	@JoinColumn(name = "fase_id", referencedColumnName = "id")
	private Fase fase;	
	
	@ColumnDefault("true")
	@Column(name = "habilitado")
    private  boolean habilitado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Proyecto getProyecto() {
		return proyecto;
	}

	public void setProyecto(Proyecto proyecto) {
		this.proyecto = proyecto;
	}
	

	public Usuario getUserPersona() {
		return userPersona;
	}

	public void setUserPersona(Usuario userPersona) {
		this.userPersona = userPersona;
	}

	public Fase getFase(){
		return fase;
	}

	public void setFase(Fase fase){
		this.fase = fase;
	}

	public boolean gethabilitado(){
		return habilitado;
	}

	public void sethabilitado(Boolean habilitado){
		this.habilitado = habilitado;
	}

    public void setProyectoId(Long proyectoId) {
    }

    public void setUserPersonaId(Long userId) {
    }

    public void setFaseId(Long faseId) {
    }
}
