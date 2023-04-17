
package com.ca.control.model;

import com.ca.control.enums.TipoEstadoEnum;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="tipo_estado")
public class TipoEstado implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;
    
    @Column(name="estado")
    @Enumerated(EnumType.STRING)
    private TipoEstadoEnum estado;

    public TipoEstadoEnum getEstado() {
		return estado;
	}

	public void setEstado(TipoEstadoEnum estado) {
		this.estado = estado;
	}
}