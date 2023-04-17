package com.ca.control.controller;

import com.ca.control.dto.CrearFaseDto;
import com.ca.control.model.Fase;
import com.ca.control.service.FaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST,
        RequestMethod.PUT })
public class FaseController {

    private static final Logger logger = LoggerFactory.getLogger(FaseController.class);

    @Autowired
    FaseService faseService;

    // Obtener todas las fases
    @GetMapping(path = "/fases")
    public ResponseEntity<List<Fase>> getAllFases() {
        try {
            List<Fase> lst = faseService.findAll();
            return new ResponseEntity<>(lst, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en FaseController > getAllFases: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener fases by proyectoId
    @GetMapping(path = "/fases/proyecto/{proyectoId}")
    public ResponseEntity<List<Fase>> getAllFasesByProyectoId(@PathVariable Long proyectoId) {
        try {
            List<Fase> lst = faseService.findAllByProyectoId(proyectoId);
            return new ResponseEntity<>(lst, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en FaseController > getAllFasesByProyectoId: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Crear una fase
    @PostMapping(path = "/fases")
    public ResponseEntity createFase(@RequestBody CrearFaseDto fase) {
        try {
            return faseService.createFase(fase) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error("Error en FaseController > createFase: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Editar una fase
    @PutMapping(path = "/fases")
    public ResponseEntity editFase(@RequestBody Fase fase) {
        try {
            return faseService.editFase(fase) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error("Error en FaseController > editFase: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Borrar una fase por id
    @DeleteMapping(path = "/fases/{id}")
    public ResponseEntity deleteFase(@PathVariable Integer id) {
        try {
            return new ResponseEntity(faseService.deleteFase(id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en FaseController > deleteFase: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Obtener una fase por id
    @GetMapping(path = "/fases/{id}")
    public ResponseEntity getById(@PathVariable Integer id) {
        try {
            return new ResponseEntity(faseService.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en FaseController > getById: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}