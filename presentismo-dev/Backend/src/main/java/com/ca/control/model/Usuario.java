package com.ca.control.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "usuario_cache")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @NotEmpty
    @Column(name = "email")
    private String email;

    @NotEmpty
    @Column(name = "usuario")
    private String username;

    @NotEmpty
    @Column(name = "nombre")
    private String nombre;

    @NotEmpty
    @Column(name = "apellido")
    private String apellido;

    @NotEmpty
    @Column(name = "vacaciones_disponibles")
    private Integer vacacionesDisponibles;

    @NotNull
    @JoinColumn(name = "id_lider", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    @JsonIgnore
    //Este campo da un loop infinito, porque el usuario tiene un lider que es un usuario, y a su vez ese lider tiene otro lider, y asi infinitamente..
    //Este JsonIgnore esta para que al enviar el Json en la response, no se cargue este campo.
    private Usuario lider;

    @Column(name = "legajo")
    private String legajo;

    @Column(name = "ternro_NP")
    private String ternroNP;

    @JoinColumn(name = "id_rol_usuario", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Rol rol;

    @Transient
    public String getApellidoYNombre() {
        return getApellido() + ", " + getNombre();
    }
}
