
package com.ca.control.dto;








public class EditFrontDto {
   
   private String user;   // usuario
   private String begin; // hora de comienzo
   private String end;  // hora de fin
   private String day; // dia
   private Long idLugarTrabajo; // cda
   private Long idCliente; // ypf
   private Long idFase; // monitoreo
   private Long idTipoEstado; //estado de la edicion
   private Long registroId; // cual es k se va a modificar
   private String txt; // texto del suario
   private Long idTipoHora; // hora productiva o no
   private String proyectoText;
   private String clienteText;

   private String usuarioEdicion;

   private String fechaEdicion;
    
public EditFrontDto(String user, String begin, String end, String day, Long idLugarTrabajo, Long idCliente,
		Long idFase, Long idTipoEstado, Long registroId, String txt, Long idTipoHora,String proyectoText,String clienteText, String usuarioEdicion, String fechaEdicion) {
	this.user = user;
	this.begin = begin;
	this.end = end;
	this.day = day;
	this.idLugarTrabajo = idLugarTrabajo;
	this.idCliente = idCliente;
	this.idFase = idFase;
	this.idTipoEstado = idTipoEstado;
	this.registroId = registroId;
	this.txt = txt;
	this.idTipoHora = idTipoHora;
        this.proyectoText= proyectoText;
        this.clienteText=clienteText;
        this.usuarioEdicion = usuarioEdicion;
        this.fechaEdicion = fechaEdicion;
}


    public String getUsuarioEdicion() {
        return usuarioEdicion;
    }

    public void setUsuarioEdicion(String usuarioEdicion) {
        this.usuarioEdicion = usuarioEdicion;
    }

    public String getFechaEdicion() {
        return fechaEdicion;
    }

    public void setFechaEdicion(String fechaEdicion) {
        this.fechaEdicion = fechaEdicion;
    }

    public EditFrontDto() {
}

public String getUser() {
	return user;
}

public void setUser(String user) {
	this.user = user;
}

public String getBegin() {
	return begin;
}

public void setBegin(String begin) {
	this.begin = begin;
}

public String getEnd() {
	return end;
}

public void setEnd(String end) {
	this.end = end;
}

public String getDay() {
	return day;
}

public void setDay(String day) {
	this.day = day;
}

public Long getIdLugarTrabajo() {
	return idLugarTrabajo;
}

public void setIdLugarTrabajo(Long idLugarTrabajo) {
	this.idLugarTrabajo = idLugarTrabajo;
}

public Long getIdCliente() {
	return idCliente;
}

public void setIdCliente(Long idCliente) {
	this.idCliente = idCliente;
}



public Long getIdTipoEstado() {
	return idTipoEstado;
}

public void setIdTipoEstado(Long idTipoEstado) {
	this.idTipoEstado = idTipoEstado;
}

public Long getRegistroId() {
	return registroId;
}

public void setRegistroId(Long registroId) {
	this.registroId = registroId;
}

public String getTxt() {
	return txt;
}

public void setTxt(String txt) {
	this.txt = txt;
}

public Long getIdTipoHora() {
	return idTipoHora;
}

public void setIdTipoHora(Long idTipoHora) {
	this.idTipoHora = idTipoHora;
}

    public String getProyectoText() {
        return proyectoText;
    }

    public void setProyectoText(String proyectoText) {
        this.proyectoText = proyectoText;
    }

    public String getClienteText() {
        return clienteText;
    }

    public void setClienteText(String clienteText) {
        this.clienteText = clienteText;
    }

    public Long getIdFase() {
        return idFase;
    }

    public void setIdFase(Long idFase) {
        this.idFase = idFase;
    }
  
    
     
}
