package com.ca.control.controller;

import com.ca.control.dto.RolesDto;
import com.ca.control.dto.UsuarioRoleDTO;
import com.ca.control.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class RolesController {

    @Autowired
    RolesService service;

    @GetMapping(path = "/roles")
    public ResponseEntity<List<RolesDto>> getAll(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            List<RolesDto> lst = service.findAll(token);
            return new ResponseEntity<>(lst, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en RolesController > getAllUsuarios: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/roles")
    public ResponseEntity update(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody UsuarioRoleDTO dto) {
        try {
            return service.update(dto) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            System.out.println("Error en DelegacionesController > update: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}