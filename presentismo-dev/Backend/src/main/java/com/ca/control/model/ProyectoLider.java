package com.ca.control.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "proyecto_lider")
public class ProyectoLider implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	private Long id;

	@Column(name = "id_user_lider")
	private Long idLider;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdLider() {
		return idLider;
	}

	public void setIdLider(Long idLider) {
		this.idLider = idLider;
	}

}
