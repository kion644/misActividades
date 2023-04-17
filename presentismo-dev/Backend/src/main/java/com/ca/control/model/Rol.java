package com.ca.control.model;

import com.ca.control.enums.RolInterno;

import javax.persistence.*;

@Entity
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo")
    @Enumerated(EnumType.STRING)
    //Se le setea un valor por default de Rol COMUN. Esto puede ser sobreescrito sin problema, es simplemente un default
    private RolInterno tipo = RolInterno.COMUN;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RolInterno getTipo() {
        return tipo;
    }

    public void setTipo(RolInterno tipo) {
        this.tipo = tipo;
    }


}
