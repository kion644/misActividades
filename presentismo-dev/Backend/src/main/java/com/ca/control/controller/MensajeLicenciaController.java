package com.ca.control.controller;

import com.ca.control.dto.CreateMensajeLicenciaRequest;
import com.ca.control.model.MensajeLicencia;
import com.ca.control.service.MensajeLicenciaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MensajeLicenciaController {

    @Autowired
    MensajeLicenciaService mensajeLicenciaService;

    private static final Logger logger = LoggerFactory.getLogger(MensajeLicenciaController.class);

    @GetMapping(path = "/mensajes/{id}")
    public ResponseEntity<List<MensajeLicencia>> getAllMensajesById(@PathVariable Long id, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        try{
            return new ResponseEntity<>(mensajeLicenciaService.getAllMensajesByLicenciaAndUpdateLeido(id, token), HttpStatus.OK);
        } catch (Exception e){
            logger.error("Error en MensajeLicenciaController > getAllMensajesById: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/mensajes/{id}")
    public ResponseEntity<List<MensajeLicencia>> createNewMensaje(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long id, @RequestBody CreateMensajeLicenciaRequest request){
        try {
            return new ResponseEntity<>(mensajeLicenciaService.createNewMensaje(id, token, request), HttpStatus.OK);
        } catch (Exception e){
            logger.error("Error en MensajeLicenciaController > createNewMensaje: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/mensajes/notificaciones")
    public ResponseEntity<Integer> getNotificacionesByUsuario(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        try {
            return new ResponseEntity<>(mensajeLicenciaService.getNotificacionesByUsuario(token), HttpStatus.OK);
        } catch (Exception e){
            logger.error("Error en MensajeLicenciaController > getNotificacionesByUsuario: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/mensajes/notificaciones/{id}")
    public ResponseEntity<Integer> getNotificacionesByLicencia(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long id){
        try {
            return new ResponseEntity<>(mensajeLicenciaService.getNotificacionesByLicencia(id, token), HttpStatus.OK);
        } catch (Exception e){
            logger.error("Error en MensajeLicenciaController > getNotificacionesByLicencia: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
