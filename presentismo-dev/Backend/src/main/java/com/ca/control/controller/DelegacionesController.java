package com.ca.control.controller;

import java.util.List;

import com.ca.control.model.Delegacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.ca.control.dto.DelegacionDto;
import com.ca.control.service.DelegacionesService;

@Controller
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT })
public class DelegacionesController
{
    @Autowired
    DelegacionesService service;

    @GetMapping(path = "/delegaciones")
    public ResponseEntity<List<Delegacion>> getAll(@RequestHeader(HttpHeaders.AUTHORIZATION) String token)
    {
        try {
            List<Delegacion> lst = service.findAll(token);
            return new ResponseEntity<>(lst, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error en DelegacionesController > getAllDelegaciones: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/delegaciones")
    public ResponseEntity create(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody DelegacionDto dto)
    {
        try {
            return service.create(token, dto) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            System.out.println("Error en DelegacionesController > create: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/delegaciones/{id}")
    public ResponseEntity update(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long id, @RequestBody DelegacionDto dto)
    {
        try {
            return service.update(token, id, dto) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            System.out.println("Error en DelegacionesController > update: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/delegaciones/{id}")
    public ResponseEntity delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable Long id)
    {
        try {
            return service.delete(token, id) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            System.out.println("Error en DelegacionesController > delete: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
