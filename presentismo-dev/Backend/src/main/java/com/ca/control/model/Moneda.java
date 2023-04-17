package com.ca.control.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "moneda")
public class Moneda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_moneda")
    private Integer id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "abreviatura")
    private String abreviatura;

}
