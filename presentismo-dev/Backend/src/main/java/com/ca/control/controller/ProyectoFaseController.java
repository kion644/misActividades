package com.ca.control.controller;

import com.ca.control.dto.AgregarPersonaAFaseDto;
import com.ca.control.dto.InfoDto;
import com.ca.control.dto.JsonDto;
import com.ca.control.dto.JsonUserDto;
import com.ca.control.dto.PersonaFaseDto;
import com.ca.control.enums.CodigosEstadoEnum;
import com.ca.control.model.ProyectoFasePersona;
import com.ca.control.service.ProyectoFasePersonaService;
import com.ca.control.service.ProyectoFaseService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class ProyectoFaseController {

    @Autowired
    ProyectoFaseService proyectoFaseService;
    @Autowired
    ProyectoFasePersonaService proyectoFasePersonaService;

    private static final Logger logger = LoggerFactory.getLogger(ProyectoController.class);

    @RequestMapping(value = "/ProyectoFase", method = RequestMethod.POST)
    public ResponseEntity<JsonDto> ProyectoFase(@RequestBody JsonUserDto json) {
        JsonDto jsonDto = new JsonDto();
        InfoDto responseInfo = new InfoDto("success", String.valueOf(CodigosEstadoEnum.OK.getCodigo()));
        try {
            jsonDto.setHeader(json.getHeader());
            jsonDto.setData(proyectoFaseService.getProyectoFase(json));
            jsonDto.setInfo(responseInfo);
        } catch (Exception e) {
            logger.error("Error en ProyectoFaseController > ProyectoFase: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(jsonDto);
    }

    //Obtener todas las personas por Id Fase
    @RequestMapping(value = "/persona_fase/{id}",method = RequestMethod.GET)
    public ResponseEntity<List<PersonaFaseDto>> getPersonasByIdFase(@PathVariable Long id){
        try{
            return new ResponseEntity(proyectoFasePersonaService.findAllPersonByFaseId(id), HttpStatus.OK);
        }
        catch (Exception e){
            logger.error("Error en ProyectoFaseController > getPersonasByIdFase: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    // Agregar persona a la fase
    @RequestMapping(value = "/persona_fase", method = RequestMethod.POST)
    public ResponseEntity addPersonToFase(@RequestBody AgregarPersonaAFaseDto pfp) {
        try {
            return proyectoFasePersonaService.addPerson(pfp) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error("Error en ProyectoFaseController > addPersonToFase: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Borrar una persona de la fase por id
    @RequestMapping(value = "/persona_fase/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deletePerson(@PathVariable Integer id) {
        try {
            return new ResponseEntity(proyectoFasePersonaService.deletePerson(id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en ProyectoFaseController > deletePerson: {}" + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
