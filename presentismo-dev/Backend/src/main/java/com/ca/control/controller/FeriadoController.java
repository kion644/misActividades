package com.ca.control.controller;

import com.ca.control.dto.AltaFeriadoDto;
import com.ca.control.model.Feriado;
import com.ca.control.service.FeriadoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class FeriadoController {

    @Autowired
    FeriadoService feriadoService;

    private static final Logger logger = LoggerFactory.getLogger(FeriadoController.class);


    //Obtener feriado por Id
    @GetMapping(path = "/feriados/{id}")
    public ResponseEntity<Feriado> getFeriadoById(@PathVariable Integer id){
        try{
            return new ResponseEntity(feriadoService.findById(id), HttpStatus.OK);

        }
        catch (Exception e){
            logger.error("Error en FeriadoController > getFeriadoById: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Obtener todos los feriados
    @GetMapping(path = "/feriados")
    public ResponseEntity<List<AltaFeriadoDto>> getAllFeriados(){
        try{
            List<AltaFeriadoDto> lst = feriadoService.findAll();
            return new ResponseEntity<>(lst, HttpStatus.OK);
        }
        catch (Exception e) {
            logger.error("Error en FeriadoController > getAllFeriados: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Crear un feriado
    @PostMapping(path = "/feriados")
    public ResponseEntity createFeriado(@RequestBody AltaFeriadoDto json){
        try{

            return feriadoService.createFeriado(json) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e){
            logger.error("Error en FeriadoController > createFeriado: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Editar un feriado
    @PutMapping(path = "/feriados")
    public ResponseEntity editFeriado(@RequestBody AltaFeriadoDto json){
        try{

            return feriadoService.editFeriado(json) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e){
            logger.error("Error en FeriadoController > editFeriado: {}", e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la edición del feriado: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    //Copiar un feriado
    @PutMapping(path = "/feriados/copy")
    public ResponseEntity copyFeriado(@RequestBody AltaFeriadoDto json){

        try{
            return new ResponseEntity(feriadoService.copyFeriado(json), HttpStatus.OK);
        }catch (Exception e){
            logger.error("Error en FeriadoController > copyFeriado: {}", e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    //Borrar un feriado por id
    @DeleteMapping(path = "/feriados/{id}")
    public ResponseEntity deleteFeriado(@PathVariable Integer id){
        try {
            return new ResponseEntity(feriadoService.deleteFeriado(id), HttpStatus.OK);
        }
        catch (Exception e) {
            logger.error("Error en FeriadoController > deleteFeriado: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
