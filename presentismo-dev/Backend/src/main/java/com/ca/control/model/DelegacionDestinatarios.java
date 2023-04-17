package com.ca.control.model;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "delegacion_destinatarios")
public class DelegacionDestinatarios implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name="id_delegacion", nullable = false)
    @JsonIgnoreProperties(value = { "usuariosDestinatarios", "hibernateLazyInitializer", "handler" })
    @JsonBackReference
    private Delegacion delegacion;

    @NotNull
    @ManyToOne()
    @JoinColumn(name = "id_usuario_destinatario")
    private Usuario destinatario;

    public Usuario getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(Usuario destinatario) {
        this.destinatario = destinatario;
    }
}
