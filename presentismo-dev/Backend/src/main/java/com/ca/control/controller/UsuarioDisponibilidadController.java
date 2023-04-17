package com.ca.control.controller;


import com.ca.control.dto.AltaUsuarioDisponibilidadDto;
import com.ca.control.model.UsuarioDisponibilidad;
import com.ca.control.service.UsuarioDisponibilidadService;
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
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class UsuarioDisponibilidadController {

    @Autowired
    UsuarioDisponibilidadService usuarioDisponibilidadService;

    private static final Logger logger = LoggerFactory.getLogger(UsuarioDisponibilidadController.class);


    /*//Create Usuario-disponibilidad si no existe
    @PostMapping(path = "/usuario_disponibilidad")
    public ResponseEntity createUsuarioDisponibilidad(@RequestBody AltaUsuarioDisponibilidadDto a) {
        try {
            return usuarioDisponibilidadService.createUsuarioDisponibilidad(a); ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            System.out.println("Error en ClienteController > createCliente: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/




    //Obtener usuario_disponibilidad por Id Usuario
    @GetMapping(path = "/usuario_disponibilidad/{id}")
    public ResponseEntity<UsuarioDisponibilidad> getUsuarioDisponibilidadById(@PathVariable Long id){
        try{
            return new ResponseEntity(usuarioDisponibilidadService.findByUsuarioId(id), HttpStatus.OK);
        }
        catch (Exception e){
            logger.error("Error en ProyectoController > getUsuarioDisponibilidadById: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/usuario_disponibilidad")
    public ResponseEntity updatesUsuarioDisponibilidad(@RequestBody AltaUsuarioDisponibilidadDto disponibilidadDto, @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        try{
            usuarioDisponibilidadService.modificarUsuarioDisp(disponibilidadDto, token);
            return  ResponseEntity.ok().build();
        }
        catch (Exception e){
            logger.error("Error en ProyectoController > updateUsuarioDisponibilidad: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/usuario_disponibilidad_all")
    public ResponseEntity<List<AltaUsuarioDisponibilidadDto>> getAllUsuarioDisp(){
        try{
            List<AltaUsuarioDisponibilidadDto> lst = usuarioDisponibilidadService.findAll();
            return new ResponseEntity<>(lst, HttpStatus.OK);
        }
        catch (Exception e) {
            logger.error("Error en ProyectoController > getAllUsuarioDisp: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/usuario_disponibilidad")
    public ResponseEntity<List<AltaUsuarioDisponibilidadDto>> getAllLastUsuarioDisp(){
        try{
            List<AltaUsuarioDisponibilidadDto> lst = usuarioDisponibilidadService.findAllLast();
            return new ResponseEntity<>(lst, HttpStatus.OK);
        }
        catch (Exception e) {
            System.out.println("Error en UsuarioDisponibilidadController > getAllLastUsuarioDisp: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
