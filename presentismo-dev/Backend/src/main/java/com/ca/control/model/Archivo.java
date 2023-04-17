package com.ca.control.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Blob;

@Data
@Entity
@Table(name = "archivo")
public class Archivo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	private Long id;
	
        @Lob
        @NotNull
        private Blob data;
	
        @Column
	private String nombre;
	
        @Column
	private String extension;

        @JoinColumn(name = "id_usuario_licencia", referencedColumnName = "id")
        @ManyToOne(cascade = CascadeType.DETACH)
        private UsuarioLicencia usuarioLicencia;

        public Archivo(String nombre, Blob data, String extension, UsuarioLicencia usuario) {
            this.data = data;
            this.nombre = nombre;
            this.extension = extension;
            this.usuarioLicencia = usuario;
        }

        public Archivo() {
        }

        public Blob getData() {
            return data;
        }

        public void setData(Blob data) {
            this.data = data;
        }

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

        public String getExtension() {
            return extension;
        }

        public void setExtension(String extension) {
            this.extension = extension;
        }

        public UsuarioLicencia getUsuarioLicencia() {
            return usuarioLicencia;
        }

        public void setUsuarioLicencia(UsuarioLicencia usuarioLicencia) {
            this.usuarioLicencia = usuarioLicencia;
        }


	
}
