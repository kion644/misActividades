package com.ca.control.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "caso_negocio")
public class CasoNegocio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cn")
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @JoinColumn(name = "id_moneda", referencedColumnName = "id_moneda")
	@ManyToOne(cascade = CascadeType.DETACH)
	private Moneda moneda;

    @Column(name = "codigo_timesheet")
    private Integer codigoTimesheet;

}
