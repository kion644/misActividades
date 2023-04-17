
package com.ca.control.dto;


public class RegistroPeticionesDto {
     
     private String user;
     private Long    liderId;
     private String estadoRegistro;
   
    public RegistroPeticionesDto() {
    }

    public RegistroPeticionesDto(String user, Long liderId, String estadoRegistro) {
        this.user = user;
        this.liderId = liderId;
        this.estadoRegistro = estadoRegistro;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Long getLiderId() {
        return liderId;
    }

    public void setLiderId(Long liderId) {
        this.liderId = liderId;
    }

    public String getEstadoRegistro() {
        return estadoRegistro;
    }

    public void setEstadoRegistro(String estadoRegistro) {
        this.estadoRegistro = estadoRegistro;
    }

    
}