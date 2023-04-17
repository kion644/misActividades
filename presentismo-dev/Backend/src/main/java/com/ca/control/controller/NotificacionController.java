package com.ca.control.controller;

import com.ca.control.dto.NotificacionResponse;
import com.ca.control.service.NotificacionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    private static final Logger logger = LoggerFactory.getLogger(NotificacionController.class);

    @GetMapping(path = "/notificaciones")
    public ResponseEntity<List<NotificacionResponse>> getNotificacionesNotVisto(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            return new ResponseEntity<>(notificacionService.getNoLeidasByUsuario(token), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en NotificacionController > getNotificacionesNotVisto: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/notificaciones/leer/{id}")
    public ResponseEntity leerNotificacion(@PathVariable Long id) {
        try {
            notificacionService.leerNotificacion(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity("El id ingresado no existe", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error("Error en NotificacionController > leerNotificacion: {}", e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
