package com.ca.control.controller;

import com.ca.control.dto.ParticipantesResponse;
import com.ca.control.dto.ProyectoFaseDto;
import com.ca.control.dto.TomarLicenciaRequest;
import com.ca.control.dto.UsuarioLicenciaResponse;
import com.ca.control.service.ProyectoService;
import com.ca.control.service.UsuarioLicenciaService;
import com.ca.control.utils.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioLicenciaController {

    @Autowired
    private UsuarioLicenciaService usuarioLicenciaService;

    @Autowired
    private ProyectoService proyectoService;

    private static final Logger logger = LoggerFactory.getLogger(UsuarioLicenciaController.class);

    /**
     * Este endpoint devuelve las licencias que el usuario tiene disponibles para
     * tomarse
     * 
     * @param token
     * @return
     */
    @GetMapping(path = "/licencias/disponibles")
    public ResponseEntity<List<ProyectoFaseDto>> getLicenciasDisponibles(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            List<ProyectoFaseDto> resultados = proyectoService
                    .getLicenciasATomarByUsuario(JwtUtils.extraerUsername(JwtUtils.getTokenSinBearer(token)));
            return new ResponseEntity<>(resultados, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuarioLicenciaController > getLicenciasDisponibles: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Este endpoint devuelve las licencias que el usuario tiene tomadas
     * 
     * @param token
     * @return
     */
    @GetMapping(path = "/licencias")
    public ResponseEntity<List<UsuarioLicenciaResponse>> getLicenciasTomadas(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            return new ResponseEntity<>(usuarioLicenciaService.getAllPedidasByUsuario(token), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuarioLicenciaController > getLicenciasTomadas: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/licencias/participantes/{id}")
    public ResponseEntity<List<ParticipantesResponse>> getAllParticipantesByLicencia(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(usuarioLicenciaService.getAllParticipantes(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/licencias/{estado}")
    public ResponseEntity<List<UsuarioLicenciaResponse>> getLicenciasByEstado(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable String estado) {
        try {
            return new ResponseEntity<>(usuarioLicenciaService.getAllByEstado(token, estado), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuarioLicenciaController > getLicenciasByEstado: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Este endpoint genera las relaciones en la base para que el usuario tome la
     * licencia, y devuelve
     * la licencia que se tomo.
     *
     * @param token
     * @param request
     * @return
     */
    @PostMapping(path = "/licencias")
    public ResponseEntity pedirLicencia(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody TomarLicenciaRequest request) {
        try {
            return new ResponseEntity<UsuarioLicenciaResponse>(usuarioLicenciaService.pedirLicencia(token, request),
                    HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error en UsuarioLicenciaController > pedirLicencia: {}", e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la toma de licencia: " + e.getMessage());
            response.put("estado", HttpStatus.CONFLICT);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(path = "/licencias/activas")
    public ResponseEntity<List<UsuarioLicenciaResponse>> getAllActivas(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            return new ResponseEntity<>(usuarioLicenciaService.getAllActivas(token), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuarioLicenciaController > getAllActivas: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/licencias/notificaciones")
    public ResponseEntity<Integer> getNotificacionesLicencias(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            return new ResponseEntity<>(usuarioLicenciaService.getNotificacionesLicenciaByUsuarioAprobador(token), HttpStatus.OK);
        }catch (Exception e){
            logger.error("Error en UsuarioLicenciaController > decidirAprobacion: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/licencias/{id}")
    public ResponseEntity<UsuarioLicenciaResponse> decidirAprobacion(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long id,
            @RequestBody Boolean decision) {
        try {
            return new ResponseEntity<>(usuarioLicenciaService.decidirAprobacion(token, decision, id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuarioLicenciaController > decidirAprobacion: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/licencias/asignar/{id}")
    public ResponseEntity asignarLicencia(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable Long id) {
        try {
            return new ResponseEntity(usuarioLicenciaService.asignarLicencia(token, id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en UsuarioLicenciaController > asignarLicencia: {}", e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
