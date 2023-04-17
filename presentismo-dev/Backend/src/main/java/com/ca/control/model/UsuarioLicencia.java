package com.ca.control.model;

import com.ca.control.enums.EstadoLicencia;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "usuario_licencia")
@Getter
@Setter
@NoArgsConstructor
public class UsuarioLicencia implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;
    
    @Column(name = "fecha_desde")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaDesde;

    @Column(name = "fecha_hasta")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaHasta;

    @Column(name = "estado_licencia")
    @Enumerated(EnumType.STRING)
    private EstadoLicencia estadoLicencia;

    @Column(name = "ultima_modificacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ultimaModificacion;

    @NotNull
    @JoinColumn(name = "id_usuario_modifico", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Usuario usuarioModifico;

    @Column(name = "fecha_creacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "proyecto_persona_id")
    private ProyectoFasePersona proyectoFasePersona;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "licencia_aprobacion",
    joinColumns = {@JoinColumn(name = "id_licencia", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name = "aprobacion_id", referencedColumnName = "id")})
    @MapKeyJoinColumn(name = "id_aprobador")
    @JsonManagedReference
    private Map<Usuario, Aprobacion> aprobaciones;

    @OneToMany
    @JsonIgnore
    private List<MensajeLicencia> mensajesLicencias;

}
