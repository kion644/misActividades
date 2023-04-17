package com.ca.control.controller;

import com.ca.control.dto.AltaCasoNegocioDto;
import com.ca.control.dto.AltaMonedaDto;
import com.ca.control.dto.AsociarCNProyectoDto;
import com.ca.control.dto.AsociarMonedaACN;
import com.ca.control.model.CasoNegocio;
import com.ca.control.model.Moneda;
import com.ca.control.service.CasoNegocioService;
import com.ca.control.service.MonedaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.POST})
public class MonedaController {

    @Autowired
    MonedaService monedaService;

    @GetMapping(path = "/getAllMonedas")
    public ResponseEntity<List<Moneda>> getAllMonedas(){
        try{
            return new ResponseEntity<>(monedaService.findAll(), HttpStatus.OK);
        }

        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/getAllMonedasByDescripcion/{descripcion}")
    public ResponseEntity<List<Moneda>> getAllMonedasByDescripcion(@PathVariable String descripcion){
        try {
            return new ResponseEntity<>(monedaService.findAllByDescripcion(descripcion), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    // @GetMapping(path = "/getCasoNegocioById/{id}")
    // public ResponseEntity<Moneda> getMonedaById(@PathVariable Integer id){
    //     try {
    //         return new ResponseEntity<>(monedaService.findById(id), HttpStatus.OK);
    //     }catch (Exception e){
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }

    // }

    //-------------------------CRUD----------------------------//

    @PostMapping(path = "/moneda/new")
    public ResponseEntity createMoneda(@RequestBody AltaMonedaDto json){
        try {
            return new ResponseEntity<>(monedaService.newMoneda(json.getDescripcion(), json.getAbreviatura()), HttpStatus.CREATED);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la creacion de la moneda: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping(path = "/moneda/edit/{id}")
    public ResponseEntity editMonedaById(@RequestBody AltaMonedaDto json, @PathVariable Integer id){
        try {
            return new ResponseEntity<>(monedaService.editMonedaById(id, json.getDescripcion(), json.getAbreviatura()), HttpStatus.OK);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la edición del caso de negocio: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping(path = "/moneda/delete/{id}")
    public ResponseEntity deleteMonedaById(@PathVariable Integer id){
        try {
            return new ResponseEntity<>(monedaService.deleteMonedaById(id), HttpStatus.OK);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la eliminacion de la moneda: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    // //Asociacion de un caso de negocio a un proyecto
    @PostMapping(path = "/moneda/asociarACasoNegocio")
    public ResponseEntity asociarMonedaACasoNegocio(@RequestBody AsociarMonedaACN json){
        try {
            return new ResponseEntity<>(monedaService.asociarMonedaACN (json.getIdMoneda(), Integer.valueOf(json.getIdCasoNegocio())), HttpStatus.OK);
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Error en la asociacion del caso de negocio a proyecto: " + e.getMessage());
            response.put("estado", HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
