package com.ca.control.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "aprobacion")
public class Aprobacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "id_aprobador", referencedColumnName = "id")
    @OneToOne
    private Usuario aprobador;

    @ManyToOne
    @JoinColumn(name = "usuario_licencia_id", nullable = false)
    @JsonBackReference
    private UsuarioLicencia usuarioLicencia;

    private Timestamp fechaAccion;

    private boolean aprobado;


    public Aprobacion(Usuario aprobador, UsuarioLicencia licencia) {
        this.aprobador = aprobador;
        this.usuarioLicencia = licencia;
    }
}
