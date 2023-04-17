package com.ca.control.model;

import com.ca.control.enums.AccionDelegadaEnum;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "delegacion")
public class Delegacion  implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @NotNull
    @JoinColumn(name = "id_delegado", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Usuario usuarioDelegado;

    @NotNull
    @JoinColumn(name = "id_creador", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Usuario usuarioCreador;

    @OneToMany(mappedBy ="delegacion", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DelegacionDestinatarios> usuariosDestinatarios;

    @Column(name = "accion")
    @Enumerated(EnumType.STRING)
    private AccionDelegadaEnum accion;

    @Column(name = "fecha_creacion")
    private Timestamp fechaCreacion;
}
