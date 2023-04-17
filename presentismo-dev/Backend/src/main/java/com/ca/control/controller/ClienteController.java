package com.ca.control.controller;

import com.ca.control.dto.ComboDto;
import com.ca.control.model.Cliente;
import com.ca.control.service.ClienteService;
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
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    private static final Logger logger = LoggerFactory.getLogger(ClienteController.class);

    // Obtener todos los clientes
    @GetMapping(path = "/clientes")
    public ResponseEntity<List<ComboDto>> getAllClientes() {
        try {
            List<ComboDto> lst = clienteService.findAll();
            return new ResponseEntity<>(lst, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en ClienteController > getAllClientes: {}", e.getMessage() );
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Crear un cliente
    @PostMapping(path = "/clientes")
    public ResponseEntity createCliente(@RequestBody Cliente cliente) {
        try {
            return clienteService.createCliente(cliente) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error("Error en ClienteController > createCliente: {}", e.getMessage() );
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Editar un cliente
    @PutMapping(path = "/clientes")
    public ResponseEntity editCliente(@RequestBody Cliente cliente) {
        try {
            return clienteService.editCliente(cliente) ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            logger.error("Error en ClienteController > editCliente: {}", e.getMessage() );
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Borrar un cliente por id
    @DeleteMapping(path = "/clientes/{id}")
    public ResponseEntity deleteCliente(@PathVariable Integer id) {
        try {
            return new ResponseEntity(clienteService.deleteCliente(id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error en ClienteController > deleteCliente: {}", e.getMessage() );
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
