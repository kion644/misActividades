package com.ca.control.scheduled;

import com.ca.control.service.RegistroHoraService;
import com.ca.control.service.UsuarioLicenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class ScheduledTask {

    @Autowired
    RegistroHoraService registroHoraService;

    @Autowired
    UsuarioLicenciaService usuarioLicenciaService;

    @Scheduled(cron = "0 30 23 * * * ")
    public void finalizarDia() {
        try {
            System.out.println("ScheduledTask.finalizarDia() | Start");
            registroHoraService.finalizando();
            System.out.println("ScheduledTask.finalizarDia() | Finish");
        } catch (Exception e) {
            System.out.println("ScheduledTask.finalizarDia() | Error: " + e);
        }
    }

    @Scheduled(cron = "0 0 1 * * *")
    public void registrosSinFinDeAyer() {
        try{
            System.out.println("ScheduledTask.registrosSinFinDeAyer() | Start");
            registroHoraService.registrosSinFinDeAyer();
            System.out.println("ScheduledTask.registrosSinFinDeAyer() | Finish");
        } catch (Exception e){
            System.out.println("ScheduledTask.registrosSinFinDeAyer() | Error: " + e);

        }
    }

    @Scheduled(cron = "0 0 23 * * * ")
    public void finalizarLicencia() {
        try {
            System.out.println("ScheduledTask.finalizarLicencia() | Start");
            usuarioLicenciaService.cargarLicenciasDiarias();
            System.out.println("ScheduledTask.finalizarLicencia() | Finish");
        } catch (Exception e) {
            System.out.println("ScheduledTask.finalizarLicencia() | Error: " + e);
        }
    }
}
