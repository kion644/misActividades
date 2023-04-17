package com.ca.control.controller;


 
import com.ca.control.dao.ClienteDao;
import com.ca.control.dao.ProyectoDao;
import com.ca.control.dto.AltaFeriadoDto;
import com.ca.control.dto.AltaProyectoDto;
import com.ca.control.dto.CierreProyectoDto;
import com.ca.control.model.Feriado;
import com.ca.control.model.Proyecto;
import com.ca.control.service.ProyectoService;
import com.ca.control.utils.FormatoFecha;
  
import com.ca.control.dto.AltaProyectoDto;
import com.ca.control.model.Proyecto;
import com.ca.control.service.ProyectoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
  
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class ProyectoController {
    @Autowired
    ProyectoService proyectoService;

 

  
    private static final Logger logger = LoggerFactory.getLogger(ProyectoController.class);
  


    //Obtener proyecto por Id
    @GetMapping(path = "/proyectos/{id}")
    public ResponseEntity<Proyecto> getProyectoById(@PathVariable Integer id){
        try{
            return new ResponseEntity(proyectoService.findById(id), HttpStatus.OK);

        }
        catch (Exception e){
 
            System.out.println("Error en proyectoController > getProyectoById: " + e);
  
            logger.error("Error en proyectoController > getProyectoById: {}", e.getMessage());
  
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     @GetMapping(path = "/proyectos")
    public ResponseEntity<List<AltaProyectoDto>> getAllProyectos(){
        try{
            List<AltaProyectoDto> lst = proyectoService.findAll();
            return new ResponseEntity<>(lst, HttpStatus.OK);
        }
        catch (Exception e) {
 
            System.out.println("Error en proyectoController > getAllProyecto: " + e);
  
            logger.error("Error en proyectoController > getAllProyectos: {}", e.getMessage());
  
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener todos los proyectos con tipo 'productiva'
    @GetMapping(path = "/tipoProductiva")
    public ResponseEntity<List<AltaProyectoDto>> getAllProyectosTipoProductiva() {
        try {
            List<AltaProyectoDto> lst = proyectoService.findAllProductiva();
            return new ResponseEntity<>(lst, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en ProyectoController > getAllProyectosTipoProductiva: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Crear un proyecto
    @PostMapping(path = "/proyectos")
    public ResponseEntity createProyecto(@RequestBody AltaProyectoDto json){
        try{

            return proyectoService.createProyecto(json) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e){
 
            System.out.println("Error en ProyectoController > createProyecto: " +  e);
  
            logger.error("Error en proyectoController > createProyecto: {}", e.getMessage());
  
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Editar un proyecto
    @PutMapping(path = "/proyectos")
    public ResponseEntity editProyecto(@RequestBody AltaProyectoDto json){
        try{

            return proyectoService.editProyecto(json) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e){
 
            System.out.println("Error en proyectoController > editProyecto: " +  e);
  
            logger.error("Error en proyectoController > editProyecto: {}", e.getMessage());
  
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Copiar un proyecto
    @PutMapping(path = "/proyectos/copy")
    public ResponseEntity copyProyecto(@RequestBody AltaProyectoDto json){

        try{
            return new ResponseEntity(proyectoService.copyProyecto(json), HttpStatus.OK);
        }catch (Exception e){
 
            System.out.println("Error en proyectoController > copyproyecto: " + e);
  
            logger.error("Error en proyectoController > copyProyecto: {}", e.getMessage());
  
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



    //Borrar un proyecto por id
    @DeleteMapping(path = "/proyectos/{id}")
    public ResponseEntity deleteProyecto(@PathVariable Integer id){
        try {
            return new ResponseEntity(proyectoService.deleteProyecto(id), HttpStatus.OK);
        }
        catch (Exception e) {
 
            System.out.println("Error en ProyectoController > deleteProyecto: " + e);
  
            logger.error("Error en proyectoController > deleteProyecto: {}", e.getMessage());
  
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/proyectos/cierre")
    public ResponseEntity CierreProyecto(@RequestBody CierreProyectoDto dto){

        try{

            return proyectoService.cerrarProyecto(dto) ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e){

            System.out.println("Error en ProyectoController > createProyecto: " +  e);

            logger.error("Error en proyectoController > createProyecto: {}", e.getMessage());

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}



