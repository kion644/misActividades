package com.ca.control.model;

import com.ca.control.enums.OrigenNotificacion;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String descripcion;

    private Timestamp fecha;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private OrigenNotificacion origen;

    private boolean visto;

    public Notificacion(String descripcion, Timestamp fecha, Usuario usuario, OrigenNotificacion origen, boolean visto) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.usuario = usuario;
        this.origen = origen;
        this.visto = visto;
    }

    @Override
    public String toString() {
        return "Notificacion{" +
                "id=" + id +
                ", descripcion='" + descripcion + '\'' +
                ", fecha=" + fecha +
                ", usuario=" + usuario +
                ", visto=" + visto +
                '}';
    }
}
