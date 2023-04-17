package com.ca.control.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MensajeLicencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @Column(name = "fecha")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;

    @JoinColumn(name = "id_usuario_licencia", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private UsuarioLicencia licencia;

    @Column(name = "texto")
    private String texto;

    @OneToOne
    @JoinColumn(name = "remitente_id")
    private Usuario remitente;

    @OneToOne
    @JoinColumn(name = "destinatario_id")
    private Usuario destinatario;

    private boolean leido;

    /*
    Si un usuario COMUN manda el mensaje, va automaticamente al lider.
    Si un usuario LIDER o ATENCION manda un mensaje interno, el usuario COMUN no lo ve.
    Si un usuario ATENCION recibe un mensaje, todos los de este rol asignados a la licencia lo ven.
     */
}
