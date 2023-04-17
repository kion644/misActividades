package com.ca.control.utils;

import com.ca.control.enums.CodigosEstadoEnum;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class CalculoDeHoras {

    public static String calcularHoras(Timestamp inicio, Timestamp fin,Validate validate) {

            Calendar inicioHora = Calendar.getInstance();
            Calendar finHora = Calendar.getInstance();
            inicioHora.setTime(inicio);
           

            if (calcularDiaValidos(inicio, fin,validate)) {

                return ((Integer) (finHora.get(Calendar.HOUR_OF_DAY) - inicioHora.get(Calendar.HOUR_OF_DAY)))
                        .toString();

            } else {
                
                return "null";
            }

        
    }

    public static boolean calcularDiaValidos(Timestamp inicio, Timestamp fin,Validate validate) {
     
            Calendar inicioHora = Calendar.getInstance();
            Calendar finHora = Calendar.getInstance();

            inicioHora.setTime(inicio);

            if (fin!=null){
                finHora.setTime(fin);
            }

            if (inicioHora.getTime().after(finHora.getTime())) {
                validate.setError(CodigosEstadoEnum.ERROR_INICIO_MAYOR_A_FIN,false);
                return false;
            } else {
                validate.setError(CodigosEstadoEnum.OK,true);
                return true;
            }
       

    }

    public static Long calcularDiferenciaEntreHoras(Timestamp inicio, Timestamp fin,Validate validate)  {

        FormatoFecha fecha = new FormatoFecha();
        Date inicioHora;

        Date finHora;

       
     
                inicioHora = inicio;
                finHora = fin == null ? fecha.ahorayyyyMMddhhmmss() : fin;

                //Fix en caso de que el inicio sea mayor a fin por milisegundos de diferencia
                if(inicioHora.getTime() >= finHora.getTime()){
                    finHora.setTime(finHora.getTime()+1000);
                }

                if (calcularDiaValidos((Timestamp) inicioHora, (Timestamp) finHora, validate)) {
                    Long diff = finHora.getTime() - inicioHora.getTime();
                    return diff;
                } else {
                   validate.setError(CodigosEstadoEnum.ERROR_INICIO_MAYOR_A_FIN,false);
                   return null;
                }
            

       

    
    }


    public static Long diffDeHoras(Timestamp inicio, Timestamp fin)  {

        Long milisegundos = inicio.getTime();
        Long milisegundos2 = fin.getTime();

        Long diferencia = milisegundos2 - milisegundos;

        Long diferenciaDeHoras = diferencia / (60 * 60 * 1000);

        return diferenciaDeHoras;
    }

    public static Long diffDeMinutos(Timestamp inicio, Timestamp fin)  {

        Long milisegundos = inicio.getTime();
        Long milisegundos2 = fin.getTime();

        Long diferencia = milisegundos2 - milisegundos;

        Long diferenciaDeMinutos = diferencia / (60 * 1000);

        if(diferenciaDeMinutos >= 60){
            diferenciaDeMinutos = diferenciaDeMinutos - (diffDeHoras(inicio, fin)*60);
        }

        return diferenciaDeMinutos;
    }

    public static Long diffDeSegundos(Timestamp inicio, Timestamp fin)  {

        Long milisegundos = inicio.getTime();
        Long milisegundos2 = fin.getTime();

        Long diferencia = milisegundos2 - milisegundos;

        Long diferenciaDeSegundos = diferencia / 1000;

        return diferenciaDeSegundos;
    }

    public static Integer getDifferenceDays(Date d1, Date d2) {
        long diff = d2.getTime() - d1.getTime();
        return 1 + (int) TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
    }

}
