package com.ca.control.utils;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class FormatoFecha {

    DateTimeFormatter DiaMesAnioHoraMinutosSegundos = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    DateTimeFormatter AnioCortoMesDiaHorasMinutosSegundos = DateTimeFormatter.ofPattern("yy/MM/dd HH:mm:ss");

    DateTimeFormatter AnioMesLetraDiaHoraMimutosSegundos = DateTimeFormatter.ofPattern("yyyy/MMMM/dd HH:mm:ss");

    DateTimeFormatter AnioMesDiasHoraMinuto = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");

    DateTimeFormatter AnioMesDiasHoraMinutoAMPM = DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm");

    DateTimeFormatter jsonDtoAndJsonLIstDto = DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm:ss");

    DateTimeFormatter anioMesDiaHoraMinutosSegundosGuion = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    DateTimeFormatter anioMesDiaGuion = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    DateTimeFormatter  horaMinutosSegundo = DateTimeFormatter.ofPattern("hh:mm:ss");
    
    DateTimeFormatter  anioMesDia = DateTimeFormatter.ofPattern("yyyy/MM/dd");

    public FormatoFecha() {
    }

    public String diaMesAnioMinutosSegundos() {
        return LocalDateTime.now().format(getDiaMesAnioHoraMinutosSegundos());
    }

    public DateTimeFormatter getAnioMesDia() {
        return anioMesDia;
    }

    public Timestamp ahorayyyyMMddhhmmss() {

        return new Timestamp(System.currentTimeMillis());
    }

     public String diaHoy() {
        return LocalDateTime.now().format(getAnioMesDia());
    }
    
    public String jsonDtoAndJsonLIstDto() {
        return LocalDateTime.now().format(getDiaMesAnioHoraMinutosSegundos());
    }

    public String anioMesDiaMinutosSegundosActual() {
        return LocalDateTime.now().format(getJsonDtoAndJsonLIstDto());
    }

    public static Timestamp stringADate(String fecha) {
        try {

            return Timestamp.valueOf(fecha);
        } catch (Exception e) {
            return null;
        }

    }
 
    public DateTimeFormatter getDiaMesAnioHoraMinutosSegundos() {
        return DiaMesAnioHoraMinutosSegundos;
    }

    public DateTimeFormatter getAnioCortoMesDiaHorasMinutosSegundos() {
        return AnioCortoMesDiaHorasMinutosSegundos;
    }

    public DateTimeFormatter getAnioMesLetraDiaHoraMimutosSegundos() {
        return AnioMesLetraDiaHoraMimutosSegundos;
    }

    public DateTimeFormatter getAnioMesDiasHoraMinuto() {
        return AnioMesDiasHoraMinuto;
    }

    public DateTimeFormatter getAnioMesDiasHoraMinutoAMPM() {
        return AnioMesDiasHoraMinutoAMPM;
    }

    public DateTimeFormatter getJsonDtoAndJsonLIstDto() {
        return jsonDtoAndJsonLIstDto;
    }

    public DateTimeFormatter getAnioMesDiaHoraMinutosSegundosGuion() {
        return anioMesDiaHoraMinutosSegundosGuion;
    }
    public DateTimeFormatter getAnioMesDiaGuion() {
        return anioMesDiaGuion;
    }

    public void setAnioMesDiaHoraMinutosSegundosGuion(DateTimeFormatter anioMesDiaHoraMinutosSegundosGuion) {
        this.anioMesDiaHoraMinutosSegundosGuion = anioMesDiaHoraMinutosSegundosGuion;
    }

     public DateTimeFormatter getHoraMinutosSegundo() {
        return horaMinutosSegundo;
    }

    public void setHoraMinutosSegundo(DateTimeFormatter horaMinutosSegundo) {
        this.horaMinutosSegundo = horaMinutosSegundo;
    }
    
    
    public static Date removeTime(Date date) {    
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        cal.set(Calendar.HOUR_OF_DAY, 0);  
        cal.set(Calendar.MINUTE, 0);  
        cal.set(Calendar.SECOND, 0);  
        cal.set(Calendar.MILLISECOND, 0);  
        return cal.getTime(); 
    }
    
    public static Date addTime(Date date) {    
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);  
        cal.set(Calendar.HOUR_OF_DAY, 23);  
        cal.set(Calendar.MINUTE, 59);  
        cal.set(Calendar.SECOND, 59);  
        cal.set(Calendar.MILLISECOND, 0);  
        return cal.getTime(); 
    }
    public static int hoursDifference(Date date1, Date date2) {

        final int MILLI_TO_HOUR = 1000 * 60 * 60;
        return (int) (date1.getTime() - date2.getTime()) / MILLI_TO_HOUR;
    }

    public static Date aHours(Date date) {    
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        cal.add(Calendar.HOUR_OF_DAY, 8);  
        return cal.getTime(); 
    }
    
    public static Date horasInicio(Date date, int horaSumar) {    
        Calendar cal = Calendar.getInstance(); 
        cal.setTime(date);  
        cal.add(Calendar.HOUR_OF_DAY, horaSumar );  
        return cal.getTime(); 
    }
    public static Date horaInicio(Date date) {    
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        cal.set(Calendar.HOUR_OF_DAY, 9);  
        cal.set(Calendar.MINUTE, 0);  
        cal.set(Calendar.SECOND, 0);  
        cal.set(Calendar.MILLISECOND, 0);  
        return cal.getTime(); 
    }
    public static Date getToday() {    
        Calendar cal = Calendar.getInstance();    
        return cal.getTime(); 
    }
    public static Date addOneDay(Date date) {    
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        cal.add(Calendar.DAY_OF_MONTH, 1);
        return cal.getTime(); 
    }
    public static Date addOffset(Date date , int offset) {    
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        cal.add(Calendar.HOUR , offset);
        return cal.getTime(); 
    }
    
         
        public static Date deStringDate(String dato) {            
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd"); 
        Date fecha = null;
        try {
            fecha = formato.parse(dato);
        } catch (ParseException ex) {
            Logger.getLogger(FormatoFecha.class.getName()).log(Level.SEVERE, null, ex);
        }
        return  fecha ;        
    }
       

        public static Date deStringDateCompleto (String dato) {            
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"); 
        Date fecha = null;
        try {
            fecha = formato.parse(dato);
        } catch (ParseException ex) {
            Logger.getLogger(FormatoFecha.class.getName()).log(Level.SEVERE, null, ex);
        }
        return  fecha ;        
    }

    public static Date sumarRestarDiasFecha(Date fecha, int dias) {

        Calendar calendar = Calendar.getInstance();

        calendar.setTime(fecha); // Configuramos la fecha que se recibe
        calendar.add(Calendar.DAY_OF_YEAR, dias);  // numero de días a añadir, o restar en caso de días<0

        return calendar.getTime(); // Devuelve el objeto Date con los nuevos días añadidos

    }

}
