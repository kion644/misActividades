package com.ca.control.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AltaCasoNegocioDto {

    private Integer id;

    private String nombre;

    private Integer idMoneda;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getIdMoneda() {
        return idMoneda;
    }

    public void setIdMoneda(Integer idMoneda) {
        this.idMoneda = idMoneda;
    }


    public AltaCasoNegocioDto(Integer id, String nombre, Integer idMoneda) {
        this.id = id;
        this.nombre = nombre;
        this.idMoneda = idMoneda;
       
    }

}
