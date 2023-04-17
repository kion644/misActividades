package com.ca.control.controller;

import com.ca.control.model.Proyecto;
import com.ca.control.service.TipoLicenciaService;
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
public class TipoLicenciaController {

    @Autowired
    TipoLicenciaService tipoLicenciaService;

    private static Logger logger = LoggerFactory.getLogger(TipoLicenciaController.class);

    // Obtener todos los proyectos con tipo 'licencia'
    @GetMapping(path = "/tipoLicencia")
    public ResponseEntity<List<Proyecto>> getAllProyectosTipoLicencia() {
        try {
            return new ResponseEntity<>(tipoLicenciaService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en TipoLicenciaController > getAllProyectosTipoLicencia: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Agregar tipo de licencia
    @PostMapping(path = "/tipoLicencia/{clienteId}")
    public ResponseEntity createTipoLicencia(@RequestBody Proyecto proyecto, @PathVariable Integer clienteId) {
        try {
            return tipoLicenciaService.createTipoLicencia(proyecto, clienteId) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error("Error en TipoLicenciaController > createTipoLicencia: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Desactivar / activar licencia
    @PutMapping(path = "/tipoLicencia/estado/{proyectoId}")
    public ResponseEntity<Proyecto> cambioDeEstadoTipoLicencia(@PathVariable Long proyectoId) {
        try {
            return tipoLicenciaService.cambioDeEstado(proyectoId) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error("Error en TipoLicenciaController > cambioDeEstadoTipoLicencia: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Eliminar tipo licencia
    @DeleteMapping(path = "/tipoLicencia/{id}")
    public ResponseEntity deleteTipoLicencia(@PathVariable Integer id) {
        try {
            return new ResponseEntity(tipoLicenciaService.deleteTipoLicencia(id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en TipoLicenciaController > deleteTipoLicencia: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Modificar tipo licencia
    @PutMapping(path = "/tipoLicencia/{clienteId}")
    public ResponseEntity updateTipoLicencia(@RequestBody Proyecto proyecto, @PathVariable Integer clienteId) {
        try {
            return new ResponseEntity(tipoLicenciaService.updateTipoLicencia(proyecto, clienteId), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en TipoLicenciaController > updateTipoLicencia: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
