package com.ca.control.dto;

import com.ca.control.utils.CalculoDeHoras;
import com.ca.control.utils.Validate;

import java.sql.Timestamp;

public class RegistroHoraDto {
    
    private Long idRegistro;
    private String user;
    private Timestamp begin;
    private Timestamp end;
    private String lugarTrabajo;
    private String tipoHora;
    private String horasRango;
    private String hour;
    private String minutes;
    private String estadoRegistro;
    private String idCliente;
    private String description;
    private String proyectoText;
    private String clienteText;
    private String lider;
    private String estadoGeneral;
    private String HorasDay;



/// GETTER Y SETTER

    public String getMinutes() {
        return minutes;
    }

    public void setMinutes(String minutes) {
        this.minutes = minutes;
    }


    public Long getIdRegistro() {
        return idRegistro;
    }

    public void setIdRegistro(Long idRegistro) {
        this.idRegistro = idRegistro;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Timestamp getBegin() {
        return begin;
    }

    public void setBegin(Timestamp begin) {
        this.begin = begin;
    }

    public Timestamp getEnd() {
        return end;
    }

    public void setEnd(Timestamp end) {
        this.end = end;
    }

    public String getLugarTrabajo() {
        return lugarTrabajo;
    }

    public void setLugarTrabajo(String lugarTrabajo) {
        this.lugarTrabajo = lugarTrabajo;
    }

    public String getTipoHora() {
        return tipoHora;
    }

    public void setTipoHora(String tipoHora) {
        this.tipoHora = tipoHora;
    }

    public String getHorasRango() {
        return horasRango;
    }

    public void setHorasRango(String horasRango) {
        this.horasRango = horasRango;
    }

    public String getEstadoRegistro() {
        return estadoRegistro;
    }

    public void setEstadoRegistro(String estadoRegistro) {
        this.estadoRegistro = estadoRegistro;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getLider() {
        return lider;
    }

    public void setLider(String lider) {
        this.lider = lider;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getEstadoGeneral() {
        return estadoGeneral;
    }

    public void setEstadoGeneral(String estadoGeneral) {
        this.estadoGeneral = estadoGeneral;
    }

    public String getHorasDay() {
        return HorasDay;
    }

    public void setHorasDay(String HorasDay) {
        this.HorasDay = HorasDay;
    }

   
    
    

/// CODIGOSS

    public RegistroHoraDto(Long idRegistro, String user, Timestamp begin, Timestamp end, String lugarTrabajo, String tipoHora, String horasRango, String estadoRegistro, String idCliente, String description,  String lider) {
        this.idRegistro = idRegistro;
        this.user = user;
        this.begin = begin;
        this.end = end;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.horasRango = horasRango;
        this.estadoRegistro = estadoRegistro;
        this.idCliente = idCliente;
        this.description = description;
        this.lider = lider;
       
    }

    public RegistroHoraDto(Long idRegistro, String user, Timestamp begin, Timestamp end, String lugarTrabajo, String tipoHora, String horasRango, String hour, String minutes, String estadoRegistro, String idCliente, String description,  String lider, String estadoGeneral) {
        this.idRegistro = idRegistro;
        this.user = user;
        this.begin = begin;
        this.end = end;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.horasRango = horasRango;
        this.estadoRegistro = estadoRegistro;
        this.idCliente = idCliente;
        this.description = description;
        this.lider = lider;
        this.estadoGeneral = estadoGeneral;
    }

  

    public RegistroHoraDto(Long idRegistro, String user, Timestamp begin, Timestamp end, String lugarTrabajo, String tipoHora, String horasRango, String hour, String minutes, String estadoRegistro, String idCliente, String description,  String lider, String estadoGeneral, String HorasDay, Timestamp InicioFragmento, Timestamp FinFragmento) {
        this.idRegistro = idRegistro;
        this.user = user;
        this.begin = begin;
        this.end = end;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.horasRango = horasRango;
        this.hour = hour;
        this.minutes = minutes;
        this.estadoRegistro = estadoRegistro;
        this.idCliente = idCliente;
        this.description = description;
        this.lider = lider;
        this.estadoGeneral = estadoGeneral;
        this.HorasDay = HorasDay;

    }

    public RegistroHoraDto(Long idRegistro, String user, Timestamp begin, Timestamp end, String lugarTrabajo, String tipoHora, String horasRango, String estadoRegistro, String idCliente, String description,  String lider, String estadoGeneral, String HorasDay, Timestamp InicioFragmento, Timestamp FinFragmento) {
        this.idRegistro = idRegistro;
        this.user = user;
        this.begin = begin;
        this.end = end;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.horasRango = horasRango;
        this.estadoRegistro = estadoRegistro;
        this.idCliente = idCliente;
        this.description = description;
        this.lider = lider;
        this.estadoGeneral = estadoGeneral;
        this.HorasDay = HorasDay;
    }

 
 public RegistroHoraDto(Long idRegistro, Timestamp begin, Timestamp end,  String tipoHora,String user) {
        this.user=user;
    	this.idRegistro = idRegistro;
        this.begin = begin;
        this.end = end;
        this.tipoHora = tipoHora;
    }

    public RegistroHoraDto(Long idRegistro, Timestamp begin, Timestamp end, String lugarTrabajo, String tipoHora, String user,String estadoRegistro) {
       this.user=user;
    	this.idRegistro = idRegistro;
        this.begin = begin;
        this.end = end;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.estadoRegistro=estadoRegistro;
    }

    public RegistroHoraDto() {
    }



    public RegistroHoraDto(Long idRegistro, String user, Timestamp begin, Timestamp end, String lugarTrabajo, String tipoHora, String estadoRegistro, String idCliente, String description, String lider) {
        this.idRegistro = idRegistro;
        this.user = user;
        this.begin = begin;
        this.end = end;
        this.lugarTrabajo = lugarTrabajo;
        this.tipoHora = tipoHora;
        this.estadoRegistro = estadoRegistro;
        this.idCliente = idCliente;
        this.description = description;
        this.lider = lider;
     
    }


    
    
    
    

    public void calcularHora(Validate validate) {
    	try {
    	
    	this.setHour(CalculoDeHoras.calcularHoras(this.begin, this.end,validate));
    	}catch (Exception e) {
			this.setHour(null);
		}
    }
   
     public void calcularHoraRango(Validate validate) {
      Long diff = (CalculoDeHoras.calcularDiferenciaEntreHoras(this.begin, this.end,validate));
      this.setHour(Long.valueOf(diff / 3600000).toString().length()==1?"0"+Long.valueOf(diff / 3600000).toString():Long.valueOf(diff / 3600000).toString());
      this.setMinutes(Long.valueOf((diff % 3600000) / 60000).toString().length()==1?"0"+Long.valueOf((diff % 3600000) / 60000).toString():Long.valueOf((diff % 3600000) / 60000).toString()); 
      this.setHorasRango((this.getHour() + " : " + this.minutes) + " hs" );
    }

}
   
