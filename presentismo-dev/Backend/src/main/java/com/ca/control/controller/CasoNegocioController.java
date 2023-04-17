package com.ca.control.controller;

import com.ca.control.dto.AltaCasoNegocioDto;
import com.ca.control.dto.AsociarCNProyectoDto;
import com.ca.control.dto.TsCasoNegocioDto;
import com.ca.control.model.CasoNegocio;
import com.ca.control.model.Pais;
import com.ca.control.service.CasoNegocioService;
import com.ca.control.service.PaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.POST})
public class CasoNegocioController {

    @Autowired
    CasoNegocioService casoNegocioService;

    @GetMapping(path = "/getAllCasosNegocio")
    public ResponseEntity<List<AltaCasoNegocioDto>> getAllCasosNegocio(){
        try{
            return new ResponseEntity<>(casoNegocioService.findAll(), HttpStatus.OK);
        }

        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/importCNs")
    public ResponseEntity<Boolean> importCNs(){
        try {
            return new ResponseEntity<>(casoNegocioService.importarCNDesdeTS(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/getTimeSheetCN")
    public ResponseEntity<TsCasoNegocioDto[]> getTimeSheetCNs(){
        try {
            return new ResponseEntity<>(casoNegocioService.findAllCNTimeSheet(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/getAllCasosNegocioByNombre/{nombre}")
    public ResponseEntity<List<CasoNegocio>> getAllCasosNegocioByNombre(@PathVariable String nombre){
        try {
            return new ResponseEntity<>(casoNegocioService.findAllByNombre(nombre), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping(path = "/getCasoNegocioById/{id}")
    public ResponseEntity<CasoNegocio> getCasoNegocioById(@PathVariable Integer id){
        try {
            return new ResponseEntity<>(casoNegocioService.findById(id), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //-------------------------CRUD----------------------------//

    @PostMapping(path = "/casoNegocio/new")
    public ResponseEntity createCasoNegocio(@RequestBody AltaCasoNegocioDto json){
        try {
            return new ResponseEntity<>(casoNegocioService.newCasoNegocio(json), HttpStatus.CREATED);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la creacion del caso de negocio: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping(path = "/casoNegocio/edit/{id}")
    public ResponseEntity editCasoNegocioById(@RequestBody AltaCasoNegocioDto json, @PathVariable Integer id){
        try {
            return new ResponseEntity<>(casoNegocioService.editCasoNegocioById(id, json.getNombre(),json.getIdMoneda()), HttpStatus.OK);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la edición del caso de negocio: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping(path = "/casoNegocio/delete/{id}")
    public ResponseEntity deleteCasoNegocioById(@PathVariable Integer id){
        try {
            return new ResponseEntity<>(casoNegocioService.deleteCasoNegocioById(id), HttpStatus.OK);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la eliminacion del caso de negocio: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    //Asociacion de un caso de negocio a un proyecto
    @PostMapping(path = "/casoNegocio/asociarAProyecto")
    public ResponseEntity asociarCasoNegocioAProyecto(@RequestBody AsociarCNProyectoDto json){
        try {
            return new ResponseEntity<>(casoNegocioService.asociarCasoNegocioAProyecto(json.getIdCasoNegocio(), Long.valueOf(json.getIdProyecto())), HttpStatus.OK);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la asociacion del caso de negocio a proyecto: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
