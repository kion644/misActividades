package com.ca.control.security;

import com.ca.control.dto.AuthRequest;
import com.ca.control.dto.AuthResponse;
import com.ca.control.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.ldap.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class AutenticacionController {

    @Autowired
    UsuarioService usuarioService;

    private static final Logger logger = LoggerFactory.getLogger(AutenticacionController.class);

    @PostMapping(path = "/auth")
    public ResponseEntity autenticar(@RequestBody @NonNull AuthRequest request){
        try {
            return new ResponseEntity<>(usuarioService.getJwt(request), HttpStatus.OK);
        } catch (AuthenticationException e){
            System.out.println("El usuario " + request.getUsername() + " no se pudo autenticar correctamente");
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la autenticación: El usuario " + request.getUsername() + " no se pudo autenticar correctamente");
            response.put("estado", HttpStatus.FORBIDDEN);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } catch (Exception e){
            logger.error("Error en AutenticacionController > autenticar: {}", e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la autenticación: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(path = "/auth/developer")
    public ResponseEntity<AuthResponse> autenticarDeveloper(@RequestBody @NonNull AuthRequest request){
        try {
            return new ResponseEntity<>(usuarioService.autenticarDeveloper(request), HttpStatus.OK);
        } catch (AuthenticationException e){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } catch (Exception e){
            logger.error("Error en AutenticacionController > autenticarDeveloper: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
