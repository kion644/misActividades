package com.ca.control.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "feriado")
public class Feriado  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fecha")
    private Date fecha;

    @JoinColumn(name = "id_pais", referencedColumnName = "id_pais")
    @ManyToOne(cascade = CascadeType.DETACH)
    private Pais pais;

    @Column(name = "descripcion")
    private String descripcion;
}
